# Software Design Document (SDD)
## OnCampus — Sponsor a Bed (SAB) Accommodation Platform

**Project:** OnCampus Student Accommodation Initiative — FUTA Pilot
**Document Version:** 1.0
**Status:** Draft for Internal Review
**Tech Stack:** Next.js (App Router), Turso (libSQL) with Drizzle ORM, Trigger.dev, Paystack/Flutterwave

---

## 1. Document Purpose & Scope

This document specifies the software architecture, modules, data models, APIs, and background job design for the OnCampus platform supporting the Sponsor a Bed (SAB) initiative at the Federal University of Technology Akure (FUTA).

The platform must support:
- Public sponsor acquisition and fund tracking (Sponsor Dashboard)
- Bed inventory, allocation, and tenant lifecycle management
- Rent and amenity payment processing
- Resident-facing services (maintenance requests, laundromat booking, digital access, in-app wallet)
- Security and access control logging
- Facilities/maintenance management
- Finance and reporting for internal use, FUTA, and sponsors

**Out of scope for v1:** native mobile apps (PWA only), restaurant POS integration (treated as a leased third-party operation in v1), full accounting/ERP replacement.

---

## 2. System Overview

### 2.1 Architectural Style

A modular monolith built on Next.js (App Router), using Server Actions and Route Handlers for the API layer, with Turso as the primary relational data store and Trigger.dev handling all asynchronous, scheduled, and event-driven workflows. A modular monolith is chosen over microservices because:

- Team size is small; microservices add operational overhead without commensurate benefit at this stage.
- Modules are still cleanly separated at the code and database-schema level, allowing extraction into services later if needed.
- Turso's edge-replica model gives low-latency reads across modules without needing service-to-service network calls.

### 2.2 High-Level Architecture Diagram (described)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                              │
│  ┌───────────────┐  ┌────────────────┐  ┌──────────────────┐   │
│  │ Public Sponsor │  │ Admin Dashboard │  │ Resident PWA      │   │
│  │ Site (web)     │  │ (web)           │  │ (mobile-first web)│   │
│  └───────┬────────┘  └────────┬────────┘  └────────┬──────────┘  │
└──────────┼────────────────────┼────────────────────┼─────────────┘
           │                    │                     │
           ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Next.js App (App Router)                         │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐ │
│  │ Server      │ │ Route       │ │ Auth        │ │ Webhook       │ │
│  │ Actions     │ │ Handlers    │ │ Middleware  │ │ Handlers      │ │
│  └─────┬──────┘ └─────┬──────┘ └─────┬──────┘ └──────┬────────┘ │
└────────┼──────────────┼──────────────┼───────────────┼───────────┘
         │              │              │               │
         ▼              ▼              ▼               ▼
