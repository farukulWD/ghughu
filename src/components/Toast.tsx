'use client';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div
      style={{
        position: 'fixed', bottom: 22, left: '50%',
        transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`,
        background: 'var(--e800)', color: '#fff',
        padding: '12px 18px', borderRadius: 999, fontSize: 13.5,
        boxShadow: 'var(--shadow-lg)', zIndex: 200,
        opacity: toast ? 1 : 0,
        transition: 'opacity .2s, transform .2s',
        display: 'inline-flex', alignItems: 'center', gap: 10,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        background: 'var(--g500)', color: 'var(--e900)',
        display: 'grid', placeItems: 'center',
        fontWeight: 700, fontSize: 12, flexShrink: 0,
      }}>✓</span>
      <span>{toast?.msg}</span>
    </div>
  );
}
