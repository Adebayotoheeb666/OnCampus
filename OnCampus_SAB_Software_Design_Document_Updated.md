**OnCampus**

**Sponsor a Bed (SAB) Accommodation Platform**

Software Design Document

*FUTA Pilot --- Federal University of Technology Akure*

  --------------------- -------------------------------------------------
  **Document Title**    OnCampus SAB Platform --- Software Design
                        Document

  **Version**           2.0 (Detailed, with Screen Specifications)

  **Status**            Draft for Internal Review

  **Prepared For**      OnCampus Project Team

  **Primary Tech        Next.js (App Router), Turso (libSQL) + Drizzle
  Stack**               ORM, Trigger.dev

  **Payment Rails**     Paystack / Flutterwave
  --------------------- -------------------------------------------------

Table of Contents

1\. Document Purpose & Scope

This document specifies the software architecture, modules, data models,
screen-level UI specifications, APIs, and background job design for the
OnCampus platform supporting the Sponsor a Bed (SAB) initiative at the
Federal University of Technology Akure (FUTA).

The platform must support:

-   Public sponsor acquisition and fund tracking (Sponsor Dashboard)

-   Bed inventory, allocation, and tenant lifecycle management

-   Rent and amenity payment processing

-   Resident-facing services (maintenance requests, laundromat booking,
    digital access, in-app wallet)

-   Security and access control logging

-   Facilities and maintenance management

-   Finance and reporting for internal use, FUTA, and sponsors

Out of scope for v1: native mobile apps (PWA only), restaurant
point-of-sale integration (treated as a leased third-party operation in
v1), and full accounting/ERP replacement.

2\. System Overview

2.1 Architectural Style

A modular monolith built on Next.js (App Router), using Server Actions
and Route Handlers for the API layer, with Turso as the primary
relational data store and Trigger.dev handling all asynchronous,
scheduled, and event-driven workflows. A modular monolith is chosen over
microservices because:

-   Team size is small; microservices add operational overhead without
    commensurate benefit at this stage.

-   Modules remain cleanly separated at the code and database-schema
    level, allowing extraction into standalone services later if needed.

-   Turso\'s edge-replica model gives low-latency reads across modules
    without service-to-service network calls.

2.2 High-Level Architecture

The system is organized into three client surfaces (public sponsor site,
admin dashboard, resident PWA), a single Next.js application layer
(Server Actions, Route Handlers, Auth Middleware, Webhook Handlers), a
Drizzle ORM data-access layer over Turso, a Trigger.dev task layer for
background/scheduled work, and a set of external services
(Paystack/Flutterwave, SMS via Termii/Africa\'s Talking, Email via
Resend, Cloudinary for media).

+-----------------------------------------------------------------------+
| Client Layer: Public Sponsor Site \| Admin Dashboard \| Resident PWA  |
|                                                                       |
| \| \| \|                                                              |
|                                                                       |
| Application Layer: Next.js App Router (Server Actions, Route          |
| Handlers,                                                             |
|                                                                       |
| Auth Middleware, Webhook Handlers)                                    |
|                                                                       |
| \|                                                                    |
|                                                                       |
| Data Access Layer: Drizzle ORM \--\> Turso (libSQL) Database          |
|                                                                       |
| \|                                                                    |
|                                                                       |
| Background Layer: Trigger.dev (reminders, payouts, reports, alerts)   |
|                                                                       |
| \|                                                                    |
|                                                                       |
| External Services: Paystack / Flutterwave, Termii / Africa\'s         |
| Talking,                                                              |
|                                                                       |
| Resend (email), Cloudinary (media)                                    |
+-----------------------------------------------------------------------+

2.3 Technology Rationale

  -----------------------------------------------------------------------
  **Component**      **Reason**
  ------------------ ----------------------------------------------------
  Next.js (App       Single codebase for public sponsor site, admin
  Router)            dashboard, and resident PWA; Server Actions reduce
                     boilerplate API code.

  Turso (libSQL)     SQLite-compatible, edge-replicated, low operational
                     cost, suitable for a pilot-stage social venture;
                     embedded replicas reduce dashboard latency.

  Drizzle ORM        Lightweight, SQL-first ORM with strong libSQL/Turso
                     support and TypeScript inference; lower overhead
                     than Prisma for this setup.

  Trigger.dev        Reliable background job orchestration (reminders,
                     reconciliation, reports) without managing custom
                     queues or cron infrastructure.

  Paystack /         Local payment rails supporting bank transfer, card,
  Flutterwave        and USSD --- essential given inconsistent card
                     penetration among Nigerian students.
  -----------------------------------------------------------------------

3.1. Module: Sponsor Dashboard

Purpose

Public-facing platform for individuals, alumni, and corporate sponsors
to discover, fund, and track sponsorship of student beds.

Key Features

-   Public landing page with live funding progress (per bed, per room,
    per cohort)

-   Sponsor registration (individual / organization)

-   One-time and recurring sponsorship options

-   Tiered sponsorship packages (Full Bed / Partial / Maintenance
    Subscription)

-   Automated digital receipt and certificate generation (PDF)

-   Impact reporting view (consented student stories, photos, progress
    updates)

-   Admin-side sponsor CRM (pipeline status: prospect to contacted to
    committed to funded)

Data Model

