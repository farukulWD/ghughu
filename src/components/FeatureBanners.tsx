export default function FeatureBanners() {
  return (
    <div className="grid grid-cols-[1.4fr_1fr] max-[800px]:grid-cols-1 gap-[18px]" style={{ marginTop: 14 }}>
      {/* Emerald — fans */}
      <div style={{
        borderRadius: 18, padding: 30, minHeight: 200, color: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, var(--e800), var(--e700) 60%, var(--e600))',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -40, bottom: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', opacity: .85 }}>Rechargeable Fans</div>
        <h3 className="font-serif" style={{ fontWeight: 700, fontSize: 28, margin: '8px 0', lineHeight: 1.1, maxWidth: '80%' }}>Stay cool through the load-shed.</h3>
        <p style={{ margin: 0, opacity: .85, maxWidth: '80%' }}>Up to 12-hour backup, USB-C charging, and a quiet motor that won&apos;t wake the baby.</p>
        <a href="#shop" style={{
          alignSelf: 'flex-start', marginTop: 14,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 20px', borderRadius: 999, fontWeight: 600, fontSize: 14,
          background: 'linear-gradient(180deg, var(--g500), var(--g600))',
          color: 'var(--e900)',
          boxShadow: '0 6px 16px rgba(201,162,75,.35)',
          transition: 'filter .12s',
        }} className="hover:brightness-105">
          Shop fans
        </a>
      </div>

      {/* Gold — sarees */}
      <div style={{
        borderRadius: 18, padding: 30, minHeight: 200,
        color: 'var(--e900)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #b8923d, #c9a24b 60%, #e5cc8a)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -40, bottom: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', opacity: .85 }}>Festive Saree Drop</div>
        <h3 className="font-serif" style={{ fontWeight: 700, fontSize: 28, margin: '8px 0', lineHeight: 1.1, maxWidth: '80%' }}>Emerald silk, hand-finished.</h3>
        <p style={{ margin: 0, opacity: .85, maxWidth: '80%' }}>Limited stock from our Tangail weavers.</p>
        <a href="#" style={{
          alignSelf: 'flex-start', marginTop: 14,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 20px', borderRadius: 999, fontWeight: 600, fontSize: 14,
          background: 'var(--e800)', color: '#fff',
          boxShadow: '0 6px 16px rgba(31,93,58,.25)',
          transition: 'background .15s',
        }} className="hover:bg-(--e900)">
          Browse sarees
        </a>
      </div>
    </div>
  );
}
