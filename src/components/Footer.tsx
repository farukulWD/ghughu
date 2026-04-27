export default function Footer() {
  return (
    <footer style={{ marginTop: 80, background: 'var(--e900)', color: 'var(--g100)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <div className="font-bengali" style={{
              width: 46, height: 46, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #E5CC8A, #B8923D 70%)',
              color: 'var(--e900)', display: 'grid', placeItems: 'center',
              fontWeight: 700, fontSize: 22,
            }}>ঘুঘু</div>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, opacity: .75, margin: '0 0 14px' }}>
            An emerald-and-gold marketplace from Bangladesh. We curate everyday goods — sarees, gadgets, beauty, home essentials — and deliver them with care.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              {
                href: 'https://www.facebook.com/profile.php?id=61588818236866',
                label: 'Facebook',
                icon: <path d="M9 8h-3v4h3v8h4v-8h3.6l.4-4h-4V6.5c0-.83.5-1.5 1.5-1.5H17V1h-3a4 4 0 0 0-5 4v3z" fill="currentColor"/>,
                fill: true,
              },
              {
                href: '#',
                label: 'Instagram',
                icon: <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></>,
                fill: false,
              },
              {
                href: '#',
                label: 'WhatsApp',
                icon: <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.6-5.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.2.2-.5.1-1.4-.7-2.4-1.3-3.4-3-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.9 2.4 1 2.5.1.2 1.7 2.6 4.1 3.6 1.4.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" fill="currentColor"/>,
                fill: true,
              },
            ].map(({ href, label, icon, fill }) => (
              <a key={label} href={href} target={href !== '#' ? '_blank' : undefined} rel={href !== '#' ? 'noopener noreferrer' : undefined}
                aria-label={label}
                style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(229,204,138,.3)', display: 'grid', placeItems: 'center' }}
                className="hover:bg-[var(--g600)] hover:text-[var(--e900)] hover:border-transparent transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'}>{icon}</svg>
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: 'Shop',
            links: ['Rechargeable fans', 'Sarees', 'Beauty & skincare', 'Home goods', 'Kids & toys'],
          },
          {
            title: 'Help',
            links: ['Track your order', 'Returns & refunds', 'Shipping', 'Contact us', 'FAQ'],
          },
          {
            title: 'Company',
            links: ['About', 'Sell with us', 'Careers', 'Press', 'Privacy'],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-serif" style={{ color: 'var(--g300)', margin: '0 0 14px', fontSize: 16 }}>{title}</h4>
            {links.map(link => (
              <a key={link} href="#" style={{ display: 'block', color: 'rgba(244,232,200,.7)', padding: '4px 0', fontSize: 13.5 }}
                className="hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(229,204,138,.2)', padding: '18px 24px', maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12.5, color: 'rgba(244,232,200,.6)', flexWrap: 'wrap' }}>
        <div>© 2026 Ghughu Ltd. · House 14, Road 7, Dhanmondi, Dhaka.</div>
        <div>Made with care in Bangladesh · <span className="font-bengali">আপনার প্রয়োজন, আমাদের পরিসেবা</span></div>
      </div>
    </footer>
  );
}
