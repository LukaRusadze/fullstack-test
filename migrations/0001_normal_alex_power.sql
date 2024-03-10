ALTER TABLE "user" ALTER COLUMN "emailVerified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" DROP NOT NULL;