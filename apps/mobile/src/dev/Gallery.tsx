import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { missingArabicKeys, setLanguage, useLang } from '@/i18n';
import { useSettings, type A11yFlag, type ThemePref } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { testBanner, testPhoto } from '@/dev/testImages';
import { Avatar } from '@/ui/Avatar';
import { Banner } from '@/ui/Banner';
import { Card } from '@/ui/Card';
import { DashedCard } from '@/ui/DashedCard';
import { DateButton } from '@/ui/DateButton';
import { DisciplineTile } from '@/ui/DisciplineTile';
import { Hero } from '@/ui/Hero';
import { IconTile } from '@/ui/IconTile';
import { InterestTile } from '@/ui/InterestTile';
import { LevelOption } from '@/ui/LevelOption';
import { OtpBoxes } from '@/ui/OtpBoxes';
import { PhoneField } from '@/ui/PhoneField';
import { RowCard } from '@/ui/RowCard';
import { Section } from '@/ui/Section';
import { SessionRow } from '@/ui/SessionRow';
import { Stepper } from '@/ui/Stepper';
import { TextField } from '@/ui/TextField';
import { TextLink } from '@/ui/TextLink';
import { BookingCard } from '@/ui/BookingCard';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { CategoryButton, CategoryTray } from '@/ui/CategoryTray';
import { Chip } from '@/ui/Chip';
import { DateTile } from '@/ui/DateTile';
import { DayPicker } from '@/ui/DayPicker';
import { GroupedList } from '@/ui/GroupedList';
import { IconButton } from '@/ui/IconButton';
import { InstructorCard } from '@/ui/InstructorCard';
import { NavigationBar } from '@/ui/NavigationBar';
import { Pill } from '@/ui/Pill';
import { Progress } from '@/ui/Progress';
import { SearchField } from '@/ui/SearchField';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { Switch } from '@/ui/Switch';
import { T } from '@/ui/T';
import { TabBar, useMinimiseOnScroll, useTabBarBottom, type TabKey } from '@/ui/TabBar';
import { TimeSlots, type Slot } from '@/ui/TimeSlots';
import { Toast } from '@/ui/Toast';
import { WorkshopCard } from '@/ui/WorkshopCard';
import { formatMonthYear, formatNumber, formatPrice } from '@/i18n/format';
import { galleryCopy } from './galleryCopy';
import { seedFor } from './seed';

// Dev-only screen: demo copy comes from galleryCopy.ts (English handoff samples + an Arabic draft, D27).

const THEMES: ThemePref[] = ['system', 'light', 'dark'];
const FLAGS: A11yFlag[] = ['reduceTransparency', 'increaseContrast', 'reduceMotion'];
const DAY = 24 * 60 * 60 * 1000;
const WEEK = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.parse('2026-10-17T09:00:00Z') + i * DAY),
  hasTimes: i % 3 !== 2,
}));
const SLOTS: Slot[] = [
  { id: '1', start: [9, 0], end: [10, 0], state: 'open' },
  { id: '2', start: [10, 30], end: [11, 30], state: 'booked' },
  { id: '3', start: [13, 0], end: [14, 0], state: 'open' },
  { id: '4', start: [17, 30], end: [18, 30], state: 'yours' },
  { id: '5', start: [19, 0], end: [20, 0], state: 'open' },
];

// Demo dates for the app building blocks: fixed when the gallery loads, so renders stay pure.
const DEMO_BASE = Date.now();

