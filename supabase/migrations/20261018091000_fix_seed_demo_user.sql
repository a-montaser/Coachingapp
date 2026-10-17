-- Data fix, no schema change: the first seed left the demo learner's auth token columns NULL, which
-- Supabase Auth can't read ("Database error finding user", DECISIONS D30). No-op on a fresh database.
update auth.users set
  confirmation_token = coalesce(confirmation_token, ''),
  recovery_token = coalesce(recovery_token, ''),
  email_change_token_new = coalesce(email_change_token_new, ''),
  email_change = coalesce(email_change, ''),
  phone_change = coalesce(phone_change, ''),
  phone_change_token = coalesce(phone_change_token, ''),
  email_change_token_current = coalesce(email_change_token_current, ''),
  reauthentication_token = coalesce(reauthentication_token, '')
where id = '00000000-0000-4000-8000-000000000001';
