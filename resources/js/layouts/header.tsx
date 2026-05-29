
export const Header = () => (
    <header style={{ backgroundColor: '#ffffff', width: '100%' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
        }}>
            <img
                src="/images/img_header_logo.png"
                alt="Whistle Aligners Logo"
                style={{ width: '100px' }}
            />
            <button
                aria-label="Menu"
                style={{
                    width: 48, height: 48,
                    backgroundColor: '#8f62d4',
                    borderRadius: 24,
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                <img src="/images/img_frame_2609384.svg" alt="Menu" style={{ width: 24, height: 24 }} />
            </button>
        </div>
        <div style={{
            background: 'linear-gradient(90deg, #cff0c4 0%, #c7e0f2 100%)',
            padding: '8px',
            textAlign: 'center',
        }}>
            <p style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#000' }}>
                Starting at{' '}
                <span style={{ textDecoration: 'line-through', color: '#768888', fontWeight: 400 }}>
                    Rs 69,999
                </span>{' '}
                Rs 47,999. Hurry! Offer ends soon.
            </p>
        </div>
    </header>
)