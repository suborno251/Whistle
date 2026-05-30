import { useState, useEffect } from 'react'
import "@fontsource/montserrat/800.css";
import { Header } from '../layouts/header';
import { FooterSection } from '../layouts/footer';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface FAQItem {
    question: string
    answer: string
}

interface ResultCard {
    beforeImg: string
    afterImg: string
    concern: string
    duration: string
}

interface WhyCard {
    img: string
    title: string
    description: string
}

interface ComparisonRow {
    feature: string
    whistleValue: string | 'check'
    otherValue: string | 'cross' | 'maybe'
}

interface Step {
    number: number
    title: string
    description: string
}

interface DifferenceItem {
    icon: string
    title: string
    description: string
}

// ─── WINDOW WIDTH ───────────────────────────────────────────────────────────────────
const useWindowWidth = () => {
    const [width, setWidth] = useState(() => {
        if (typeof window === 'undefined') return 0
        return window.visualViewport?.width ?? window.innerWidth
    })

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.visualViewport?.width ?? window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        window.visualViewport?.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.visualViewport?.removeEventListener('resize', handleResize)
        }
    }, [])

    return width
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

const HeroSection = () => {
    const width = useWindowWidth()
    const isMobile = width < 768

    return (
        <section style={{
            backgroundColor: '#f6f3fc',
            backgroundImage: 'url(/images/img_group_2609310.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',    
            width: '100%',
        }}>
            <div style={{
                display: 'flex',
                gap: 20,
                position: 'relative',
                zIndex: 2,
                maxWidth: 1222,
                margin: '0 auto',
                alignItems: isMobile ? 'flex-end' : 'center',
                justifyContent: 'center',
                padding: isMobile ? '24px 20px 0 20px' : undefined,
            }}>
                <div style={{ flex: isMobile ? 1 : undefined }}>
                    <h1 style={{
                        fontSize: 'clamp(24px, 4vw, 40px)',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        lineHeight: '130%',
                        letterSpacing: '0px',
                        textAlign: 'left',
                        color: '#171b1b',
                        marginBottom: 16,
                    }}>
                        Invisible Aligners for a dream smile
                    </h1>
                    <p style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 500, color: '#171b1b' }}>
                        Book a Scan and avail a free <br /> Orthodontist Consult{' '}
                        <span style={{ fontWeight: 700, color: '#8f62d4' }}>worth ₹1500</span>
                    </p>
                </div>
                <img
                    src="/images/img_ai_expand_pranav.png"
                    alt="Happy customer with perfect smile"
                    style={{ 
                        width: '100%',
                        maxWidth: isMobile ? 160 : 200,
                        height: 'auto',   
                        objectFit: 'contain',
                        flexShrink: 0,
                        alignSelf: isMobile ? 'flex-end' : undefined,
                    }}
                />
            </div>
        </section>
    )
}

// ─── FORM SECTION ─────────────────────────────────────────────────────────────


