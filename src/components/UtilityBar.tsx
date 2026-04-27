export default function UtilityBar() {
  return (
    <div className="max-[640px]:hidden" style={{ background: 'var(--e900)', color: 'var(--g100)', fontSize: 12.5, letterSpacing: '.02em' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--g300)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--g500)', boxShadow: '0 0 0 3px rgba(201,162,75,.18)', display: 'inline-block' }} />
          Free delivery on orders over ৳1,500 across Bangladesh
        </div>
        <div style={{ display: 'flex', gap: 22, opacity: .9 }}>
          <a href="#" className="hover:text-white transition-colors">Track order</a>
          <a href="#" className="hover:text-white transition-colors">Help</a>
          <a href="#" className="hover:text-white transition-colors">
            EN&nbsp;·&nbsp;<span className="font-bengali">বাংলা</span>
          </a>
        </div>
      </div>
    </div>
  );
}
