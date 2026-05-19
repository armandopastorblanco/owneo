/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps { token: string }

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu código de verificación OWNEO</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Text style={brand}>OWNEO</Text></Section>
        <Section style={content}>
          <Heading style={h1}>Confirma tu identidad</Heading>
          <Text style={text}>Usa el siguiente código para confirmar tu identidad:</Text>
          <Text style={codeStyle}>{token}</Text>
          <Text style={footer}>Este código caducará en breve. Si no lo has solicitado, puedes ignorar este mensaje.</Text>
        </Section>
        <Hr style={hr} />
        <Text style={signature}>El equipo OWNEO</Text>
        <Text style={legal}>© 2025 OWNEO. Todos los derechos reservados.</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: '"Encode Sans Expanded", Arial, sans-serif', margin: 0, padding: '24px 12px' }
const container = { maxWidth: '600px', margin: '0 auto', border: '1px solid #e5e5e5', borderRadius: '6px', overflow: 'hidden' as const }
const header = { backgroundColor: '#0a0a0a', padding: '28px 24px', textAlign: 'center' as const }
const brand = { color: '#c9a84c', fontSize: '24px', letterSpacing: '6px', fontWeight: 200 as const, margin: 0 }
const content = { padding: '32px 32px 16px 32px' }
const h1 = { fontSize: '22px', fontWeight: 600 as const, color: '#0a0a0a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '1.6', margin: '0 0 16px' }
const codeStyle = { fontFamily: 'Courier, monospace', fontSize: '28px', fontWeight: 700 as const, color: '#c9a84c', letterSpacing: '6px', textAlign: 'center' as const, margin: '12px 0 24px' }
const footer = { fontSize: '12px', color: '#888888', margin: '24px 0 0' }
const hr = { border: 'none', borderTop: '1px solid #c9a84c', margin: '0 32px' }
const signature = { fontSize: '13px', color: '#0a0a0a', textAlign: 'center' as const, margin: '16px 0 4px' }
const legal = { fontSize: '11px', color: '#999999', textAlign: 'center' as const, margin: '0 0 20px' }
