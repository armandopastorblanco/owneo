/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ confirmationUrl }: SignupEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Un solo paso te separa del lujo que se comparte.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Text style={wordmark}>OWNEO</Text>
        </Section>

        {/* Body */}
        <Section style={content}>
          <Text style={heading}>Bienvenido al círculo.</Text>

          <Section style={dividerWrap}>
            <Section style={divider} />
          </Section>

          <Text style={tagline}>
            El coche que siempre quisiste.<br />
            Sin las cargas que nunca quisiste.<br />
            Bienvenido.
          </Text>

          <Section style={{ height: '32px', lineHeight: '32px' }}>&nbsp;</Section>

          <Text style={instruction}>
            Confirma tu dirección de correo para completar tu acceso a OWNEO.
          </Text>

          <Section style={{ height: '32px', lineHeight: '32px' }}>&nbsp;</Section>

          <Section style={{ textAlign: 'center' as const }}>
            <Button style={button} href={confirmationUrl}>Confirmar mi acceso</Button>
          </Section>

          <Section style={{ height: '48px', lineHeight: '48px' }}>&nbsp;</Section>
        </Section>

        {/* Footer */}
        <Section style={footerSeparatorWrap}>
          <Section style={footerSeparator} />
        </Section>
        <Section style={footer}>
          <Text style={footerTagline}>EL LUJO QUE SE COMPARTE</Text>
          <Section style={{ height: '8px', lineHeight: '8px' }}>&nbsp;</Section>
          <Text style={footerCopyright}>© 2025 OWNEO. Todos los derechos reservados.</Text>
          <Text style={footerDisclaimer}>Si no creaste esta cuenta, puedes ignorar este mensaje.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const FONT = '"Encode Sans Expanded", Arial, sans-serif'

const main = {
  backgroundColor: '#ffffff',
  fontFamily: FONT,
  margin: 0,
  padding: '24px 12px',
}
const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#0a0a0a',
  borderRadius: '6px',
  overflow: 'hidden' as const,
}
const header = {
  backgroundColor: '#0a0a0a',
  padding: '24px',
  textAlign: 'center' as const,
  borderBottom: '1px solid rgba(201,168,76,0.3)',
}
const wordmark = {
  color: '#ffffff',
  fontFamily: FONT,
  fontSize: '22px',
  letterSpacing: '8px',
  fontWeight: 300 as const,
  margin: 0,
  textAlign: 'center' as const,
}
const content = {
  backgroundColor: '#0a0a0a',
  padding: '48px 32px 16px 32px',
}
const heading = {
  color: '#ffffff',
  fontFamily: FONT,
  fontSize: '28px',
  fontWeight: 900 as const,
  textAlign: 'center' as const,
  margin: '0',
  lineHeight: 1.2,
}
const dividerWrap = { textAlign: 'center' as const, margin: '24px auto' }
const divider = {
  width: '40px',
  height: '1px',
  backgroundColor: '#c9a84c',
  margin: '0 auto',
  lineHeight: '1px',
  fontSize: '1px',
}
const tagline = {
  color: '#888888',
  fontFamily: FONT,
  fontSize: '15px',
  lineHeight: 1.8,
  textAlign: 'center' as const,
  maxWidth: '420px',
  margin: '0 auto',
}
const instruction = {
  color: '#ffffff',
  fontFamily: FONT,
  fontSize: '14px',
  lineHeight: 1.7,
  textAlign: 'center' as const,
  maxWidth: '380px',
  margin: '0 auto',
}
const button = {
  backgroundColor: '#c9a84c',
  color: '#000000',
  fontFamily: FONT,
  fontSize: '14px',
  fontWeight: 700 as const,
  padding: '14px 40px',
  borderRadius: '4px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footerSeparatorWrap = { padding: '0 32px' }
const footerSeparator = {
  height: '1px',
  backgroundColor: 'rgba(201,168,76,0.2)',
  lineHeight: '1px',
  fontSize: '1px',
}
const footer = {
  backgroundColor: '#0a0a0a',
  padding: '24px 32px 32px 32px',
  textAlign: 'center' as const,
}
const footerTagline = {
  color: '#444444',
  fontFamily: FONT,
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
}
const footerCopyright = {
  color: '#333333',
  fontFamily: FONT,
  fontSize: '11px',
  textAlign: 'center' as const,
  margin: 0,
}
const footerDisclaimer = {
  color: '#2a2a2a',
  fontFamily: FONT,
  fontSize: '10px',
  textAlign: 'center' as const,
  marginTop: '8px',
}
