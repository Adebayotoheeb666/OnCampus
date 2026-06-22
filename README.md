# OnCampus — Sponsor a Bed Platform

Modular monolith for the OnCampus SAB (Sponsor a Bed) accommodation platform at FUTA, built per the [Software Design Document](./OnCampus_SAB_Software_Design_Document_Updated.md).

## Stack

- **Next.js 15** (App Router, Server Actions, Route Handlers)
- **Turso** (libSQL) + **Drizzle ORM**
- **Trigger.dev** (background jobs — stubs in place)
- **Paystack** (payment rails)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/                    # Next.js routes (public, sponsor, admin, API)
├── components/             # Shared UI and layout
├── db/                     # Drizzle schema, client, seed
├── jobs/                   # Trigger.dev task definitions
├── lib/                    # Utilities, payments, validations
└── modules/                # Domain logic by module (sponsor, allocation, …)
```

## Implementation status

| Feature | Status |
|---------|--------|
| Sponsor dashboard (Phase 0) | Done |
| Bed allocation & tenant management (Phase 1) | Done |
| Rent, wallet, payment plans (Phase 1) | Done |
| Finance overview + OPEX (Phase 1) | Done |
| Session auth (resident + admin) | Done |
| Resident home, maintenance, laundry, visitors, QR ID (Phase 2) | Done |
| Security visitor verification + access logs (Phase 2) | Done |
| Facilities asset registry (Phase 2) | Done |
| Sponsor OTP portal + certificates | Done |
| Trigger.dev tasks + cron endpoint | Done |
| Maintenance photo upload (Cloudinary) | Done |
| Multi-institution scale (Phase 3) | Planned |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed pilot inventory |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run trigger:dev` | Run Trigger.dev worker locally |

## Phased build plan

See Section 6 of the design document:

- **Phase 0** (complete): Sponsor Dashboard — pledges, payments, certificates
- **Phase 1** (complete): Bed allocation, rent & payments, basic finance reporting
- **Phase 2** (current): Resident app, security, facilities
- **Phase 3**: Full finance suite, multi-institution scale
