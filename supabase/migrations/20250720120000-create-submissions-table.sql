-- Migration: Create submissions table for user code submissions

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  problem_id int references problems(id) not null,
  code text not null,
  language text not null,
  output text,
  error text,
  passed boolean,
  testcases jsonb,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Index for fast lookup by user and problem
create index if not exists idx_submissions_user_problem on submissions(user_id, problem_id); 