┌─────────────────┐ ┌──────────────┐ ┌──────────────────────────┐
│ Drizzle ORM      │ │ Trigger.dev   │ │ External Services         │
│        │         │ │ (jobs/tasks)  │ │ - Paystack/Flutterwave    │
│        ▼         │ │               │ │ - SMS (Termii/Africa's    │
│ ┌──────────────┐ │ │ - Reminders   │ │   Talking)                │
│ │ Turso (libSQL)│ │ │ - Payouts     │ │ - Email (Resend)          │
│ │ Database      │ │ │ - Reports     │ │ - Cloudinary (media)      │
│ └──────────────┘ │ │ - Alerts      │ │                            │
└──────────────────┘ └──────────────┘ └──────────────────────────┘
```

### 2.3 Why This Stack

| Component | Reason |
|---|---|
| **Next.js (App Router)** | Single codebase for public sponsor site, admin dashboard, and resident PWA; Server Actions reduce boilerplate API code; strong React ecosystem familiarity already on the team. |
| **Turso (libSQL)** | SQLite-compatible, edge-replicated, low operational cost, generous free tier suitable for a pilot-stage NGO/social venture; embedded replicas reduce latency for read-heavy dashboard views. |
| **Drizzle ORM** | Lightweight, SQL-first ORM with first-class libSQL/Turso support and strong TypeScript inference; lower overhead than Prisma for libSQL's edge-replica model. |
| **Trigger.dev** | Reliable background job orchestration (payment reconciliation, reminders, scheduled reports, sponsor receipt generation) without managing custom queues/cron infrastructure. |
| **Paystack/Flutterwave** | Local payment rails supporting bank transfer, card, and USSD — essential given inconsistent card penetration among Nigerian students. |

---

## 3. Module Breakdown

The platform is organized into seven core modules. Each is described with purpose, key features, data model, primary flows, and associated background jobs.

---

### 3.1 Module: Sponsor Dashboard

**Purpose:** Public-facing platform for individuals, alumni, and corporate sponsors to discover, fund, and track sponsorship of student beds.

**Key Features**
- Public landing page with live funding progress (per bed, per room, per cohort)
- Sponsor registration (individual / organization)
- One-time and recurring sponsorship options
- Tiered sponsorship packages (Full Bed / Partial / Maintenance Subscription)
- Automated digital receipt and certificate generation (PDF)
- Impact reporting view (anonymized/consented student stories, photos, progress updates)
- Admin-side sponsor CRM (pipeline status: prospect → contacted → committed → funded)

**Data Model**

```sql
-- sponsors
sponsors (
  id TEXT PRIMARY KEY,           -- uuid
  type TEXT NOT NULL,            -- 'individual' | 'organization'
  full_name TEXT NOT NULL,
  organization_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  is_diaspora BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'prospect', -- prospect|contacted|committed|active|lapsed
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- sponsorship_pledges
sponsorship_pledges (
  id TEXT PRIMARY KEY,
  sponsor_id TEXT NOT NULL REFERENCES sponsors(id),
  bed_id TEXT REFERENCES beds(id),       -- nullable until allocated to a specific bed
  tier TEXT NOT NULL,                     -- 'full_bed'|'partial'|'maintenance_sub'
  amount_pledged INTEGER NOT NULL,        -- kobo
  amount_paid INTEGER DEFAULT 0,          -- kobo
  recurring BOOLEAN DEFAULT FALSE,
  recurrence_interval TEXT,               -- 'annual' | null
  status TEXT DEFAULT 'pending',          -- pending|partially_paid|fulfilled|cancelled
  created_at INTEGER NOT NULL
);

-- sponsor_payments
sponsor_payments (
  id TEXT PRIMARY KEY,
  pledge_id TEXT NOT NULL REFERENCES sponsorship_pledges(id),
  amount INTEGER NOT NULL,
  provider TEXT NOT NULL,                 -- 'paystack'|'flutterwave'|'bank_transfer'
  provider_reference TEXT,
  status TEXT NOT NULL,                   -- 'success'|'failed'|'pending'
  paid_at INTEGER
);

-- sponsor_certificates
sponsor_certificates (
  id TEXT PRIMARY KEY,
  pledge_id TEXT NOT NULL REFERENCES sponsorship_pledges(id),
  file_url TEXT NOT NULL,
  issued_at INTEGER NOT NULL
);
```

**Primary Flows**
1. Sponsor browses available beds → selects tier → completes payment via Paystack/Flutterwave checkout (Server Action initiates transaction, webhook confirms).
2. On payment confirmation webhook: `sponsorship_pledges.amount_paid` updated → if fully funded, bed status updates to `sponsored` → Trigger.dev job generates and emails certificate.
3. Admin manually updates CRM stage for offline/corporate negotiations (large pledges often start as conversations, not self-serve checkout).

**Trigger.dev Jobs**
- `generateSponsorCertificate` — triggered on full payment confirmation
- `sendImpactUpdate` — scheduled (e.g., termly) email to all active sponsors with progress photos/stats
- `recurringPledgeReminder` — scheduled job checking annual recurring pledges due for renewal, sends reminder 30/14/3 days before due date
- `reconcileFailedPayments` — periodic job to recheck pending Paystack/Flutterwave transactions against provider API

---

### 3.2 Module: Bed Allocation & Tenant Management

**Purpose:** Source-of-truth inventory of all beds, their funding/occupancy status, and the full tenant lifecycle from application to checkout.

**Key Features**
- Bed/room/block inventory management
- Transparent, rule-based allocation engine for free (sponsored) beds — prioritizing 100L students by configurable criteria (need score, distance from home, admission date)
- Application portal for students (free bed eligibility + paid bed requests)
- Lease/session tracking with start/end dates
- Allocation audit log (for transparency and dispute resolution)

**Data Model**

```sql
-- blocks
blocks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,             -- e.g. "Block A"
  gender TEXT NOT NULL,           -- 'male'|'female'|'mixed'
  total_rooms INTEGER NOT NULL
);

