
export const FooterSection = () => {
    const quickLinks = ['Home', 'Book a Free Scan', 'How it Works', 'Range of Aligners', 'Aligners vs Braces', 'FAQs']
    const legalLinks = ['Privacy Policy', 'Terms of Service']

    return (
        <footer style={{ backgroundColor: '#171b1b', padding: '48px 16px', marginTop: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 280, maxWidth: 1440, margin: '0 auto' }}>
                {/* Quick Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Quick Links</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {quickLinks.map((link) => (
                            <a key={link} href="#" style={{ fontSize: 16, fontWeight: 500, color: '#fff', textDecoration: 'none' }}>
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Get in Touch Now!</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { icon: 'img_phone_call_01.svg', text: '011-6932-8350' },
                            { icon: 'img_mail_01.svg', text: 'support@whistle.in' },
                        ].map((item) => (
                            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <img src={`/images/${item.icon}`} alt="" style={{ width: 24, height: 24 }} />
                                <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Follow us on</h3>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {[
                            { icon: 'img_1161953_instagram_icon.svg', label: 'Instagram' },
                            { icon: 'img_104498_facebook_icon.svg', label: 'Facebook' },
                            { icon: 'img_11053970_x_logo.svg', label: 'Twitter' },
                        ].map((s) => (
                            <a key={s.label} href="#" aria-label={s.label}>
                                <img src={`/images/${s.icon}`} alt={s.label} style={{ width: 36, height: 36 }} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Legal */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {legalLinks.map((link) => (
                        <a key={link} href="#" style={{ fontSize: 16, fontWeight: 500, color: '#fff', textDecoration: 'none' }}>
                            {link}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    )
}
