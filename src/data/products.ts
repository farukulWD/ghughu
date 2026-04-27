export type Category = {
  id: string;
  en: string;
  bn: string;
  icon: keyof typeof ICONS;
};

export type Product = {
  id: string;
  cat: string;
  name: string;
  price: number;
  old?: number;
  rating: number;
  reviews: number;
  img: string;
  tag?: string;
  desc?: string;
  bullets?: string[];
};

function placeholder(
  kind: string,
  hue: number,
  label: string
): string {
  const bg = `oklch(95% 0.03 ${hue})`;
  const bg2 = `oklch(88% 0.05 ${hue})`;
  const ink = `oklch(35% 0.06 ${hue})`;
  const accent = `oklch(60% 0.10 ${hue})`;
  const glyphs: Record<string, string> = {
    fan: `<circle cx='200' cy='200' r='90' fill='none' stroke='${ink}' stroke-width='3'/>
      <g fill='${accent}' opacity='.85'>
        <ellipse cx='200' cy='140' rx='28' ry='55'/>
        <ellipse cx='260' cy='200' rx='55' ry='28'/>
        <ellipse cx='200' cy='260' rx='28' ry='55'/>
        <ellipse cx='140' cy='200' rx='55' ry='28'/>
      </g>
      <circle cx='200' cy='200' r='16' fill='${ink}'/>
      <rect x='185' y='290' width='30' height='40' rx='4' fill='${ink}'/>
      <rect x='160' y='328' width='80' height='10' rx='3' fill='${ink}'/>`,
    lamp: `<path d='M150 110 L250 110 L270 190 L130 190 Z' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <rect x='195' y='190' width='10' height='110' fill='${ink}'/>
      <ellipse cx='200' cy='305' rx='55' ry='10' fill='${ink}'/>
      <circle cx='200' cy='90' r='10' fill='${accent}' opacity='.5'/>`,
    saree: `<path d='M120 110 Q200 90 280 110 L300 320 Q200 340 100 320 Z' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <path d='M130 130 Q200 115 270 130' stroke='${ink}' stroke-width='2' fill='none' opacity='.5'/>
      <path d='M140 180 Q200 165 260 180' stroke='${ink}' stroke-width='2' fill='none' opacity='.5'/>
      <path d='M150 230 Q200 215 250 230' stroke='${ink}' stroke-width='2' fill='none' opacity='.5'/>`,
    lotion: `<rect x='160' y='130' width='80' height='30' rx='4' fill='${ink}'/>
      <rect x='150' y='160' width='100' height='160' rx='14' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <rect x='170' y='220' width='60' height='40' rx='4' fill='${bg}' opacity='.7'/>
      <rect x='195' y='90' width='10' height='40' fill='${ink}'/>`,
    teddy: `<circle cx='150' cy='130' r='28' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <circle cx='250' cy='130' r='28' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <circle cx='200' cy='180' r='70' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <ellipse cx='200' cy='270' rx='80' ry='55' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <circle cx='180' cy='170' r='5' fill='${ink}'/>
      <circle cx='220' cy='170' r='5' fill='${ink}'/>
      <ellipse cx='200' cy='195' rx='10' ry='6' fill='${ink}' opacity='.7'/>
      <path d='M190 205 Q200 215 210 205' stroke='${ink}' stroke-width='2' fill='none'/>`,
    earrings: `<g stroke='${ink}' stroke-width='2.5' fill='none'>
        <path d='M150 110 Q150 130 160 140'/>
        <path d='M250 110 Q250 130 240 140'/>
      </g>
      <circle cx='160' cy='180' r='30' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <circle cx='240' cy='180' r='30' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <circle cx='160' cy='240' r='10' fill='${ink}'/>
      <circle cx='240' cy='240' r='10' fill='${ink}'/>`,
    threepiece: `<path d='M140 110 L200 90 L260 110 L280 200 L260 210 L260 320 L140 320 L140 210 L120 200 Z' fill='${accent}' stroke='${ink}' stroke-width='3'/>
      <path d='M200 90 L200 320' stroke='${ink}' stroke-width='1.5' opacity='.4'/>
      <circle cx='200' cy='150' r='5' fill='${ink}' opacity='.6'/>
      <circle cx='200' cy='200' r='5' fill='${ink}' opacity='.6'/>
      <circle cx='200' cy='250' r='5' fill='${ink}' opacity='.6'/>`,
  };
  const glyph = glyphs[kind] || '';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
    <defs><radialGradient id='g' cx='50%' cy='40%' r='70%'>
      <stop offset='0%' stop-color='${bg}'/><stop offset='100%' stop-color='${bg2}'/>
    </radialGradient></defs>
    <rect width='400' height='400' fill='url(#g)'/>
    ${glyph}
    <text x='50%' y='370' text-anchor='middle' font-family='ui-sans-serif,system-ui,sans-serif'
          font-size='12' fill='${ink}' opacity='.55' letter-spacing='2'>${label.toUpperCase()}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export const ICONS = {
  fan: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2a4 4 0 0 0 0 8 4 4 0 0 1 0-8zM2 12a4 4 0 0 0 8 0 4 4 0 0 1-8 0zM12 22a4 4 0 0 1 0-8 4 4 0 0 0 0 8zM22 12a4 4 0 0 1-8 0 4 4 0 0 0 8 0z"/></svg>',
  lamp: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6l3 8H6z"/><path d="M12 10v8"/><path d="M9 22h6"/></svg>',
  saree: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12l-2 4 2 12H6l2-12-2-4z"/><path d="M9 4l3 5 3-5"/></svg>',
  lotion: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6v3H9z"/><path d="M7 8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M10 12h4"/></svg>',
  bear: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="7"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><path d="M10 16c.7.7 1.3 1 2 1s1.3-.3 2-1"/></svg>',
} as const;

export const CATEGORIES: Category[] = [
  { id: 'fans',   en: 'Rechargeable Fans', bn: 'রিচার্জেবল ফ্যান', icon: 'fan' },
  { id: 'lamps',  en: 'Shokher Lights',    bn: 'শখের লাইট',         icon: 'lamp' },
  { id: 'sarees', en: 'Sarees & Fashion',  bn: 'শাড়ি ও পোশাক',    icon: 'saree' },
  { id: 'women',  en: "Women's Care",      bn: 'নারীদের প্রয়োজনীয়', icon: 'lotion' },
  { id: 'home',   en: 'Home Essentials',   bn: 'বাসাবাড়ির জিনিস',  icon: 'bear' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', cat: 'fans',  name: 'M11 Mini Handheld Fan — 4000mAh, Variable Speed', price: 1290, old: 1690, rating: 4.7, reviews: 128, img: '/assets/product-fan-m11.png',  tag: 'Bestseller',
    desc: 'A pocket-sized cooling companion with a 4000mAh battery, three speed modes, and a soft-touch body. Whisper-quiet motor, USB-C charging, and 8+ hours of breeze on a single charge.',
    bullets: ['4000mAh rechargeable battery', 'USB-C fast charge (2 hrs)', '3 speeds — soft, breezy, gale', 'Detachable lanyard included', '12-month warranty'] },
  { id: 'p2', cat: 'lamps', name: 'Mint LED Desk Lamp — Eye-care, USB Rechargeable', price: 990, old: 1350, rating: 4.6, reviews: 84, img: '/assets/product-lamp.png', tag: 'New',
    desc: 'Gentle, flicker-free LED with three warmth tones for late-night reading. Folds flat for travel and runs 6 hours on a charge.',
    bullets: ['3 color temperatures', 'Stepless dimming', '1800mAh built-in battery', 'Folds flat — travel ready', 'Touch controls'] },
  { id: 'p3', cat: 'fans',  name: 'Fresh Fan N12 — Hand-Held with Stand & Charger', price: 850, old: 1100, rating: 4.4, reviews: 56, img: '/assets/product-fan-n12.png', tag: '-23%',
    desc: 'Use it handheld, on the desk, or hang it from the bunk — the N12 ships with its own kickstand and charger.',
    bullets: ['Detachable kickstand', '3000mAh battery', 'Quiet brushless motor', 'Wall charger included'] },
  { id: 'p4', cat: 'fans',  name: 'M11 Pro Cooling Fan — Soft Pastel Box Edition', price: 1390, old: 1790, rating: 4.8, reviews: 211, img: '/assets/product-fan-m11-2.png', tag: 'Hot',
    desc: 'Limited pastel-box edition of our bestselling M11 — same powerful airflow, softer palette.',
    bullets: ['4000mAh battery', 'Pastel gift box', 'USB-C fast charge', '8+ hour runtime', 'Lifetime motor service'] },
  { id: 's1', cat: 'fans',  name: 'Pocket USB Fan — 3-Speed, Foldable', price: 590, old: 790, rating: 4.3, reviews: 41, img: placeholder('fan', 220, 'Pocket Fan'), tag: 'Sale',
    desc: 'Slips into your bag or back pocket. Three speeds, foldable arm, 4-hour runtime.',
    bullets: ['Foldable design', '1500mAh battery', 'USB-A charge cable', 'Available in 4 colors'] },
  { id: 's2', cat: 'lamps', name: 'Brass Festive Table Lamp — Limited', price: 2490, old: 2990, rating: 4.9, reviews: 19, img: placeholder('lamp', 80, 'Brass Lamp'),
    desc: 'A solid-brass festive lamp with hand-etched motifs — a true heirloom piece for the puja room or living space.',
    bullets: ['Hand-etched solid brass', 'Warm 2700K bulb included', 'Heritage-craft certified', 'Limited run of 200'] },
  { id: 's3', cat: 'lamps', name: 'Reading Clip Lamp — Warm White, Adjust.', price: 690, old: 950, rating: 4.5, reviews: 64, img: placeholder('lamp', 220, 'Clip Lamp'),
    desc: 'Clip-on, fully articulated, and dimmable — for late-night readers who don\'t want to wake the room.',
    bullets: ['Strong spring clip', '360° flexible neck', 'Stepless dimmer', 'USB or AAA powered'] },
  { id: 's4', cat: 'home',  name: 'Plush Teddy Bear — 14 in., Festive Bow', price: 790, old: 1090, rating: 4.7, reviews: 102, img: placeholder('teddy', 60, 'Teddy Bear'),
    desc: 'Hypoallergenic plush teddy with a satin festive bow — perfect for gifting.',
    bullets: ['14 inches tall', 'Hypoallergenic fill', 'Satin gold bow', 'Machine washable'] },
  { id: 'w1', cat: 'sarees', name: 'Tangail Silk Saree — Emerald & Gold', price: 4290, old: 5290, rating: 4.9, reviews: 38, img: placeholder('saree', 150, 'Silk Saree'), tag: 'Festive',
    desc: 'Hand-woven by master weavers in Tangail. Emerald body, gold zari border, and a richly worked aanchal.',
    bullets: ['100% mulberry silk', 'Hand-woven zari border', '5.5m saree + 0.8m blouse', 'Dry clean only'] },
  { id: 'w2', cat: 'women', name: 'Rose Body Lotion — 200ml, Hydrating', price: 540, old: 690, rating: 4.6, reviews: 73, img: placeholder('lotion', 20, 'Body Lotion'),
    desc: 'Lightweight, fast-absorbing rose-and-shea formula. No parabens, no sulfates, never tested on animals.',
    bullets: ['200ml glass-look bottle', 'Rose + shea blend', 'Paraben & sulfate free', 'Cruelty-free certified'] },
  { id: 'w3', cat: 'women', name: 'Pearl Drop Earrings — 18k Gold-Plated', price: 1290, old: 1690, rating: 4.8, reviews: 49, img: placeholder('earrings', 90, 'Pearl Earrings'), tag: 'Gold',
    desc: 'Freshwater pearls suspended from 18k gold-plated brass. Light enough for all-day wear.',
    bullets: ['Freshwater pearls (8mm)', '18k gold plating', 'Hypoallergenic posts', 'Comes in gift box'] },
  { id: 'w4', cat: 'sarees', name: 'Embroidered Three-Piece — Pista Green Set', price: 2890, old: 3490, rating: 4.5, reviews: 28, img: placeholder('threepiece', 150, 'Three-Piece'),
    desc: 'Soft pista-green kameez with hand-embroidered yoke, paired with matching salwar and dupatta.',
    bullets: ['Kameez + salwar + dupatta', 'Hand-embroidered yoke', 'Soft cotton-blend', 'Available XS–XXL'] },
];

export function fmt(n: number): string {
  return '৳' + n.toLocaleString('en-BD');
}

export function star(n: number): string {
  return '★'.repeat(Math.floor(n)) + '☆'.repeat(5 - Math.floor(n));
}

export function tintedImg(src: string, hueShift: number): string {
  if (src.startsWith('data:image/svg+xml')) {
    const decoded = decodeURIComponent(src.replace('data:image/svg+xml;utf8,', ''));
    const wrapped = decoded.replace('<svg ', `<svg style='filter:hue-rotate(${hueShift}deg)' `);
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(wrapped);
  }
  return src;
}
