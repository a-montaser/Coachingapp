-- Kids sessions are out of scope until after the last phase (owner, 14 Nov 2026, D80). Hidden, not deleted:
-- unpublished offerings drop out of every list, price and profile (RLS and the discovery views read
-- `published`) and `book()` refuses them. Bookings already made, family_members and the kids rules stay,
-- so bringing kids back is `published = true` plus the app screens from git history.
update public.offerings set published = false where type = 'kids';
