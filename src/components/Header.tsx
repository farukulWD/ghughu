'use client';
import { useCart } from '@/context/CartContext';
import { useEffect, useRef } from 'react';

export default function Header() {
  const { cartCount, wish, setCartOpen } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top row */}
      <div
        className="grid grid-cols-[auto_1fr_auto] max-[640px]:grid-cols-[auto_auto] gap-[28px] max-[640px]:gap-[12px]"
        style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 24px', alignItems: 'center' }}
      >
        {/* Brand */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, var(--g300), var(--g600) 70%, var(--g700))',
            color: 'var(--e900)', display: 'grid', placeItems: 'center',
            fontWeight: 700, fontSize: 22, flexShrink: 0,
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.35), 0 2px 8px rgba(156,122,44,.35)',
          }} className="font-bengali">ঘুঘু</div>
          <div className="max-[640px]:hidden" style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 11.5, color: 'var(--ink3)', letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 4 }}>
              Your Need · Our Service
            </div>
          </div>
        </a>

        {/* Search — hidden on mobile, shown in row below */}
        <label
          className="max-[640px]:hidden focus-within:border-(--g500) focus-within:shadow-[0_0_0_4px_rgba(201,162,75,.18)] focus-within:bg-white"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--cream)', border: '1px solid var(--line)',
            borderRadius: 999, padding: '10px 16px',
            transition: 'border-color .15s, box-shadow .15s',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink3)', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            placeholder="Search sarees, fans, lamps, skincare…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14.5, color: 'var(--ink)', minWidth: 0 }}
          />
          <span className="max-[900px]:hidden" style={{ fontSize: 11, color: 'var(--ink3)', border: '1px solid var(--line)', borderRadius: 6, padding: '2px 6px', background: '#fff', flexShrink: 0 }}>⌘K</span>
        </label>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button title="Account" style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--e800)', transition: 'background .15s', background: 'none', border: 'none' }}
            className="hover:bg-(--e50)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
            </svg>
          </button>
          <button title="Wishlist" style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--e800)', position: 'relative', transition: 'background .15s', background: 'none', border: 'none' }}
            className="hover:bg-(--e50)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span style={{ position: 'absolute', top: 4, right: 4, background: 'var(--g600)', color: '#fff', fontSize: 10.5, fontWeight: 700, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, display: 'grid', placeItems: 'center', border: '2px solid var(--paper)' }}>
              {wish.size}
            </span>
          </button>
          <button title="Cart" onClick={() => setCartOpen(true)}
            style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--e800)', position: 'relative', transition: 'background .15s', background: 'none', border: 'none' }}
            className="hover:bg-(--e50)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
            </svg>
            <span style={{ position: 'absolute', top: 4, right: 4, background: 'var(--g600)', color: '#fff', fontSize: 10.5, fontWeight: 700, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, display: 'grid', placeItems: 'center', border: '2px solid var(--paper)' }}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="hidden max-[640px]:block" style={{ padding: '0 16px 12px' }}>
        <label style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--cream)', border: '1px solid var(--line)',
          borderRadius: 999, padding: '9px 14px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink3)', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input placeholder="Search…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'var(--ink)', minWidth: 0 }} />
        </label>
      </div>

      {/* Category bar */}
      <nav style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 28, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'All', active: true },
            { label: 'Fans' },
            { label: 'Lamps' },
            { label: 'Sarees' },
            { label: "Women's Care" },
            { label: 'Home Goods' },
            { label: 'Beauty' },
            { label: 'Kids & Toys' },
          ].map((item) => (
            <a key={item.label} href="#"
              style={{
                padding: '12px 0', fontSize: 13.5,
                color: item.active ? 'var(--e800)' : 'var(--ink2)',
                whiteSpace: 'nowrap',
                borderBottom: item.active ? '2px solid var(--g500)' : '2px solid transparent',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontWeight: item.active ? 600 : 400,
                transition: 'color .15s',
              }}
              className="hover:text-(--e800)">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