const FormSection = () => {
    const width = useWindowWidth()
    const isDesktop = width >= 768

    const [selected, setSelected] = useState<'yes' | 'no' | null>(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [consented, setConsented] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`Booking submitted!\nName: ${name}\nPhone: ${phone}`)
    }

    return (
        <section style={{ backgroundColor: '#ffffff', padding: '32px 16px' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto' }}>

                <h2 style={{
                    fontSize: 18, fontWeight: 600, lineHeight: 1.3,
                    textAlign: 'center', marginBottom: 16, color: '#000',
                }}>
                    Do you have Teeth Gaps or Crooked Teeth?
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
                    {(['yes', 'no'] as const).map((opt) => (
                        <div key={opt} onClick={() => setSelected(opt)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <div style={{
                                width: 20, height: 20,
                                border: `2px solid ${selected === opt ? '#8f62d4' : '#171b1b'}`,
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {selected === opt && (
                                    <div style={{ width: 10, height: 10, backgroundColor: '#8f62d4', borderRadius: '50%' }} />
                                )}
                            </div>
                            <span style={{ fontSize: 16, fontWeight: 600, color: '#000' }}>
                                {opt === 'yes' ? 'Yes' : 'No'}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* ← THIS ROW goes horizontal on desktop */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isDesktop ? 'row' : 'column',
                        gap: 16,
                        alignItems: isDesktop ? 'center' : 'stretch',
                    }}>

                        {/* Name */}
                        <div style={{ position: 'relative', flex: 1 }}>
                            <label style={{
                                position: 'absolute', top: -8, left: 16,
                                backgroundColor: '#fff', padding: '0 4px',
                                fontSize: 12, color: '#2f3636', zIndex: 1,
                            }}>
                                Full Name*
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ajay Kumar"
                                style={{
                                    width: '100%', padding: 14,
                                    border: '1px solid #2f3636', borderRadius: 8,
                                    fontSize: 16, fontWeight: 500, color: '#2f3636',
                                    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        {/* Phone */}
                        <div style={{ position: 'relative', flex: 1 }}>
                            <span style={{
                                position: 'absolute', top: '50%', left: 14,
                                transform: 'translateY(-50%)',
                                fontSize: 16, fontWeight: 500, color: '#2f3636',
                            }}>
                                +91
                            </span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Mobile number*"
                                style={{
                                    width: '100%', padding: 14, paddingLeft: 48,
                                    border: '1px solid #c8d0d0', borderRadius: 8,
                                    fontSize: 16, fontWeight: 500, color: '#000',
                                    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        {/* Button — inline on desktop, full width on mobile */}
                        <button
                            type="submit"
                            disabled={!consented}
                            style={{
                                padding: '14px 34px',
                                width: isDesktop ? 'auto' : '100%',
                                whiteSpace: 'nowrap',
                                backgroundColor: consented ? '#8f62d4' : '#c8b8e8',
                                color: '#fff', fontSize: 16, fontWeight: 600,
                                borderRadius: 8, border: 'none',
                                cursor: consented ? 'pointer' : 'not-allowed',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={e => { if (consented) e.currentTarget.style.backgroundColor = '#7a4fc1' }}
                            onMouseLeave={e => { if (consented) e.currentTarget.style.backgroundColor = '#8f62d4' }}
                        >
                            Book a Free Scan
                        </button>

                    </div>

                    {/* Consent */}
                    <div onClick={() => setConsented(!consented)}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                        <div style={{
                            width: 20, height: 20, flexShrink: 0,
                            border: `2px solid ${consented ? '#8f62d4' : '#c8d0d0'}`,
                            borderRadius: 4,
                            backgroundColor: consented ? '#8f62d4' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                        }}>
                            {consented && (
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </div>
                        <span style={{ fontSize: 11, color: '#465252', lineHeight: 1.4 }}>
                            I hereby consent to receive calls / messages from Whistle and its partners and override DND settings.
                        </span>
                    </div>

                </form>
            </div>
        </section>
    )
}


// ─── CLOVE SECTION ────────────────────────────────────────────────────────────

const CloveSection = () => {
    const width = useWindowWidth()
    const isMobile = width < 768

    return (
        <section style={{ padding: '32px 16px' }}>
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '32px 24px',
                borderRadius: 24,
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',  // keep row on both — matches desktop design
                    gap: 16,
                    alignItems: 'center',
                    justifyContent: isMobile ? 'space-between' : 'center',
                    marginBottom: 16,
                }}>
                    <p style={{ 
                        fontSize: isMobile ? 16 : 20, 
                        fontWeight: 600, 
                        textAlign: isMobile ? 'left' : 'center',  // left-aligned on mobile like Figma
                        color: '#000',
                        margin: 0,
                        flex: 1,  // text takes available space, pushes logo to right
                    }}>
                        Book Free Orthodontist Consult at a Clove Dental Clinic. 450+ Clinics near you
                    </p>
                    <div style={{ 
                        backgroundColor: '#4d2c19', 
                        padding: 4, 
                        display: 'inline-flex',
                        flexShrink: 0,  // logo never shrinks
                    }}>
                        <img 
                            src="/images/img_clove_logo.svg" 
                            alt="Clove Dental" 
                            style={{ width: isMobile ? 80 : 100 }} 
                        />
                    </div>
                </div>
                <a href="#" style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8,
                    justifyContent: 'flex-end',
                    color: '#8f62d4', 
                    fontSize: 16, 
                    fontWeight: 600,
                    textDecoration: 'none',
                }}>
                    Find Clinic
                    <img src="/images/img_frame_2609671.svg" alt="Arrow" style={{ width: 20, height: 20 }} />
                </a>
            </div>
        </section>
    )
}
// ─── SCROLLING BANNER ─────────────────────────────────────────────────────────

const ScrollingBanner = () => {
    const items = [
        { text: 'Our inaugural launch benefit', bold: false },
        { text: 'Free teeth scan', bold: true, suffix: ' worth ₹500' },
        { text: 'Free orthodontic consultation', bold: true, suffix: ' worth ₹1500' },
        { text: 'Our inaugural launch benefit', bold: false },
        { text: 'Free teeth scan', bold: true, suffix: ' worth ₹500' },
    ]

    return (
        <div style={{
            background: 'linear-gradient(90deg, #cff0c4 0%, #c7e0f2 100%)',
            padding: '16px 0',
            overflow: 'hidden',
        }}>
            <style>{`
                @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
                }
            `}</style>

            <div style={{
                display: 'flex',
                gap: 40,
                whiteSpace: 'nowrap',
                padding: '0 16px',
                animation: 'scroll 12s linear infinite',
            }}>
                {/* duplicate items for seamless loop */}
                {[...items, ...items].map((item, i) => (
                    <p key={i} style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>
                        {item.bold ? <strong>{item.text}</strong> : item.text}
                        {item.suffix}
                    </p>
                ))}
            </div>
        </div>
    )
}

// ─── DREAM SECTION ────────────────────────────────────────────────────────────

const DreamSection = () => {
    const width = useWindowWidth()
    const isDesktop = width >= 768
    const isMobile = width < 768

    return (
        <section style={{ backgroundColor: '#f0f9ff', padding: isMobile ? '24px 16px' : '48px 16px' }}>
            <div style={{
                display: 'flex',
                flexDirection: isDesktop ? 'row' : 'column',
                gap: isMobile ? 16 : 32,
                maxWidth: 1440,
                margin: '0 auto',
                alignItems: isDesktop ? 'flex-start' : 'stretch',
            }}>

                <div style={{ flex: 1 }}>
                    <h2 style={{
                        fontSize: isMobile ? '26px' : 'clamp(28px, 4vw, 40px)',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800, 
                        lineHeight: 1.2,
                        color: '#171b1b', 
                        marginBottom: isMobile ? 12 : 32,
                        marginTop: 0,
                    }}>
                        Dream smiles achieved secretly
                    </h2>
                    <p style={{ 
                        fontSize: 14, 
                        color: '#171b1b', 
                        lineHeight: 1.4, 
                        marginBottom: 16,
                        marginTop: 0,
                    }}>
                        Experience the superior quality of our Whistle Aligners crafted with 3-layer PU material.
                        With 450+ clinics nationwide, enjoy comfortable treatment by expert orthodontists at House of Clove.
                    </p>

                    {isDesktop && (
                        <p style={{ fontSize: 14, color: '#171b1b', lineHeight: 1.4 }}>
                            The pricing is different for every case. Cases with higher complexity requiring more aligners
                            and additional time and effort from our dentists.
                        </p>
                    )}
                </div>

                <div style={{
                    backgroundColor: '#fff', 
                    borderRadius: 16,
                    padding: isMobile ? '16px' : 22, 
                    boxShadow: '0px 2px 20px rgba(222,226,226,0.7)',
                    width: isDesktop ? 380 : '100%',
                    flexShrink: 0,
                    boxSizing: 'border-box',  // prevents overflow
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        marginBottom: isMobile ? 12 : 24,
                    }}>
                        <h3 style={{ 
                            fontSize: isMobile ? 17 : 20, 
                            fontFamily: "'Montserrat', sans-serif", 
                            fontWeight: 800, 
                            color: '#2f3636',
                            margin: 0,
                        }}>
                            Whistle Aligners
                        </h3>
                        <img 
                            src="/images/img_image_3.png" 
                            alt="Whistle Aligners" 
                            style={{ 
                                width: isMobile ? 60 : 80,  // smaller on mobile so it doesn't overflow
                                flexShrink: 0,
                            }} 
                        />
                    </div>
                    <p style={{ fontSize: 14, textDecoration: 'line-through', color: '#2f3636', marginBottom: 4, marginTop: 0 }}>
                        ₹84,000
                    </p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, color: '#2f3636' }}>starting at</span>
                        <span style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: '#8f62d4' }}>₹47,999</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#768888', marginBottom: isMobile ? 16 : 24, marginTop: 0 }}>
                        inc. of all taxes
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {['Offer valid for a limited time', 'Easy financing options'].map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <img src="/images/img_svg_margin.svg" alt="✓" style={{ width: 18, height: 20, flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: '#171b1b' }}>{f}</span>
                            </div>
                        ))}
                    </div>
                    <a href="#" style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        color: '#8f62d4', fontSize: 16, fontWeight: 600,
                        textDecoration: 'none', marginTop: 16,
                    }}>
                        Learn more
                        <img src="/images/img_arrow_right.svg" alt="→" style={{ width: 24, height: 24 }} />
                    </a>
                </div>

                {!isDesktop && (
                    <p style={{ fontSize: 14, color: '#171b1b', lineHeight: 1.4, marginTop: 0 }}>
                        The pricing is different for every case. Cases with higher complexity requiring more aligners
                        and additional time and effort from our dentists.
                    </p>
                )}

            </div>
        </section>
    )
}

// ─── RESULTS SECTION ──────────────────────────────────────────────────────────

const resultCards: ResultCard[] = [
    { beforeImg: 'img_gaps_before.png', afterImg: 'img_gaps_after.png', concern: 'Gaps', duration: '8 months' },
    { beforeImg: 'img_crooked_teeth.png', afterImg: 'img_crooked_teeth_140x140.png', concern: 'Crooked Teeth', duration: '8 months' },
    { beforeImg: 'img_overbite_before.png', afterImg: 'img_overbite_after.png', concern: 'Open Bite', duration: '8 months' },
    { beforeImg: 'img_protruding_teeth.png', afterImg: 'img_protruding_teeth_140x140.png', concern: 'Protruding Teeth', duration: '8 months' },
]

const ResultsSection = () => (
    <section style={{ backgroundColor: '#fff', padding: '48px 16px' }}>
        <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, textAlign: 'center',
            color: '#171b1b', marginBottom: 32,
        }}>
            Results You'll Love
        </h2>

        {/* ← Horizontal scroll container */}
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            overflowX: 'auto',
            paddingBottom: 12,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            {resultCards.map((card, i) => (
                <div key={i} style={{
                    backgroundColor: '#f0f9ff',
                    borderRadius: 8,
                    padding: 8,
                    minWidth: 220,
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                        <img src={`/images/${card.beforeImg}`} alt="Before" style={{ width: '50%', borderRadius: 2 }} />
                        <img src={`/images/${card.afterImg}`} alt="After" style={{ width: '50%', borderRadius: 2 }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', marginBottom: 16 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#2f3636' }}>Before</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#2f3636' }}>After</span>
                    </div>
                    <div style={{ padding: '0 8px' }}>
                        {[
                            { label: 'Concern', value: card.concern },
                            { label: 'Treatment Duration', value: card.duration },
                        ].map((row, j) => (
                            <div key={j} style={{
                                display: 'flex', justifyContent: 'space-between',
                                padding: '10px 0', borderTop: '1px solid #c8d0d0',
                            }}>
                                <span style={{ fontSize: 13, color: '#000' }}>{row.label}</span>
                                <span style={{ fontSize: 13, color: '#000' }}>{row.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
)

// ─── WHY WHISTLE ──────────────────────────────────────────────────────────────

const whyCards: WhyCard[] = [
    { img: 'img_choose1.png', title: 'Custom-made & invisible', description: 'Tailored for your teeth and smile with a clear, discreet appearance.' },
    { img: 'img_choose2.png', title: 'Predictable results', description: 'Advanced 3D modeling and AI-technology for precise planning and predictable results.' },
    { img: 'img_choose3.png', title: 'Partnership with Clove Dental', description: 'Led by highly experienced Orthodontists of Clove Dental and Whistle that have corrected over 2 lakh smiles.' },
    { img: 'img_choose4.png', title: 'Unlimited Aligners*', description: 'Unlimited aligners and doctor consults at no extra cost.' },
]

const WhyWhistleSection = () => (
    <section style={{ backgroundColor: '#fff', padding: '48px 16px' }}>
        <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, textAlign: 'center',
            color: '#171b1b', marginBottom: 32,
        }}>
            Why Whistle?
        </h2>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 24,
            overflowX: 'auto',
            paddingBottom: 12,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {whyCards.map((card, i) => (
                <div key={i} style={{ 
                    backgroundColor: '#f0f9ff', 
                    borderRadius: 16, 
                    overflow: 'hidden',
                    minWidth: 220,
                    maxWidth: 280, 
                    flexShrink: 0,
                    scrollSnapAlign: 'start', 
                    }}>
                    <div style={{ position: 'relative', width: '100%', height: 180, backgroundColor: '#cff0c4' }}>
                        <img
                            src={`/images/${card.img}`}
                            alt={card.title}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',objectPosition: 'center top' }}
                        />
                    </div>
                    <div style={{ padding: 16 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#000', marginBottom: 4 }}>{card.title}</h3>
                        <p style={{ fontSize: 14, lineHeight: 1.4, color: '#2f3636' }}>{card.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
)

// ─── DIFFERENCE SECTION ───────────────────────────────────────────────────────

const differenceItems: DifferenceItem[] = [
    { icon: 'img_group_2609315.svg', title: 'Next-Gen', description: 'Crafted with top-notch 3D printing, laser tech, and Zendura FLX material.' },
    { icon: 'img_group_2609315.svg', title: 'Hassle-Free', description: 'Predictable, comfortable & lifestyle-friendly for an easy smile transformation.' },
    { icon: 'img_group_2609309.svg', title: 'Transparent Pricing', description: "Everything's included – from scans to aligners, doctor consults, and retainers – no hidden costs." },
]

const DifferenceSection = () => {
    const width = useWindowWidth()
    const isMobile = width < 768

    return (
        <section style={{ 
            padding: isMobile ? '24px 16px' : '48px 24px', 
            background: '#ddeaf7',
        }}>
            <div style={{ 
                maxWidth: 900, 
                margin: '0 auto',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 16,
                alignItems: 'stretch',
            }}>
                {/* LEFT/TOP CARD: white content card */}
                <div style={{ 
                    flex: isMobile ? 'unset' : '0 0 52%',
                    padding: isMobile ? '24px 20px' : '40px 36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 20 : 28,
                    background: '#ffffff',
                    borderRadius: 20,
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '24px' : 'clamp(22px, 3vw, 32px)',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        color: '#171b1b',
                        margin: 0,
                    }}>
                        The Whistle Difference
                    </h2>

                    {differenceItems.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <img 
                                src={`/images/${item.icon}`} 
                                alt={item.title} 
                                style={{ 
                                    width: isMobile ? 40 : 48, 
                                    height: isMobile ? 40 : 48, 
                                    flexShrink: 0,
                                }} 
                            />
                            <div>
                                <h3 style={{ 
                                    fontSize: isMobile ? 14 : 15, 
                                    fontWeight: 700, 
                                    color: '#2f3636', 
                                    margin: '0 0 5px 0',
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{ 
                                    fontSize: 13, 
                                    lineHeight: 1.5, 
                                    color: '#444',
                                    margin: 0,
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT/BOTTOM CARD: image card */}
                <div style={{ 
                    flex: 1,
                    borderRadius: 20,
                    overflow: 'hidden',
                    height: isMobile ? 220 : 'auto',  // fixed height on mobile so it doesn't go full tall
                }}>
                    <img
                        src="/images/img_whatsapp_image_2024_02_13.png"
                        alt="Whistle Aligners showcase"
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

// ─── COMPARISON SECTION ───────────────────────────────────────────────────────

const comparisonRows: ComparisonRow[] = [
    { feature: 'Easy to complex cases', whistleValue: 'Yes, mild to complex', otherValue: 'No, only mild to moderate' },
    { feature: 'Clear-cut Pricing', whistleValue: 'check', otherValue: 'cross' },
    { feature: 'Aligner Change', whistleValue: 'Every 10 days', otherValue: 'Every 2 weeks' },
    { feature: 'Clinical Partnership', whistleValue: 'check', otherValue: 'cross' },
    { feature: 'Movement Between Cities', whistleValue: 'check', otherValue: 'cross' },
    { feature: 'Complimentary Teeth Scaling', whistleValue: 'check', otherValue: 'maybe' },
]

const ComparisonSection = () => (
    <section style={{ padding: '48px 16px', marginTop: 48 }}>
        <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, textAlign: 'center', color: '#171b1b', marginBottom: 32,
        }}>
            What sets Whistle apart?
        </h2>

        <div style={{
            maxWidth: 900, margin: '0 auto',
            backgroundColor: '#fff', border: '1px solid #e6e6e6',
            borderRadius: 16, overflow: 'hidden',
        }}>

            {/* ── HEADER ROW ── */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr',
                borderBottom: '1px solid #e6e6e6',
            }}>
                {/* Features label */}
                <div style={{ 
                    padding: '16px 20px', 
                    display: 'flex', 
                    alignItems: 'center' 
                }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>Features</span>
                </div>

                {/* Whistle header — light blue bg */}
                <div style={{ 
                    backgroundColor: '#eaf4fd', 
                    padding: '16px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                }}>
                    <img 
                        src="/images/img_image_1.png" 
                        alt="Whistle" 
                        style={{ width: 72, objectFit: 'contain' }} 
                    />
                </div>

                {/* Other Brands header */}
                <div style={{ 
                    padding: '16px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1e1e1e', textAlign: 'center' }}>
                        Other Brands
                    </span>
                </div>
            </div>

            {/* ── DATA ROWS ── */}
            {comparisonRows.map((row, i) => (
                <div key={i} style={{
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 1fr',
                    borderBottom: i < comparisonRows.length - 1 ? '1px solid #e6e6e6' : 'none',
                }}>
                    {/* Feature name + chevron */}
                    <div style={{ 
                        padding: '18px 20px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                    }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#000' }}>
                            {row.feature}
                        </span>
                        <img 
                            src="/images/img_frame_2609671_black_900.svg" 
                            alt="Expand" 
                            style={{ width: 14, height: 14, opacity: 0.5 }} 
                        />
                    </div>

                    {/* Whistle value — always light blue bg */}
                    <div style={{
                        backgroundColor: '#eaf4fd',
                        padding: '14px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {row.whistleValue === 'check' ? (
                            <img 
                                src="/images/img_frame_2609477.svg" 
                                alt="Yes" 
                                style={{ width: 32, height: 32 }} 
                            />
                        ) : (
                            <span style={{ fontSize: 12, fontWeight: 500, color: '#000', textAlign: 'center', lineHeight: 1.4 }}>
                                {row.whistleValue}
                            </span>
                        )}
                    </div>

                    {/* Other Brands value */}
                    <div style={{ 
                        padding: '14px 12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>

                    <img 
                        src="/images/img_frame_2609477_red_700.svg" 
                        alt="No" 
                        style={{ width: 32, height: 32 }} 
                    />

                    </div>
                </div>
            ))}
        </div>
    </section>
)

// ─── STEPS SECTION ────────────────────────────────────────────────────────────

const steps: Step[] = [
    { number: 1, title: 'Scan', description: 'We use an AI-powered scanner to take a detailed 3D image of your teeth.' },
    { number: 2, title: 'Plan', description: 'Our Orthodontists design your customized smile enhancement plan using highly advanced software.' },
    { number: 3, title: 'Fabricate', description: 'We manufacture your custom aligners leveraging 3D printing & laser technology.' },
    { number: 4, title: 'Wear', description: 'Your Whistle Aligners and expert Clove Dental Orthodontists monitor your progress across the journey.' },
]

const StepsSection = () => {
    const width = useWindowWidth()
    const isMobile = width < 768

    return (
        <section style={{ 
            backgroundColor: '#f0f9ff',
            padding: isMobile ? '24px 16px' : '48px 24px',
        }}>
            <div style={{ 
                maxWidth: 900, 
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: 20,
                padding: isMobile ? '24px 20px' : '40px 36px',
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 24 : 40, 
                alignItems: 'center',
            }}>

                {/* MOBILE ONLY: heading + video at top */}
                {isMobile && (
                    <>
                        <h2 style={{
                            fontSize: '22px',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 800, 
                            color: '#171b1b', 
                            marginBottom: 0,
                            marginTop: 0,
                            lineHeight: 1.2,
                            width: '100%',
                        }}>
                            Get your perfect smile in four simple steps
                        </h2>

                        <div style={{ 
                            width: '100%',
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: '3px solid #7c3aed',
                            position: 'relative',
                        }}>
                            <img 
                                src="/images/img_screenshot_20240216_122938.png" 
                                alt="Treatment video" 
                                style={{ 
                                    width: '100%', 
                                    height: 200,
                                    objectFit: 'cover',
                                    display: 'block',
                                }} 
                            />
                            <button
                                aria-label="Play video"
                                style={{
                                    position: 'absolute', 
                                    top: '50%', 
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 56, 
                                    height: 56,
                                    backgroundColor: 'rgba(255,255,255,0.25)',
                                    backdropFilter: 'blur(4px)',
                                    border: '2px solid #fff', 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                            >
                                <img 
                                    src="/images/img_polygon_3.svg" 
                                    alt="Play" 
                                    style={{ width: 20, height: 20, marginLeft: 3 }}
                                />
                            </button>
                        </div>
                    </>
                )}

                {/* LEFT: heading (desktop only) + steps grid */}
                <div style={{ flex: isMobile ? 'unset' : '0 0 50%', width: '100%' }}>
                    
                    {/* Heading — desktop only, already shown above on mobile */}
                    {!isMobile && (
                        <h2 style={{
                            fontSize: 'clamp(22px, 3vw, 32px)',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 800, 
                            color: '#171b1b', 
                            marginBottom: 32,
                            marginTop: 0,
                            lineHeight: 1.2,
                        }}>
                            Get your perfect smile in four simple steps
                        </h2>
                    )}

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? 20 : 28,
                    }}>
                        {steps.map((step) => (
                            <div key={step.number} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 48, height: 48, 
                                    backgroundColor: '#c7e0f2',
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'center', 
                                    flexShrink: 0,
                                }}>
                                    <div style={{
                                        width: 36, height: 36, 
                                        backgroundColor: '#fff',
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        justifyContent: 'center', 
                                        fontSize: 18, 
                                        fontWeight: 700, 
                                        color: '#171b1b',
                                    }}>
                                        {step.number}
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ 
                                        fontSize: 14, 
                                        fontWeight: 700, 
                                        color: '#171b1b', 
                                        marginBottom: 4,
                                        marginTop: 0,
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ 
                                        fontSize: 12, 
                                        lineHeight: 1.5, 
                                        color: '#444',
                                        margin: 0,
                                    }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: video — desktop only */}
                {!isMobile && (
                    <div style={{ 
                        flex: 1,
                        borderRadius: 16,
                        overflow: 'hidden',
                        border: '3px solid #7c3aed',
                        position: 'relative',
                    }}>
                        <img 
                            src="/images/img_screenshot_20240216_122938.png" 
                            alt="Treatment video" 
                            style={{ 
                                width: '100%', 
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }} 
                        />
                        <button
                            aria-label="Play video"
                            style={{
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 56, 
                                height: 56,
                                backgroundColor: 'rgba(255,255,255,0.25)',
                                backdropFilter: 'blur(4px)',
                                border: '2px solid #fff', 
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            <img 
                                src="/images/img_polygon_3.svg" 
                                alt="Play" 
                                style={{ width: 20, height: 20, marginLeft: 3 }}
                            />
                        </button>
                    </div>
                )}

            </div>
        </section>
    )
}
// ─── DOCTOR SECTION ───────────────────────────────────────────────────────────

const DoctorSection = () => {
    const width = useWindowWidth()
    const isMobile = width < 768

    return (
        <section style={{ backgroundColor: '#f0f9ff', padding: isMobile ? '0px' : '0px 16px' }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                gap: isMobile ? 0 : 32, 
                maxWidth: 1440, 
                margin: '0 auto',
            }}>

                {/* Image — top on mobile, right on desktop */}
                {isMobile && (
                    <img
                        src="/images/img_rectangle_3022.png"
                        alt="Professional orthodontist"
                        style={{ 
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            objectPosition: 'top',
                            display: 'block',
                        }}
                    />
                )}

                {/* Text content */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: isMobile ? 16 : 32, 
                    justifyContent: 'center',
                    padding: isMobile ? '24px 16px' : undefined,
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '26px' : 'clamp(28px, 4vw, 40px)',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800, 
                        color: '#171b1b',
                        margin: 0,
                    }}>
                        We are Doctor-led, not direct-to-customers
                    </h2>
                    <p style={{ 
                        fontSize: 14, 
                        lineHeight: 1.6, 
                        color: '#171b1b',
                        margin: 0,
                    }}>
                        We don't offer direct-to-customer invisible aligners. We treat you in a Dental clinic with an Orthodontist.
                        Aligners are just the beginning; we ensure comprehensive treatment in over 450+ clinics nationwide.
                    </p>
                    <button
                        style={{
                            padding: '14px 90px', 
                            backgroundColor: '#8f62d4',
                            color: '#fff', 
                            fontSize: 16, 
                            fontWeight: 600,
                            borderRadius: 8, 
                            border: 'none', 
                            cursor: 'pointer',
                            width: isMobile ? '100%' : 'fit-content',  // full width on mobile
                            transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7a4fc1')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#8f62d4')}
                    >
                        Get a Callback
                    </button>
                </div>

                {/* Image — right side on desktop only */}
                {!isMobile && (
                    <img
                        src="/images/img_rectangle_3022.png"
                        alt="Professional orthodontist"
                        style={{ width: '100%' }}
                    />
                )}

            </div>
        </section>
    )
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────

const TestimonialsSection = () => (
    <section style={{ padding: '48px 16px', marginTop: 48 }}>
        <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, textAlign: 'center', color: '#171b1b', marginBottom: 32,
        }}>
            Happy Smilers!
        </h2>
        <img src="/images/img_whistle_happymonials.png" alt="Customer testimonials" style={{ width: '100%' }} />
    </section>
)

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────

const faqItems: FAQItem[] = [
    { question: 'What are Aligners?', answer: 'Aligners are clear, removable orthodontic devices used to straighten teeth. They are custom-made to fit your teeth and gradually shift them into the desired position.' },
    { question: 'How do Aligners work?', answer: 'Aligners work by applying gentle, controlled force to your teeth. You wear a series of aligners, each slightly different, which gradually move your teeth to their ideal position over time.' },
    { question: 'Can any dentist do irregular teeth treatment?', answer: 'While general dentists can provide basic orthodontic care, complex cases are best handled by orthodontists who specialize in teeth alignment and jaw positioning.' },
    { question: 'Are there any restrictions on eating or drinking?', answer: 'You should remove your aligners before eating or drinking anything other than water. This prevents staining and damage to the aligners.' },
    { question: 'How long does the treatment take?', answer: 'Treatment duration varies depending on the complexity of your case. On average, treatment takes 8-18 months, but your orthodontist will provide a personalized timeline after your initial consultation.' },
]

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(4)

    return (
        <section style={{ padding: '48px 16px', marginTop: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 48 }}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: '#8f62d4' }}>
                    Got Questions?
                </h2>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: '#171b1b' }}>
                    We've got answers
                </h2>
            </div>

            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                {faqItems.map((item, i) => (
                    <div key={i} style={{ borderBottom: '2px solid #c8d0d0', padding: '24px 16px' }}>
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                cursor: 'pointer', width: '100%', background: 'none',
                                border: 'none', textAlign: 'left',
                            }}
                        >
                            <span style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: '#000', flex: 1 }}>
                                {item.question}
                            </span>
                            <img
                                src="/images/img_frame_163.svg"
                                alt={openIndex === i ? 'Collapse' : 'Expand'}
                                style={{
                                    width: 32, height: 32, flexShrink: 0,
                                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.3s',
                                }}
                            />
                        </button>
                        {openIndex === i && (
                            <p style={{ paddingTop: 16, fontSize: 14, lineHeight: 1.6, color: '#2f3636' }}>
                                {item.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

// ─── STICKY CTA ───────────────────────────────────────────────────────────────

const StickyCTA = () => {
    const width = useWindowWidth()
    const isMobile = width < 768

    if (isMobile) return null

    return (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            backgroundColor: '#fff', boxShadow: '0px 0px 12px rgba(0,0,0,0.2)',
            padding: '12px 40px', 
            zIndex: 100,
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: 1440,
                margin: '0 auto',
            }}>
                <p style={{ 
                    fontSize: 14, 
                    fontWeight: 600, 
                    color: '#2f3636', 
                    whiteSpace: 'nowrap',
                    margin: 0,
                }}>
                    Ready for your perfect smile?
                </p>

                <div style={{ display: 'flex', gap: 16 }}>
                    <button style={{
                        padding: '12px 24px', 
                        backgroundColor: '#8f62d4',
                        color: '#fff', 
                        fontSize: 14, 
                        fontWeight: 600,
                        borderRadius: 8, 
                        border: 'none', 
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}>
                        Book scan at Home
                    </button>
                    <button style={{
                        padding: '12px 24px', 
                        backgroundColor: '#f6f3fc',
                        color: '#171b1b', 
                        fontSize: 14, 
                        fontWeight: 600,
                        border: '1px solid #c8d0d0', 
                        borderRadius: 8, 
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}>
                        Book scan at Clinic
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
    return (
        <div style={{
            fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            backgroundColor: '#fff',
            color: '#171b1b',
            lineHeight: 1.5,
            overflowX: 'hidden',
            paddingBottom: 120, // space for sticky CTA
        }}>
            <Header />
            <main>
                <HeroSection />
                <FormSection />
                <CloveSection />
                <ScrollingBanner />
                <DreamSection />
                <ResultsSection />
                <WhyWhistleSection />
                <DifferenceSection />
                <ComparisonSection />
                <StepsSection />
                <DoctorSection />
                <TestimonialsSection />
                <FAQSection />
            </main>
            <FooterSection />
            <StickyCTA />
        </div>
    )
}