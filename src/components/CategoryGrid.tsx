import { CATEGORIES, ICONS } from '@/data/products';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-5 max-[900px]:grid-cols-3 max-[500px]:grid-cols-2 gap-[14px]">
      {CATEGORIES.map((cat) => (
        <div key={cat.id}
          style={{
            background: '#fff', border: '1px solid var(--line)', borderRadius: 14,
            padding: '22px 16px', textAlign: 'center',
            transition: 'transform .18s, box-shadow .18s, border-color .18s',
            cursor: 'pointer',
          }}
          className="hover:translate-y-[-3px] hover:shadow-(--shadow-md) hover:border-(--g300)">
          <div style={{
            width: 56, height: 56, margin: '0 auto 10px', borderRadius: '50%',
            display: 'grid', placeItems: 'center',
            background: 'radial-gradient(circle at 30% 25%, var(--e50), #fff 70%)',
            color: 'var(--e700)', border: '1px solid var(--line)',
          }} dangerouslySetInnerHTML={{ __html: ICONS[cat.icon] }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>{cat.en}</div>
          <div className="font-bengali" style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>{cat.bn}</div>
        </div>
      ))}
    </div>
  );
}