export function Gallery() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const settings = useSettings();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollViewOffset(scrollRef);
  const tabs = useMinimiseOnScroll();
  const tabBarBottom = useTabBarBottom();
  const lang = useLang();
  const g = galleryCopy[lang];
  const { t } = useTranslation();
  const seed = seedFor(lang);
  const n = (x: number) => formatNumber(x, lang);

  const [chip, setChip] = useState(0);
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState(0);
  const [weekly, setWeekly] = useState(true);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string>();
  const [toast, setToast] = useState<string>();
  const [trayOpen, setTrayOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>('home');
  const [demoDate, setDemoDate] = useState(0);
  const [demoSeats, setDemoSeats] = useState(1);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [demoTiles, setDemoTiles] = useState<number[]>([0]);
  const [demoLevel, setDemoLevel] = useState(2);
  const hideToast = useCallback(() => setToast(undefined), []);
  const missing = missingArabicKeys();

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={tabs.onScroll}
        scrollEventThrottle={16}
        testID="gallery-scroll"
        contentContainerStyle={{
          paddingTop: insets.top + component.navBar.height + space.space6,
          paddingBottom: component.tabBar.height + tabBarBottom + space.space8,
          paddingHorizontal: layout.sideMargin,
          gap: layout.sectionGap,
        }}
      >
        <T variant="largeTitle" accessibilityRole="header">
          {g.title}
        </T>

        <Section variant="title2" title={g.sections.controls}>
          <SegmentedControl
            accessibilityLabel={g.theme}
            segments={g.themes}
            selectedIndex={THEMES.indexOf(settings.theme)}
            onChange={(i) => settings.setTheme(THEMES[i] ?? 'system')}
          />
          <SegmentedControl
            accessibilityLabel={g.language}
            segments={['English', 'العربية']}
            selectedIndex={lang === 'ar' ? 1 : 0}
            onChange={(i) => setLanguage(i === 1 ? 'ar' : 'en')}
          />
          <GroupedList
            rows={FLAGS.map((flag) => ({
              key: flag,
              title: g.flags[flag],
              trailing: (
                <Switch
                  accessibilityLabel={g.flags[flag]}
                  value={settings.devForce[flag]}
                  onValueChange={(on) => settings.setDevForce(flag, on)}
                />
              ),
            }))}
          />
          <T variant="footnote" color={c.label2}>
            {g.missing(n(missing.length))}
          </T>
        </Section>

        <Section variant="title2" title={g.sections.buttons}>
          <Button label={g.buttons.book} variant="primary" onPress={() => setToast(g.buttons.pressed)} />
          <Button label={g.buttons.message} variant="secondary" onPress={() => {}} />
          <Button label={g.buttons.show} onPress={() => {}} />
          <Button label={g.buttons.cancel} variant="destructive" onPress={() => {}} />
          <Button
            label={g.buttons.refund(formatPrice(800, lang))}
            variant="destructiveFilled"
            onPress={() => {}}
          />
          <Button label={g.buttons.pickTime} disabled reason={g.buttons.pickTimeReason} onPress={() => {}} />
          <View style={styles.row}>
            <Button label={g.buttons.reserve} size="small" variant="primary" onPress={() => {}} />
            <Button label={g.buttons.edit} size="small" onPress={() => {}} />
            <Button label={g.buttons.processing} size="small" busy onPress={() => {}} />
          </View>
        </Section>

        <Section variant="title2" title={g.sections.iconButtons}>
          <View style={styles.row}>
            <IconButton icon="back" accessibilityLabel={t('common.back')} floating onPress={() => {}} />
            <IconButton icon="share" accessibilityLabel={t('common.share')} floating onPress={() => {}} />
            <IconButton icon="heart" accessibilityLabel={t('common.favourite')} floating onPress={() => {}} />
            <IconButton icon="close" accessibilityLabel={t('common.close')} onPress={() => {}} />
          </View>
        </Section>

        <Section variant="title2" title={g.sections.chips}>
          <View style={styles.wrap}>
            <Chip label={g.filters(n(2))} outlined onPress={() => {}} />
            {g.chips.map((label, i) => (
              <Chip key={label} label={label} selected={chip === i} onPress={() => setChip(i)} />
            ))}
          </View>
          <View style={styles.wrap}>
            <Pill label={g.pills.confirmed} tone="ok" />
            <Pill label={g.pills.waiting} tone="warn" />
            <Pill label={g.pills.next} tone="next" />
            <Pill label={g.pills.members} tone="gold" />
            <Pill label={g.pills.completed} />
          </View>
        </Section>

        <Section variant="title2" title={g.sections.search}>
          <SearchField value={search} onChangeText={setSearch} placeholder={g.searchPlaceholder} />
          <SegmentedControl
            accessibilityLabel={g.exploreView}
            segments={g.exploreSegments}
            selectedIndex={segment}
            onChange={setSegment}
          />
        </Section>

        <Section variant="title2" title={g.sections.switches}>
          <GroupedList
            rows={[
              {
                key: 'weekly',
                title: g.weekly,
                subtitle: g.weeklySub,
                trailing: <Switch accessibilityLabel={g.weekly} value={weekly} onValueChange={setWeekly} />,
              },
            ]}
          />
          <Progress value={1} accessibilityLabel={g.progress[0]!} />
          <Progress value={1.5} accessibilityLabel={g.progress[1]!} />
          <Progress value={3} accessibilityLabel={g.progress[2]!} />
        </Section>

        <Section variant="title2" title={g.sections.cards}>
          <InstructorCard instructor={seed.yasmine} onPress={() => {}} />
          <InstructorCard instructor={seed.nour} onPress={() => {}} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
            <WorkshopCard workshop={seed.wheelTaster} layout="rail" onPress={() => {}} />
            <WorkshopCard workshop={seed.photoWalk} layout="rail" onPress={() => {}} />
          </ScrollView>
          <WorkshopCard workshop={seed.wheelTaster} onPress={() => {}} />
        </Section>

        <Section variant="title2" title={g.sections.list}>
          <GroupedList
            rows={[
              { key: 'family', title: g.list.family, icon: 'profile', onPress: () => {} },
              {
                key: 'lang',
                title: g.list.language,
                value: lang === 'ar' ? 'العربية' : 'English',
                icon: 'languages',
                onPress: () => {},
              },
              {
                key: 'appearance',
                title: g.list.appearance,
                value: g.list.system,
                icon: 'more',
                onPress: () => {},
              },
              { key: 'out', title: g.list.signOut, destructive: true, onPress: () => {} },
            ]}
          />
        </Section>

        <Section variant="title2" title={g.sections.dates}>
          <View style={styles.row}>
            <DateTile date={WEEK[0]!.date} />
            <DateTile date={new Date('2026-10-06T09:00:00Z')} past />
          </View>
          <DayPicker
            monthLabel={formatMonthYear(WEEK[0]!.date, lang)}
            days={WEEK}
            selectedIndex={day}
            onSelect={setDay}
            onNextWeek={() => {}}
          />
          <TimeSlots slots={SLOTS} selectedId={slot} onSelect={(s) => setSlot(s.id)} />
        </Section>

        <Section variant="title2" title={g.sections.overlays}>
          <View style={styles.row}>
            <CategoryButton category={settings.category} onPress={() => setTrayOpen(true)} />
          </View>
          <Button label={g.showToast} onPress={() => setToast(g.toast)} />
          <Button label={g.openSheet} onPress={() => router.push('/gallery-sheet')} />
          <View style={[styles.barDemo, { backgroundColor: c.surface2 }]}>
            <BottomActionBar
              caption={`${seed.wheelTaster.when} · ${g.seats(n(2))}`}
              price={formatPrice(1300, lang)}
            >
              <Button label={g.buttons.reserve} size="small" variant="primary" onPress={() => {}} />
            </BottomActionBar>
          </View>
        </Section>

        <Section title={g.sections.blocks} variant="title2">
          <BookingCard
            date={new Date(DEMO_BASE)}
            title={g.app.bookingTitle}
            time={g.app.bookingTime}
            venue={g.app.bookingVenue}
            status={{ label: g.app.bookingStatus, tone: 'ok' }}
            onPress={() => {}}
            actions={[{ label: g.app.directions, onPress: () => {} }]}
          />
          <BookingCard
            date={new Date(DEMO_BASE - 7 * 86_400_000)}
            past
            title={g.app.bookingTitle}
            time={g.app.bookingTime}
            venue={g.app.bookingVenue}
            status={{ label: g.app.bookingPastStatus, tone: 'neutral' }}
            onPress={() => {}}
            actions={[
              { label: g.app.bookAgain, onPress: () => {} },
              { label: g.app.details, onPress: () => {} },
            ]}
          />
          <RowCard
            leading={<DateTile date={new Date(DEMO_BASE + 3 * 86_400_000)} />}
            kicker={g.app.nextKicker}
            title={g.app.nextTitle}
            subtitle={g.app.nextSub}
            onPress={() => {}}
          />
          <RowCard
            leading={<IconTile icon="education" />}
            title={g.app.emptyTitle}
            subtitle={g.app.emptySub}
            onPress={() => {}}
          />
          <RowCard
            leading={<Avatar size={component.iconButton.size} image={testPhoto('Nour El-Sayed')} />}
            kicker={g.app.againKicker}
            title={g.app.againTitle}
            subtitle={g.app.againSub}
            onPress={() => {}}
          />
          <RowCard
            leading={<IconTile icon="family" />}
            title={g.app.childTitle}
            subtitle={g.app.childSub}
            trailing={<Button label={g.app.change} size="small" onPress={() => {}} />}
          />
          <View style={styles.row}>
            <Avatar
              size={component.profilePhoto.size}
              image={testPhoto('Yasmine Fathy')}
              accessibilityLabel={g.app.avatar}
            />
            <Avatar size={component.profilePhoto.size} accessibilityLabel={g.app.avatar} />
            <IconTile icon="hobbies" />
            <IconTile icon="clock" tone="neutral" />
          </View>
          <View style={styles.row}>
            {(['pottery', 'photography', 'calligraphy', null] as const).map((icon, i) => (
              <DisciplineTile
                key={i}
                label={g.app.disciplines[i]!}
                icon={icon}
                code={icon ? null : 'FR'}
                onPress={() => {}}
              />
            ))}
          </View>
          <View style={styles.row}>
            {[g.app.left, g.app.full, g.app.left6].map((state, i) => (
              <DateButton
                key={i}
                date={new Date(DEMO_BASE + (2 + i * 7) * 86_400_000)}
                state={state}
                selected={demoDate === i}
                disabled={i === 1}
                onPress={() => setDemoDate(i)}
                accessibilityLabel={`${g.app.dateLabel}, ${state}`}
              />
            ))}
          </View>
          <Card>
            <SessionRow
              date={new Date(DEMO_BASE + 2 * 86_400_000)}
              title={g.app.sessionTitle}
              meta={g.app.sessionMeta}
              highlight={g.app.sessionSpots}
              price={formatPrice(650, lang)}
              onPress={() => {}}
            />
          </Card>
          <Banner text={g.app.banner} />
          <Hero
            height={component.hero.workshop / 2}
            icon="hobbies"
            label={g.app.hero}
            image={testBanner('pottery')}
          />
        </Section>

        <Section
          title={g.sections.forms}
          variant="title2"
          action={{ label: g.app.seeAll, onPress: () => {} }}
        >
          <TextField
            label={g.app.field}
            value={demoName}
            onChangeText={setDemoName}
            error={demoName ? null : g.app.fieldError}
          />
          <TextField placeholder={g.app.note} multiline />
          <View style={styles.row}>
            <TextLink label={g.app.seeAll} onPress={() => {}} />
            <TextLink label={g.app.sort} tone="plain" role="button" icon="chevronDown" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            <T variant="headline">{g.app.seats}</T>
            <Stepper
              value={demoSeats}
              min={1}
              max={3}
              onChange={setDemoSeats}
              accessibilityLabel={g.app.seats}
              decrementLabel={g.app.fewer}
              incrementLabel={g.app.more}
            />
          </View>
          <DashedCard label={g.app.addFamily} onPress={() => {}} />
        </Section>

        <Section title={g.sections.onboarding} variant="title2">
          <View style={styles.row}>
            {(['pottery', 'padel'] as const).map((icon, i) => (
              <InterestTile
                key={icon}
                label={g.app.tiles[i]!}
                icon={icon}
                selected={demoTiles.includes(i)}
                onPress={() =>
                  setDemoTiles(demoTiles.includes(i) ? demoTiles.filter((x) => x !== i) : [...demoTiles, i])
                }
                width={component.disciplineRail.width * 1.5}
              />
            ))}
          </View>
          <LevelOption
            level={demoLevel as 1 | 2 | 3 | 4}
            title={g.app.levelTitle}
            description={g.app.levelDesc}
            selected
            onPress={() => setDemoLevel(demoLevel === 4 ? 1 : demoLevel + 1)}
          />
          <PhoneField digits={demoPhone} onChangeDigits={setDemoPhone} />
          <OtpBoxes value={demoCode} onChange={setDemoCode} />
        </Section>
      </Animated.ScrollView>

      <NavigationBar
        title={g.title}
        titleAfterHero
        scrollY={scrollY}
        actions={[
          {
            icon: 'more',
            label: g.controlsAction,
            onPress: () => scrollRef.current?.scrollTo({ y: 0, animated: true }),
          },
        ]}
      />
      <TabBar
        active={tab}
        onSelect={setTab}
        unreadMessages={3}
        minimised={tabs.minimised}
        onRestore={tabs.restore}
      />
      <Toast message={toast ?? ''} visible={!!toast} onHide={hideToast} />
      <CategoryTray
        visible={trayOpen}
        selected={settings.category}
        onSelect={settings.setCategory}
        onClose={() => setTrayOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  section: { gap: space.space3 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.space3 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
  rail: { gap: layout.cardGap },
  barDemo: { height: component.tabBar.height + space.space5, borderRadius: component.bottomBar.radius },
});
