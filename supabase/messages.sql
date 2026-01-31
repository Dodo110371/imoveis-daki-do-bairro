
-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert messages (public form)
CREATE POLICY "Enable insert for everyone" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow only authenticated users (admins) to view messages
-- For now, implicit denial for select (public can't read).
