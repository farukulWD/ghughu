'use client';
import { useCart } from '@/context/CartContext';
import { Product, CATEGORIES, fmt, star } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ p }: { p: Product }) {
  const { addToCart, toggleWish, wish, showToast } = useCart();
  const [added, setAdded] = useState(false);
  const catName = CATEGORIES.find(c => c.id === p.cat)?.en ?? '';
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const isDataUrl = p.img.startsWith('data:');
  const wished = wish.has(p.id);

  function handleAdd() {
    addToCart(p.id);
    showToast('Added to bag');
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  const tagStyle: React.CSSProperties = {
    fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
    padding: '4px 8px', borderRadius: 4, color: '#fff',
    background: 'var(--e700)',
  };

  return (
    <article style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'transform .18s, box-shadow .18s, border-color .18s' }}
      className="hover:translate-y-[-3px] hover:shadow-(--shadow-md) hover:border-(--g300)">

      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--cream)', overflow: 'hidden' }}>
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease', display: 'block' }}
            className="group-hover:scale-[1.04]" />
        ) : (
          <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover', transition: 'transform .5s ease' }} sizes="(max-width:800px) 50vw, 25vw"
            className="hover:scale-[1.04]" />
        )}

        {/* Tags */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {p.tag && (
            <span style={{ ...tagStyle, background: p.tag.toLowerCase() === 'gold' ? 'var(--g600)' : p.tag.toLowerCase().includes('-') ? 'var(--danger)' : 'var(--e700)', color: p.tag.toLowerCase() === 'gold' ? 'var(--e900)' : '#fff' }}>
              {p.tag}
            </span>
          )}
          {off > 0 && (!p.tag || !p.tag.includes('-')) && (
            <span style={{ ...tagStyle, background: 'var(--danger)' }}>-{off}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={() => toggleWish(p.id)}
          style={{
            position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,.92)', color: wished ? 'var(--danger)' : 'var(--ink3)',
            display: 'grid', placeItems: 'center', backdropFilter: 'blur(4px)',
            border: '1px solid var(--line)', transition: 'color .15s, transform .15s',
            cursor: 'pointer',
          }}
          className="hover:text-(--danger) hover:scale-[1.06]"
          aria-label="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--ink3)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{catName}</div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: '2px 0 0', lineHeight: 1.35, minHeight: 40 }} className="line-clamp-2">{p.name}</h3>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--ink3)' }}>
          <span style={{ color: 'var(--g600)', letterSpacing: 1 }}>{star(p.rating)}</span>
          {p.rating}
          <span style={{ opacity: .6 }}>({p.reviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
          <span className="font-serif" style={{ fontWeight: 700, fontSize: 20, color: 'var(--e800)' }}>{fmt(p.price)}</span>
          {p.old && <span style={{ fontSize: 13, color: 'var(--ink3)', textDecoration: 'line-through' }}>{fmt(p.old)}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button onClick={handleAdd}
            style={{
              flex: 1, background: added ? 'var(--g600)' : 'var(--e700)', color: added ? 'var(--e900)' : '#fff',
              padding: '10px 12px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, border: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background .15s, transform .12s', cursor: 'pointer',
            }}
            className="hover:bg-(--e800) active:translate-y-px">
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Added
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
                </svg>
                Add to bag
              </>
            )}
          </button>
          <Link href={`/product/${p.id}`}
            style={{ width: 40, borderRadius: 10, border: '1px solid var(--line)', color: 'var(--ink2)', display: 'grid', placeItems: 'center', textDecoration: 'none' }}
            className="hover:text-(--e800) hover:border-(--g500)"
            title="View details" aria-label="View details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