-- rooms
rooms (
  id TEXT PRIMARY KEY,
  block_id TEXT NOT NULL REFERENCES blocks(id),
  room_number TEXT NOT NULL,
  capacity INTEGER NOT NULL
);

-- beds
beds (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES rooms(id),
  bed_label TEXT NOT NULL,        -- e.g. "Bed 1"
  funding_type TEXT NOT NULL,     -- 'sponsored_target'|'paid'
  status TEXT DEFAULT 'available',-- available|sponsored|occupied|maintenance
  current_tenant_id TEXT REFERENCES tenants(id)
);

-- applicants
applicants (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  matric_or_jamb_no TEXT NOT NULL,
  level TEXT NOT NULL,            -- '100L' etc.
  gender TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state_of_origin TEXT,
  need_score INTEGER,             -- computed/assessed
  application_type TEXT NOT NULL, -- 'free_bed'|'paid_bed'
  status TEXT DEFAULT 'submitted',-- submitted|under_review|allocated|rejected|waitlisted
  created_at INTEGER NOT NULL
);

-- tenants  (an applicant once allocated/active)
tenants (
  id TEXT PRIMARY KEY,
  applicant_id TEXT NOT NULL REFERENCES applicants(id),
  bed_id TEXT NOT NULL REFERENCES beds(id),
  session_start INTEGER NOT NULL,
  session_end INTEGER NOT NULL,
  tenant_type TEXT NOT NULL,      -- 'sponsored'|'paid'
  status TEXT DEFAULT 'active',   -- active|checked_out|defaulted
  created_at INTEGER NOT NULL
);

-- allocation_audit_log
allocation_audit_log (
  id TEXT PRIMARY KEY,
  applicant_id TEXT NOT NULL REFERENCES applicants(id),
  bed_id TEXT,
  action TEXT NOT NULL,           -- 'scored'|'allocated'|'rejected'|'waitlisted'
  performed_by TEXT,              -- admin user id, or 'system'
  notes TEXT,
  created_at INTEGER NOT NULL
);
```

**Primary Flows**
1. Student submits application (free or paid bed) via public portal.
2. For free-bed applicants: system computes `need_score` from submitted criteria (configurable weighted formula); admin reviews edge cases.
3. Allocation run (manual trigger or scheduled before each session) matches highest-priority applicants to available sponsored beds; every decision is written to `allocation_audit_log` for transparency.
4. On allocation, `tenants` record created, `beds.status` updated, applicant notified via SMS/email.
5. At session end, automated checkout flow flags bed as available for re-allocation.

**Trigger.dev Jobs**
- `runAllocationCycle` — scheduled batch job (e.g., before each academic session) executing the allocation algorithm
- `notifyApplicantOutcome` — triggered on allocation/rejection/waitlist status change
- `sessionEndCheckoutSweep` — scheduled job flagging tenants nearing `session_end` for checkout workflow

---

### 3.3 Module: Rent & Payments

**Purpose:** Handles all recurring and one-off payments from paid-bed tenants and amenity usage (laundromat tokens, store credit, optional wallet top-ups).

**Key Features**
- Rent invoicing (per session or installment plans)
- Payment gateway integration (Paystack/Flutterwave)
- In-app wallet for amenity spend
- Installment/microfinance-style payment plans for rent
- Automated payment reminders and overdue escalation

**Data Model**

```sql
-- invoices
invoices (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  invoice_type TEXT NOT NULL,     -- 'rent'|'deposit'|'amenity'
  amount_due INTEGER NOT NULL,
  amount_paid INTEGER DEFAULT 0,
  due_date INTEGER NOT NULL,
  status TEXT DEFAULT 'unpaid',   -- unpaid|partially_paid|paid|overdue
  created_at INTEGER NOT NULL
);