+-----------------------------------------------------------------------+
| \-- sponsors                                                          |
|                                                                       |
| sponsors (                                                            |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| type TEXT NOT NULL, \-- \'individual\' \| \'organization\'            |
|                                                                       |
| full_name TEXT NOT NULL,                                              |
|                                                                       |
| organization_name TEXT,                                               |
|                                                                       |
| email TEXT NOT NULL,                                                  |
|                                                                       |
| phone TEXT,                                                           |
|                                                                       |
| is_diaspora BOOLEAN DEFAULT FALSE,                                    |
|                                                                       |
| status TEXT DEFAULT \'prospect\', \--                                 |
| prospect\|contacted\|committed\|active\|lapsed                        |
|                                                                       |
| created_at INTEGER NOT NULL,                                          |
|                                                                       |
| updated_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- sponsorship_pledges                                               |
|                                                                       |
| sponsorship_pledges (                                                 |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| sponsor_id TEXT NOT NULL REFERENCES sponsors(id),                     |
|                                                                       |
| bed_id TEXT REFERENCES beds(id),                                      |
|                                                                       |
| tier TEXT NOT NULL, \--                                               |
| \'full_bed\'\|\'partial\'\|\'maintenance_sub\'                        |
|                                                                       |
| amount_pledged INTEGER NOT NULL, \-- kobo                             |
|                                                                       |
| amount_paid INTEGER DEFAULT 0,                                        |
|                                                                       |
| recurring BOOLEAN DEFAULT FALSE,                                      |
|                                                                       |
| recurrence_interval TEXT, \-- \'annual\' \| null                      |
|                                                                       |
| status TEXT DEFAULT \'pending\', \--                                  |
| pending\|partially_paid\|fulfilled\|cancelled                         |
|                                                                       |
| created_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- sponsor_payments                                                  |
|                                                                       |
| sponsor_payments (                                                    |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| pledge_id TEXT NOT NULL REFERENCES sponsorship_pledges(id),           |
|                                                                       |
| amount INTEGER NOT NULL,                                              |
|                                                                       |
| provider TEXT NOT NULL, \--                                           |
| \'paystack\'\|\'flutterwave\'\|\'bank_transfer\'                      |
|                                                                       |
| provider_reference TEXT,                                              |
|                                                                       |
| status TEXT NOT NULL, \-- \'success\'\|\'failed\'\|\'pending\'        |
|                                                                       |
| paid_at INTEGER                                                       |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- sponsor_certificates                                              |
|                                                                       |
| sponsor_certificates (                                                |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| pledge_id TEXT NOT NULL REFERENCES sponsorship_pledges(id),           |
|                                                                       |
| file_url TEXT NOT NULL,                                               |
|                                                                       |
| issued_at INTEGER NOT NULL                                            |
|                                                                       |
| );                                                                    |
+-----------------------------------------------------------------------+

Primary Flows

1.  Sponsor browses available beds, selects a tier, and completes
    payment via Paystack/Flutterwave checkout (Server Action initiates
    transaction; webhook confirms).

2.  On payment confirmation webhook, sponsorship_pledges.amount_paid is
    updated; if fully funded, bed status updates to \'sponsored\' and a
    Trigger.dev job generates and emails the certificate.

3.  Admin manually updates CRM stage for offline/corporate negotiations,
    since large pledges often start as conversations rather than
    self-serve checkout.

Trigger.dev Background Jobs

-   generateSponsorCertificate --- triggered on full payment
    confirmation

-   sendImpactUpdate --- scheduled (e.g., termly) email to active
    sponsors with progress photos/stats

-   recurringPledgeReminder --- checks annual recurring pledges due for
    renewal; sends reminders at 30/14/3 days before due date

-   reconcileFailedPayments --- periodic recheck of pending
    Paystack/Flutterwave transactions against provider API

Screen Details

3.1.1 Public Landing Page

**User role:** *Public / unauthenticated visitor*

**Purpose:** Introduce the Sponsor a Bed initiative, build trust, and
funnel visitors toward sponsoring a bed.

**Layout & key elements:**

-   Hero section: headline, short mission statement, aggregate impact
    counter (beds funded / students housed)

-   Live progress bar showing overall campaign funding (total raised vs.
    target)

-   Featured bed/room cards with photo placeholder, funding percentage,
    and \'Sponsor This Bed\' CTA

-   Trust section: FUTA partnership badge, transparency statement, link
    to financial reporting summary

-   Testimonials/impact stories carousel (consented students only)

-   Footer with contact info, social links, and corporate partnership
    inquiry link

**Primary user actions:**

-   Click \'Sponsor a Bed\' to browse available beds

-   Click a featured bed card to view detail and fund it

-   Submit a corporate partnership inquiry form

3.1.2 Bed/Room Funding Catalogue

**User role:** *Public / unauthenticated visitor*

**Purpose:** Let a prospective sponsor browse all open beds and rooms,
filter by criteria, and select one to fund.

**Layout & key elements:**

-   Filter bar: funding status (open/partially funded), block, gender,
    tier price range

-   Grid of bed cards: bed label, room/block, funding progress bar,
    amount remaining, \'Fund This Bed\' button

-   Sort options: most funded, least funded, newest

**Primary user actions:**

-   Filter/sort the bed catalogue

-   Select a bed to proceed to sponsorship checkout

3.1.3 Sponsorship Checkout Flow

**User role:** *Public visitor becoming a registered sponsor*

**Purpose:** Capture sponsor details, selected tier, and payment in a
low-friction multi-step flow.

**Layout & key elements:**

-   Step 1 --- Sponsor details: name/organization, email, phone,
    individual vs. organization toggle, diaspora checkbox

-   Step 2 --- Tier selection: Full Bed / Partial / Maintenance
    Subscription, with amount shown per tier and a recurring toggle for
    the subscription tier

-   Step 3 --- Payment: embedded Paystack/Flutterwave checkout widget,
    order summary sidebar

-   Step 4 --- Confirmation screen: thank-you message, pledge reference
    number, \'download receipt\' link (available once payment clears)

**Primary user actions:**

-   Enter sponsor details and proceed

-   Select sponsorship tier and amount

-   Complete payment via gateway

-   Download or email receipt/certificate after confirmation

3.1.4 Sponsor Portal --- My Pledges

**User role:** *Authenticated sponsor*

**Purpose:** Give returning sponsors a private view of their pledges,
payment history, and downloadable documents.

**Layout & key elements:**

-   Summary cards: total pledged, total paid, beds funded

-   Table of pledges: bed/tier, amount, status, date, linked certificate
    download

-   Recurring pledge management section (pause/cancel/update payment
    method for subscription tier)

**Primary user actions:**

-   View pledge and payment history

-   Download certificates/receipts

-   Manage recurring subscription settings

3.1.5 Impact Reports Page

**User role:** *Public visitor and authenticated sponsor*

**Purpose:** Build sponsor trust and emotional connection by showing
real, consented outcomes.

**Layout & key elements:**

-   Filterable gallery of impact stories (photo, short bio excerpt,
    sponsor attribution if permitted)

-   Aggregate statistics panel: number of 100L students housed,
    occupancy rate, sponsor retention rate

-   Downloadable termly impact PDF report

**Primary user actions:**

-   Browse impact stories

-   Download the termly impact report

3.1.6 Admin Sponsor CRM Board

**User role:** *Admin / fundraising officer*

**Purpose:** Manage the sponsor pipeline from first contact to fulfilled
pledge, especially for offline/corporate deals.

**Layout & key elements:**

-   Kanban-style board with columns: Prospect, Contacted, Committed,
    Active, Lapsed

-   Sponsor card on each column showing name/organization, potential
    value, last contact date

-   Detail panel on card click: full sponsor profile, communication
    notes, linked pledges, manual status override

**Primary user actions:**

-   Drag sponsor cards between pipeline stages

-   Add contact notes and follow-up reminders

-   Manually create or edit a pledge for an offline-negotiated sponsor

3.2. Module: Bed Allocation & Tenant Management

Purpose

Source-of-truth inventory of all beds, their funding/occupancy status,
and the full tenant lifecycle from application to checkout.

Key Features

-   Bed/room/block inventory management

-   Transparent, rule-based allocation engine for free (sponsored) beds,
    prioritizing 100L students by configurable criteria

-   Application portal for students (free-bed eligibility and paid-bed
    requests)

-   Lease/session tracking with start and end dates

-   Allocation audit log for transparency and dispute resolution

Data Model

+-----------------------------------------------------------------------+
| \-- blocks                                                            |
|                                                                       |
| blocks (                                                              |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| name TEXT NOT NULL, \-- e.g. \'Block A\'                              |
|                                                                       |
| gender TEXT NOT NULL, \-- \'male\'\|\'female\'\|\'mixed\'             |
|                                                                       |
| total_rooms INTEGER NOT NULL                                          |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- rooms                                                             |
|                                                                       |
| rooms (                                                               |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| block_id TEXT NOT NULL REFERENCES blocks(id),                         |
|                                                                       |
| room_number TEXT NOT NULL,                                            |
|                                                                       |
| capacity INTEGER NOT NULL                                             |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- beds                                                              |
|                                                                       |
| beds (                                                                |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| room_id TEXT NOT NULL REFERENCES rooms(id),                           |
|                                                                       |
| bed_label TEXT NOT NULL,                                              |
|                                                                       |
| funding_type TEXT NOT NULL, \-- \'sponsored_target\'\|\'paid\'        |
|                                                                       |
| status TEXT DEFAULT \'available\',\--                                 |
| available\|sponsored\|occupied\|maintenance                           |
|                                                                       |
| current_tenant_id TEXT REFERENCES tenants(id)                         |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- applicants                                                        |
|                                                                       |
| applicants (                                                          |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| full_name TEXT NOT NULL,                                              |
|                                                                       |
| matric_or_jamb_no TEXT NOT NULL,                                      |
|                                                                       |
| level TEXT NOT NULL, \-- \'100L\' etc.                                |
|                                                                       |
| gender TEXT NOT NULL,                                                 |
|                                                                       |
| phone TEXT NOT NULL,                                                  |
|                                                                       |
| email TEXT NOT NULL,                                                  |
|                                                                       |
| state_of_origin TEXT,                                                 |
|                                                                       |
| need_score INTEGER,                                                   |
|                                                                       |
| application_type TEXT NOT NULL, \-- \'free_bed\'\|\'paid_bed\'        |
|                                                                       |
| status TEXT DEFAULT \'submitted\',\--                                 |
| submitted\|under_review\|allocated\|rejected\|waitlisted              |
|                                                                       |
| created_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- tenants                                                           |
|                                                                       |
| tenants (                                                             |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| applicant_id TEXT NOT NULL REFERENCES applicants(id),                 |
|                                                                       |
| bed_id TEXT NOT NULL REFERENCES beds(id),                             |
|                                                                       |
| session_start INTEGER NOT NULL,                                       |
|                                                                       |
| session_end INTEGER NOT NULL,                                         |
|                                                                       |
| tenant_type TEXT NOT NULL, \-- \'sponsored\'\|\'paid\'                |
|                                                                       |
| status TEXT DEFAULT \'active\', \-- active\|checked_out\|defaulted    |
|                                                                       |
| created_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- allocation_audit_log                                              |
|                                                                       |
| allocation_audit_log (                                                |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| applicant_id TEXT NOT NULL REFERENCES applicants(id),                 |
|                                                                       |
| bed_id TEXT,                                                          |
|                                                                       |
| action TEXT NOT NULL, \--                                             |
| \'scored\'\|\'allocated\'\|\'rejected\'\|\'waitlisted\'               |
|                                                                       |
| performed_by TEXT, \-- admin user id, or \'system\'                   |
|                                                                       |
| notes TEXT,                                                           |
|                                                                       |
| created_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
+-----------------------------------------------------------------------+

Primary Flows

4.  Student submits an application (free or paid bed) via the public
    portal.

5.  For free-bed applicants, the system computes a need_score from
    submitted criteria using a configurable weighted formula; admin
    reviews edge cases manually.

6.  An allocation run (manual trigger or scheduled before each session)
    matches the highest-priority applicants to available sponsored beds;
    every decision is written to allocation_audit_log for transparency.

7.  On allocation, a tenants record is created, beds.status is updated,
    and the applicant is notified via SMS/email.

8.  At session end, an automated checkout flow flags the bed as
    available for re-allocation.

Trigger.dev Background Jobs

-   runAllocationCycle --- scheduled batch job (e.g., before each
    academic session) executing the allocation algorithm

-   notifyApplicantOutcome --- triggered on
    allocation/rejection/waitlist status change

-   sessionEndCheckoutSweep --- scheduled job flagging tenants nearing
    session_end for the checkout workflow

Screen Details

3.2.1 Student Application Form

**User role:** *Public / prospective student applicant*

**Purpose:** Capture all information needed to assess eligibility for a
free (sponsored) bed or to request a paid bed.

**Layout & key elements:**

-   Step 1 --- Personal details: full name, JAMB/matric number, level,
    gender, phone, email

-   Step 2 --- Application type toggle: Free Bed (100L sponsorship) vs.
    Paid Bed

-   Step 3 (free-bed only) --- Need assessment questionnaire: household
    income bracket, state of origin/distance from FUTA, guardian status,
    supporting document upload

-   Step 4 --- Review and submit screen with a summary of entered data

-   Confirmation screen with application reference number and expected
    review timeline

**Primary user actions:**

-   Fill and submit the multi-step application

-   Upload supporting documents

-   Receive a reference number for status tracking

3.2.2 Application Status Tracker

**User role:** *Public applicant (lookup by reference number / email)*

**Purpose:** Let applicants check their status without needing a full
account.

**Layout & key elements:**

-   Lookup field: application reference number or email + JAMB number

-   Status timeline: Submitted to Under Review to
    Allocated/Waitlisted/Rejected, with timestamps

-   If allocated: bed/room/block details and move-in instructions

-   If rejected/waitlisted: explanation text and next-step guidance

**Primary user actions:**

-   Look up application status

-   View allocation details if successful

3.2.3 Admin Bed Inventory Grid

**User role:** *Admin / allocation officer*

**Purpose:** Give staff a real-time visual map of every bed across all
blocks and its current status.

**Layout & key elements:**

-   Filter controls: block, gender, status
    (available/sponsored/occupied/maintenance)

-   Grid or floor-plan-style view of rooms and beds, color-coded by
    status

-   Bed detail side panel on click: current tenant (if any), funding
    type, history log

**Primary user actions:**

-   Filter the inventory view

-   Click into a bed to view details or manually change its status
    (e.g., to \'maintenance\')

3.2.4 Admin Allocation Review Queue

**User role:** *Admin / allocation officer*

**Purpose:** Review and process pending applications, especially edge
cases the scoring engine flags for manual review.

**Layout & key elements:**

-   Sortable table of applicants: name, level, application type,
    computed need_score, status

-   Bulk-select tools for running an allocation cycle across selected
    applicants

-   Individual applicant detail view: full questionnaire responses,
    uploaded documents, score breakdown

-   Manual override controls: approve, reject, waitlist, with a required
    notes field

**Primary user actions:**

-   Review individual applications and supporting documents

-   Manually approve, reject, or waitlist an applicant

-   Trigger an allocation cycle run for a batch of applicants

3.2.5 Allocation Audit Log Viewer

**User role:** *Admin / super admin*

**Purpose:** Provide a transparent, searchable record of every
allocation decision for accountability and dispute resolution.

**Layout & key elements:**

-   Searchable/filterable table: applicant, action, bed, performed by,
    timestamp, notes

-   Export-to-CSV button for external review (e.g., FUTA partnership
    reporting)

**Primary user actions:**

-   Search and filter the audit log

-   Export records for reporting

3.2.6 Tenant Checkout Panel

**User role:** *Admin / facilities staff*

**Purpose:** Process end-of-session checkouts and free up beds for
re-allocation.

**Layout & key elements:**

-   List of tenants flagged as approaching session_end

-   Checkout checklist: room inspection notes, key/ID return
    confirmation, outstanding balance check

-   Confirm checkout button, which updates bed status to \'available\'

**Primary user actions:**

-   Review and confirm tenant checkout

-   Log inspection notes or flag damage/outstanding issues

3.3. Module: Rent & Payments

Purpose

Handles all recurring and one-off payments from paid-bed tenants and
amenity usage (laundromat tokens, store credit, optional wallet
top-ups).

Key Features

-   Rent invoicing (per session or installment plans)

-   Payment gateway integration (Paystack/Flutterwave)

-   In-app wallet for amenity spend

-   Installment/microfinance-style payment plans for rent

-   Automated payment reminders and overdue escalation

Data Model

+-----------------------------------------------------------------------+
| \-- invoices                                                          |
|                                                                       |
| invoices (                                                            |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| tenant_id TEXT NOT NULL REFERENCES tenants(id),                       |
|                                                                       |
| invoice_type TEXT NOT NULL, \-- \'rent\'\|\'deposit\'\|\'amenity\'    |
|                                                                       |
| amount_due INTEGER NOT NULL,                                          |
|                                                                       |
| amount_paid INTEGER DEFAULT 0,                                        |
|                                                                       |
| due_date INTEGER NOT NULL,                                            |
|                                                                       |
| status TEXT DEFAULT \'unpaid\', \--                                   |
| unpaid\|partially_paid\|paid\|overdue                                 |
|                                                                       |
| created_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- payments                                                          |
|                                                                       |
| payments (                                                            |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| invoice_id TEXT REFERENCES invoices(id),                              |
|                                                                       |
| wallet_id TEXT REFERENCES wallets(id),                                |
|                                                                       |
| amount INTEGER NOT NULL,                                              |
|                                                                       |
| provider TEXT NOT NULL,                                               |
|                                                                       |
| provider_reference TEXT,                                              |
|                                                                       |
| status TEXT NOT NULL,                                                 |
|                                                                       |
| paid_at INTEGER                                                       |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- payment_plans                                                     |
|                                                                       |
| payment_plans (                                                       |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| invoice_id TEXT NOT NULL REFERENCES invoices(id),                     |
|                                                                       |
| installment_count INTEGER NOT NULL,                                   |
|                                                                       |
| installment_amount INTEGER NOT NULL,                                  |
|                                                                       |
| next_due_date INTEGER NOT NULL                                        |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- wallets                                                           |
|                                                                       |
| wallets (                                                             |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| tenant_id TEXT NOT NULL REFERENCES tenants(id),                       |
|                                                                       |
| balance INTEGER DEFAULT 0, \-- kobo                                   |
|                                                                       |
| updated_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- wallet_transactions                                               |
|                                                                       |
| wallet_transactions (                                                 |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| wallet_id TEXT NOT NULL REFERENCES wallets(id),                       |
|                                                                       |
| type TEXT NOT NULL, \-- \'topup\'\|\'spend\'\|\'refund\'              |
|                                                                       |
| amount INTEGER NOT NULL,                                              |
|                                                                       |
| reference_module TEXT, \-- \'laundromat\'\|\'store\'\|\'restaurant\'  |
|                                                                       |
| created_at INTEGER NOT NULL                                           |
|                                                                       |
| );                                                                    |
+-----------------------------------------------------------------------+

Primary Flows

9.  An invoice is generated automatically on tenant allocation (rent) or
    manually (amenity charges not routed through wallet).

10. Tenant pays via gateway checkout or wallet debit; webhook updates
    payments and invoices.

11. Overdue invoices trigger a reminder cadence; persistent overdue
    status is flagged to admin for manual follow-up, since the eviction
    process is intentionally kept human-in-the-loop rather than
    automated.

Trigger.dev Background Jobs

-   generateSessionInvoices --- scheduled at session start

-   paymentReminderCadence --- staged reminders at 7/3/1 days before due
    date, then overdue escalation

-   reconcileWalletTransactions --- nightly consistency check between
    wallet balance and transaction log

-   installmentDueReminder --- for tenants on a payment plan

Screen Details

3.3.1 Tenant Invoice & Payment Dashboard

**User role:** *Authenticated tenant (resident)*

**Purpose:** Give a resident a single place to view what they owe and
pay it.

**Layout & key elements:**

-   Summary cards: current balance due, next due date, wallet balance

-   Invoice list table: type, amount, due date, status, \'Pay Now\'
    button per row

-   Payment history section with downloadable receipts

**Primary user actions:**

-   View outstanding and past invoices

-   Initiate payment on a specific invoice

-   Download a payment receipt

3.3.2 Payment Checkout Screen

**User role:** *Authenticated tenant*

**Purpose:** Process a payment against a selected invoice via gateway or
wallet.

**Layout & key elements:**

-   Order summary: invoice details, amount due

-   Payment method selector: card/bank transfer/USSD (gateway) or wallet
    balance

-   Embedded Paystack/Flutterwave widget when gateway is selected

-   Confirmation screen with updated invoice status

**Primary user actions:**

-   Select a payment method

-   Complete payment

-   View confirmation and updated balance

3.3.3 Wallet Top-Up Screen

**User role:** *Authenticated tenant*

**Purpose:** Allow a resident to pre-fund their in-app wallet for
amenity spend (laundromat, store).

**Layout & key elements:**

-   Current wallet balance display

-   Top-up amount input with quick-select buttons (e.g., 1,000 / 2,000 /
    5,000 naira)

-   Gateway checkout for the top-up transaction

-   Recent wallet transaction list (top-ups, spends, refunds)

**Primary user actions:**

-   Enter or select a top-up amount

-   Complete the top-up payment

-   Review recent wallet activity

3.3.4 Payment Plan Setup Screen

**User role:** *Authenticated tenant or admin (on tenant\'s behalf)*

**Purpose:** Let an eligible tenant split a rent invoice into
installments.

**Layout & key elements:**

-   Invoice summary with total amount due

-   Installment count selector (e.g., 2, 3, or 4 installments) with
    computed per-installment amount

-   Schedule preview table: installment number, amount, due date

-   Confirm plan button

**Primary user actions:**

-   Select number of installments

-   Review and confirm the payment schedule

3.3.5 Admin Invoice Management

**User role:** *Admin / finance officer*

**Purpose:** Give finance staff full visibility and control over all
invoices across all tenants.

**Layout & key elements:**

-   Filterable table: tenant name, invoice type, amount, status, due
    date

-   Bulk actions: generate invoices for a new session, export to CSV

-   Manual invoice creation form for ad-hoc charges

**Primary user actions:**

-   Filter and search invoices

-   Manually create or adjust an invoice

-   Export invoice data for reporting

3.3.6 Overdue Accounts Dashboard

**User role:** *Admin / finance officer*

**Purpose:** Surface tenants with overdue payments so staff can follow
up before escalation is needed.

**Layout & key elements:**

-   List of overdue invoices sorted by days overdue, with tenant contact
    details

-   Reminder cadence status indicator per invoice (which automated
    reminders have been sent)

-   Manual action buttons: send custom reminder, flag for in-person
    follow-up, log a payment arrangement note

**Primary user actions:**

-   Review overdue accounts

-   Send a manual reminder or log a follow-up note

3.4. Module: Resident App (PWA)

Purpose

Mobile-first progressive web app for residents covering daily-use
features: maintenance requests, laundromat booking, digital access,
wallet, and community communication.

Key Features

-   Maintenance request submission with photo upload and status tracking

-   Laundromat slot booking and queue management

-   Digital resident ID (QR code) for gate access

-   Wallet balance and amenity spend history

-   Announcements and community board

-   Visitor pre-registration

Data Model

+-----------------------------------------------------------------------+
| \-- maintenance_requests                                              |
|                                                                       |
| maintenance_requests (                                                |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| tenant_id TEXT NOT NULL REFERENCES tenants(id),                       |
|                                                                       |
| category TEXT NOT NULL, \--                                           |
| \'plumbing\'\|\'electrical\'\|\'structural\'\|\'other\'               |
|                                                                       |
| description TEXT NOT NULL,                                            |
|                                                                       |
| photo_url TEXT,                                                       |
|                                                                       |
| priority TEXT DEFAULT \'normal\',\-- low\|normal\|high\|urgent        |
|                                                                       |
| status TEXT DEFAULT \'open\', \--                                     |
| open\|assigned\|in_progress\|resolved                                 |
|                                                                       |
| assigned_to TEXT,                                                     |
|                                                                       |
| created_at INTEGER NOT NULL,                                          |
|                                                                       |
| resolved_at INTEGER                                                   |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- laundromat_machines                                               |
|                                                                       |
| laundromat_machines (                                                 |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| machine_label TEXT NOT NULL,                                          |
|                                                                       |
| status TEXT DEFAULT \'available\' \-- available\|in_use\|out_of_order |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- laundromat_bookings                                               |
|                                                                       |
| laundromat_bookings (                                                 |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| machine_id TEXT NOT NULL REFERENCES laundromat_machines(id),          |
|                                                                       |
| tenant_id TEXT NOT NULL REFERENCES tenants(id),                       |
|                                                                       |
| slot_start INTEGER NOT NULL,                                          |
|                                                                       |
| slot_end INTEGER NOT NULL,                                            |
|                                                                       |
| status TEXT DEFAULT \'booked\' \--                                    |
| booked\|completed\|no_show\|cancelled                                 |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- announcements                                                     |
|                                                                       |
| announcements (                                                       |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| title TEXT NOT NULL,                                                  |
|                                                                       |
| body TEXT NOT NULL,                                                   |
|                                                                       |
| audience TEXT DEFAULT \'all\', \--                                    |
| all\|block_specific\|gender_specific                                  |
|                                                                       |
| published_at INTEGER NOT NULL                                         |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- visitor_logs                                                      |
|                                                                       |
| visitor_logs (                                                        |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| tenant_id TEXT NOT NULL REFERENCES tenants(id),                       |
|                                                                       |
| visitor_name TEXT NOT NULL,                                           |
|                                                                       |
| visitor_phone TEXT,                                                   |
|                                                                       |
| expected_arrival INTEGER,                                             |
|                                                                       |
| checked_in_at INTEGER,                                                |
|                                                                       |
| checked_out_at INTEGER,                                               |
|                                                                       |
| status TEXT DEFAULT \'expected\' \--                                  |
| expected\|checked_in\|checked_out\|no_show                            |
|                                                                       |
| );                                                                    |
+-----------------------------------------------------------------------+

Primary Flows

12. Resident submits a maintenance request, which is routed to the
    Facilities module and remains visible in real time to the resident.

13. Resident books a laundromat slot; the system prevents double-booking
    via a slot-overlap check on laundromat_bookings.

14. Resident pre-registers a visitor; security gate staff verify the
    visitor against visitor_logs at entry (cross-module link to the
    Security module).

Trigger.dev Background Jobs

-   maintenanceSLAEscalation --- flags requests unresolved beyond an SLA
    threshold (e.g., 48 hours) to admin

-   laundromatSlotReminder --- push/SMS reminder shortly before a booked
    slot

-   noShowSweep --- marks bookings as no-show if not checked in within
    the grace period, freeing the slot

Screen Details

3.4.1 Resident Home / Dashboard

**User role:** *Authenticated resident*

**Purpose:** Serve as the resident\'s landing screen with quick access
to all key features and at-a-glance status.

**Layout & key elements:**

-   Header with resident name, room/bed assignment, and digital ID
    quick-access icon

-   Quick-action tiles: Report an Issue, Book Laundry, My Wallet,
    Visitor Pass

-   Recent announcements preview (top 2-3)

-   Open maintenance request status summary

**Primary user actions:**

-   Navigate to any core feature via quick-action tiles

-   Tap into announcements or maintenance status for detail

3.4.2 Maintenance Request Form

**User role:** *Authenticated resident*

**Purpose:** Let a resident report a facility issue quickly, including
photo evidence.

**Layout & key elements:**

-   Category selector: plumbing / electrical / structural / other
    (icon-based)

-   Description text area

-   Photo upload (camera or gallery)

-   Priority indicator (auto-suggested, resident can flag as urgent)

-   Submit button

**Primary user actions:**

-   Select issue category

-   Describe the issue and attach a photo

-   Submit the request

3.4.3 My Maintenance Requests

**User role:** *Authenticated resident*

**Purpose:** Track the status of all previously submitted requests.

**Layout & key elements:**

-   List of requests with category icon, short description, status badge
    (Open/Assigned/In Progress/Resolved), date submitted

-   Detail view per request: full description, photo, status history
    timeline, staff notes if any

**Primary user actions:**

-   View list and filter by status

-   Open a request for full detail

3.4.4 Laundromat Booking Screen

**User role:** *Authenticated resident*

**Purpose:** Let a resident reserve a laundry machine slot and avoid
conflicts/queueing disputes.

**Layout & key elements:**

-   Calendar/time-slot grid showing machine availability for the day

-   Machine status indicators (available/in use/out of order)

-   Slot selection and confirm-booking button

-   \'My upcoming bookings\' list with cancel option

**Primary user actions:**

-   Select an available time slot and machine

-   Confirm or cancel a booking

3.4.5 Digital Resident ID / QR Screen

**User role:** *Authenticated resident*

**Purpose:** Provide a scannable credential for gate access, replacing
manual logbooks.

**Layout & key elements:**

-   Large QR code display with resident photo, name, and bed/room
    reference

-   Validity indicator (active session dates)

-   Brightness-boost mode for easy scanning

**Primary user actions:**

-   Present QR code at the gate for scanning

3.4.6 Announcements Feed

**User role:** *Authenticated resident*

**Purpose:** Keep residents informed of community news, rules, and
emergency notices.

**Layout & key elements:**

-   Reverse-chronological feed of announcement cards: title, excerpt,
    publish date, audience tag

-   Pinned/urgent announcements highlighted at the top

**Primary user actions:**

-   Scroll and read announcements

-   Tap to expand full announcement text

3.4.7 Visitor Pre-Registration Form

**User role:** *Authenticated resident*

**Purpose:** Let a resident register an expected visitor ahead of
arrival to speed up gate verification.

**Layout & key elements:**

-   Visitor name and phone number fields

-   Expected arrival date/time picker

-   List of previously registered/upcoming visitors with status
    (expected/checked in/checked out)

**Primary user actions:**

-   Register a new expected visitor

-   View status of previously registered visitors

3.4.8 Wallet & Transaction History

**User role:** *Authenticated resident*

**Purpose:** Show current wallet balance and a log of amenity spend.

**Layout & key elements:**

-   Balance display with \'Top Up\' shortcut

-   Transaction list: date, type (top-up/spend/refund), amount, linked
    module (laundromat/store/restaurant)

**Primary user actions:**

-   View transaction history

-   Navigate to top-up screen

3.5. Module: Security & Access Control

Purpose

Manages gate access logging, visitor verification, and incident
reporting to address the safety priorities identified for the project,
particularly for female residents.

Key Features

-   QR/ID-based resident check-in/out logging

-   Visitor verification against the pre-registered list

-   Incident reporting and escalation

-   Integration point for CCTV/gate hardware (future phase)

Data Model

+-----------------------------------------------------------------------+
| \-- access_logs                                                       |
|                                                                       |
| access_logs (                                                         |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| tenant_id TEXT REFERENCES tenants(id),                                |
|                                                                       |
| visitor_log_id TEXT REFERENCES visitor_logs(id),                      |
|                                                                       |
| direction TEXT NOT NULL, \-- \'in\'\|\'out\'                          |
|                                                                       |
| gate_id TEXT NOT NULL,                                                |
|                                                                       |
| recorded_by TEXT, \-- security staff id                               |
|                                                                       |
| timestamp INTEGER NOT NULL                                            |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- incidents                                                         |
|                                                                       |
| incidents (                                                           |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| reported_by TEXT NOT NULL,                                            |
|                                                                       |
| category TEXT NOT NULL, \--                                           |
| \'theft\'\|\'altercation\'\|\'safety_hazard\'\|\'other\'              |
|                                                                       |
| description TEXT NOT NULL,                                            |
|                                                                       |
| severity TEXT DEFAULT \'low\', \-- low\|medium\|high\|critical        |
|                                                                       |
| status TEXT DEFAULT \'open\', \-- open\|investigating\|resolved       |
|                                                                       |
| created_at INTEGER NOT NULL,                                          |
|                                                                       |
| resolved_at INTEGER                                                   |
|                                                                       |
| );                                                                    |
+-----------------------------------------------------------------------+

Primary Flows

15. Security staff scan a resident\'s QR ID or verify a pre-registered
    visitor against visitor_logs at the gate; entry is logged to
    access_logs.

16. Any incident logged by staff or a resident creates an incidents
    record; high or critical severity triggers immediate admin
    notification.

Trigger.dev Background Jobs

-   criticalIncidentAlert --- immediate SMS/email to the admin team when
    severity is \'critical\'

-   dailyAccessSummary --- end-of-day digest of access logs and
    anomalies (e.g., unregistered visitor entries) for admin review

Screen Details

3.5.1 Gate Check-In Scanner Screen

**User role:** *Security staff (gate post)*

**Purpose:** Quickly verify and log residents entering or exiting via QR
scan.

**Layout & key elements:**

-   Camera viewfinder for QR scanning, large and centered for fast use

-   Scan result panel: resident photo, name, room/bed, validity status
    (active/expired)

-   Manual entry fallback (search by name/room) if QR scan fails

-   In/Out toggle for logging direction

**Primary user actions:**

-   Scan a resident\'s QR code

-   Confirm entry/exit log

-   Fall back to manual lookup if needed

3.5.2 Visitor Verification Screen

**User role:** *Security staff (gate post)*

**Purpose:** Confirm an arriving visitor against the resident\'s
pre-registration before granting access.

**Layout & key elements:**

-   Search field: visitor name or resident name/room

-   Matched visitor record display: expected arrival window, visitor
    phone, registering resident

-   Approve entry / deny entry buttons

-   Walk-in visitor fallback form for unregistered visitors (requires
    resident phone confirmation)

**Primary user actions:**

-   Search for a pre-registered visitor

-   Approve or deny entry

-   Log a walk-in (unregistered) visitor with resident confirmation

3.5.3 Incident Report Form

**User role:** *Security staff or resident*

**Purpose:** Capture details of a safety or security incident for
follow-up.

**Layout & key elements:**

-   Category selector: theft / altercation / safety hazard / other

-   Description text area

-   Severity selector (auto-suggested, can be overridden)

-   Location field and optional photo attachment

**Primary user actions:**

-   Select category and severity

-   Describe the incident and submit

3.5.4 Admin Access Logs Dashboard

**User role:** *Admin / security supervisor*

**Purpose:** Give oversight staff a searchable, auditable view of all
gate activity.

**Layout & key elements:**

-   Filterable table: timestamp, resident/visitor name, direction, gate,
    recorded by

-   Anomaly flags highlighted (e.g., entry without matching exit,
    unregistered visitor entries)

-   Export-to-CSV for periodic security review

**Primary user actions:**

-   Filter and search access logs

-   Export logs for review or reporting

3.5.5 Incident Management Board

**User role:** *Admin / security supervisor*

**Purpose:** Track all reported incidents from open through resolution.

**Layout & key elements:**

-   Board or list view grouped by status: Open / Investigating /
    Resolved

-   Incident card: category, severity badge, reporter, date

-   Detail panel: full description, photo, resolution notes field,
    status update control

**Primary user actions:**

-   Review incident details

-   Update status and add resolution notes

3.6. Module: Maintenance & Facilities Management

Purpose

Internal tool for tracking recurring facility upkeep (generator
servicing, water tank cleaning, pest control) alongside reactive
maintenance requests from the Resident App.

Key Features

-   Preventive maintenance scheduling

-   Vendor/staff assignment and cost tracking

-   Asset registry (generator, boreholes, laundromat machines, etc.)

Data Model

+-----------------------------------------------------------------------+
| \-- assets                                                            |
|                                                                       |
| assets (                                                              |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| name TEXT NOT NULL, \-- \'Generator 1\', \'Borehole Pump A\'          |
|                                                                       |
| category TEXT NOT NULL,                                               |
|                                                                       |
| install_date INTEGER,                                                 |
|                                                                       |
| last_serviced INTEGER,                                                |
|                                                                       |
| service_interval_days INTEGER                                         |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- maintenance_schedules                                             |
|                                                                       |
| maintenance_schedules (                                               |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| asset_id TEXT NOT NULL REFERENCES assets(id),                         |
|                                                                       |
| scheduled_date INTEGER NOT NULL,                                      |
|                                                                       |
| status TEXT DEFAULT \'scheduled\', \-- scheduled\|completed\|overdue  |
|                                                                       |
| cost INTEGER,                                                         |
|                                                                       |
| vendor TEXT                                                           |
|                                                                       |
| );                                                                    |
+-----------------------------------------------------------------------+

Primary Flows

17. The system computes the next service date from assets.last_serviced
    plus service_interval_days.

18. A scheduled job creates upcoming maintenance_schedules entries and
    alerts facilities staff in advance.

19. On completion, staff log the actual cost and date, updating
    assets.last_serviced.

Trigger.dev Background Jobs

-   generateUpcomingMaintenanceSchedule --- rolling job creating
    schedule entries ahead of due dates

-   overdueMaintenanceAlert --- flags assets past due for servicing

Screen Details

3.6.1 Asset Registry

**User role:** *Admin / facilities staff*

**Purpose:** Maintain a complete inventory of physical assets requiring
upkeep.

**Layout & key elements:**

-   Table of assets: name, category, install date, last serviced date,
    service interval

-   Add/edit asset form

-   Asset detail view with full service history

**Primary user actions:**

-   Add a new asset

-   Edit asset details or service interval

-   View an asset\'s service history

3.6.2 Maintenance Schedule Calendar

**User role:** *Admin / facilities staff*

**Purpose:** Visualize upcoming and overdue preventive maintenance
across all assets.

**Layout & key elements:**

-   Calendar view with scheduled service dates per asset

-   Color coding: scheduled (upcoming), overdue (red), completed (green)

-   List view toggle for a simpler chronological view

**Primary user actions:**

-   View upcoming and overdue maintenance

-   Click an entry to view or update details

3.6.3 Service Completion Form

**User role:** *Admin / facilities staff*

**Purpose:** Record that a scheduled or ad-hoc maintenance task has been
completed.

**Layout & key elements:**

-   Asset and scheduled task reference (auto-filled if coming from the
    calendar)

-   Completion date field

-   Cost incurred field

-   Vendor/technician name field

-   Notes field for work performed

**Primary user actions:**

-   Mark a task complete and log cost/vendor/notes

3.6.4 Overdue Maintenance Alerts Panel

**User role:** *Admin / facilities supervisor*

**Purpose:** Surface assets that have missed their service window so
they are not forgotten.

**Layout & key elements:**

-   List of overdue assets sorted by days overdue

-   Quick action to reschedule or mark complete

**Primary user actions:**

-   Review overdue items

-   Reschedule or complete a maintenance task

3.7. Module: Finance & Reporting Dashboard

Purpose

Consolidated, auditable view of all financial activity for internal
management, FUTA partnership reporting, and sponsor transparency.

Key Features

-   Revenue breakdown by source (rent, amenities, sponsorships)

-   OPEX tracking (maintenance costs, utilities, staff)

-   Free-bed vs. paid-bed cost coverage ratio (the core sustainability
    metric)

-   Exportable reports (PDF/CSV) for FUTA and sponsor communications

Data Model

+-----------------------------------------------------------------------+
| \-- opex_entries                                                      |
|                                                                       |
| opex_entries (                                                        |
|                                                                       |
| id TEXT PRIMARY KEY,                                                  |
|                                                                       |
| category TEXT NOT NULL, \--                                           |
| \'utilities\'\|\'staff\'\|\'security\'\|\'misc\'                      |
|                                                                       |
| amount INTEGER NOT NULL,                                              |
|                                                                       |
| description TEXT,                                                     |
|                                                                       |
| incurred_at INTEGER NOT NULL,                                         |
|                                                                       |
| entered_by TEXT NOT NULL                                              |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- Note: this module is primarily a read/aggregation layer over data |
|                                                                       |
| \-- already captured in the Sponsor, Rent, and Maintenance modules,   |
| plus                                                                  |
|                                                                       |
| \-- this lightweight ledger for OPEX not otherwise captured (e.g.     |
| salaries).                                                            |
+-----------------------------------------------------------------------+

Primary Flows

20. The dashboard queries aggregate sponsor_payments, payments,
    maintenance_schedules.cost, and opex_entries into period-based
    summaries (monthly/termly/annual).

21. A scheduled job compiles and emails a recurring report to
    admin/board; an on-demand export is available for FUTA or sponsor
    meetings.

Trigger.dev Background Jobs

-   compileFinancialReport --- scheduled monthly/termly report
    generation and distribution

-   freeBedCoverageRatioCheck --- periodic recalculation of the
    sustainability ratio (paid-bed and amenity margin vs. free-bed
    cost), alerting admin if it drops below a defined safety threshold

Screen Details

3.7.1 Finance Overview Dashboard

**User role:** *Admin / finance officer / leadership*

**Purpose:** Give a single at-a-glance view of the project\'s financial
health.

**Layout & key elements:**

-   Summary cards: total revenue (period), total OPEX (period), net
    position, free-bed coverage ratio gauge

-   Revenue-by-source chart (rent, amenities, sponsorships)

-   OPEX-by-category chart (utilities, staff, security, misc)

-   Period selector (monthly/termly/annual/custom range)

**Primary user actions:**

-   Switch reporting period

-   Drill into a chart segment for transaction-level detail

3.7.2 Revenue Breakdown Report

**User role:** *Admin / finance officer*

**Purpose:** Provide detailed line-item revenue data for internal review
and external reporting.

**Layout & key elements:**

-   Table of revenue entries grouped by source, with date, amount, and
    reference (invoice/pledge ID)

-   Subtotal rows per source category

-   Export to PDF/CSV button

**Primary user actions:**

-   Filter by source or date range

-   Export the report

3.7.3 OPEX Entry Form

**User role:** *Admin / finance officer*

**Purpose:** Manually log operating costs not automatically captured by
other modules (e.g., staff salaries).

**Layout & key elements:**

-   Category selector: utilities / staff / security / misc

-   Amount field, description field, date incurred field

**Primary user actions:**

-   Log a new OPEX entry

3.7.4 Free-Bed Coverage Ratio Widget

**User role:** *Admin / finance officer / leadership*

**Purpose:** Visualize the core sustainability metric: whether paid-bed
and amenity margins are sufficient to cover the cost of free 100L beds.

**Layout & key elements:**

-   Gauge or ratio visualization with safe/warning/critical zones

-   Trend line over recent periods

-   Alert banner if the ratio has dropped below the defined safety
    threshold

**Primary user actions:**

-   Monitor the ratio and review trend history

-   Acknowledge or act on a low-ratio alert

3.7.5 Report Export / Generator Screen

**User role:** *Admin / finance officer*

**Purpose:** Produce polished, shareable reports for FUTA partnership
meetings and sponsor communications.

**Layout & key elements:**

-   Report type selector: Financial Summary / Sponsor Impact / FUTA
    Partnership Report

-   Period and audience selector

-   Preview pane before export

-   Export as PDF or CSV

**Primary user actions:**

-   Select report type and period

-   Preview and export the report

4\. Cross-Cutting Concerns

4.1 Authentication & Authorization

-   Resident/Sponsor auth: passwordless email/SMS OTP, reducing friction
    for students and sponsors; session managed via signed cookies.

-   Admin/Staff auth: email + password with role-based access control
    (RBAC).

-   Roles: super_admin, allocation_officer, finance_officer,
    facilities_staff, security_staff, sponsor (read-only on own data),
    resident (read/write on own data only).

-   Authorization is enforced at the Server Action / Route Handler level
    via middleware checking role claims, not only at the UI layer.

4.2 Data Privacy

-   Applicant need_score inputs (income indicators, family background)
    are sensitive; access is restricted to allocation_officer and
    super_admin roles only.

-   Public impact reporting (sponsor-facing) requires explicit student
    consent before any name or photo is published; the default is
    anonymized statistics unless a consent flag is set.

4.3 Notifications Layer

A shared internal service handles dispatch to SMS (Termii or Africa\'s
Talking, given local delivery reliability) and email (Resend), with a
unified template system so all modules send consistent, branded
communications.

4.4 Audit Logging

Beyond the allocation-specific audit log, all financially significant or
status-changing actions (admin overrides, manual payment confirmations,
incident resolutions) write to a shared audit_log table capturing actor,
action, target entity, and timestamp --- important both for internal
accountability and for the transparency story this project is built on.

4.5 Environment & Deployment

  -----------------------------------------------------------------------
  **Layer**          **Choice**
  ------------------ ----------------------------------------------------
  Hosting            Vercel (natural fit for Next.js App Router and
                     Server Actions)

  Database           Turso, with a primary instance and edge replicas
                     enabled later if multi-region read latency becomes
                     relevant

  Background jobs    Trigger.dev Cloud, with self-hosting considered
                     later if cost becomes a concern at scale

  Media storage      Cloudinary for maintenance photos, sponsor impact
                     images, and certificate PDFs

  Environments       development, staging, production --- each with
                     isolated Turso databases
  -----------------------------------------------------------------------

5\. Non-Functional Requirements

  -----------------------------------------------------------------------
  **Category**     **Requirement**
  ---------------- ------------------------------------------------------
  Availability     Target 99% uptime for sponsor-facing and payment
                   flows, which are revenue-critical paths.

  Performance      Dashboard queries should render in under 2 seconds on
                   typical Nigerian mobile network conditions (3G/4G).

  Scalability      Schema and architecture should support scaling from
                   one pilot block (10-20 beds) to multi-block,
                   multi-institution deployment without redesign.

  Security         All payment webhooks are verified via provider
                   signature; sensitive applicant data is encrypted at
                   rest where supported by the Turso/host environment.

  Accessibility    The Resident PWA must function on low-end Android
                   devices with intermittent connectivity;
                   offline-tolerant request queuing for maintenance
                   submissions is a nice-to-have for v2.
  -----------------------------------------------------------------------

6\. Phased Build Plan

This sequencing maps the technical build to the business phasing of the
Sponsor a Bed initiative, ensuring development effort tracks real
operational need rather than building speculative features ahead of
demand.

  -----------------------------------------------------------------------
  **Phase**                **Modules in Scope**
  ------------------------ ----------------------------------------------
  Phase 0 --- Pre-launch   Sponsor Dashboard (core: pledges, payments,
  fundraising              certificates)

  Phase 1 --- Pilot (10-20 Bed Allocation & Tenant Management, Rent &
  beds)                    Payments, basic Finance reporting

  Phase 2 --- Operational  Resident App (maintenance + laundromat
  maturity                 booking), Security & Access Control,
                           Maintenance & Facilities Management

  Phase 3 --- Scale        Full Finance & Reporting suite,
                           multi-block/multi-institution support,
                           wallet-based amenity spend across
                           restaurant/store
  -----------------------------------------------------------------------

7\. Glossary

  -----------------------------------------------------------------------
  **Term**           **Definition**
  ------------------ ----------------------------------------------------
  SAB                Sponsor a Bed

  100L               First-year (100-Level) university student

  OPEX               Operating Expenditure --- recurring costs

  CAPEX              Capital Expenditure --- one-time
                     construction/acquisition costs

  PWA                Progressive Web App

  RBAC               Role-Based Access Control
  -----------------------------------------------------------------------

*--- End of Document, v2.0 ---*
