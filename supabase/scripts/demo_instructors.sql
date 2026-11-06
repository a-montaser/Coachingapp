-- Demo instructor sign-ins for chat (Phase 2 R1.2, D67) and one demo conversation with Omar.
-- Data only, safe to run again. Runs after seed.sql on `supabase db reset` (config.toml [db.seed]) and
-- on the hosted dev project: npx supabase db query --linked -f supabase/scripts/demo_instructors.sql
--   Yasmine Fathy (pottery): +20 100 234 5679
--   Nour El-Sayed (padel):   +20 100 234 5680
-- They sign in only as Supabase test numbers, so no SMS is ever sent: locally and in CI with code 482917
-- (config.toml [auth.sms.test_otp]); on the hosted project, with whatever code its Auth settings give
-- them (Omar's is 111111 there).

-- Supabase Auth reads the token columns as strings: '' rather than NULL (D30).
insert into auth.users (id, instance_id, aud, role, phone, phone_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, confirmation_token, recovery_token, email_change_token_new,
  email_change, phone_change, phone_change_token, email_change_token_current, reauthentication_token)
values
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   '201002345679', now(), now(), now(), '{"provider":"phone","providers":["phone"]}', '{}', '', '', '', '', '', '', '', ''),
  ('00000000-0000-4000-8000-000000000102', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   '201002345680', now(), now(), now(), '{"provider":"phone","providers":["phone"]}', '{}', '', '', '', '', '', '', '', '')
on conflict (id) do nothing;

-- Their profiles carry a first name, so the journey gate never sends them to onboarding.
update public.profiles set first_name = 'Yasmine', onboarded_at = coalesce(onboarded_at, now())
 where id = '00000000-0000-4000-8000-000000000101';
update public.profiles set first_name = 'Nour', onboarded_at = coalesce(onboarded_at, now())
 where id = '00000000-0000-4000-8000-000000000102';

update public.instructors set user_id = '00000000-0000-4000-8000-000000000101'
 where display_name = 'Yasmine Fathy' and user_id is null;
update public.instructors set user_id = '00000000-0000-4000-8000-000000000102'
 where display_name = 'Nour El-Sayed' and user_id is null;

-- Omar ↔ Nour, so Messages isn't empty on first open. Messages are stamped with the time this runs.
insert into public.threads (id, learner_id, instructor_id)
select '00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000001', i.id
  from public.instructors i where i.display_name = 'Nour El-Sayed'
on conflict do nothing;
insert into public.messages (id, thread_id, sender_id, body) values
  ('00000000-0000-4000-8000-000000000301', '00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000001',
   'Hi Nour, is the court indoors? I''d like to book a 1:1.'),
  ('00000000-0000-4000-8000-000000000302', '00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000102',
   'Hi Omar! Yes, Cedar Court is covered, so heat isn''t a problem. Bring trainers with good grip.')
on conflict (id) do nothing;
