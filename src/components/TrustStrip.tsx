const items = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v8h-7"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>
      </svg>
    ),
    title: 'Cash on delivery',
    desc: 'Pay when it arrives — across all 64 districts.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/>
      </svg>
    ),
    title: '7-day easy returns',
    desc: 'Not happy? Send it back, no questions asked.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/>
      </svg>
    ),
    title: 'Authentic stock',
    desc: 'Every product checked before dispatch.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
      </svg>
    ),
    title: '24/7 support',
    desc: 'Talk to a real human on WhatsApp anytime.',
  },
];

export default function TrustStrip() {
  return (
    <section className="max-[640px]:hidden" style={{ maxWidth: 1280, margin: '28px auto 0', padding: '0 24px' }}>
      <div className="grid grid-cols-4 max-[800px]:grid-cols-2 max-[480px]:grid-cols-1"
        style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: 18, gap: 14 }}>
        {items.map((item, i) => (
          <div key={item.title}
            className={`flex items-center gap-[14px] px-[14px] py-[6px] ${i > 0 ? 'max-[800px]:border-l-0 border-l border-(--line)' : ''} max-[480px]:border-l-0! max-[480px]:border-t max-[480px]:border-(--line) max-[480px]:pt-[14px]`}
            style={{ borderLeft: i > 0 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--e50)', color: 'var(--e700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{item.title}</h5>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink3)', lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
