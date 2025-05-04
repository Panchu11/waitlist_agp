-- Create the waitlist_entries table
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  wallet TEXT NOT NULL,
  referral_code TEXT NOT NULL,
  referred_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create index on created_at
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_entries (created_at);
