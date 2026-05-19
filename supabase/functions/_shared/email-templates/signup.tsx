/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text, Img,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ siteName, siteUrl, recipient, confirmationUrl }: SignupEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma tu email para acceder a OWNEO</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src="https://deafxtmgcqovwqlvktte.supabase.co/storage/v1/object/public/email-assets/owneo-logo.png" alt="OWNEO" width="140" height="32" style={{ display: "block", margin: "0 auto", height: "32px", width: "auto" }} />
        </Section>
        <Section style={content}>
          <Heading style={h1}>Confirma tu email</Heading>
          <Text style={text}>
            Gracias por unirte a <Link href={siteUrl} style={link}>OWNEO</Link>. El lujo que se comparte comienza con un solo gesto: confirmar tu dirección de correo.
          </Text>
          <Text style={text}>
            Confirma <strong style={{ color: '#0a0a0a' }}>{recipient}</strong> haciendo clic en el botón a continuación:
          </Text>
          <Section style={{ textAlign: 'center' }}>
            <Button style={button} href={confirmationUrl}>Verificar mi email</Button>
          </Section>
          <Text style={footer}>Si no creaste esta cuenta, puedes ignorar este mensaje.</Text>
        </Section>
        <Hr style={hr} />
        <Text style={signature}>El equipo OWNEO</Text>
        <Text style={legal}>© 2025 OWNEO. Todos los derechos reservados.</Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: '"Encode Sans Expanded", Arial, sans-serif', margin: 0, padding: '24px 12px' }
const container = { maxWidth: '600px', margin: '0 auto', border: '1px solid #e5e5e5', borderRadius: '6px', overflow: 'hidden' as const }
const header = { backgroundColor: '#0a0a0a', padding: '28px 24px', textAlign: 'center' as const }
const brand = { color: '#c9a84c', fontSize: '24px', letterSpacing: '6px', fontWeight: 200 as const, margin: 0 }
const content = { padding: '32px 32px 16px 32px' }
const h1 = { fontSize: '22px', fontWeight: 600 as const, color: '#0a0a0a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#c9a84c', textDecoration: 'none', fontWeight: 600 as const }
const button = { backgroundColor: '#c9a84c', color: '#0a0a0a', fontSize: '14px', fontWeight: 700 as const, padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', letterSpacing: '1px', display: 'inline-block', margin: '12px 0 8px' }
const footer = { fontSize: '12px', color: '#888888', margin: '24px 0 0' }
const hr = { border: 'none', borderTop: '1px solid #c9a84c', margin: '0 32px' }
const signature = { fontSize: '13px', color: '#0a0a0a', textAlign: 'center' as const, margin: '16px 0 4px' }
const legal = { fontSize: '11px', color: '#999999', textAlign: 'center' as const, margin: '0 0 20px' }