-- payments
payments (
  id TEXT PRIMARY KEY,
  invoice_id TEXT REFERENCES invoices(id),
  wallet_id TEXT REFERENCES wallets(id),
  amount INTEGER NOT NULL,
  provider TEXT NOT NULL,
  provider_reference TEXT,
  status TEXT NOT NULL,
  paid_at INTEGER
);

-- payment_plans
payment_plans (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  installment_count INTEGER NOT NULL,
  installment_amount INTEGER NOT NULL,
  next_due_date INTEGER NOT NULL
);

-- wallets
wallets (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  balance INTEGER DEFAULT 0,      -- kobo
  updated_at INTEGER NOT NULL
);

-- wallet_transactions
wallet_transactions (
  id TEXT PRIMARY KEY,
  wallet_id TEXT NOT NULL REFERENCES wallets(id),
  type TEXT NOT NULL,             -- 'topup'|'spend'|'refund'
  amount INTEGER NOT NULL,
  reference_module TEXT,          -- 'laundromat'|'store'|'restaurant'
  created_at INTEGER NOT NULL
);
```

**Primary Flows**
1. Invoice generated automatically on tenant allocation (rent) or manually (amenity charges not routed through wallet).
2. Tenant pays via gateway checkout or wallet debit; webhook updates `payments` and `invoices`.
3. Overdue invoices trigger reminder cadence; persistent overdue status flagged to admin for manual follow-up (eviction process is intentionally kept human-in-the-loop, not automated).

**Trigger.dev Jobs**
- `generateSessionInvoices` — scheduled at session start
- `paymentReminderCadence` — staged reminders at 7/3/1 days before due date, then overdue escalation
- `reconcileWalletTransactions` — nightly consistency check between wallet balance and transaction log
- `installmentDueReminder` — for payment-plan tenants

---

### 3.4 Module: Resident App (PWA)

**Purpose:** Mobile-first progressive web app for residents covering daily-use features.

**Key Features**
- Maintenance request submission with photo upload and status tracking
- Laundromat slot booking/queue
- Digital resident ID (QR code) for gate access
- Wallet balance + amenity spend history
- Announcements/community board
- Visitor pre-registration (residents log expected guests in advance)

**Data Model**

```sql
-- maintenance_requests
maintenance_requests (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  category TEXT NOT NULL,        -- 'plumbing'|'electrical'|'structural'|'other'
  description TEXT NOT NULL,
  photo_url TEXT,
  priority TEXT DEFAULT 'normal',-- low|normal|high|urgent
  status TEXT DEFAULT 'open',    -- open|assigned|in_progress|resolved
  assigned_to TEXT,              -- staff/vendor id
  created_at INTEGER NOT NULL,
  resolved_at INTEGER
);

-- laundromat_machines
laundromat_machines (
  id TEXT PRIMARY KEY,
  machine_label TEXT NOT NULL,
  status TEXT DEFAULT 'available' -- available|in_use|out_of_order
);

-- laundromat_bookings
laundromat_bookings (
  id TEXT PRIMARY KEY,
  machine_id TEXT NOT NULL REFERENCES laundromat_machines(id),
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  slot_start INTEGER NOT NULL,
  slot_end INTEGER NOT NULL,
  status TEXT DEFAULT 'booked'   -- booked|completed|no_show|cancelled
);

-- announcements
announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  audience TEXT DEFAULT 'all',   -- all|block_specific|gender_specific
  published_at INTEGER NOT NULL
);

-- visitor_logs
visitor_logs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT,
  expected_arrival INTEGER,
  checked_in_at INTEGER,
  checked_out_at INTEGER,
  status TEXT DEFAULT 'expected' -- expected|checked_in|checked_out|no_show
);
```

**Primary Flows**
1. Resident submits maintenance request → routed to facilities module → status visible in real time to resident.
2. Resident books a laundromat slot → system prevents double-booking via slot-overlap check on `laundromat_bookings`.
3. Resident pre-registers a visitor → security gate staff verify against `visitor_logs` at entry (cross-module link to Security module).

**Trigger.dev Jobs**
- `maintenanceSLAEscalation` — flags requests unresolved beyond SLA threshold (e.g., 48 hours) to admin
- `laundromatSlotReminder` — push/SMS reminder shortly before booked slot
- `noShowSweep` — marks bookings as no-show if not checked in within grace period, frees the slot

---

### 3.5 Module: Security & Access Control

**Purpose:** Manages gate access logging, visitor verification, and incident reporting to address the safety priorities identified for the project (particularly for female residents).

**Key Features**
- QR/ID-based resident check-in/out logging
- Visitor verification against pre-registered list
- Incident reporting and escalation
- Integration point for CCTV/gate hardware (future phase)

**Data Model**

```sql
-- access_logs
access_logs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT REFERENCES tenants(id),
  visitor_log_id TEXT REFERENCES visitor_logs(id),
  direction TEXT NOT NULL,        -- 'in'|'out'
  gate_id TEXT NOT NULL,
  recorded_by TEXT,               -- security staff id
  timestamp INTEGER NOT NULL
);

