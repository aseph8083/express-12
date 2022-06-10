CREATE TABLE IF NOT EXISTS public.courses
(
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36),
    name VARCHAR(100),
    excerpt VARCHAR(255),
    learn_summary TEXT,
    requirement TEXT,
    description TEXT,
    
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_courses_user_id ON public.courses (user_id);