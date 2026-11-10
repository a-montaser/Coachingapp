# Arabic app strings to translate

**Drafts filled in by Claude on 5 Nov 2026 (T21): please read each line and correct anything that doesn't sound right; nothing goes into the app until you approve.** Plurals: Arabic has more forms than English (one, two, few, many); the drafts give the singular and a general plural, and the app falls back to the general plural until you add the others.

Fill the **Egyptian Arabic** column and save. Keep anything in `{{double braces}}` exactly as it is: the app puts a number, name or time there. Arabic prices drop "From" (D25), so `card.from` is already done.

| Key | Where it shows | English | Egyptian Arabic |
|---|---|---|---|
| `tabs.unread` | Tab bar | {{count}} unread | {{count}} مش مقروءة |
| `category.hobbies` | Category tray and its button | Hobbies | هوايات |
| `category.sports` | Category tray and its button | Sports | رياضة |
| `category.education` | Category tray and its button | Education | تعليم |
| `category.languages` | Category tray and its button | Languages | لغات |
| `category.trigger` | Category tray and its button | Category: {{name}}. Change category | القسم: {{name}}. غيّر القسم |
| `category.trayTitle` | Category tray and its button | Browse by | تصفّح حسب |
| `category.traySubtitle` | Category tray and its button | Switch between hobbies, sports, education and languages | اتنقّل بين الهوايات والرياضة والتعليم واللغات |
| `category.close` | Category tray and its button | Close | اقفل |
| `common.back` | Buttons (mostly screen-reader labels) | Back | رجوع |
| `common.clear` | Buttons (mostly screen-reader labels) | Clear search | امسح البحث |
| `common.share` | Buttons (mostly screen-reader labels) | Share | شارك |
| `common.favourite` | Buttons (mostly screen-reader labels) | Favourite | المفضلة |
| `common.more` | Buttons (mostly screen-reader labels) | More | المزيد |
| `common.close` | Buttons (mostly screen-reader labels) | Close | اقفل |
| `card.next` | Instructor and workshop cards | Next: {{when}} | الجاي: {{when}} |
| `card.spotsLeft` | Instructor and workshop cards | {{left}} of {{total}} spots left | فاضل {{left}} من {{total}} أماكن |
| `card.full` | Instructor and workshop cards | Full | كامل |
| `card.rating` | Instructor and workshop cards | Rated {{rating}}, {{count}} reviews | تقييم {{rating}}، {{count}} تقييمات |
| `card.favourited` | Instructor and workshop cards | Favourited | في المفضلة |
| `card.photoPlaceholder` | Instructor and workshop cards | Photo coming soon | الصورة جاية قريب |
| `slots.morning` | Time slots | Morning | الصبح |
| `slots.afternoon` | Time slots | Afternoon | الضهر |
| `slots.evening` | Time slots | Evening | بالليل |
| `slots.booked` | Time slots | booked | محجوز |
| `slots.yours` | Time slots | yours | بتاعك |
| `slots.until` | Time slots | – {{end}} | – {{end}} |
| `dayPicker.previousWeek` | Date strip | Previous week | الأسبوع اللي فات |
| `dayPicker.nextWeek` | Date strip | Next week | الأسبوع الجاي |
| `dayPicker.hasTimes` | Date strip | open times | فيه مواعيد فاضية |
| `dayPicker.noTimes` | Date strip | no times | مفيش مواعيد |
| `dayPicker.today` | Date strip | Today | النهارده |
| `common.comingSoon` | Buttons and messages | Coming soon | قريب |
| `common.genericError` | Buttons and messages | Something went wrong. Check your connection and try again. | حصلت مشكلة. اتأكد من النت وجرّب تاني. |
| `auth.signIn` | Sign-in and sign out | Sign in | تسجيل الدخول |
| `auth.welcomeHeadline` | Sign-in and sign out | Learn something new in Cairo. | اتعلّم حاجة جديدة في القاهرة. |
| `auth.welcomeBody` | Sign-in and sign out | Private, group and kids sessions in hobbies, sports, education and languages, with free cancellation up to 24 hours before. | حصص خاصة وجماعية وللأطفال في الهوايات والرياضة والتعليم واللغات، والإلغاء مجاني لحد ٢٤ ساعة قبل المعاد. |
| `auth.getStarted` | Sign-in and sign out | Get started | يلا نبدأ |
| `auth.heroPlaceholder` | Sign-in and sign out | Illustration coming soon | الرسمة جاية قريب |
| `auth.phoneTitle` | Sign-in and sign out | Your phone number | رقم موبايلك |
| `auth.phoneSub` | Sign-in and sign out | We'll text you a code. Instructors see your number only after you book. | هنبعتلك كود في رسالة. المدرّب بيشوف رقمك بس بعد ما تحجز. |
| `auth.phoneLabel` | Sign-in and sign out | Phone number | رقم الموبايل |
| `auth.phonePrefix` | Sign-in and sign out | EG +20 | مصر ‎+20 |
| `auth.phoneInvalid` | Sign-in and sign out | Enter the 10 digits after +20, like 100 234 5678. | اكتب الـ ١٠ أرقام اللي بعد ‎+20، زي 100 234 5678. |
| `auth.sendCode` | Sign-in and sign out | Send code | ابعت الكود |
| `auth.legal` | Sign-in and sign out | By continuing you agree to the Terms and Privacy Policy. | لما تكمّل، تبقى موافق على الشروط وسياسة الخصوصية. |
| `auth.codeTitle` | Sign-in and sign out | Enter the code | اكتب الكود |
| `auth.sentTo` | Sign-in and sign out | Sent to {{phone}} | اتبعت على {{phone}} |
| `auth.changeNumber` | Sign-in and sign out | Change number | غيّر الرقم |
| `auth.codeLabel` | Sign-in and sign out | 6-digit code | كود من ٦ أرقام |
| `auth.wrongCode` | Sign-in and sign out | That code isn't right. Try again. | الكود ده مش صح. جرّب تاني. |
| `auth.tooMany` | Sign-in and sign out | Too many tries. Wait a minute and try again. | محاولات كتير. استنى دقيقة وجرّب تاني. |
| `auth.genericError` | Sign-in and sign out | Something went wrong. Check your connection and try again. | حصلت مشكلة. اتأكد من النت وجرّب تاني. |
| `auth.notConfigured` | Sign-in and sign out | The app isn't connected to Supabase yet: add the keys to .env. | التطبيق مش متوصّل بـ Supabase لسه: ضيف المفاتيح في ‎.env. |
| `auth.resendIn` | Sign-in and sign out | Resend code in {{time}} | ابعت الكود تاني بعد {{time}} |
| `auth.resend` | Sign-in and sign out | Resend code | ابعت الكود تاني |
| `auth.verifying` | Sign-in and sign out | Checking | بنتأكد |
| `auth.signOut` | Sign-in and sign out | Sign out | تسجيل الخروج |
| `auth.signOutTitle` | Sign-in and sign out | Sign out? | تسجّل خروج؟ |
| `auth.signOutBody` | Sign-in and sign out | You can sign back in with your phone number any time. | تقدر تدخل تاني برقم موبايلك في أي وقت. |
| `auth.keepSignedIn` | Sign-in and sign out | Stay signed in | خليني مسجّل |
| `messages.title` | Messages tab | Messages | الرسايل |
| `messages.emptyTitle` | Messages tab | No messages yet | مفيش رسايل لسه |
| `messages.emptyBody` | Messages tab | Message an instructor from their profile or a booking. | ابعت رسالة لمدرّب من صفحته أو من حجز. |
| `messages.emptyAction` | Messages tab | Explore | استكشف |
| `messages.search` | Messages tab | Names and messages | أسامي ورسايل |
| `messages.unread` | Messages tab | {{count}} unread | {{count}} مش مقروءة |
| `messages.noResults` | Messages tab | No conversations match | مفيش محادثات زي كده |
| `chat.today` | Messages, Chat | Today | النهارده |
| `chat.dayTime` | Messages, Chat | {{day}}, {{time}} | {{day}}، {{time}} |
| `chat.lastSession` | Messages tab | {{discipline}} · last session {{date}} | {{discipline}} · آخر حصة {{date}} |
| `chat.coach` | Chat header | {{discipline}} coach | مدرّب {{discipline}} |
| `chat.next` | Chat | Next: {{when}} · {{venue}} | الجاية: {{when}} · {{venue}} |
| `chat.view` | Chat | View | اعرض |
| `chat.viewProfile` | Chat header | View profile | اعرض الصفحة |
| `chat.placeholder` | Chat | Message | رسالة |
| `chat.send` | Chat | Send | ابعت |
| `chat.delivered` | Chat | Delivered | وصلت |
| `chat.read` | Chat | Read | اتقرت |
| `chat.notSent` | Chat | Not sent · Retry | ما اتبعتتش · حاول تاني |
| `chat.you` | Chat (screen reader) | You, {{time}} | إنت، {{time}} |
| `chat.them` | Chat (screen reader) | {{name}}, {{time}} | {{name}}، {{time}} |
| `chat.message` | Instructor profile, Booking detail, Bookings | Message | ابعت رسالة |
| `chat.openFailed` | Message buttons | Couldn't open the chat. Check your connection and try again. | مقدرناش نفتح الشات. اتأكد من النت وحاول تاني. |
| `chat.emptyTitle` | Chat | Say hello | قول أهلاً |
| `chat.emptyBody` | Chat | Ask {{name}} anything about their sessions. | اسأل {{name}} أي حاجة عن الحصص. |
| `chat.typing` | Chat (screen reader) | {{name}} is typing | {{name}} بيكتب |
| `chat.toast` | In-app alert | New message from {{name}} | رسالة جديدة من {{name}} |
| `chat.toastNew` | In-app alert | New message | رسالة جديدة |
| `chat.reply` | Chat (screen reader action) | Reply | رد |
| `chat.replyingTo` | Chat | Replying to {{name}} | بترد على {{name}} |
| `chat.cancelReply` | Chat | Cancel reply | إلغاء الرد |
| `chat.youName` | Chat (quoted reply) | You | إنت |
| `rate.title` | Rate sheet | Rate your session | قيّم الحصة |
| `rate.stars_one` | Rate sheet (screen reader) | {{n}} star | نجمة واحدة |
| `rate.stars_other` | Rate sheet (screen reader) | {{n}} stars | {{n}} نجوم |
| `rate.placeholder` | Rate sheet | What went well? (optional) | إيه اللي عجبك؟ (اختياري) |
| `rate.private` | Rate sheet | Shared with {{name}} only. | هيوصل لـ{{name}} بس. |
| `rate.send` | Rate sheet | Send rating | ابعت التقييم |
| `rate.pickStars` | Rate sheet | Pick a number of stars | اختار عدد النجوم |
| `rate.toast` | Rate sheet | Thanks for rating | شكراً على التقييم |
| `rate.error` | Rate sheet | Couldn't send your rating. Try again. | مقدرناش نبعت تقييمك. حاول تاني. |
| `rate.rate` | Bookings, Booking detail | Rate session | قيّم الحصة |
| `rate.rated` | Bookings, Booking detail | Rated {{n}}★ | اتقيّمت {{n}}★ |
| `favourites.title` | Profile, Favourites | Favourites | المفضلة |
| `favourites.add` | Hearts (screen reader) | Add {{name}} to favourites | ضيف {{name}} للمفضلة |
| `favourites.remove` | Hearts (screen reader) | Remove {{name}} from favourites | شيل {{name}} من المفضلة |
| `favourites.emptyTitle` | Favourites | No favourites yet | مفيش مفضلة لسه |
| `favourites.emptyBody` | Favourites | Tap the heart on a coach to keep them here. | دوس على القلب عند أي مدرّب عشان يفضل هنا. |
| `favourites.error` | Hearts | Couldn't save your favourite. Try again. | مقدرناش نحفظ المفضلة. حاول تاني. |
| `credit.title` | App credit | App credit | رصيد التطبيق |
| `credit.balance` | App credit | Available now | المتاح دلوقتي |
| `credit.usedOn` | App credit | Used on {{ref}} | اتصرف على {{ref}} |
| `credit.refundFor` | App credit | Refund for {{ref}} | استرجاع لـ{{ref}} |
| `credit.source.refund` | App credit | Refund | استرجاع |
| `credit.source.goodwill` | App credit | Goodwill credit | رصيد هدية |
| `credit.source.promo` | App credit | Promo credit | رصيد عرض |
| `credit.neverExpires` | App credit | Never expires | مالوش تاريخ انتهاء |
| `credit.expires` | App credit | Expires {{date}} | بينتهي {{date}} |
| `credit.expired` | App credit | Expired | انتهى |
| `credit.emptyTitle` | App credit | No app credit yet | مفيش رصيد لسه |
| `credit.emptyBody` | App credit | Refunds and credit from us show up here. | المرتجعات والرصيد اللي بنديهولك بيظهروا هنا. |
| `explore.showMap` | Explore (map button) | Show map | اعرض الخريطة |
| `explore.showList` | Explore map | Show list | اعرض القايمة |
| `explore.searchArea` | Explore map | Search this area | دوّر في المنطقة دي |
| `explore.recenter` | Explore map | Recenter the map | رجّع الخريطة لمكانك |
| `explore.previous` | Explore map | Previous | اللي قبله |
| `explore.next` | Explore map | Next | اللي بعده |
| `explore.mapPosition` | Explore map | {{i}} of {{total}} | {{i}} من {{total}} |
| `book.repeat` | Book, Group page | Repeat weekly | كرر كل أسبوع |
| `book.repeatSub` | Book, Group page | Same time every {{day}} | نفس الميعاد كل {{day}} |
| `book.repeatSpan` | Book, Group page | {{n}} weeks · {{from}} – {{to}} | {{n}} أسابيع · {{from}} – {{to}} |
| `book.weeks` | Book (screen reader) | Weeks | الأسابيع |
| `book.fewerWeeks` | Book (screen reader) | One week fewer | أسبوع أقل |
| `book.moreWeeks` | Book (screen reader) | One week more | أسبوع زيادة |
| `book.weekly` | Book, Booking detail | weekly | كل أسبوع |
| `bookings.weekly` | Bookings | repeats weekly | بيتكرر كل أسبوع |
| `review.sessionWeeks` | Review & pay | {{n}} weeks × {{price}} | {{n}} أسابيع × {{price}} |
| `review.weekly` | Review & pay | weekly · {{n}} weeks | كل أسبوع · {{n}} أسابيع |
| `review.errors.series_week_unavailable` | Review & pay | One of those weeks is no longer free. Pick fewer weeks or another time. | واحد من الأسابيع دي مبقاش فاضي. اختار أسابيع أقل أو ميعاد تاني. |
| `cancel.everyWeek` | Cancel sheet | Cancel every week | إلغي كل الأسابيع |
| `cancel.everyWeekSub_one` | Cancel sheet | This week and the {{n}} after it | الأسبوع ده واللي بعده |
| `cancel.everyWeekSub_other` | Cancel sheet | This week and the {{n}} after it | الأسبوع ده و{{n}} بعده |
| `profile.photo` | Profile | Profile photo | صورة البروفايل |
| `profile.memberSince` | Profile | {{area}} · member since {{year}} | {{area}} · عضو من {{year}} |
| `profile.memberSinceNoArea` | Profile | Member since {{year}} | عضو من {{year}} |
| `profile.levelsTitle` | Profile | Levels, set by your instructors | مستوياتك، من المدرّبين بتوعك |
| `profile.levelSelf` | Profile | {{level}} · self-rated | {{level}} · تقييمك لنفسك |
| `profile.levelInstructor` | Profile | {{level}} · your instructor, {{date}} | {{level}} · من مدرّبك، {{date}} |
| `profile.levelNotSet` | Profile | Level not set | المستوى مش محدد |
| `profile.noInterests` | Profile | No interests picked yet | لسه مختارتش اهتمامات |
| `profile.changeInterests` | Profile | Change interests and levels | غيّر الاهتمامات والمستويات |
| `profile.settings` | Profile | Settings | الإعدادات |
| `profile.family` | Profile | Family & kids | العيلة والأطفال |
| `profile.language` | Profile | Language | اللغة |
| `profile.appearance` | Profile | Appearance | الشكل |
| `profile.credit` | Profile | App credit | رصيد التطبيق |
| `level.beginner` | Profile levels | Beginner | مبتدئ |
| `level.intermediate` | Profile levels | Intermediate | متوسط |
| `level.advanced` | Profile levels | Advanced | متقدم |
| `level.pro` | Profile levels | Pro | محترف |
| `appearance.light` | Appearance sheet | Light | فاتح |
| `appearance.dark` | Appearance sheet | Dark | غامق |
| `appearance.system` | Appearance sheet | System | زي الموبايل |
| `family.title` | Family & kids and its sheet | Family & kids | العيلة والأطفال |
| `family.explainer` | Family & kids and its sheet | Book and pay for your children from your account. Instructors see their first name and age only. | احجز وادفع لولادك من حسابك. المدرّب بيشوف اسمهم الأول وسنهم بس. |
| `family.child` | Family & kids and its sheet | {{name}} · {{age}} | {{name}} · {{age}} |
| `family.edit` | Family & kids and its sheet | Edit | تعديل |
| `family.editLabel` | Family & kids and its sheet | Edit {{name}} | عدّل {{name}} |
| `family.pending` | Family & kids and its sheet | {{title}} · {{when}} · waiting for the instructor to confirm | {{title}} · {{when}} · مستنيين المدرّب يأكّد |
| `family.bookFor` | Family & kids and its sheet | Book a session for {{name}} | احجز حصة لـ {{name}} |
| `family.add` | Family & kids and its sheet | Add a family member | ضيف حد من العيلة |
| `family.infoLength` | Family & kids and its sheet | Kids sessions are 45 minutes, for ages 6–14 | حصص الأطفال ٤٥ دقيقة، من سن ٦ لـ ١٤ |
| `family.infoGuardian` | Family & kids and its sheet | A guardian stays on site | لازم حد كبير يفضل موجود |
| `family.editTitle` | Family & kids and its sheet | Edit {{name}} | عدّل {{name}} |
| `family.firstName` | Family & kids and its sheet | First name | الاسم الأول |
| `family.age` | Family & kids and its sheet | Age | السن |
| `family.agePlaceholder` | Family & kids and its sheet | 6–14 | ٦–١٤ |
| `family.nameRequired` | Family & kids and its sheet | Enter their first name. | اكتب اسمه الأول. |
| `family.nameTooLong` | Family & kids and its sheet | Keep the first name to 40 letters or fewer. | الاسم الأول يكون ٤٠ حرف أو أقل. |
| `family.ageRange` | Family & kids and its sheet | Kids sessions are for ages 6 to 14. | حصص الأطفال من سن ٦ لـ ١٤. |
| `family.addButton` | Family & kids and its sheet | Add to family | ضيف للعيلة |
| `family.saveButton` | Family & kids and its sheet | Save changes | احفظ التعديلات |
| `onboarding.progress` | Onboarding | Setup progress | خطوات الإعداد |
| `onboarding.interestsTitle` | Onboarding | What do you want to learn? | عايز تتعلّم إيه؟ |
| `onboarding.interestsSub` | Onboarding | Pick anything that sounds fun. You can switch between hobbies, sports, education and languages from Home at any time. | اختار أي حاجة شكلها ممتع. تقدر تتنقّل بين الهوايات والرياضة والتعليم واللغات من الرئيسية في أي وقت. |
| `onboarding.picked` | Onboarding | {{count}} picked | {{count}} مختارين |
| `onboarding.continuePicked` | Onboarding | Continue · {{count}} picked | كمّل · {{count}} مختارين |
| `onboarding.pickOne` | Onboarding | Pick at least one | اختار حاجة واحدة على الأقل |
| `onboarding.skip` | Onboarding | Skip | تخطّي |
| `onboarding.levelQuestion` | Onboarding | How experienced are you with {{name}}? | خبرتك قد إيه في {{name}}؟ |
| `onboarding.levelSub` | Onboarding | Pick the closest match. Your instructor adjusts it after your first session. | اختار الأقرب ليك. المدرّب هيظبطه بعد أول حصة. |
| `onboarding.levelDesc.beginner` | Onboarding | New to it, or tried it a few times | جديد عليها، أو جربتها كام مرة |
| `onboarding.levelDesc.intermediate` | Onboarding | Know the basics and want to get better | عارف الأساسيات وعايز تتحسّن |
| `onboarding.levelDesc.advanced` | Onboarding | Practise often and have solid technique | بتتمرّن كتير وتكنيكك كويس |
| `onboarding.levelDesc.pro` | Onboarding | Compete, perform or teach | بتنافس أو بتقدّم عروض أو بتدرّس |
| `onboarding.allSet` | Onboarding | You're all set | كده تمام |
| `onboarding.allSetSub` | Onboarding | Tap a pick to change its level. | دوس على اختيار عشان تغيّر مستواه. |
| `onboarding.continue` | Onboarding | Continue | كمّل |
| `onboarding.saveChanges` | Onboarding | Save changes | احفظ التعديلات |
| `onboarding.whoTitle` | Onboarding | Who are the sessions for? | الحصص لمين؟ |
| `onboarding.who.me` | Onboarding | Me | ليّا |
| `onboarding.who.meSub` | Onboarding | Adult sessions | حصص للكبار |
| `onboarding.who.child` | Onboarding | My child | لابني أو بنتي |
| `onboarding.who.childSub` | Onboarding | Kids sessions, ages 6–14 | حصص أطفال، من سن ٦ لـ ١٤ |
| `onboarding.who.both` | Onboarding | Both | الاتنين |
| `onboarding.who.bothSub` | Onboarding | Add kids as family members next | هتضيف الأطفال للعيلة بعد كده |
| `onboarding.whereTitle` | Onboarding | Where do you usually learn? | بتتعلّم فين عادةً؟ |
| `onboarding.useLocation` | Onboarding | Use my location | استخدم موقعي |
| `onboarding.locationOff` | Onboarding | Location is off. Pick an area instead. | الموقع مقفول. اختار منطقة بدل كده. |
| `onboarding.prefTitle` | Onboarding | Instructor preference | تفضيل المدرّب |
| `onboarding.pref.none` | Onboarding | No preference | مش فارقة |
| `onboarding.pref.female` | Onboarding | Female | ست |
| `onboarding.pref.male` | Onboarding | Male | راجل |
| `onboarding.changeLater` | Onboarding | You can change any of this later in Profile. | تقدر تغيّر أي حاجة من دول بعدين من البروفايل. |
| `onboarding.showPicks` | Onboarding | Show my picks | ورّيني اختياراتي |
| `onboarding.categoriesTitle` | Onboarding | What are you into? | بتحب إيه؟ |
| `onboarding.categoriesSub` | Onboarding | Pick one or more. Next, you'll choose what to learn in each. | اختار واحد أو أكتر. بعد كده هتختار تتعلّم إيه في كل واحد. |
| `common.tomorrow` | Buttons and messages | Tomorrow | بكره |
| `brand.wordmark` | Buttons and messages | Coach For All | Coach For All |
| `home.greeting.morning` | Home | Good morning, {{name}} | صباح الخير يا {{name}} |
| `home.greeting.afternoon` | Home | Good afternoon, {{name}} | مساء الخير يا {{name}} |
| `home.greeting.morningAnon` | Home | Good morning | صباح الخير |
| `home.greeting.afternoonAnon` | Home | Good afternoon | مساء الخير |
| `home.greeting.eveningAnon` | Home | Good evening | مساء الخير |
| `home.sub.hobbies` | Home | What will you make this week? | هتعمل إيه الأسبوع ده؟ |
| `home.sub.sports` | Home | Your coaches and courts | مدرّبينك وملاعبك |
| `home.sub.education` | Home | Tutors for school, exams and new skills | مدرّسين للمدرسة والامتحانات ومهارات جديدة |
| `home.sub.languages` | Home | Speak with real teachers, in person or online | اتكلّم مع مدرّسين حقيقيين، وش لوش أو أونلاين |
| `home.search.hobbies` | Home | Pottery, oud, photography… | فخار، عود، تصوير… |
| `home.search.education` | Home | Subject, exam or tutor | مادة أو امتحان أو مدرّس |
| `home.search.languages` | Home | Language, level or teacher | لغة أو مستوى أو مدرّس |
| `home.rail.hobbies` | Home | Pick up something new | جرّب حاجة جديدة |
| `home.rail.sports` | Home | Sports | رياضات |
| `home.rail.education` | Home | Subjects | مواد |
| `home.rail.languages` | Home | Languages | لغات |
| `home.groups.hobbies` | Home | Groups near you | جروبات قريبة منك |
| `home.groups.education` | Home | Revision groups | جروبات مراجعة |
| `home.groups.languages` | Home | Conversation groups | جروبات محادثة |
| `home.people.hobbies` | Home | Classes near you | حصص قريبة منك |
| `home.people.education` | Home | Classes near you | حصص قريبة منك |
| `home.people.languages` | Home | Classes near you | حصص قريبة منك |
| `home.emptyTitle.hobbies` | Home | Nothing booked yet | لسه محجزتش حاجة |
| `home.emptyTitle.sports` | Home | No sessions booked yet | لسه محجزتش تمارين |
| `home.emptyTitle.education` | Home | No lessons booked yet | لسه محجزتش دروس |
| `home.emptyTitle.languages` | Home | No classes booked yet | لسه محجزتش حصص |
| `home.emptySub.hobbies` | Home | Find a group to try this week | لاقي جروب تجربه الأسبوع ده |
| `home.emptySub.sports` | Home | Find a coach near you | لاقي مدرّب قريب منك |
| `home.emptySub.education` | Home | Find a tutor for your next exam | لاقي مدرّس لامتحانك الجاي |
| `home.emptySub.languages` | Home | Try a conversation group first | ابدأ بجروب محادثة |
| `home.today` | Home | Today | النهارده |
| `home.tomorrow` | Home | Tomorrow | بكره |
| `home.inDays_one` | Home | In {{n}} day | بعد يوم |
| `home.inDays_other` | Home | In {{n}} days | بعد {{n}} أيام |
| `home.seeAll` | Home | See all | شوف الكل |
| `home.bookAgain` | Home | Book again | احجز تاني |
| `home.bookAgainTitle` | Home | {{discipline}} with {{name}} | {{discipline}} مع {{name}} |
| `home.bookAgainNext` | Home | Next open: {{when}} | أقرب معاد فاضي: {{when}} |
| `home.bookAgainNone` | Home | No open times in the next two weeks | مفيش مواعيد فاضية في الأسبوعين الجايين |
| `home.noPeople` | Home | No one is teaching this yet. Check back soon. | محدش بيدرّس ده لسه. ارجع تاني قريب. |
| `explore.segLabel` | Explore, Filters and Sort | Show | اعرض |
| `explore.filters` | Explore, Filters and Sort | Filters | الفلاتر |
| `explore.filtersN` | Explore, Filters and Sort | Filters · {{count}} | الفلاتر · {{count}} |
| `explore.all` | Explore, Filters and Sort | All | الكل |
| `explore.coaches_one` | Explore, Filters and Sort | {{n}} lesson | حصة واحدة |
| `explore.coaches_other` | Explore, Filters and Sort | {{n}} lessons | {{n}} حصص |
| `explore.workshops_one` | Explore, Filters and Sort | {{n}} group | جروب واحد |
| `explore.workshops_other` | Explore, Filters and Sort | {{n}} groups | {{n}} جروبات |
| `explore.within` | Explore, Filters and Sort | within {{km}} km | في حدود {{km}} كم |
| `explore.sortBy` | Explore, Filters and Sort | Sort: {{name}} | الترتيب: {{name}} |
| `explore.sortTitle` | Explore, Filters and Sort | Sort by | رتّب حسب |
| `explore.sort.soonest` | Explore, Filters and Sort | Soonest available | الأقرب معادًا |
| `explore.sort.price` | Explore, Filters and Sort | Lowest price | الأرخص |
| `explore.sort.rating` | Explore, Filters and Sort | Highest rated | الأعلى تقييمًا |
| `explore.sort.nearest` | Explore, Filters and Sort | Nearest | الأقرب مكانًا |
| `explore.emptyTitle` | Explore, Filters and Sort | No matches | مفيش نتايج |
| `explore.emptyBody` | Explore, Filters and Sort | Loosen a filter or try another search. | خفّف فلتر أو جرّب بحث تاني. |
| `explore.emptyAction` | Explore, Filters and Sort | Clear search and filters | امسح البحث والفلاتر |
| `explore.reset` | Explore, Filters and Sort | Reset | إعادة ضبط |
| `explore.maxPrice` | Explore, Filters and Sort | Max price | أقصى سعر |
| `explore.any` | Explore, Filters and Sort | Any | أي |
| `explore.upTo` | Explore, Filters and Sort | Up to {{price}} | لحد {{price}} |
| `explore.type` | Explore, Filters and Sort | Session type | نوع الحصة |
| `explore.types.private` | Explore, Filters and Sort | 1:1 | ١:١ |
| `explore.types.group` | Explore, Filters and Sort | Group | جروب |
| `explore.types.kids` | Explore, Filters and Sort | Kids | أطفال |
| `explore.types.workshop` | Explore, Filters and Sort | Group | جروب |
| `explore.gender` | Explore, Filters and Sort | Instructor gender | نوع المدرّب |
| `explore.rating` | Explore, Filters and Sort | Rating | التقييم |
| `explore.ratingAtLeast` | Explore, Filters and Sort | {{value}}+ | {{value}}+ |
| `explore.distance` | Explore, Filters and Sort | Distance | المسافة |
| `explore.km` | Explore, Filters and Sort | {{km}} km | {{km}} كم |
| `explore.availability` | Explore, Filters and Sort | Availability | المواعيد |
| `explore.when.any` | Explore, Filters and Sort | Any time | أي وقت |
| `explore.when.today` | Explore, Filters and Sort | Today | النهارده |
| `explore.when.week` | Explore, Filters and Sort | This week | الأسبوع ده |
| `explore.when.weekend` | Explore, Filters and Sort | Weekend | الويك إند |
| `explore.showCoaches_one` | Explore, Filters and Sort | Show {{n}} lesson | اعرض حصة واحدة |
| `explore.showCoaches_other` | Explore, Filters and Sort | Show {{n}} lessons | اعرض {{n}} حصص |
| `explore.showWorkshops_one` | Explore, Filters and Sort | Show {{n}} group | اعرض جروب واحد |
| `explore.showWorkshops_other` | Explore, Filters and Sort | Show {{n}} groups | اعرض {{n}} جروبات |
| `explore.noMatches` | Explore, Filters and Sort | No matches | مفيش نتايج |
| `explore.noMatchesReason` | Explore, Filters and Sort | Loosen a filter to see results. | خفّف فلتر عشان تشوف نتايج. |
| `instructor.reviews_one` | Instructor profile | {{n}} review | تقييم واحد |
| `instructor.reviews_other` | Instructor profile | {{n}} reviews | {{n}} تقييمات |
| `instructor.years_one` | Instructor profile | {{n}} yr teaching | سنة تدريس |
| `instructor.years_other` | Instructor profile | {{n}} yrs teaching | {{n}} سنين تدريس |
| `instructor.nextAvailable` | Instructor profile | Next available | أقرب مواعيد فاضية |
| `instructor.allTimes` | Instructor profile | All times | كل المواعيد |
| `instructor.noTimes` | Instructor profile | No open times in the next two weeks | مفيش مواعيد فاضية في الأسبوعين الجايين |
| `instructor.upcomingWorkshops` | Instructor profile | Upcoming groups | الجروبات الجاية |
| `instructor.privateLessons` | Instructor profile | Private lessons | حصص خاصة |
| `instructor.sessions` | Instructor profile | Sessions | الحصص |
| `instructor.types.private` | Instructor profile | Private 1:1 | خاص ١:١ |
| `instructor.types.group` | Instructor profile | Small group | جروب صغير |
| `instructor.types.kids` | Instructor profile | Kids | أطفال |
| `instructor.types.workshop` | Instructor profile | Group | جروب |
| `instructor.minutes` | Instructor profile | {{n}} min | {{n}} دقيقة |
| `instructor.onePerson` | Instructor profile | one person | شخص واحد |
| `instructor.upTo` | Instructor profile | up to {{n}}, price per person | لحد {{n}}، السعر للفرد |
| `instructor.ages` | Instructor profile | ages {{min}}–{{max}} | من سن {{min}} لـ {{max}} |
| `instructor.upToKids` | Instructor profile | up to {{n}} kids | لحد {{n}} أطفال |
| `instructor.whatToBring` | Instructor profile | What to bring | هات معاك |
| `instructor.policyCancel` | Instructor profile | Free cancellation up to 24 hours before | الإلغاء مجاني لحد ٢٤ ساعة قبل المعاد |
| `instructor.from` | Instructor profile | From | من |
| `instructor.book` | Instructor profile | Book | احجز |
| `instructor.share` | Instructor profile | {{name}} teaches {{discipline}} on Coach For All. | {{name}} بيدرّس {{discipline}} على Coach For All. |
| `instructor.notFound` | Instructor profile | This instructor isn't taking bookings right now. | المدرّب ده مش بياخد حجوزات دلوقتي. |
| `instructor.loadError` | Instructor profile | This profile didn't load. Check your connection and try again. | البروفايل ماحمّلش. اتأكد من النت وجرّب تاني. |
| `workshop.pill` | Workshop | Group · {{level}} | جروب · {{level}} |
| `workshop.pillPlain` | Workshop | Group | جروب |
| `workshop.with` | Workshop | With {{name}} | مع {{name}} |
| `workshop.pickDate` | Workshop | Pick a date | اختار يوم |
| `workshop.left` | Workshop | {{n}} left | فاضل {{n}} |
| `workshop.dateLabel` | Workshop | {{date}}, {{time}}, {{state}} | {{date}}، {{time}}، {{state}} |
| `workshop.seats` | Workshop | Seats | الأماكن |
| `workshop.seatsHint` | Workshop | Come with a friend, up to {{n}} | هات صاحبك معاك، لحد {{n}} |
| `workshop.included` | Workshop | Included | متضمّن |
| `workshop.takeHome` | Workshop | You take home | هتاخد معاك |
| `workshop.seat_one` | Workshop | {{n}} seat | مكان واحد |
| `workshop.seat_other` | Workshop | {{n}} seats | {{n}} أماكن |
| `workshop.reserve` | Workshop | Reserve | احجز |
| `workshop.pickDateReason` | Workshop | Pick a date with seats left | اختار يوم فيه أماكن فاضية |
| `workshop.noDates` | Workshop | No upcoming dates yet. Check back soon. | مفيش مواعيد جاية لسه. ارجع تاني قريب. |
| `workshop.notFound` | Workshop | This group isn't running any more. | الجروب ده مبقاش شغّال. |
| `book.title` | Book | Book with {{name}} | احجز مع {{name}} |
| `book.typeLabel` | Book | Session type | نوع الحصة |
| `book.types.private` | Book | 1:1 | ١:١ |
| `book.types.group` | Book | Group | جروب |
| `book.types.kids` | Book | Kids | أطفال |
| `book.desc.private` | Book | Just you and {{name}}, {{n}} min | إنت و{{name}} بس، {{n}} دقيقة |
| `book.desc.group` | Book | Up to {{cap}} people, {{n}} min, price per person | لحد {{cap}} أشخاص، {{n}} دقيقة، السعر للفرد |
| `book.desc.kids` | Book | Ages {{min}}–{{max}}, {{n}} min. A guardian stays on site. | من سن {{min}} لـ {{max}}، {{n}} دقيقة. لازم حد كبير يفضل موجود. |
| `book.change` | Book | Change | غيّر |
| `book.addChild` | Book | Add a child to book kids sessions | ضيف طفل عشان تحجز حصص أطفال |
| `book.childOutOfRange` | Book | Kids sessions here are for ages {{min}}–{{max}}. Add a child in that range. | حصص الأطفال هنا من سن {{min}} لـ {{max}}. ضيف طفل في السن ده. |
| `book.noTimes` | Book | No times on {{day}} · {{name}} isn't coaching that day. | مفيش مواعيد يوم {{day}} · {{name}} مش بيدرّب اليوم ده. |
| `book.note` | Book | Note for {{name}} (optional) | ملاحظة لـ {{name}} (اختياري) |
| `book.pickTime` | Book | Pick a time | اختار معاد |
| `book.pickTimeReason` | Book | Pick a time to continue | اختار معاد عشان تكمّل |
| `book.needChild` | Book | Add a child to continue | ضيف طفل عشان تكمّل |
| `book.continue` | Book | Continue | كمّل |
| `book.summary` | Book | {{day}} · {{start}}–{{end}} | {{day}} · {{start}}–{{end}} |
| `book.notFound` | Book | These sessions aren't available any more. | الحصص دي مبقتش متاحة. |
| `book.childTitle` | Book | For {{name}}, age {{age}} | لـ {{name}}، {{age}} سنين |
| `review.title` | Review & pay | Review & pay | المراجعة والدفع |
| `review.edit` | Review & pay | Edit | تعديل |
| `review.forChild` | Review & pay | for {{name}} | لـ {{name}} |
| `review.payWith` | Review & pay | Pay with | ادفع بـ |
| `review.card` | Review & pay | Card | كارت |
| `review.cardSub` | Review & pay | Debit or credit card | كارت خصم أو ائتمان |
| `review.venue` | Review & pay | Pay at the venue | ادفع في المكان |
| `review.venueSub` | Review & pay | Cash or card on arrival | كاش أو كارت لما توصل |
| `review.kidsNote` | Review & pay | Nothing is charged now. {{name}} confirms first, then you have 24 hours to pay. | مش هيتخصم حاجة دلوقتي. {{name}} هيأكّد الأول، وبعدها قدامك ٢٤ ساعة تدفع. |
| `review.promo` | Review & pay | Promo code | كود الخصم |
| `review.apply` | Review & pay | Apply | طبّق |
| `review.remove` | Review & pay | Remove | شيل |
| `review.promoApplied` | Review & pay | {{code}} applied: {{pct}}% off this session | اتطبّق {{code}}: خصم {{pct}}٪ على الحصة دي |
| `review.promoInvalid` | Review & pay | “{{code}}” isn't a valid code. Check it and try again. | "{{code}}" مش كود صح. راجعه وجرّب تاني. |
| `review.session` | Review & pay | Session | الحصة |
| `review.sessionSeats` | Review & pay | Session × {{n}} | الحصة × {{n}} |
| `review.promoLine` | Review & pay | Promo {{code}} | خصم {{code}} |
| `review.creditLine` | Review & pay | App credit | رصيد التطبيق |
| `review.useCredit` | Review & pay | Use my app credit | استخدم رصيدي |
| `review.creditBalance` | Review & pay | {{amount}} available | متاح {{amount}} |
| `review.venueFee` | Review & pay | Venue fee | رسوم المكان |
| `review.included` | Review & pay | Included | متضمّنة |
| `review.policyFree` | Review & pay | Free cancellation until {{when}}. | الإلغاء مجاني لحد {{when}}. |
| `review.policySameDay` | Review & pay | This is a same-day booking, so it can't be refunded. | ده حجز في نفس اليوم، فمش هيترجع فلوسه. |
| `review.policyLate` | Review & pay | Less than 24 hours to go. Cancelling isn't refunded. | فاضل أقل من ٢٤ ساعة. الإلغاء مش هيرجّع الفلوس. |
| `review.total` | Review & pay | Total | الإجمالي |
| `review.dueAtVenue` | Review & pay | Due at the venue | هتدفع في المكان |
| `review.pay` | Review & pay | Pay {{amount}} | ادفع {{amount}} |
| `review.confirm` | Review & pay | Confirm booking | أكّد الحجز |
| `review.request` | Review & pay | Send request | ابعت الطلب |
| `review.processing` | Review & pay | Processing | جاري التنفيذ |
| `review.errors.no_seats` | Review & pay | Someone just took the last seat. Pick another time. | حد لسه حاجز آخر مكان. اختار معاد تاني. |
| `review.errors.too_soon` | Review & pay | That time starts in less than an hour. Pick a later one. | المعاد ده بيبدأ بعد أقل من ساعة. اختار معاد أبعد. |
| `review.errors.slot_past` | Review & pay | That time has passed. Pick another one. | المعاد ده فات. اختار معاد تاني. |
| `review.errors.child_required` | Review & pay | Add a child to book kids sessions. | ضيف طفل عشان تحجز حصص أطفال. |
| `review.errors.child_age` | Review & pay | This session is for a different age group. | الحصة دي لسن مختلف. |
| `review.errors.promo_invalid` | Review & pay | That promo code isn't valid any more. Remove it and try again. | كود الخصم ده مبقاش شغّال. شيله وجرّب تاني. |
| `review.errors.too_many_seats` | Review & pay | Groups take up to 3 seats. | الجروبات بتاخد لحد ٣ أماكن. |
| `review.errors.not_signed_in` | Review & pay | Sign in again to book. | سجّل دخول تاني عشان تحجز. |
| `review.errors.generic` | Review & pay | Something went wrong and nothing was charged. Try again. | حصلت مشكلة ومتخصمش أي فلوس. جرّب تاني. |
| `review.paymentFailed` | Review & pay | The payment didn't go through. Your seat is held for 5 minutes, so you can try again. | الدفع ماتمّش. مكانك محجوز ٥ دقايق، فتقدر تجرّب تاني. |
| `review.notFound` | Review & pay | This time isn't available any more. | المعاد ده مبقاش متاح. |
| `demoPay.title` | Demo payment | Demo payment | دفع تجريبي |
| `demoPay.body` | Demo payment | This is a test checkout. No real money moves. | ده دفع تجريبي. مفيش فلوس حقيقية بتتحرّك. |
| `demoPay.pay` | Demo payment | Pay {{amount}} | ادفع {{amount}} |
| `demoPay.fail` | Demo payment | Fail the payment | خلّي الدفع يفشل |
| `demoPay.booking` | Demo payment | Booking {{ref}} | الحجز {{ref}} |
| `confirmed.headline.hobbies` | Confirmed | You're in. | إنت معانا. |
| `confirmed.headline.sports` | Confirmed | You're on the court. | إنت في الملعب. |
| `confirmed.headline.education` | Confirmed | Lesson booked. | الدرس اتحجز. |
| `confirmed.headline.languages` | Confirmed | See you in class. | نشوفك في الحصة. |
| `confirmed.headline.pending` | Confirmed | Request sent. | الطلب اتبعت. |
| `confirmed.subConfirmed` | Confirmed | {{name}} has confirmed. Booking ref {{ref}} | {{name}} أكّد. رقم الحجز {{ref}} |
| `confirmed.subPending` | Confirmed | {{name}} will confirm soon. Booking ref {{ref}} | {{name}} هيأكّد قريب. رقم الحجز {{ref}} |
| `confirmed.when` | Confirmed | When | إمتى |
| `confirmed.where` | Confirmed | Where | فين |
| `confirmed.paid` | Confirmed | Paid | مدفوع |
| `confirmed.due` | Confirmed | Due at the venue | هتدفع في المكان |
| `confirmed.payLater` | Confirmed | To pay after {{name}} confirms | هتدفع بعد ما {{name}} يأكّد |
| `confirmed.directions` | Confirmed | Directions | الاتجاهات |
| `confirmed.share` | Confirmed | Share | شارك |
| `confirmed.shareText` | Confirmed | {{title}} · {{when}} · {{venue}} (booked on Coach For All, ref {{ref}}) | {{title}} · {{when}} · {{venue}} (اتحجز على Coach For All، رقم {{ref}}) |
| `confirmed.remind` | Confirmed | Remind me | فكّرني |
| `confirmed.viewBooking` | Confirmed | View booking | شوف الحجز |
| `confirmed.backHome` | Confirmed | Back to Home | ارجع للرئيسية |
| `confirmed.done` | Confirmed | Booking confirmed | الحجز اتأكّد |
| `remind.title` | Remind me sheet | Remind me | فكّرني |
| `remind.m30` | Remind me sheet | 30 minutes before | قبلها بنص ساعة |
| `remind.m60` | Remind me sheet | 1 hour before | قبلها بساعة |
| `remind.m120` | Remind me sheet | 2 hours before | قبلها بساعتين |
| `remind.evening` | Remind me sheet | The evening before | بالليل اللي قبلها |
| `remind.off` | Remind me sheet | Off | مقفول |
| `bookings.upcoming` | Bookings | Upcoming · {{n}} | الجاية · {{n}} |
| `bookings.past` | Bookings | Past | اللي فاتت |
| `bookings.segLabel` | Bookings | Show | اعرض |
| `bookings.title` | Bookings | {{discipline}} with {{name}} | {{discipline}} مع {{name}} |
| `bookings.titleChild` | Bookings | {{discipline}} · {{child}} with {{name}} | {{discipline}} · {{child}} مع {{name}} |
| `bookings.today` | Bookings | Today | النهارده |
| `bookings.status.confirmed` | Bookings | Confirmed | متأكّد |
| `bookings.status.pending` | Bookings | Waiting for {{name}} to confirm | مستني {{name}} يأكّد |
| `bookings.status.paymentDue` | Bookings | Payment due | مستني الدفع |
| `bookings.status.completed` | Bookings | Completed | خلصت |
| `bookings.status.cancelled` | Bookings | Cancelled | اتلغت |
| `bookings.bookAgain` | Bookings | Book again | احجز تاني |
| `bookings.details` | Bookings | Details | التفاصيل |
| `bookings.emptyUpcoming` | Bookings | No upcoming sessions | مفيش حصص جاية |
| `bookings.emptyUpcomingBody` | Bookings | Book a session and it shows up here. | احجز حصة وهتظهر هنا. |
| `bookings.explore` | Bookings | Explore | استكشف |
| `bookings.emptyPast` | Bookings | Nothing here yet | مفيش حاجة هنا لسه |
| `bookings.emptyPastBody` | Bookings | Sessions you finish or cancel show up here. | الحصص اللي تخلّصها أو تلغيها هتظهر هنا. |
| `bookings.filter` | Bookings | Filter bookings | فلتر الحجوزات |
| `bookings.filterTitle` | Bookings | Filter bookings | فلتر الحجوزات |
| `bookings.filterAll` | Bookings | All | الكل |
| `bookings.new` | Bookings | Book a new session | احجز حصة جديدة |
| `booking.paid` | Booking detail | Paid {{amount}} | اتدفع {{amount}} |
| `booking.atVenue` | Booking detail | Pay at the venue · {{amount}} | هتدفع في المكان · {{amount}} |
| `booking.due` | Booking detail | Payment due · {{amount}} | مستني الدفع · {{amount}} |
| `booking.refunded` | Booking detail | Cancelled · {{amount}} back as credit | اتلغى · {{amount}} رجعوا رصيد |
| `booking.noRefund` | Booking detail | Cancelled · not refunded | اتلغى · من غير استرجاع |
| `booking.ref` | Booking detail | Booking ref {{ref}} | رقم الحجز {{ref}} |
| `booking.bring` | Booking detail | What to bring | هات معاك |
| `booking.payNow` | Booking detail | Pay {{amount}} | ادفع {{amount}} |
| `booking.policyFree` | Booking detail | Free cancellation until {{when}}. After that the session is non-refundable. | الإلغاء مجاني لحد {{when}}. بعد كده الحصة مش هترجع فلوسها. |
| `booking.policyLate` | Booking detail | Less than 24 hours to go. Cancelling now isn't refunded. | فاضل أقل من ٢٤ ساعة. الإلغاء دلوقتي مش هيرجّع الفلوس. |
| `booking.mapLabel` | Booking detail | Map showing {{venue}} | خريطة لـ {{venue}} |
| `cancel.title` | Cancel sheet | Cancel this session? | تلغي الحصة دي؟ |
| `cancel.outcome.refund` | Cancel sheet | You'll get {{amount}} back as app credit for your next booking. Refund credit never expires. | هيرجعلك {{amount}} رصيد في التطبيق لحجزك الجاي. رصيد الاسترجاع مالوش تاريخ انتهاء. |
| `cancel.outcome.late` | Cancel sheet | Less than 24 hours to go, so cancelling now isn't refunded. [late-cancellation policy] | فاضل أقل من ٢٤ ساعة، فالإلغاء دلوقتي مش هيرجّع الفلوس. [late-cancellation policy] |
| `cancel.outcome.sameDay` | Cancel sheet | Same-day bookings are final, so cancelling isn't refunded. | حجز نفس اليوم نهائي، فالإلغاء مش هيرجّع الفلوس. |
| `cancel.outcome.nothing` | Cancel sheet | Nothing has been charged, so there's nothing to refund. | متخصمش حاجة، فمفيش حاجة ترجع. |
| `cancel.outcome.creditBack` | Cancel sheet | Nothing has been charged. The {{amount}} of credit you used goes back to your balance. | متخصمش حاجة. الـ{{amount}} رصيد اللي استخدمته هيرجعوا لرصيدك. |
| `cancel.reasonLabel` | Cancel sheet | Reason (optional) | السبب (اختياري) |
| `cancel.reasons.schedule` | Cancel sheet | Schedule change | المواعيد اتغيّرت |
| `cancel.reasons.injury` | Cancel sheet | Injury | إصابة |
| `cancel.reasons.weather` | Cancel sheet | Weather | الجو |
| `cancel.reasons.other` | Cancel sheet | Other | حاجة تانية |
| `cancel.keep` | Cancel sheet | Keep booking | خلّي الحجز |
| `cancel.confirm` | Cancel sheet | Cancel booking | الغي الحجز |
| `cancel.confirmRefund` | Cancel sheet | Cancel and get {{amount}} credit | الغي وخد {{amount}} رصيد |
| `cancel.toast` | Cancel sheet | Booking cancelled | الحجز اتلغى |
| `cancel.toastRefund` | Cancel sheet | Booking cancelled · {{amount}} added to your credit | الحجز اتلغى · {{amount}} اتضافوا لرصيدك |
| `reschedule.title` | Reschedule | Reschedule | غيّر المعاد |
| `reschedule.from` | Reschedule | Now {{when}} | دلوقتي {{when}} |
| `reschedule.newTime` | Reschedule | New time | المعاد الجديد |
| `reschedule.pick` | Reschedule | Pick a new time | اختار معاد جديد |
| `reschedule.confirm` | Reschedule | Move booking | انقل الحجز |
| `reschedule.toast` | Reschedule | Moved to {{when}} | اتنقل لـ {{when}} |
| `reschedule.none` | Reschedule | No other open times | مفيش مواعيد فاضية تانية |
| `reschedule.noneBody` | Reschedule | Nothing else is free in the next two weeks. Try again later. | مفيش حاجة فاضية تانية في الأسبوعين الجايين. جرّب بعدين. |
| `booking.reschedule` | Booking detail | Reschedule | غيّر المعاد |
| `booking.cancel` | Booking detail | Cancel booking | الغي الحجز |
| `review.errors.not_cancellable` | Booking errors | This booking can't be changed any more. | الحجز ده مبقاش ينفع يتغيّر. |
| `review.errors.reschedule_closed` | Booking errors | Rescheduling closes 24 hours before the start. | تغيير المعاد بيقفل قبل البداية بـ ٢٤ ساعة. |
| `review.errors.pay_first` | Booking errors | Finish paying for this booking first. | خلّص دفع الحجز ده الأول. |
| `review.errors.no_slot` | Booking errors | That time isn't available any more. Pick another. | المعاد ده مبقاش متاح. اختار معاد تاني. |
| `reminder.body` | Reminder notification | {{when}} at {{venue}} | {{when}} في {{venue}} |
| `auth.nameLabel` | Sign up | Your first name | اسمك الأول |
| `auth.nameRequired` | Sign up | Add your first name so instructors know who's coming. | اكتب اسمك الأول عشان المدرّب يعرف مين جاي. |
| `onboarding.levelsTitle` | Onboarding levels | How experienced are you? | خبرتك قد إيه؟ |
| `preferences.title` | Interests and levels | Interests and levels | الاهتمامات والمستويات |
| `preferences.sub` | Interests and levels | Pick what you want to learn and how experienced you are. Your instructor adjusts the level after your first session. | اختار عايز تتعلّم إيه وخبرتك قد إيه. المدرّب هيظبط المستوى بعد أول حصة. |
| `preferences.levelFor` | Interests and levels | Your level in {{name}} | مستواك في {{name}} |
| `calendar.previousMonth` | Month calendar | Previous month | الشهر اللي فات |
| `calendar.nextMonth` | Month calendar | Next month | الشهر الجاي |
| `calendar.hasTimes` | Month calendar | Has open times | فيه مواعيد فاضية |
| `calendar.hasBookings` | Month calendar | Has bookings | فيه حجوزات |
| `workshop.pickTime` | Group page | Times on {{day}} | المواعيد يوم {{day}} |
| `workshop.timeLabel` | Group page | {{time}}, {{state}} | {{time}}، {{state}} |
| `workshop.seatsQuestion` | Group page | How many seats? | كام مكان؟ |
| `workshop.pickSeats` | Group page | Choose how many seats | اختار عدد الأماكن |
| `workshop.cancellation` | Group page | Cancellation | الإلغاء |
| `workshop.bring` | Group page | Bring | هات معاك |
| `book.audience.private` | Book | Adults | كبار |
| `book.audience.kids` | Book | Kids | أطفال |
| `bookings.calendar` | Bookings | Calendar | التقويم |
| `bookings.filterDiscipline` | Bookings | Discipline | المجال |
| `bookings.filterType` | Bookings | Type | النوع |
| `bookings.filterTime` | Bookings | Time of day | وقت اليوم |
| `bookings.kind.all` | Bookings | All | الكل |
| `bookings.kind.lessons` | Bookings | Lessons | حصص |
| `bookings.kind.groups` | Bookings | Groups | جروبات |
| `bookings.time.any` | Bookings | Any time | أي وقت |
| `bookings.time.morning` | Bookings | Morning | الصبح |
| `bookings.time.afternoon` | Bookings | Afternoon | الضهر |
| `bookings.time.evening` | Bookings | Evening | بالليل |
| `bookings.filterReset` | Bookings | Reset | إعادة ضبط |
| `bookings.filterShow_one` | Bookings | Show {{n}} booking | اعرض حجز واحد |
| `bookings.filterShow_other` | Bookings | Show {{n}} bookings | اعرض {{n}} حجوزات |
| `bookings.filterNone` | Bookings | No bookings match | مفيش حجوزات مطابقة |
| `bookings.filterNoneReason` | Bookings | Try fewer filters | جرّب فلاتر أقل |
| `bookings.filterOnCount` | Bookings | Filter bookings, {{n}} on | فلتر الحجوزات، {{n}} شغّالين |
| `bookings.noneOnDay` | Bookings | Nothing booked on {{day}} | مفيش حجوزات يوم {{day}} |
| `bookings.noneOnDayBody` | Bookings | Days with a dot have bookings. | الأيام اللي عليها نقطة فيها حجوزات. |
| `home.board.title` | Home | Starting soon near you | بيبدأ قريب جنبك |
| `home.board.lesson` | Home | 1:1 {{discipline}} | {{discipline}} ١:١ |
| `home.board.tomorrow` | Home | Tomorrow | بكره |
| `home.board.seatsLeft_one` | Home | {{n}} seat left | فاضل مكان واحد |
| `home.board.seatsLeft_other` | Home | {{n}} seats left | فاضل {{n}} أماكن |
| `home.board.rowLabel` | Home | {{when}}, {{title}}, {{detail}} | {{when}}، {{title}}، {{detail}} |
| `common.tryAgain` | Buttons and messages | Try again | جرّب تاني |
| `onboarding.loadErrorTitle` | Onboarding | Couldn't load the list | القايمة ماحمّلتش |
| `explore.segLessons` | Explore | Lessons | حصص |
| `explore.segGroups` | Explore | Groups | جروبات |
| `explore.category` | Explore | Category | القسم |
| `explore.discipline` | Explore | What | إيه |
| `explore.who` | Explore | Who it's for | لمين |
| `explore.audience.private` | Explore | Adults | كبار |
| `explore.audience.kids` | Explore | Kids | أطفال |
