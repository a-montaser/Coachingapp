-- Handoff §14 sample content (all fictional) + the canvas's demo details (D23).
-- Dates are relative to when the seed runs, so the demo never goes stale: each workshop lands on its
-- §14 weekday and time for the next three weeks; regular sessions get slots for the next 14 days.
-- `-- not in §14/canvas` marks a value neither source gives; ops can edit it in Studio.

insert into public.categories (id, sort) values ('hobbies', 1), ('sports', 2), ('education', 3), ('languages', 4);

insert into public.disciplines (id, category_id, name_en, icon, code, sort) values
  ('pottery', 'hobbies', 'Pottery', 'pottery', null, 1),
  ('painting', 'hobbies', 'Painting', 'painting', null, 2),
  ('photography', 'hobbies', 'Photography', 'photography', null, 3),
  ('oud', 'hobbies', 'Oud', 'oud', null, 4),
  ('calligraphy', 'hobbies', 'Arabic calligraphy', 'calligraphy', null, 5),
  ('cooking', 'hobbies', 'Cooking', 'cooking', null, 6),
  ('chess', 'hobbies', 'Chess', 'chess', null, 7),
  ('dance', 'hobbies', 'Dance', 'dance', null, 8),
  ('baking', 'hobbies', 'Baking', 'baking', null, 9),
  ('padel', 'sports', 'Padel', 'padel', null, 1),
  ('tennis', 'sports', 'Tennis', 'tennis', null, 2),
  ('squash', 'sports', 'Squash', 'squash', null, 3),
  ('swimming', 'sports', 'Swimming', 'swimming', null, 4),
  ('basketball', 'sports', 'Basketball', 'basketball', null, 5),
  ('fitness', 'sports', 'Fitness', 'fitness', null, 6),
  ('boxing', 'sports', 'Boxing', 'boxing', null, 7),
  ('football', 'sports', 'Football', 'football', null, 8),
  ('volleyball', 'sports', 'Volleyball', 'volleyball', null, 9),
  ('golf', 'sports', 'Golf', 'golf', null, 10),
  ('maths', 'education', 'Maths', 'maths', null, 1),
  ('physics', 'education', 'Physics', 'physics', null, 2),
  ('chemistry', 'education', 'Chemistry', 'chemistry', null, 3),
  ('biology', 'education', 'Biology', 'biology', null, 4),
  ('coding', 'education', 'Coding', 'coding', null, 5),
  ('sat', 'education', 'SAT', 'sat', null, 6),
  ('igcse', 'education', 'IGCSE', 'igcse', null, 7),
  ('english', 'languages', 'English', null, 'EN', 1),
  ('french', 'languages', 'French', null, 'FR', 2),
  ('german', 'languages', 'German', null, 'DE', 3),
  ('spanish', 'languages', 'Spanish', null, 'ES', 4),
  ('italian', 'languages', 'Italian', null, 'IT', 5),
  ('arabic', 'languages', 'Arabic', null, 'ع', 6),
  ('turkish', 'languages', 'Turkish', null, 'TR', 7);

-- Area centres (approximate public coordinates), used for distance when location is off (D29).
insert into public.areas (id, name_en, lat, lng) values
  ('new-cairo', 'New Cairo', 30.0074, 31.4913),
  ('zamalek', 'Zamalek', 30.0609, 31.2197),
  ('maadi', 'Maadi', 29.9602, 31.2569),
  ('sheikh-zayed', 'Sheikh Zayed', 30.0392, 30.9817),
  ('heliopolis', 'Heliopolis', 30.0911, 31.3220),
  ('downtown', 'Downtown', 30.0459, 31.2400);

insert into public.venues (name, area_id, lat, lng, notes) values
  ('The Clay Room', 'zamalek', 30.0628, 31.2191, 'Studio with 6 wheels'),
  ('Maadi Corniche', 'maadi', 29.9637, 31.2493, null),
  ('Al-Muizz Street', 'downtown', 30.0516, 31.2617, null),
  ('Heliopolis studio', 'heliopolis', 30.0890, 31.3250, null), -- not in §14/canvas: venue name
  ('Downtown studio', 'downtown', 30.0470, 31.2410, null), -- not in §14/canvas: venue name
  ('Cedar Court Club', 'new-cairo', 30.0280, 31.4700, 'Fifth Settlement'),
  ('Gezira Courts', 'zamalek', 30.0560, 31.2240, 'Court 3'),
  ('Maadi Squash Centre', 'maadi', 29.9590, 31.2700, 'Degla'),
  ('Aqua Club Pool', 'maadi', 29.9620, 31.2550, null),
  ('New Cairo courts', 'new-cairo', 30.0200, 31.4900, null), -- not in §14/canvas: venue name
  ('Studio Nile', 'zamalek', 30.0600, 31.2210, null),
  ('New Cairo study room', 'new-cairo', 30.0100, 31.4800, null), -- not in §14/canvas: venue name
  ('Maadi lab', 'maadi', 29.9610, 31.2590, 'Also online'), -- not in §14/canvas: venue name
  ('Zamalek café', 'zamalek', 30.0640, 31.2180, null), -- not in §14/canvas: venue name
  ('Heliopolis room', 'heliopolis', 30.0920, 31.3200, 'Also online'); -- not in §14/canvas: venue name

