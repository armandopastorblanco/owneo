/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

const CHAMPAGNE = '#bd9c94' // hsl(12, 24%, 66%) — matches site --champagne CTA token
const CHAMPAGNE_60 = 'rgba(189,156,148,0.6)'

export const SignupEmail = ({ siteUrl, confirmationUrl }: SignupEmailProps) => {
  const base = siteUrl?.replace(/\/$/, '') || ''
  const logoUrl = `${base}/email/owneo-logo.png`
  const heroUrl = `${base}/email/hero.jpg`

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Un solo paso te separa del lujo que se comparte.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img src={logoUrl} alt="OWNEO" width="140" style={logoImg} />
          </Section>

          {/* Hero */}
          <Section style={heroWrap}>
            <Img src={heroUrl} alt="" width="600" style={heroImg} />
          </Section>

          {/* Body */}
          <Section style={content}>
            <Text style={heading}>Bienvenido al círculo.</Text>

            <Section style={dividerWrap}>
              <Section style={divider}>&nbsp;</Section>
            </Section>

            <Text style={tagline}>
              El coche que siempre quisiste.<br />
              Sin las cargas que nunca quisiste.<br />
              Bienvenido.
            </Text>

            <Section style={{ height: '40px', lineHeight: '40px' }}>&nbsp;</Section>

            <Text style={instruction}>
              Confirma tu dirección de correo para completar tu acceso a OWNEO.
            </Text>

            <Section style={{ height: '40px', lineHeight: '40px' }}>&nbsp;</Section>

            <Section style={{ textAlign: 'center' as const }}>
              <Button style={button} href={confirmationUrl}>Confirmar mi acceso</Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTagline}>EL LUJO QUE SE COMPARTE</Text>

            <Section style={{ height: '16px', lineHeight: '16px' }}>&nbsp;</Section>

            <Section style={{ textAlign: 'center' as const }}>
              <Link href="#" style={socialLink}>Instagram</Link>
              <span style={socialSep}>·</span>
              <Link href="#" style={socialLink}>LinkedIn</Link>
              <span style={socialSep}>·</span>
              <Link href="#" style={socialLink}>Facebook</Link>
            </Section>

            <Section style={{ height: '20px', lineHeight: '20px' }}>&nbsp;</Section>

            <Text style={footerCopyright}>© 2025 OWNEO. Todos los derechos reservados.</Text>
            <Section style={{ height: '8px', lineHeight: '8px' }}>&nbsp;</Section>
            <Text style={footerDisclaimer}>Si no creaste esta cuenta, puedes ignorar este mensaje.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SignupEmail

const FONT = '"Encode Sans Expanded", Arial, sans-serif'

const main = {
  backgroundColor: '#ffffff',
  fontFamily: FONT,
  margin: 0,
  padding: '0',
}
const container = {
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  backgroundColor: '#0a0a0a',
}
const header = {
  backgroundColor: '#0a0a0a',
  padding: '32px 0',
  textAlign: 'center' as const,
  borderBottom: '1px solid rgba(201,168,76,0.25)',
}
const logoImg = {
  display: 'block',
  margin: '0 auto',
  width: '140px',
  height: 'auto' as const,
}
const heroWrap = {
  backgroundColor: '#0a0a0a',
  padding: 0,
  fontSize: 0,
  lineHeight: 0,
}
const heroImg = {
  display: 'block',
  width: '100%',
  maxWidth: '600px',
  height: 'auto' as const,
  margin: 0,
}
const content = {
  backgroundColor: '#0a0a0a',
  padding: '48px 40px',
}
const heading = {
  color: '#ffffff',
  fontFamily: FONT,
  fontSize: '32px',
  fontWeight: 900 as const,
  letterSpacing: '-0.5px',
  textAlign: 'center' as const,
  margin: '0 0 24px 0',
  lineHeight: 1.2,
}
const dividerWrap = { textAlign: 'center' as const, margin: '0 auto 32px auto' }
const divider = {
  width: '40px',
  height: '1px',
  backgroundColor: CHAMPAGNE,
  margin: '0 auto',
  lineHeight: '1px',
  fontSize: '1px',
}
const tagline = {
  color: '#888888',
  fontFamily: FONT,
  fontSize: '15px',
  lineHeight: 2,
  fontWeight: 300 as const,
  fontStyle: 'italic' as const,
  textAlign: 'center' as const,
  margin: '0 auto',
}
const instruction = {
  color: '#ffffff',
  fontFamily: FONT,
  fontSize: '14px',
  lineHeight: 1.7,
  fontWeight: 400 as const,
  textAlign: 'center' as const,
  maxWidth: '360px',
  margin: '0 auto',
}
const button = {
  backgroundColor: CHAMPAGNE,
  color: '#000000',
  fontFamily: FONT,
  fontSize: '13px',
  fontWeight: 800 as const,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  padding: '16px 48px',
  borderRadius: '2px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = {
  backgroundColor: '#0a0a0a',
  padding: '32px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid rgba(201,168,76,0.15)',
}
const footerTagline = {
  color: CHAMPAGNE_60,
  fontFamily: FONT,
  fontSize: '10px',
  letterSpacing: '0.35em',
  textTransform: 'uppercase' as const,
  fontWeight: 600 as const,
  textAlign: 'center' as const,
  margin: 0,
}
const socialLink = {
  color: 'rgba(255,255,255,0.25)',
  fontFamily: FONT,
  fontSize: '11px',
  textDecoration: 'none',
  margin: '0 8px',
  letterSpacing: '0.1em',
}
const socialSep = {
  color: 'rgba(255,255,255,0.15)',
  fontSize: '11px',
}
const footerCopyright = {
  color: '#333333',
  fontFamily: FONT,
  fontSize: '11px',
  textAlign: 'center' as const,
  margin: 0,
}
const footerDisclaimer = {
  color: '#222222',
  fontFamily: FONT,
  fontSize: '10px',
  textAlign: 'center' as const,
  margin: 0,
}
