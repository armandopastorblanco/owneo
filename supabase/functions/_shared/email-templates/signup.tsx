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

// Champagne color — official brand book: #bda095 / token --champagne: 16.5 23.3% 66.3%
const CHAMPAGNE = '#bda095'
const CHAMPAGNE_60 = 'rgba(189,160,149,0.6)'
const CHAMPAGNE_20 = 'rgba(189,160,149,0.2)'
const FONT = '"Encode Sans Expanded", Arial, sans-serif'

export const SignupEmail = ({ siteUrl, confirmationUrl }: SignupEmailProps) => {
  const logoUrl = 'https://deafxtmgcqovwqlvktte.supabase.co/storage/v1/object/public/email-assets/owneo-logo.png'
  const heroUrl = 'https://deafxtmgcqovwqlvktte.supabase.co/storage/v1/object/public/email-assets/hero.jpg'

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Un solo paso te separa del lujo que se comparte.</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: FONT, margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', width: '100%', margin: '0 auto', backgroundColor: '#ffffff' }}>
          {/* Section 1 — Header band */}
          <Section style={{
            backgroundColor: '#0a0a0a',
            padding: '28px 40px',
            textAlign: 'center' as const,
            borderBottom: `1px solid ${CHAMPAGNE_20}`,
          }}>
            <Img src={logoUrl} alt="OWNEO" width="120" style={{ display: 'block', margin: '0 auto', width: '120px', height: 'auto' as const }} />
          </Section>

          {/* Section 2 — Hero vehicle photo */}
          <Section style={{ padding: 0, fontSize: 0, lineHeight: 0, backgroundColor: '#0a0a0a' }}>
            <Img
              src={heroUrl}
              alt=""
              width="600"
              height="240"
              style={{ display: 'block', width: '100%', maxWidth: '600px', height: '240px', objectFit: 'cover' as const, margin: 0 }}
            />
          </Section>

          {/* Section 3 — Main content */}
          <Section style={{ backgroundColor: '#fafafa', padding: '52px 48px 40px 48px' }}>
            <Text style={{
              color: '#0a0a0a',
              fontFamily: FONT,
              fontSize: '30px',
              fontWeight: 900 as const,
              letterSpacing: '-0.3px',
              textAlign: 'center' as const,
              margin: '0 0 20px 0',
              lineHeight: 1.2,
            }}>
              Bienvenido al círculo.
            </Text>

            <Section style={{ textAlign: 'center' as const, margin: '0 auto 28px auto' }}>
              <Section style={{
                width: '36px',
                height: '1px',
                backgroundColor: CHAMPAGNE,
                margin: '0 auto',
                lineHeight: '1px',
                fontSize: '1px',
              }}>&nbsp;</Section>
            </Section>

            <Text style={{
              color: '#888888',
              fontFamily: FONT,
              fontSize: '15px',
              lineHeight: 2.2,
              fontWeight: 300 as const,
              fontStyle: 'italic' as const,
              textAlign: 'center' as const,
              margin: '0 0 36px 0',
            }}>
              El coche que siempre quisiste.<br />
              Sin las cargas que nunca quisiste.<br />
              Bienvenido.
            </Text>

            <Section style={{ borderTop: '1px solid #eeeeee', margin: '0 0 36px 0', lineHeight: '1px', fontSize: '1px' }}>&nbsp;</Section>

            <Text style={{
              color: '#444444',
              fontFamily: FONT,
              fontSize: '14px',
              lineHeight: 1.8,
              fontWeight: 400 as const,
              textAlign: 'center' as const,
              maxWidth: '340px',
              margin: '0 auto 36px auto',
            }}>
              Confirma tu dirección de correo para completar tu acceso a OWNEO.
            </Text>

            <Section style={{ textAlign: 'center' as const }}>
              <Button
                href={confirmationUrl}
                style={{
                  backgroundColor: CHAMPAGNE,
                  color: '#000000',
                  fontFamily: FONT,
                  fontSize: '12px',
                  fontWeight: 800 as const,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  padding: '16px 52px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Confirmar mi acceso
              </Button>
            </Section>
          </Section>

          {/* Section 4 — Footer */}
          <Section style={{
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #e8e8e8',
            padding: '32px 40px',
            textAlign: 'center' as const,
          }}>
            <Section style={{
              width: '32px',
              height: '1px',
              backgroundColor: CHAMPAGNE_60,
              margin: '0 auto 20px auto',
              lineHeight: '1px',
              fontSize: '1px',
            }}>&nbsp;</Section>

            <Text style={{
              color: '#aaaaaa',
              fontFamily: FONT,
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase' as const,
              fontWeight: 600 as const,
              textAlign: 'center' as const,
              margin: '0 0 14px 0',
            }}>
              EL LUJO QUE SE COMPARTE
            </Text>

            <Section style={{ textAlign: 'center' as const, margin: '0 0 20px 0' }}>
              <Link href="#" style={{ color: '#cccccc', fontFamily: FONT, fontSize: '11px', textDecoration: 'none', margin: '0 12px', letterSpacing: '0.1em' }}>IG</Link>
              <span style={{ color: '#dddddd', fontSize: '11px' }}>·</span>
              <Link href="#" style={{ color: '#cccccc', fontFamily: FONT, fontSize: '11px', textDecoration: 'none', margin: '0 12px', letterSpacing: '0.1em' }}>LI</Link>
              <span style={{ color: '#dddddd', fontSize: '11px' }}>·</span>
              <Link href="#" style={{ color: '#cccccc', fontFamily: FONT, fontSize: '11px', textDecoration: 'none', margin: '0 12px', letterSpacing: '0.1em' }}>FB</Link>
            </Section>

            <Text style={{
              color: '#bbbbbb',
              fontFamily: FONT,
              fontSize: '11px',
              textAlign: 'center' as const,
              margin: '0 0 6px 0',
            }}>
              © 2025 OWNEO. Todos los derechos reservados.
            </Text>
            <Text style={{
              color: '#cccccc',
              fontFamily: FONT,
              fontSize: '10px',
              textAlign: 'center' as const,
              margin: 0,
            }}>
              Si no creaste esta cuenta, puedes ignorar este mensaje.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SignupEmail