-- Instructors: rating and levels from §14, else the canvas, else left empty. Gender is needed by the
-- Filters sheet; where §14 doesn't say, it follows the name and is marked.
insert into public.instructors (display_name, gender, years, certification, rating_avg, rating_count, reply_label, verified) values
  ('Yasmine Fathy', 'female', 7, null, 4.9, 112, 'Usually replies within an hour', true),
  ('Rana Mostafa', 'female', null, null, 4.8, 64, null, true),
  ('Hany Adel', 'male', null, null, 4.9, 71, null, true),
  ('Dina Samir', 'female', null, null, 4.8, 57, null, true),
  ('Ahmed Ezz', 'male', null, null, 5.0, 43, null, true),
  ('Nour El-Sayed', 'female', 9, 'FIP Level 2', 4.9, 128, 'Usually replies within an hour', true), -- gender not in §14
  ('Karim Fawzy', 'male', null, null, 4.8, 96, null, true),
  ('Laila Hassan', 'female', null, null, 5.0, 74, null, true),
  ('Mariam Tarek', 'female', null, null, null, 0, null, true),
  ('Hazem Shafik', 'male', null, null, null, 0, null, true),
  ('Salma Nabil', 'female', null, null, null, 0, null, true),
  ('Mona Ashraf', 'female', null, null, 4.9, 81, null, true),
  ('Sherif Nabil', 'male', null, null, 4.8, 39, null, true),
  ('Claire Dubois', 'female', null, null, 4.9, 66, null, true),
  ('Nada Youssef', 'female', null, null, 4.8, 90, null, true);

insert into public.instructor_disciplines (instructor_id, discipline_id, levels)
select i.id, x.discipline, x.levels
from (values
  ('Yasmine Fathy', 'pottery', 'Beginners welcome'),
  ('Rana Mostafa', 'painting', 'Watercolour and oils · All levels'),
  ('Hany Adel', 'photography', 'Street photography · All levels'),
  ('Dina Samir', 'oud', 'Beginner–Intermediate'),
  ('Ahmed Ezz', 'calligraphy', 'All levels'),
  ('Nour El-Sayed', 'padel', 'Intermediate–Advanced'),
  ('Karim Fawzy', 'tennis', 'All levels'),
  ('Laila Hassan', 'squash', 'Advanced–Pro'),
  ('Mariam Tarek', 'swimming', null),
  ('Hazem Shafik', 'basketball', null),
  ('Salma Nabil', 'fitness', null),
  ('Mona Ashraf', 'maths', 'IGCSE and American diploma'),
  ('Sherif Nabil', 'coding', 'Coding for kids · Ages 8–14'),
  ('Claire Dubois', 'french', 'A1 to B2'),
  ('Nada Youssef', 'english', 'English conversation · All levels')
) as x(name, discipline, levels)
join public.instructors i on i.display_name = x.name;

-- Offerings. Durations per §9.4 (1:1 and group 60, kids 45) unless §14/canvas say otherwise.
insert into public.offerings (instructor_id, discipline_id, venue_id, type, title, description, level_label,
  duration_min, price_egp, capacity, min_age, max_age, included, take_home, what_to_bring)
select i.id, x.discipline, v.id, x.type, x.title, x.description, x.level_label,
       x.duration, x.price, x.capacity, x.min_age, x.max_age, x.included, x.take_home, x.bring