-- incidents
incidents (
  id TEXT PRIMARY KEY,
  reported_by TEXT NOT NULL,
  category TEXT NOT NULL,         -- 'theft'|'altercation'|'safety_hazard'|'other'
  description TEXT NOT NULL,
  severity TEXT DEFAULT 'low',    -- low|medium|high|critical
  status TEXT DEFAULT 'open',     -- open|investigating|resolved
  created_at INTEGER NOT NULL,
  resolved_at INTEGER
);
```

**Primary Flows**
1. Security staff scans resident's QR ID or verifies pre-registered visitor against `visitor_logs` at gate; entry logged to `access_logs`.
2. Any incident logged by staff or resident creates an `incidents` record; high/critical severity triggers immediate admin notification.

**Trigger.dev Jobs**
- `criticalIncidentAlert` — immediate SMS/email to admin team on `severity = 'critical'`
- `dailyAccessSummary` — end-of-day digest of access logs and anomalies (e.g., unregistered visitor entries) for admin review

---

### 3.6 Module: Maintenance & Facilities Management

**Purpose:** Internal tool for tracking recurring facility upkeep (generator servicing, water tank cleaning, pest control) alongside reactive maintenance requests from the Resident App.

**Key Features**
- Preventive maintenance scheduling
- Vendor/staff assignment and cost tracking
- Asset registry (generator, boreholes, laundromat machines, etc.)

**Data Model**

```sql
-- assets
assets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,             -- 'Generator 1', 'Borehole Pump A'
  category TEXT NOT NULL,
  install_date INTEGER,
  last_serviced INTEGER,
  service_interval_days INTEGER
);

