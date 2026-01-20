# MindMirror

A predictive journaling app that helps you understand your emotional patterns before they happen.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Email:** Resend
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)
- Resend account (for emails)

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/mindmirror.git
cd mindmirror
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema in `supabase/schema.sql`
3. Go to Storage and create a bucket called `voice-notes` (private)
4. Copy your project URL and keys from Settings > API

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create two products/prices:
   - Monthly: $7.99/month
   - Yearly: $59.99/year
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

### 4. Set Up Resend

1. Create account at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key

### 5. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for webhooks)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `STRIPE_PRICE_ID_MONTHLY` - Stripe price ID for monthly plan
- `STRIPE_PRICE_ID_YEARLY` - Stripe price ID for yearly plan
- `RESEND_API_KEY` - Resend API key
- `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for dev)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mindmirror/
├── app/
│   ├── (app)/              # Protected app routes
│   │   ├── journal/        # Journal entry page
│   │   ├── patterns/       # Pattern insights page
│   │   ├── history/        # Entry history page
│   │   └── settings/       # User settings page
│   ├── (marketing)/        # Public marketing pages
│   ├── api/
│   │   ├── entries/        # CRUD for entries
│   │   ├── checkout/       # Stripe checkout
│   │   └── webhooks/       # Stripe webhooks
│   ├── auth/
│   │   └── callback/       # OAuth callback
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI components
│   └── app/                # App-specific components
├── hooks/
│   ├── useVoiceRecorder.ts # Voice recording hook
│   └── usePatterns.ts      # Pattern detection hook
├── lib/
│   └── supabase/           # Supabase client utilities
├── types/
│   ├── database.ts         # Database types
│   └── index.ts            # App types
└── supabase/
    └── schema.sql          # Database schema
```

## Key Features

### Free Tier
- Unlimited journaling
- Basic entry history
- Voice notes (limited)

### Premium ($7.99/mo or $59.99/yr)
- Pattern detection & predictions
- Body-mind insights
- Unlimited voice notes
- Data export
- Priority support

## Database Schema

### profiles
- User profile extending Supabase auth
- Subscription status and settings

### entries
- Journal entries with feelings, thoughts, events
- Health data (cycle, sleep, factors)
- Voice note references

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Post-Deployment

1. Update `NEXT_PUBLIC_APP_URL` to your production URL
2. Add production domain to Supabase Auth settings
3. Update Stripe webhook URL
4. Test the full flow

## Development Notes

### Adding New Feelings/Categories

Edit `types/index.ts`:
- `FEELINGS` array for emotions
- `EVENT_CATEGORIES` for situation categories
- `HEALTH_FACTORS` for body factors

### Pattern Thresholds

Adjust in `types/index.ts`:
```typescript
export const PATTERN_THRESHOLDS = {
  EMERGING: 5,      // Entries to show emerging patterns
  ESTABLISHED: 15,  // Entries for established patterns
  HEALTH_MIN: 3,    // Min entries per health factor
  CATEGORY_MIN: 2,  // Min entries per category
}
```

## License

MIT
# mindmirror
