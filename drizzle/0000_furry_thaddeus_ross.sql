CREATE TABLE `audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text,
	`action` text NOT NULL,
	`target_entity` text NOT NULL,
	`target_id` text,
	`metadata` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`full_name` text NOT NULL,
	`password_hash` text,
	`role` text NOT NULL,
	`sponsor_id` text,
	`tenant_id` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `otp_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`code` text NOT NULL,
	`purpose` text NOT NULL,
	`expires_at` integer NOT NULL,
	`used_at` integer,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `beds` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`bed_label` text NOT NULL,
	`funding_type` text NOT NULL,
	`status` text DEFAULT 'available',
	`current_tenant_id` text,
	`target_amount_kobo` integer DEFAULT 0 NOT NULL,
	`funded_amount_kobo` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`gender` text NOT NULL,
	`total_rooms` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`block_id` text NOT NULL,
	`room_number` text NOT NULL,
	`capacity` integer NOT NULL,
	FOREIGN KEY (`block_id`) REFERENCES `blocks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sponsor_certificates` (
	`id` text PRIMARY KEY NOT NULL,
	`pledge_id` text NOT NULL,
	`file_url` text NOT NULL,
	`issuedAt` integer NOT NULL,
	FOREIGN KEY (`pledge_id`) REFERENCES `sponsorship_pledges`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sponsor_payments` (
	`id` text PRIMARY KEY NOT NULL,
	`pledge_id` text NOT NULL,
	`amount` integer NOT NULL,
	`provider` text NOT NULL,
	`provider_reference` text,
	`status` text NOT NULL,
	`paid_at` integer,
	FOREIGN KEY (`pledge_id`) REFERENCES `sponsorship_pledges`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sponsors` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`full_name` text NOT NULL,
	`organization_name` text,
	`email` text NOT NULL,
	`phone` text,
	`is_diaspora` integer DEFAULT false,
	`status` text DEFAULT 'prospect',
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sponsorship_pledges` (
	`id` text PRIMARY KEY NOT NULL,
	`sponsor_id` text NOT NULL,
	`bed_id` text,
	`tier` text NOT NULL,
	`amount_pledged` integer NOT NULL,
	`amount_paid` integer DEFAULT 0,
	`recurring` integer DEFAULT false,
	`recurrence_interval` text,
	`status` text DEFAULT 'pending',
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bed_id`) REFERENCES `beds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `allocation_audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`applicant_id` text NOT NULL,
	`bed_id` text,
	`action` text NOT NULL,
	`performed_by` text,
	`notes` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bed_id`) REFERENCES `beds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `applicants` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`matric_or_jamb_no` text NOT NULL,
	`level` text NOT NULL,
	`gender` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`state_of_origin` text,
	`need_score` integer,
	`need_assessment_json` text,
	`application_type` text NOT NULL,
	`status` text DEFAULT 'submitted',
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` text PRIMARY KEY NOT NULL,
	`applicant_id` text NOT NULL,
	`bed_id` text NOT NULL,
	`session_start` integer NOT NULL,
	`session_end` integer NOT NULL,
	`tenant_type` text NOT NULL,
	`status` text DEFAULT 'active',
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bed_id`) REFERENCES `beds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`invoice_type` text NOT NULL,
	`amount_due` integer NOT NULL,
	`amount_paid` integer DEFAULT 0,
	`due_date` integer NOT NULL,
	`status` text DEFAULT 'unpaid',
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payment_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text NOT NULL,
	`installment_count` integer NOT NULL,
	`installment_amount` integer NOT NULL,
	`next_due_date` integer NOT NULL,
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text,
	`wallet_id` text,
	`amount` integer NOT NULL,
	`provider` text NOT NULL,
	`provider_reference` text,
	`status` text NOT NULL,
	`paid_at` integer,
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallet_transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`wallet_id` text NOT NULL,
	`type` text NOT NULL,
	`amount` integer NOT NULL,
	`reference_module` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`balance` integer DEFAULT 0,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `opex_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`amount` integer NOT NULL,
	`description` text,
	`incurred_at` integer NOT NULL,
	`entered_by` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `impact_stories` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`photo_url` text,
	`sponsor_attribution` text,
	`consent_granted` integer DEFAULT false NOT NULL,
	`published_at` integer
);
--> statement-breakpoint
CREATE TABLE `announcements` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`audience` text DEFAULT 'all',
	`publishedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `laundromat_bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`machine_id` text NOT NULL,
	`tenant_id` text NOT NULL,
	`slot_start` integer NOT NULL,
	`slot_end` integer NOT NULL,
	`status` text DEFAULT 'booked',
	FOREIGN KEY (`machine_id`) REFERENCES `laundromat_machines`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `laundromat_machines` (
	`id` text PRIMARY KEY NOT NULL,
	`machine_label` text NOT NULL,
	`status` text DEFAULT 'available'
);
--> statement-breakpoint
CREATE TABLE `maintenance_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`photo_url` text,
	`priority` text DEFAULT 'normal',
	`status` text DEFAULT 'open',
	`assigned_to` text,
	`createdAt` integer NOT NULL,
	`resolved_at` integer,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `visitor_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`visitor_name` text NOT NULL,
	`visitor_phone` text,
	`expected_arrival` integer,
	`checked_in_at` integer,
	`checked_out_at` integer,
	`status` text DEFAULT 'expected',
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `access_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text,
	`visitor_log_id` text,
	`direction` text NOT NULL,
	`gate_id` text NOT NULL,
	`recorded_by` text,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`visitor_log_id`) REFERENCES `visitor_logs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` text PRIMARY KEY NOT NULL,
	`reported_by` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`severity` text DEFAULT 'low',
	`status` text DEFAULT 'open',
	`createdAt` integer NOT NULL,
	`resolved_at` integer
);
--> statement-breakpoint
CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`install_date` integer,
	`last_serviced` integer,
	`service_interval_days` integer
);
--> statement-breakpoint
CREATE TABLE `maintenance_schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`scheduled_date` integer NOT NULL,
	`status` text DEFAULT 'scheduled',
	`cost` integer,
	`vendor` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
