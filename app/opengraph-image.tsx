import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 40%, rgba(251,191,36,0.15), transparent 50%)',
          }}
        />
        
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#f59e0b',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#0f172a' }}>M</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>Massaba</span>
            <span style={{ fontSize: 24, color: '#f59e0b' }}>Consulting</span>
          </div>
        </div>
        
        {/* Main title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 24,
            maxWidth: '900px',
          }}
        >
          Connecting People & Opportunities
        </div>
        
        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          B2B | Education | Government | Visa | Travel | Vehicles
        </div>
        
        {/* Bottom text */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 20,
            color: '#475569',
          }}
        >
          massaba.app
        </div>
      </div>
    ),
    size
  )
}