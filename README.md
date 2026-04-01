# Svar Direkt - Mobile App & Backend

Complete React Native + Expo mobile application with Node.js backend, PayPal subscription integration, and user authentication.

## Project Structure

```
svardirekt/
├── app/                          # React Native screens and routing
│   ├── (tabs)/                  # Tab navigation
│   ├── oauth/                   # OAuth callback handler
│   ├── subscription.tsx         # Premium subscription screen
│   ├── paypal-webview.tsx       # PayPal payment flow
│   └── _layout.tsx              # Root layout with providers
├── components/                   # Reusable React Native components
│   ├── screen-container.tsx     # SafeArea wrapper
│   ├── themed-view.tsx          # Theme-aware view
│   └── ui/                      # UI components
├── hooks/                        # Custom React hooks
│   ├── use-subscription.ts      # Subscription state management
│   ├── use-device-id.ts         # Device ID generation
│   ├── use-colors.ts            # Theme colors
│   └── use-auth.ts              # Authentication
├── constants/                    # App constants
│   ├── oauth.ts                 # OAuth & API configuration
│   └── theme.ts                 # Theme tokens
├── lib/                          # Utility libraries
│   ├── trpc.ts                  # tRPC client
│   ├── utils.ts                 # Helper functions
│   ├── theme-provider.tsx       # Theme context
│   └── _core/                   # Core utilities
├── server/                       # Node.js backend
│   ├── _core/                   # Core backend setup
│   │   ├── index.ts             # Express server
│   │   ├── env.ts               # Environment config
│   │   ├── oauth.ts             # OAuth implementation
│   │   └── sdk.ts               # Manus SDK
│   ├── subscription-router.ts   # Subscription API endpoints
│   ├── paypal.ts                # PayPal integration
│   ├── paypal-return.ts         # PayPal return handler
│   ├── schema.ts                # Database schema (Drizzle)
│   └── README.md                # Backend documentation
├── assets/                       # App icons and images
│   └── images/
├── app.config.ts                # Expo configuration
├── eas.json                      # EAS Build configuration
├── package.json                  # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind CSS config
├── theme.config.js              # Theme tokens
└── drizzle.config.ts            # Drizzle ORM config
```

## Quick Start

### Prerequisites
- Node.js 22+ and pnpm 9+
- Expo CLI: `npm install -g expo-cli`
- For native build: EAS CLI: `npm install -g eas-cli`

### Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create `.env` file in project root with required secrets (see Environment Variables section below)

3. **Start development server:**
   ```bash
   pnpm dev
   ```
   - Metro bundler: http://localhost:8081
   - Backend API: http://localhost:3000
   - QR code for Expo Go: exps://8081-...

4. **Test on device:**
   - iOS/Android: Scan QR code with Expo Go app
   - Web: Open Metro URL in browser

### Build APK

1. **Prepare for build:**
   ```bash
   pnpm build
   ```

2. **Build with EAS (recommended):**
   ```bash
   eas build --platform android
   ```

3. **Manual APK build:**
   ```bash
   eas build --platform android --local
   ```

## Environment Variables & Secrets

### Frontend (EXPO_PUBLIC_* - Build-time, embedded in APK)

| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `EXPO_PUBLIC_API_BASE_URL` | `https://svardirekt-cy96hsrb.manus.space` | Yes | Backend API domain |
| `EXPO_PUBLIC_OAUTH_PORTAL_URL` | Manus OAuth portal URL | No | Set by Manus platform |
| `EXPO_PUBLIC_OAUTH_SERVER_URL` | Manus OAuth server URL | No | Set by Manus platform |
| `EXPO_PUBLIC_APP_ID` | Manus app ID | No | Set by Manus platform |
| `EXPO_PUBLIC_OWNER_OPEN_ID` | Owner ID | No | Set by Manus platform |
| `EXPO_PUBLIC_OWNER_NAME` | Owner name | No | Set by Manus platform |

### Backend (Runtime - Server environment variables)

| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `OAUTH_SERVER_URL` | `https://svardirekt-cy96hsrb.manus.space` | Yes | Hardcoded in server/_core/env.ts |
| `JWT_SECRET` | Random string | Yes | Session/token signing secret |
| `DATABASE_URL` | MySQL connection string | Yes | TiDB Cloud or local MySQL |
| `PAYPAL_CLIENT_ID` | PayPal sandbox/production ID | Yes | From PayPal Developer |
| `PAYPAL_CLIENT_SECRET` | PayPal sandbox/production secret | Yes | From PayPal Developer |
| `BUILT_IN_FORGE_API_URL` | Manus Forge API URL | No | Set by Manus platform |
| `BUILT_IN_FORGE_API_KEY` | Manus Forge API key | No | Set by Manus platform |

