-- Add new columns to problems table for LeetCode-style functionality
ALTER TABLE public.problems
ADD COLUMN IF NOT EXISTS examples JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS constraints TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS starter_code JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS test_cases JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS function_signature TEXT,
ADD COLUMN IF NOT EXISTS companies TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS topics TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Add helpful comment
COMMENT ON COLUMN public.problems.examples IS 'Array of example objects with input, output, and optional explanation';
COMMENT ON COLUMN public.problems.constraints IS 'Array of constraint strings';
COMMENT ON COLUMN public.problems.starter_code IS 'Object with language keys (python, javascript, java, cpp) containing starter code';
COMMENT ON COLUMN public.problems.test_cases IS 'Array of test case objects with input and expected output';
COMMENT ON COLUMN public.problems.function_signature IS 'Function signature template for the problem';
COMMENT ON COLUMN public.problems.companies IS 'Array of company names that ask this problem';
COMMENT ON COLUMN public.problems.topics IS 'Array of topic/tag strings for categorization';