SET check_function_bodies = false;
CREATE TABLE public.todo (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "isDone" boolean DEFAULT false NOT NULL
);
COMMENT ON TABLE public.todo IS 'A table that contains all the things that need to be done or have already been done';
ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);
