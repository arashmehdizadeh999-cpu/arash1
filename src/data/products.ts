export type Color = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Men' | 'Women' | 'Tops' | 'Accessories';
  image: string;
  sizes: string[];
  colors: Color[];
  isNew?: boolean;
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: 'relaxed-fit-polo',
    name: 'Relaxed Fit Polo',
    price: 2499,
    description:
      'A premium short-sleeve polo cut from breathable piqué cotton. Designed with a relaxed silhouette and a refined collar for effortless everyday luxury.',
    category: 'Men',
    image: img('photo-1656695230389-01185e6fbff8', 600),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Beige', hex: '#C8B8A0' },
    ],
    isNew: true,
  },
  {
    id: 'linen-blend-shirt',
    name: 'Linen Blend Shirt',
    price: 2999,
    description:
      'Crafted from a lightweight linen-cotton blend, this shirt offers a soft hand-feel and natural drape. A versatile essential for warm-weather styling.',
    category: 'Tops',
    image: img('photo-1602346733051-b660c8747610', 600),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand', hex: '#D4C5A9' },
      { name: 'White', hex: '#EDE8E0' },
    ],
    isNew: true,
  },
  {
    id: 'premium-cotton-tee',
    name: 'Premium Cotton Tee',
    price: 1499,
    description:
      'A heavyweight cotton T-shirt with a clean, minimal silhouette. Garment-dyed for depth of colour and built to hold its shape wash after wash.',
    category: 'Tops',
    image: img('photo-1539042380473-e548736ea2c4', 600),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Stone', hex: '#A89D8E' },
    ],
    isNew: true,
  },
  {
    id: 'tailored-trousers',
    name: 'Tailored Trousers',
    price: 3499,
    description:
      'Precision-tailored trousers in a refined taupe twill. A flat-front design with a clean break, offering a modern take on a timeless silhouette.',
    category: 'Men',
    image: img('photo-1679419930974-e8171969aea0', 600),
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Taupe', hex: '#8C7D6B' },
      { name: 'Charcoal', hex: '#3A3A3A' },
    ],
    isNew: true,
  },
  {
    id: 'utility-overshirt',
    name: 'Utility Overshirt',
    price: 3299,
    description:
      'A heavyweight utility overshirt cut from structured cotton twill. Designed with clean patch pockets and a relaxed fit for layered styling.',
    category: 'Men',
    image: img('photo-1682045060389-06026da6ecd7', 600),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#3A3A3A' },
      { name: 'Olive', hex: '#6B6B4E' },
    ],
    isNew: true,
  },
  {
    id: 'ribbed-knit-polo',
    name: 'Ribbed Knit Polo',
    price: 2699,
    description:
      'A fine-gauge ribbed knit polo in soft cream. Breathable, lightweight, and effortlessly elegant — a quiet luxury essential for the modern wardrobe.',
    category: 'Tops',
    image: img('photo-1645035828708-789028bb9782', 600),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#E8E0D4' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    isNew: true,
  },
];

export const categories = [
  {
    name: 'MEN',
    image: img('photo-1550995694-3f5f4a7e1bd2', 500),
    href: '/shop?category=Men',
  },
  {
    name: 'WOMEN',
    image: img('photo-1590873802674-55bb8f947bc5', 500),
    href: '/shop?category=Women',
  },
  {
    name: 'TOPS',
    image: img('photo-1602346733051-b660c8747610', 500),
    href: '/shop?category=Tops',
  },
  {
    name: 'ACCESSORIES',
    image: img('photo-1589731119540-c4586781dae1', 500),
    href: '/shop?category=Accessories',
  },
];

export const heroImage = img('photo-1619603364904-c0498317e145', 1600);
export const featuredImage = img('photo-1619603364904-c0498317e145', 1200);
export const brandStoryImage = img('photo-1550995694-3f5f4a7e1bd2', 1000);

export function formatPrice(price: number): string {
  return '₹' + price.toLocaleString('en-IN');
}
