# Staunch Website

E-commerce site for **Staunch** — heavyweight 100% cotton tees and caps.

## Quick start

### 1. Install dependencies (already done if you're reading this)

```bash
npm install
```

### 2. Set up Stripe (required to take payments)

1. Create a free account at [stripe.com](https://stripe.com)
2. Go to **Developers → API keys** in the Stripe dashboard
3. Copy your **test** keys
4. Create a file called `.env.local` in this folder (copy from `.env.example`):

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the site locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Test a purchase

Use Stripe's test card: `4242 4242 4242 4242` with any future expiry and any CVC.

---

## Pages

| Page | URL |
|------|-----|
| Homepage | `/` |
| Shop | `/shop` |
| Product | `/shop/[slug]` |
| About | `/about` |
| Contact | `/contact` |
| Cart | `/cart` |
| Order success | `/success` |

## Products (edit in `src/lib/products.ts`)

- Staunch Cap — £40
- Heavyweight Tee White (L, XL, XXL) — £35 each, **2 for £65**
- Heavyweight Tee Black (L, XL, XXL) — £35 each, **2 for £65**

Bundle pricing logic lives in `src/lib/pricing.ts`.

## When you're ready to go live

See **SETUP-LATER.md** for Stripe setup, running locally, and deploying to Vercel.