-- maintenance_schedules
maintenance_schedules (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  scheduled_date INTEGER NOT NULL,
  status TEXT DEFAULT 'scheduled', -- scheduled|completed|overdue
  cost INTEGER,
  vendor TEXT
);
```

**Primary Flows**
1. System computes next service date from `assets.last_serviced + service_interval_days`.
2. Scheduled job creates upcoming `maintenance_schedules` entries and alerts facilities staff in advance.
3. On completion, staff log actual cost and date, updating `assets.last_serviced`.

**Trigger.dev Jobs**
- `generateUpcomingMaintenanceSchedule` — rolling job creating schedule entries ahead of due dates
- `overdueMaintenanceAlert` — flags assets past due for servicing

---

### 3.7 Module: Finance & Reporting Dashboard

**Purpose:** Consolidated, auditable view of all financial activity for internal management, FUTA partnership reporting, and sponsor transparency.

**Key Features**
- Revenue breakdown by source (rent, amenities, sponsorships)
- OPEX tracking (maintenance costs, utilities, staff)
- Free-bed vs. paid-bed cost coverage ratio (the core sustainability metric from the financial model)
- Exportable reports (PDF/CSV) for FUTA and sponsor communications

**Data Model**

This module is primarily a read/aggregation layer over data already captured in Sponsor, Rent, and Maintenance modules, plus a lightweight ledger for manual OPEX entries not otherwise captured (e.g., staff salaries):

```sql
-- opex_entries
opex_entries (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,         -- 'utilities'|'staff'|'security'|'misc'
  amount INTEGER NOT NULL,
  description TEXT,
  incurred_at INTEGER NOT NULL,
  entered_by TEXT NOT NULL
);
```

**Primary Flows**
1. Dashboard queries aggregate `sponsor_payments`, `payments`, `maintenance_schedules.cost`, and `opex_entries` into period-based summaries (monthly/termly/annual).
2. Scheduled job compiles and emails a recurring report to admin/board; on-demand export available for FUTA or sponsor meetings.

**Trigger.dev Jobs**
- `compileFinancialReport` — scheduled monthly/termly report generation and distribution
- `freeBedCoverageRatioCheck` — periodic job recalculating the sustainability ratio (paid-bed + amenity margin vs. free-bed cost) and alerting admin if it drops below a defined safety threshold

---

## 4. Cross-Cutting Concerns

### 4.1 Authentication & Authorization

- **Resident/Sponsor auth:** Passwordless email/SMS OTP (reduces friction for students and sponsors), session managed via signed cookies.
- **Admin/Staff auth:** Email + password with role-based access control (RBAC).
- **Roles:** `super_admin`, `allocation_officer`, `finance_officer`, `facilities_staff`, `security_staff`, `sponsor` (read-only on own data), `resident` (read/write on own data only).
- Authorization enforced at the Server Action / Route Handler level via middleware checking role claims, not just at the UI layer.

### 4.2 Data Privacy

- Applicant `need_score` inputs (income indicators, family background) are sensitive — access restricted to `allocation_officer` and `super_admin` roles only.
- Public impact reporting (sponsor-facing) requires explicit student consent before any name/photo is published; default to anonymized stats unless consent flag is set.

### 4.3 Notifications Layer

A shared internal service (not a separate "module" but a utility layer used across Trigger.dev jobs) handles dispatch to SMS (Termii or Africa's Talking, given local delivery reliability) and email (Resend), with a unified template system so all modules send consistent, branded communications.

### 4.4 Audit Logging

Beyond the allocation-specific audit log, all financially significant or status-changing actions (admin overrides, manual payment confirmations, incident resolutions) should write to a shared `audit_log` table capturing actor, action, target entity, and timestamp — important both for internal accountability and for the transparency story this project is built on.

### 4.5 Environment & Deployment

- **Hosting:** Vercel (natural fit for Next.js App Router + Server Actions).
- **Database:** Turso, with a primary instance and edge replicas if/when multi-region read latency becomes relevant (likely unnecessary at pilot scale but trivial to enable later).
- **Background jobs:** Trigger.dev Cloud (or self-hosted later if cost becomes a concern at scale).
- **Media storage:** Cloudinary for maintenance request photos, sponsor impact images, and certificate PDFs.
- **Environments:** `development`, `staging`, `production` — each with isolated Turso databases.

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Availability** | Target 99% uptime for sponsor-facing and payment flows (revenue-critical paths) |
| **Performance** | Dashboard queries should render under 2s on typical Nigerian mobile network conditions (3G/4G) |
| **Scalability** | Schema and architecture should support scaling from one pilot block (10-20 beds) to multi-block, multi-institution deployment without redesign |
| **Security** | All payment webhooks verified via provider signature; sensitive applicant data encrypted at rest where supported by Turso/host environment |
| **Accessibility** | Resident PWA must function on low-end Android devices with intermittent connectivity (offline-tolerant request queuing for maintenance submissions is a nice-to-have for v2) |

---

## 6. Phased Build Plan (Mapped to Business Phasing)

| Phase | Modules in Scope |
|---|---|
| **Phase 0 — Pre-launch fundraising** | Sponsor Dashboard (core: pledges, payments, certificates) |
| **Phase 1 — Pilot (10-20 beds)** | Bed Allocation & Tenant Management, Rent & Payments, basic Finance reporting |
| **Phase 2 — Operational maturity** | Resident App (maintenance + laundromat booking), Security & Access Control, Maintenance & Facilities Management |
| **Phase 3 — Scale** | Full Finance & Reporting suite, multi-block/multi-institution support, wallet-based amenity spend across restaurant/store |

---

## 7. Glossary

- **SAB:** Sponsor a Bed
- **100L:** First-year (100-Level) university student
- **OPEX:** Operating Expenditure (recurring costs)
- **CAPEX:** Capital Expenditure (one-time construction/acquisition costs)
- **PWA:** Progressive Web App
- **RBAC:** Role-Based Access Control

---

*End of Document — v1.0*
