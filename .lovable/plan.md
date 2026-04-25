## Objetivo
Corregir el flujo de creación de solicitudes para que cada envío desde la ficha vehículo cree realmente una fila en la base de datos y aparezca en `/admin/solicitudes`.

## Hallazgos confirmados
- No parece estar relacionado con la ciudad.
- La tabla `participation_requests` contiene actualmente `0` registros.
- La política de inserción de solicitudes solo exige `user_id = auth.uid()`; no exige ciudad.
- El admin carga todas las solicitudes sin filtro de ciudad por defecto.
- Los vehículos tienen `location_id = null`, así que, si existieran solicitudes, se agruparían bajo `Sin ciudad`, pero seguirían visibles.

## Plan
1. Revisar y corregir el flujo de envío en la ficha vehículo.
   - Asegurar que, tras login/registro, el usuario vuelve al vehículo con el estado necesario para terminar el cuestionario.
   - Verificar que el modal y el cuestionario se reabren correctamente o que el usuario puede continuar sin perder el flujo.
   - Evitar que el proceso “parezca enviado” si la inserción no ocurrió.

2. Endurecer la creación de la solicitud en el cliente.
   - Añadir trazas y manejo explícito de errores en `EvaluationQuestionnaire`.
   - Confirmar paso a paso: usuario autenticado, `carId` válido, payload válido, respuesta real de inserción.
   - Mostrar mensajes de error específicos si falla la inserción en vez de cerrar el flujo silenciosamente.

3. Validar el acceso y la lectura del back office.
   - Mantener el listado admin independiente de la ciudad.
   - Añadir defensas para casos con `cars.location_id = null` y perfiles incompletos, para que nunca oculten una solicitud existente.

4. Verificar la consistencia backend mínima necesaria.
   - Comprobar que el trigger de creación de perfil sigue operativo.
   - Revisar si hace falta una pequeña corrección de permisos o una función backend para registrar solicitudes de forma más robusta.
   - Si el problema viene de RLS o de una operación intermedia, aplicar la corrección más segura sin abrir datos sensibles.

5. Probar el flujo completo.
   - Crear una solicitud real desde una ficha vehículo con un usuario normal.
   - Verificar que aparece inmediatamente en `/admin/solicitudes`.
   - Confirmar que, aunque no haya ciudad seleccionada, la solicitud se vea bajo `Sin ciudad`.

## Detalles técnicos
- Archivos probablemente implicados:
  - `src/components/ParticipationForm.tsx`
  - `src/components/EvaluationQuestionnaire.tsx`
  - `src/pages/Login.tsx`
  - `src/pages/Registro.tsx`
  - `src/pages/admin/AdminSolicitudes.tsx`
- Base de datos:
  - `participation_requests` no depende de `city_id` para insertarse.
  - `cars.location_id` nulo afecta solo a la agrupación visual, no a la creación ni a la visibilidad para superadmin.
- Resultado esperado:
  ```text
  Solicitud enviada -> fila creada en participation_requests -> admin la lee -> aparece en Sin ciudad si el coche no tiene location_id
  ```