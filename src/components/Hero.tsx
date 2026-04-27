import Image from 'next/image';

export default function Hero() {
  return (
    <section style={{ maxWidth: 1280, margin: '24px auto 0', padding: '0 24px' }}>
      <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/5' }}>
          <Image
            src="/assets/banner.png"
            alt="Ghughu festival banner"
            fill
            priority
            style={{ objectFit: 'cover', display: 'block' }}
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
