# Staunch — Setup steps (do these later)

---

## Step 1: Set up Stripe (required to take payments)

### A. Create your Stripe account
1. Go to [stripe.com](https://stripe.com) and sign up (free)
2. Complete business verification when prompted

### B. Get your API keys
1. Open the [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure **Test mode** is ON (toggle top-right) while testing
3. Go to **Developers → API keys**
4. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_` — click Reveal)

### C. Add keys to your project
1. In your project folder, create a file called `.env.local`
2. Paste this (replace with your real keys):

```
STRIPE_SECRET_KEY=sk_test_paste_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_paste_your_publishable_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Save the file

### D. Restart the site
```bash
cd "/Users/alexandergrundy/Desktop/Staunch Website"
npm run dev
```

### E. Test a purchase
1. Add items to cart and click **Checkout with Stripe**
2. Use Stripe's test card:
   - **Card number:** `4242 4242 4242 4242`
   - **Expiry:** any future date (e.g. 12/30)
   - **CVC:** any 3 digits (e.g. 123)
   - **Postcode:** any valid UK postcode
3. You should land on the order success page
4. Check **Stripe Dashboard → Payments** — the test payment will appear there

### F. Go live (when ready to sell for real)
1. In Stripe Dashboard, turn **Test mode** OFF
2. Copy your **live** keys (`pk_live_` and `sk_live_`)
3. Replace the keys in `.env.local` (or in Vercel env vars if deployed)
4. Do one real test order with a small amount before announcing the shop

---

## Step 2: View the site locally

```bash
cd "/Users/alexandergrundy/Desktop/Staunch Website"
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 3: Go live on the web

1. Push the project to GitHub
2. Sign up at [vercel.com](https://vercel.com) and import the repo
3. In Vercel → **Settings → Environment Variables**, add:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your real domain, e.g. `https://staunchservices.co.uk`)
4. Deploy, then connect your domain in Vercel
5. Switch to **live** Stripe keys when ready

---

## Current pricing

| Product | Price |
|---------|-------|
| Heavyweight Tee | £35 each |
| Any 2 Tees | £65 |
| Staunch Cap | £40 |

**Shipping:** Free on all UK orders. Free US shipping on orders of £65+.

**Contact:** info@staunchservices.co.uk
