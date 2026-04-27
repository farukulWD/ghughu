'use client';
import { use, useState } from 'react';
import { PRODUCTS, CATEGORIES, fmt, star, tintedImg } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import UtilityBar from '@/components/UtilityBar';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const p = PRODUCTS.find(x => x.id === id) ?? PRODUCTS[0];
  const cat = CATEGORIES.find(c => c.id === p.cat);
  const { addToCart, toggleWish, wish, showToast, setCartOpen } = useCart();

  const gallery = [p.img, tintedImg(p.img, 20), tintedImg(p.img, -20), tintedImg(p.img, 40)];
  const [activeThumb, setActiveThumb] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(2);
  const [activeTab, setActiveTab] = useState<'desc' | 'spec' | 'rev'>('desc');

  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const wished = wish.has(p.id);
  const sizeOptions = (p.cat === 'sarees' || p.cat === 'women') ? ['XS', 'S', 'M', 'L', 'XL'] : null;
  const colorOptions = ['#1F5D3A', '#C9A24B', '#0E3A23', '#B23A2C'];

  const bullets = p.bullets ?? ['Quality-checked', 'Ghughu warranty', 'Cash on delivery'];
  const specs: Record<string, string> = {
    'SKU': p.id.toUpperCase() + '-GH',
    'Category': cat?.en ?? '',
    'In stock': 'Yes',
    'Dispatch': 'Within 24 hours',
    'Country of origin': 'Bangladesh',
    'Warranty': p.cat === 'fans' ? '12 months' : '7-day return',
  };
  const reviews = [
    { name: 'Nusrat A.', when: '2 weeks ago', text: 'Exactly as pictured. Packaging was lovely — felt like a gift!', rating: 5 },
    { name: 'Imran H.',  when: '1 month ago', text: 'Quality is solid for the price. Delivery to Sylhet took 3 days.', rating: 4 },
    { name: 'Sadia R.',  when: '2 months ago', text: 'Bought one for my mother and one for myself. Both happy.', rating: 5 },
  ];

  const similar = [
    ...PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat),
    ...PRODUCTS.filter(x => x.id !== p.id && x.cat !== p.cat),
  ].slice(0, 4);

  const isDataUrl = (src: string) => src.startsWith('data:');

  function handleAdd() {
    addToCart(p.id, qty);
    showToast(`Added ${qty} × ${p.name.split('—')[0].trim()} to bag`);
  }

  function handleBuyNow() {
    addToCart(p.id, qty);
    showToast("Order placed — we'll call to confirm 💚");
    setCartOpen(true);
  }

  return (
    <>
      <UtilityBar />
      <Header />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 24px 0', fontSize: 13, color: 'var(--ink3)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="hover:text-(--e800) transition-colors">Home</Link>
        <span style={{ opacity: .4 }}>/</span>
        <Link href="/" className="hover:text-(--e800) transition-colors">{cat?.en ?? 'Shop'}</Link>
        <span style={{ opacity: .4 }}>/</span>
        <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{p.name.split('—')[0].trim()}</span>
      </div>

      {/* PDP layout */}
      <main
        className="grid grid-cols-[1.1fr_1fr] max-[900px]:grid-cols-1 gap-[48px] max-[900px]:gap-[32px]"
        style={{ maxWidth: 1280, margin: '0 auto', padding: 24 }}>

        {/* Gallery */}
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16 }}>
          {/* Thumbs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {gallery.map((src, i) => (
              <button key={i} onClick={() => setActiveThumb(i)}
                style={{
                  width: 80, height: 80, borderRadius: 10, padding: 0, overflow: 'hidden',
                  border: activeThumb === i ? '2px solid var(--e700)' : '1px solid var(--line)',
                  background: '#fff', cursor: 'pointer',
                  boxShadow: activeThumb === i ? '0 0 0 2px rgba(31,93,58,.15)' : 'none',
                  transition: 'border-color .15s',
                  flexShrink: 0, position: 'relative',
                }}>
                {isDataUrl(src) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`thumb ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image src={src} alt={`thumb ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="80px" />
                )}
              </button>
            ))}
          </div>

          {/* Main image */}
          <div onClick={() => setZoomed(!zoomed)}
            style={{
              aspectRatio: '1/1', background: '#fff', border: '1px solid var(--line)',
              borderRadius: 18, overflow: 'hidden', position: 'relative',
              boxShadow: 'var(--shadow-md)',
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
            }}>
            {p.tag && (
              <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 1, background: 'var(--e700)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 4 }}>
                {p.tag}
              </div>
            )}
            {isDataUrl(gallery[activeThumb]) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[activeThumb]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: zoomed ? 'scale(1.4)' : 'scale(1)', transition: 'transform .3s' }} />
            ) : (
              <Image src={gallery[activeThumb]} alt={p.name} fill style={{ objectFit: 'cover', transform: zoomed ? 'scale(1.4)' : 'scale(1)', transition: 'transform .3s' }} sizes="(max-width:900px) 100vw, 50vw" />
            )}
          </div>
        </div>

        {/* Info column */}
        <div>
          <div style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--g700)', fontWeight: 600 }}>
            {cat?.en ?? ''}{cat?.bn ? <> · <span className="font-bengali">{cat.bn}</span></> : ''}
          </div>
          <h1 className="font-serif" style={{ fontWeight: 700, fontSize: 34, lineHeight: 1.15, color: 'var(--e900)', margin: '8px 0 14px', letterSpacing: '-.01em' }}>{p.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: 'var(--ink2)' }}>
              <span style={{ color: 'var(--g600)', letterSpacing: 1, fontSize: 15 }}>{star(p.rating)}</span>
              {p.rating}
              <span style={{ color: 'var(--ink3)' }}>({p.reviews} reviews)</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--e700)', fontSize: 13, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--e600)', display: 'inline-block' }} />
              In stock — ships in 24h
            </span>
          </div>

          {/* Price block */}
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
            <span className="font-serif" style={{ fontWeight: 700, fontSize: 36, color: 'var(--e800)' }}>{fmt(p.price)}</span>
            {p.old && <>
              <span style={{ fontSize: 16, color: 'var(--ink3)', textDecoration: 'line-through' }}>{fmt(p.old)}</span>
              <span style={{ background: 'var(--g100)', color: 'var(--g700)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Save {off}%</span>
            </>}
            <span style={{ fontSize: 12, color: 'var(--ink3)', marginLeft: 'auto' }}>VAT included</span>
          </div>

          <p style={{ margin: '22px 0 6px', color: 'var(--ink2)', fontSize: 15, lineHeight: 1.65 }}>{p.desc}</p>

          {/* Color */}
          <div style={{ margin: '22px 0 0' }}>
            <div style={{ fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink3)', fontWeight: 600, marginBottom: 8 }}>Color</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {colorOptions.map((c, i) => (
                <button key={i} onClick={() => setActiveColor(i)} aria-label={`Color ${i + 1}`}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--line)',
                    cursor: 'pointer', background: c,
                    boxShadow: activeColor === i ? `inset 0 0 0 3px #fff, 0 0 0 2px var(--e700)` : 'inset 0 0 0 3px #fff',
                    transition: 'transform .12s, box-shadow .15s',
                  }} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          {sizeOptions && (
            <div style={{ margin: '22px 0 0' }}>
              <div style={{ fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink3)', fontWeight: 600, marginBottom: 8 }}>Size</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {sizeOptions.map((s, i) => (
                  <button key={s} onClick={() => setActiveSize(i)}
                    style={{
                      minWidth: 44, padding: '8px 14px', borderRadius: 8,
                      border: activeSize === i ? '1px solid var(--e700)' : '1px solid var(--line)',
                      background: activeSize === i ? 'var(--e50)' : '#fff',
                      fontSize: 13.5, fontWeight: activeSize === i ? 600 : 500,
                      color: activeSize === i ? 'var(--e800)' : 'inherit',
                      cursor: 'pointer',
                    }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'stretch' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="decrease"
                style={{ width: 42, height: 50, display: 'grid', placeItems: 'center', color: 'var(--e700)', fontWeight: 700, fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}
                className="hover:bg-(--e50)">−</button>
              <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 600, fontSize: 15 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="increase"
                style={{ width: 42, height: 50, display: 'grid', placeItems: 'center', color: 'var(--e700)', fontWeight: 700, fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}
                className="hover:bg-(--e50)">+</button>
            </div>
            <button onClick={handleAdd}
              style={{ background: 'var(--e700)', color: '#fff', borderRadius: 12, padding: '0 24px', fontWeight: 600, fontSize: 15, border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background .15s, transform .12s', cursor: 'pointer' }}
              className="hover:bg-(--e800) active:translate-y-px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
              </svg>
              Add to bag
            </button>
            <button onClick={() => toggleWish(p.id)} aria-label="Wishlist"
              style={{ width: 50, borderRadius: 12, border: wished ? '1px solid var(--danger)' : '1px solid var(--line)', background: '#fff', color: wished ? 'var(--danger)' : 'var(--ink2)', display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'color .15s, border-color .15s' }}
              className="hover:text-(--danger) hover:border-(--danger)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <button onClick={handleBuyNow}
            style={{ marginTop: 10, width: '100%', background: 'linear-gradient(180deg, var(--g500), var(--g600))', color: 'var(--e900)', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 14.5, border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'filter .15s', cursor: 'pointer' }}
            className="hover:brightness-105">
            Buy now — Cash on Delivery
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>

          {/* Trust list */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px dashed var(--line)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 22px' }}>
            {[
              { title: 'Free delivery', desc: 'On orders over ৳1,500. Inside Dhaka in 24h.', icon: <><rect x="1" y="6" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v8h-7"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></> },
              { title: '7-day returns', desc: 'No questions asked. We pick up.', icon: <><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></> },
              { title: 'Authentic stock', desc: 'Every product checked before dispatch.', icon: <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/> },
              { title: 'WhatsApp support', desc: 'Real humans, 9am–11pm daily.', icon: <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/> },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 13 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--e50)', color: 'var(--e700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: 13.5, color: 'var(--ink)', fontWeight: 600 }}>{item.title}</h5>
                  <p style={{ margin: '2px 0 0', color: 'var(--ink3)', fontSize: 12.5, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Tabs */}
      <section style={{ maxWidth: 1280, margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 28, borderBottom: '1px solid var(--line)' }}>
          {([['desc', 'Description'], ['spec', 'Specifications'], ['rev', `Reviews · ${p.reviews}`]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              style={{ padding: '14px 0', fontSize: 14.5, color: activeTab === key ? 'var(--e800)' : 'var(--ink3)', fontWeight: activeTab === key ? 600 : 500, borderBottom: activeTab === key ? '2px solid var(--g500)' : '2px solid transparent', background: 'none', border: 'none', cursor: 'pointer', transition: 'color .15s' }}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'desc' && (
          <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-[28px]" style={{ padding: '26px 0' }}>
            <div>
              <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.7, color: 'var(--ink2)' }}>{p.desc}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--ink3)' }}>Each Ghughu order is hand-checked before it leaves our Dhanmondi fulfilment centre. If anything looks off, we make it right — that&apos;s the promise.</p>
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: 18, margin: '0 0 10px', color: 'var(--e900)' }}>What&apos;s in the box</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {bullets.map(b => (
                  <li key={b} style={{ padding: '10px 0', borderBottom: '1px dashed var(--line)', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink2)' }}>
                    <span style={{ color: 'var(--e700)', fontWeight: 700, flexShrink: 0 }}>✓</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'spec' && (
          <div style={{ padding: '26px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {Object.entries(specs).map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ padding: '10px 0', borderBottom: '1px dashed var(--line)', fontSize: 13.5, color: 'var(--ink3)', width: '40%' }}>{k}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px dashed var(--line)', fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rev' && (
          <div style={{ padding: '26px 0', display: 'grid', gap: 16 }}>
            {reviews.map(r => (
              <div key={r.name} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--e700)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <h6 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{r.name}</h6>
                    <div style={{ color: 'var(--g600)', letterSpacing: 1, fontSize: 12 }}>{star(r.rating)}</div>
                  </div>
                  <div style={{ color: 'var(--ink3)', fontSize: 12, marginLeft: 'auto' }}>{r.when}</div>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Similar products */}
      <section style={{ maxWidth: 1280, margin: '56px auto 0', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 className="font-serif" style={{ fontWeight: 700, fontSize: 28, color: 'var(--e900)', margin: 0 }}>You might also like</h2>
            <div style={{ color: 'var(--ink3)', fontSize: 14, marginTop: 4 }}>More from the same category and price range.</div>
          </div>
          <Link href="/" style={{ color: 'var(--e700)', fontWeight: 600, fontSize: 14 }}>Back to store →</Link>
        </div>
        <div className="grid grid-cols-4 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[480px]:grid-cols-1 gap-[22px]">
          {similar.map(s => (
            <Link key={s.id} href={`/product/${s.id}`}
              style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', transition: 'transform .18s, box-shadow .18s, border-color .18s' }}
              className="hover:translate-y-[-3px] hover:shadow-(--shadow-md) hover:border-(--g300)">
              <div style={{ aspectRatio: '1/1', background: 'var(--cream)', overflow: 'hidden', position: 'relative' }}>
                {isDataUrl(s.img) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image src={s.img} alt={s.name} fill style={{ objectFit: 'cover' }} sizes="25vw" />
                )}
              </div>
              <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--ink3)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{CATEGORIES.find(c => c.id === s.cat)?.en}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: '2px 0 0', lineHeight: 1.35, minHeight: 40 }} className="line-clamp-2">{s.name}</h3>
                <span className="font-serif" style={{ fontWeight: 700, fontSize: 18, color: 'var(--e800)', marginTop: 'auto' }}>{fmt(s.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ background: 'var(--e900)', color: 'var(--g100)' }}>
        <div style={{ padding: '22px 24px', maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12.5, color: 'rgba(244,232,200,.6)', flexWrap: 'wrap' }}>
          <div>© 2026 Ghughu Ltd. · Made with care in Bangladesh</div>
          <div className="font-bengali">আপনার প্রয়োজন, আমাদের পরিসেবা</div>
        </div>
      </footer>
    </>
  );
}
