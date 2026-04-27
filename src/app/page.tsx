import Header from '@/components/Header';
import UtilityBar from '@/components/UtilityBar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import CategoryGrid from '@/components/CategoryGrid';
import FeatureBanners from '@/components/FeatureBanners';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/data/products';

const sectionClass = "max-w-[1280px] mx-auto pt-[56px] max-[640px]:pt-[36px] px-[24px] max-[640px]:px-4";
const headClass = "flex justify-between items-end mb-[22px] gap-4 flex-wrap";

export default function StorePage() {
  return (
    <>
      <UtilityBar />
      <Header />
      <Hero />
      <TrustStrip />

      {/* Categories */}
      <section className={sectionClass}>
        <div className={headClass}>
          <div>
            <h2 className="font-serif" style={{ fontWeight: 700, fontSize: 30, color: 'var(--e900)', margin: 0, letterSpacing: '-.01em' }}>Shop by category</h2>
            <div style={{ color: 'var(--ink3)', fontSize: 14, marginTop: 4 }}>The same five from our banner — and a few we love.</div>
          </div>
          <a href="#" style={{ color: 'var(--e700)', fontWeight: 600, fontSize: 14, borderBottom: '1px solid transparent', paddingBottom: 1 }}
            className="hover:border-(--g500)">See all categories →</a>
        </div>
        <CategoryGrid />
      </section>

      {/* Feature banners */}
      <section className={sectionClass}>
        <FeatureBanners />
      </section>

      {/* Featured products */}
      <section id="shop" className={sectionClass}>
        <div className={headClass}>
          <div>
            <h2 className="font-serif" style={{ fontWeight: 700, fontSize: 30, color: 'var(--e900)', margin: 0, letterSpacing: '-.01em' }}>Featured this week</h2>
            <div style={{ color: 'var(--ink3)', fontSize: 14, marginTop: 4 }}>Hand-picked by our team — fresh stock, festive prices.</div>
          </div>
          <a href="#" style={{ color: 'var(--e700)', fontWeight: 600, fontSize: 14 }}>View all →</a>
        </div>
        <ProductGrid products={PRODUCTS.slice(0, 4)} />
      </section>

      {/* Similar */}
      <section className={sectionClass}>
        <div className={headClass}>
          <div>
            <h2 className="font-serif" style={{ fontWeight: 700, fontSize: 30, color: 'var(--e900)', margin: 0, letterSpacing: '-.01em' }}>You might also like</h2>
            <div style={{ color: 'var(--ink3)', fontSize: 14, marginTop: 4 }}>Similar products other shoppers loved.</div>
          </div>
          <a href="#" style={{ color: 'var(--e700)', fontWeight: 600, fontSize: 14 }}>More like these →</a>
        </div>
        <ProductGrid products={PRODUCTS.slice(4, 8)} />
      </section>

      {/* Women's fashion */}
      <section className={sectionClass}>
        <div className={headClass}>
          <div>
            <h2 className="font-serif" style={{ fontWeight: 700, fontSize: 30, color: 'var(--e900)', margin: 0, letterSpacing: '-.01em' }}>Women&apos;s fashion</h2>
            <div className="font-bengali" style={{ color: 'var(--ink3)', fontSize: 14, marginTop: 4 }}>নারীদের প্রয়োজনীয় দ্রব্য</div>
          </div>
          <a href="#" style={{ color: 'var(--e700)', fontWeight: 600, fontSize: 14 }}>Shop the edit →</a>
        </div>
        <ProductGrid products={PRODUCTS.slice(8, 12)} />
      </section>

      <Footer />
    </>
  );
}