from (values
  -- Hobbies
  ('Yasmine Fathy', 'pottery', 'The Clay Room', 'workshop', 'Wheel-throwing taster',
    'Two hours at the wheel. You''ll centre clay, throw two small bowls and choose a glaze.', 'Workshop · beginners',
    120, 650, 8, null::int, null::int, 'Clay, tools, apron, glaze and firing', 'Two bowls, fired and ready to collect in about 2 weeks', 'Clothes that can get a little muddy'),
  ('Yasmine Fathy', 'pottery', 'The Clay Room', 'workshop', 'Hand-building: a mug', null, 'Workshop · beginners',
    120, 550, 8, null, null, 'Clay, tools and firing', 'Your mug, fired', null),
  ('Yasmine Fathy', 'pottery', 'The Clay Room', 'workshop', 'Glazing day', null, 'Bring a fired piece',
    180, 400, 10, null, null, 'Glazes and firing', null, 'A fired piece'),
  ('Yasmine Fathy', 'pottery', 'The Clay Room', 'private', '1:1 on the wheel', null, null,
    90, 900, 1, null, null, 'Clay and firing included', null, null),
  ('Yasmine Fathy', 'pottery', 'The Clay Room', 'kids', 'Kids clay club', null, 'Ages 7–12 · up to 6 kids',
    60, 450, 6, 7, 12, null, null, null),
  ('Rana Mostafa', 'painting', 'Maadi Corniche', 'workshop', 'Watercolour on the Nile', null, 'Workshop · all levels',
    120, 450, 10, null, null, 'Paper and paints', null, null),
  ('Rana Mostafa', 'painting', 'Maadi Corniche', 'private', '1:1 painting', null, null,
    60, 380, 1, null, null, null, null, null),
  ('Hany Adel', 'photography', 'Al-Muizz Street', 'workshop', 'Photo walk on Al-Muizz Street', null, 'Workshop · all levels',
    150, 350, 12, null, null, null, null, 'Any camera or phone'),
  ('Dina Samir', 'oud', 'Heliopolis studio', 'private', '1:1 oud', null, null,
    60, 500, 1, null, null, null, null, null),
  ('Ahmed Ezz', 'calligraphy', 'Downtown studio', 'workshop', 'Ruq''ah calligraphy basics', null, 'Workshop · all levels',
    120, 400, 6, null, null, 'Reed pens and ink', null, null),
  -- Sports
  ('Nour El-Sayed', 'padel', 'Cedar Court Club', 'private', 'Private 1:1', 'One player', null, 60, 650, 1, null, null, null, null, null),
  ('Nour El-Sayed', 'padel', 'Cedar Court Club', 'group', 'Small group', 'Up to 4, price per person', null, 60, 390, 4, null, null, null, null, null),
  ('Nour El-Sayed', 'padel', 'Cedar Court Club', 'kids', 'Kids', 'Ages 6–14', null, 45, 520, 1, 6, 14, null, null, null),
  ('Karim Fawzy', 'tennis', 'Gezira Courts', 'private', 'Private 1:1', 'One player', null, 60, 800, 1, null, null, null, null, null),
  ('Karim Fawzy', 'tennis', 'Gezira Courts', 'group', 'Small group', 'Up to 4, price per person', null, 60, 480, 4, null, null, null, null, null),
  ('Karim Fawzy', 'tennis', 'Gezira Courts', 'kids', 'Kids', 'Ages 6–14', null, 45, 600, 1, 6, 14, null, null, null),
  ('Laila Hassan', 'squash', 'Maadi Squash Centre', 'private', 'Private 1:1', 'One player', null, 60, 850, 1, null, null, null, null, null),
  ('Laila Hassan', 'squash', 'Maadi Squash Centre', 'group', 'Small group', 'Up to 4, price per person', null, 60, 540, 4, null, null, null, null, null),
  ('Mariam Tarek', 'swimming', 'Aqua Club Pool', 'private', 'Private 1:1', 'One swimmer', null, 60, 600, 1, null, null, null, null, null),
  ('Mariam Tarek', 'swimming', 'Aqua Club Pool', 'group', 'Small group', 'Up to 4, price per person', null, 60, 360, 4, null, null, null, null, null),
  ('Mariam Tarek', 'swimming', 'Aqua Club Pool', 'kids', 'Kids', 'Ages 6–14', null, 45, 450, 1, 6, 14, null, null, null),
  ('Hazem Shafik', 'basketball', 'New Cairo courts', 'private', 'Private 1:1', 'One player', null, 60, 500, 1, null, null, null, null, null),
  ('Hazem Shafik', 'basketball', 'New Cairo courts', 'group', 'Small group', 'Up to 4, price per person', null, 60, 300, 4, null, null, null, null, null),
  ('Hazem Shafik', 'basketball', 'New Cairo courts', 'kids', 'Kids', 'Ages 6–14', null, 45, 400, 1, 6, 14, null, null, null),
  ('Salma Nabil', 'fitness', 'Studio Nile', 'private', 'Private 1:1', null, null, 60, 550, 1, null, null, null, null, null),
  ('Salma Nabil', 'fitness', 'Studio Nile', 'group', 'Small group', 'Up to 4, price per person', null, 60, 320, 4, null, null, null, null, null),
  -- Education
  ('Mona Ashraf', 'maths', 'New Cairo study room', 'group', 'IGCSE Maths revision group', 'Mon & Wed', null, 60, 450, 6, null, null, null, null, null),
  ('Sherif Nabil', 'coding', 'Maadi lab', 'kids', 'Coding for kids', 'Ages 8–14', null, 45, 400, 1, 8, 14, null, null, null),
  -- Languages
  ('Claire Dubois', 'french', 'Zamalek café', 'private', 'Private 1:1', 'A1 to B2', null, 60, 420, 1, null, null, null, null, null),
  ('Claire Dubois', 'french', 'Zamalek café', 'group', 'French conversation café', null, null, 60, 300, 10, null, null, null, null, null),
  ('Nada Youssef', 'english', 'Heliopolis room', 'private', 'Private 1:1', 'English conversation', null, 60, 350, 1, null, null, null, null, null)
) as x(name, discipline, venue, type, title, description, level_label, duration, price, capacity, min_age, max_age, included, take_home, bring)
join public.instructors i on i.display_name = x.name
join public.venues v on v.name = x.venue;

