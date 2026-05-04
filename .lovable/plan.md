## Objetivo
Las reservas canceladas aparecen en verde en el calendario del CalendarTab de `AdminFlotaDetalle.tsx` porque la query `fleet-reservations` no filtra por `status`. Hay que excluirlas.

## Cambios

### 1. `src/pages/admin/AdminFlotaDetalle.tsx` — query `fleet-reservations` (línea 118-126)

Añadir el filtro `.in("status", ["confirmed", "pending"])` para que las reservas con status `cancelled` (o `rejected`) no se incluyan en los eventos del calendario.

```ts
const { data: reservations = [] } = useQuery({
  queryKey: ["fleet-reservations", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("car_id", carId)
      .in("status", ["confirmed", "pending"]);
    if (error) throw error;
    return data || [];
  },
});
```

### 2. `fleet-reservations-detail` (línea 390-402)

Esta query ya filtra `.eq("status", "confirmed")`, así que las pestañas Pasadas/En curso/Futuras ya muestran solo reservas activas. **No requiere cambio**, pero por consistencia con la indicación del usuario podemos dejarla tal cual (ya cumple el objetivo: excluye canceladas).

## Resultado
- Las reservas canceladas dejan de pintarse en verde en el calendario.
- El contador de días reservados refleja únicamente reservas activas/pendientes.
- Las invalidaciones existentes (`qc.invalidateQueries`) siguen funcionando sin cambios.