### How to Set Secrets

**Local Development:**
Create `.env` file in project root:
```
EXPO_PUBLIC_API_BASE_URL=https://svardirekt-cy96hsrb.manus.space
JWT_SECRET=your-secret-key-here
DATABASE_URL=mysql://user:pass@host/db
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
```

**Production (Manus Platform):**
Use Manus Management UI → Settings → Secrets to configure environment variables.

## Key Features

### Frontend
- **Tab Navigation:** Home, Premium, Settings
- **Premium Subscription:** PayPal integration with approval flow
- **Authentication:** OAuth with Manus platform
- **Dark/Light Mode:** Theme switching with NativeWind (Tailwind CSS)
- **Responsive Design:** Works on iOS, Android, Web

### Backend
- **Express.js API:** tRPC for type-safe API
- **PayPal Integration:** Create subscriptions, verify payments
- **Database:** Drizzle ORM with MySQL (TiDB)
- **User Management:** Device ID tracking, subscription status
- **OAuth:** Session management with JWT

### PayPal Flow
1. User clicks "Gå till PayPal" button on premium screen
2. Frontend calls `/api/trpc/subscription.createLink`
3. Backend creates PayPal subscription plan and returns approval URL
4. Frontend opens PayPal WebView with approval URL
5. User approves subscription on PayPal
6. PayPal redirects to `/paypal-webview` with token
7. Frontend calls `/api/paypal/return` to verify subscription
8. Backend verifies with PayPal API and updates database
9. Frontend calls `/api/trpc/subscription.checkStatus` to refresh state
10. Premium features unlock

## Database Schema

Tables (Drizzle ORM):
- `devices` - Device/user tracking
- `subscriptions` - PayPal subscription records
- `sessions` - User sessions

See `server/schema.ts` for full schema.

## API Endpoints

### Subscription Management
- `POST /api/trpc/subscription.createLink` - Create PayPal subscription link
- `POST /api/trpc/subscription.checkStatus` - Check if user has active subscription
- `GET /api/paypal/return` - PayPal return callback

### Authentication
- `POST /api/trpc/auth.login` - OAuth login
- `POST /api/trpc/auth.logout` - Logout
- `POST /api/trpc/auth.getSession` - Get current session

## Troubleshooting

### "Nie można utworzyć linku subskrypcji" (Cannot create subscription link)
- Check `EXPO_PUBLIC_API_BASE_URL` is set correctly
- Verify backend is running and accessible
- Check PayPal credentials in environment variables
- See console logs for detailed error

### Premium not unlocking after PayPal approval
- Check database for subscription record
- Verify `currentPeriodEnd` is set in database
- Check `checkStatus` endpoint returns `isPremium: true`
- See backend logs for verification errors

### OAuth login fails
- Verify `OAUTH_SERVER_URL` on backend
- Check JWT_SECRET is set
- Verify OAuth credentials in Manus platform

## Development Tips

- **Hot Reload:** Changes to `.tsx` files auto-reload
- **Console Logs:** View in Metro terminal or browser console
- **Database:** Use Drizzle Studio: `pnpm drizzle-kit studio`
- **Type Safety:** Run `pnpm check` to verify TypeScript
- **Linting:** Run `pnpm lint` to check code style

## Deployment

### Build Production APK
```bash
eas build --platform android --auto-submit
```

### Deploy Backend
Backend is deployed via Manus platform. Use "Publish" button in Management UI.

### Publish to Google Play
```bash
eas submit --platform android
```

## File Checklist

Essential files for running this project:
- ✅ `app/` - All React Native screens
- ✅ `components/` - UI components
- ✅ `hooks/` - Custom hooks
- ✅ `constants/` - Configuration
- ✅ `lib/` - Utilities and providers
- ✅ `server/` - Backend code
- ✅ `assets/` - App icons
- ✅ `package.json` - Dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `app.config.ts` - Expo config
- ✅ `eas.json` - EAS build config
- ✅ `tailwind.config.js` - Tailwind config
- ✅ `theme.config.js` - Theme tokens
- ✅ `drizzle.config.ts` - Database config

## Support

For issues or questions:
1. Check console logs: `pnpm dev` output
2. Check backend logs: Server terminal output
3. Enable debug output in subscription.tsx
4. Review PayPal integration in `server/paypal.ts`

---

**Version:** 1.1.14  
**Last Updated:** 2026-04-01  
**Status:** Development