-- Recurring group products and workshops: weekday (0 = Sunday … 6 = Saturday) and Cairo start time.
create temporary table weekly (title text, dow int, at time);
insert into weekly values
  ('Wheel-throwing taster', 6, '11:00'),
  ('Hand-building: a mug', 2, '19:00'),
  ('Glazing day', 6, '11:00'),
  ('Watercolour on the Nile', 6, '16:30'),
  ('Photo walk on Al-Muizz Street', 0, '08:00'),
  ('Ruq''ah calligraphy basics', 0, '18:00'),
  ('IGCSE Maths revision group', 1, '18:00'),
  ('IGCSE Maths revision group', 3, '18:00'),
  ('French conversation café', 0, '19:00');

-- The next three occurrences of each weekly session.
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, start_at, start_at + make_interval(mins => o.duration_min), o.capacity
from weekly w
join public.offerings o on o.title = w.title
cross join lateral (
  -- d::date + time is a Cairo wall-clock time; `at time zone` turns it into the right instant.
  select ((d::date + w.at) at time zone 'Africa/Cairo') as start_at
  from generate_series(current_date + 1, current_date + 21, interval '1 day') d
  where extract(dow from d) = w.dow
  order by d limit 3
) s;

-- Everything else: 14 days of slots at 09:00, 17:30 and 19:00 Cairo (examples from §5, §7.8),
-- none on Fridays ("No times on Friday", §7.8).
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, start_at, start_at + make_interval(mins => o.duration_min), o.capacity
from public.offerings o
cross join generate_series(current_date, current_date + 13, interval '1 day') d
cross join (values (time '09:00'), (time '17:30'), (time '19:00')) h(at)
cross join lateral (select ((d::date + h.at) at time zone 'Africa/Cairo') as start_at) s
where (o.type in ('private', 'kids') or (o.type = 'group' and o.title = 'Small group'))
  and extract(dow from d) <> 5
  and start_at > now();

insert into public.promo_codes (code, percent_off) values ('CFA10', 10); -- §9.8 demo code

-- Demo learner Omar (§14): +20 100 234 5678, code 482917 (config.toml test_otp). Child Ali, 9.
-- Supabase Auth reads these token columns as strings: they must be '' rather than NULL (D30).
insert into auth.users (id, instance_id, aud, role, phone, phone_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, confirmation_token, recovery_token, email_change_token_new,
  email_change, phone_change, phone_change_token, email_change_token_current, reauthentication_token)
values ('00000000-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated',
  'authenticated', '201002345678', now(), now(), now(), '{"provider":"phone","providers":["phone"]}', '{}',
  '', '', '', '', '', '', '', '');
update public.profiles set first_name = 'Omar', area_id = 'new-cairo', who_for = 'both'
 where id = '00000000-0000-4000-8000-000000000001';
insert into public.family_members (user_id, first_name, age) values ('00000000-0000-4000-8000-000000000001', 'Ali', 9);
