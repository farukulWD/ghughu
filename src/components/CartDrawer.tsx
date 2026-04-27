'use client';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, fmt } from '@/data/products';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, setQty, clearCart, showToast, cartCount } = useCart();
  const ids = Object.keys(cart);
  const sub = ids.reduce((s, id) => {
    const p = PRODUCTS.find(x => x.id === id);
    return s + (p ? p.price * cart[id] : 0);
  }, 0);
  const ship = sub === 0 ? 0 : sub >= 1500 ? 0 : 80;

  function handleCheckout() {
    if (!ids.length) { showToast('Your bag is empty'); return; }
    showToast("Order placed — we'll call to confirm 💚");
    clearCart();
    setTimeout(() => setCartOpen(false), 700);
  }

  return (
    <>
      {/* Scrim */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(14,58,35,.45)',
          backdropFilter: 'blur(2px)',
          zIndex: 90,
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'auto' : 'none',
          transition: 'opacity .25s',
        }}
      />

      {/* Drawer */}
      <aside
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(440px, 100vw)',
          background: 'var(--paper)',
          zIndex: 100,
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .32s cubic-bezier(.2,.8,.2,1)',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
        aria-hidden={!cartOpen}
      >
        {/* Head */}
        <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="font-serif" style={{ margin: 0, fontSize: 22, color: 'var(--e900)', display: 'flex', alignItems: 'baseline', gap: 10 }}>
            Your bag
            <small style={{ fontSize: 13, color: 'var(--ink3)', fontFamily: 'inherit', fontWeight: 500 }}>
              {cartCount === 1 ? '1 item' : `${cartCount} items`}
            </small>
          </h3>
          <button onClick={() => setCartOpen(false)}
            style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--ink2)', background: 'none', border: 'none' }}
            className="hover:bg-[var(--cream)]" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {!ids.length ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--ink3)' }}>
              <div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: '50%', background: 'var(--cream)', display: 'grid', placeItems: 'center', color: 'var(--g600)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
                </svg>
              </div>
              <h4 className="font-serif" style={{ color: 'var(--ink)', margin: '0 0 6px', fontSize: 20 }}>Your bag is empty</h4>
              <p style={{ margin: 0, fontSize: 14 }}>Browse the festive collection and add a few favourites.</p>
            </div>
          ) : (
            ids.map(id => {
              const p = PRODUCTS.find(x => x.id === id);
              if (!p) return null;
              const q = cart[id];
              const isDataUrl = p.img.startsWith('data:');
              return (
                <div key={id} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 14, padding: '14px 22px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
                  {isDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.img} alt={p.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--cream)' }} />
                  ) : (
                    <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 10, border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--cream)', flexShrink: 0 }}>
                      <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="72px" />
                    </div>
                  )}
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, lineHeight: 1.3 }} className="line-clamp-2">{p.name}</h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--ink3)' }}>
                      <span style={{ color: 'var(--e700)', fontWeight: 600 }}>{fmt(p.price)}</span>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 999, overflow: 'hidden', marginTop: 6, background: '#fff' }}>
                      <button onClick={() => setQty(id, q - 1)} style={{ width: 26, height: 26, display: 'grid', placeItems: 'center', color: 'var(--e700)', fontWeight: 700, background: 'none', border: 'none' }}
                        className="hover:bg-[var(--e50)]">−</button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600, fontSize: 13 }}>{q}</span>
                      <button onClick={() => setQty(id, q + 1)} style={{ width: 26, height: 26, display: 'grid', placeItems: 'center', color: 'var(--e700)', fontWeight: 700, background: 'none', border: 'none' }}
                        className="hover:bg-[var(--e50)]">+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <span className="font-serif" style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>{fmt(p.price * q)}</span>
                    <button onClick={() => removeFromCart(id)} style={{ color: 'var(--ink3)', fontSize: 12, background: 'none', border: 'none' }}
                      className="hover:text-[var(--danger)]">Remove</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--line)', padding: '18px 22px 22px', background: 'var(--cream2)' }}>
          <div style={{ display: 'grid', gap: 8, fontSize: 13.5, color: 'var(--ink2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span><span>{fmt(sub)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span><span>{ship === 0 ? (sub === 0 ? '—' : 'Free') : fmt(ship)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 12, borderTop: '1px dashed var(--line)', fontSize: 16, color: 'var(--ink)', fontWeight: 600 }}>
              <span>Total</span>
              <span className="font-serif" style={{ fontSize: 22, color: 'var(--e800)' }}>{fmt(sub + ship)}</span>
            </div>
          </div>
          <button onClick={handleCheckout}
            style={{
              marginTop: 14, width: '100%',
              background: 'linear-gradient(180deg, var(--g500), var(--g600))',
              color: 'var(--e900)', padding: 14, borderRadius: 12,
              fontWeight: 700, fontSize: 14.5, border: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'filter .15s, transform .12s', cursor: 'pointer',
            }}
            className="hover:brightness-105 active:translate-y-px">
            Checkout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </button>
          <p style={{ fontSize: 11.5, color: 'var(--ink3)', textAlign: 'center', margin: '10px 0 0' }}>Secure checkout · Cash on delivery available</p>
        </div>
      </aside>
    </>
  );
}
