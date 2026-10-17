import { router } from 'expo-router';
import { useCallback, useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { missingArabicKeys, setLanguage, useLang } from '@/i18n';
import { useSettings, type A11yFlag, type ThemePref } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
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
import { nour, photoWalk, wheelTaster, yasmine } from './seed';

// Dev-only screen: demo copy is the handoff's English sample copy (§5, §7, §14), not product strings.

const THEMES: ThemePref[] = ['system', 'light', 'dark'];
const FLAGS: [A11yFlag, string][] = [
  ['reduceTransparency', 'Reduce Transparency'],
  ['increaseContrast', 'Increase Contrast'],
  ['reduceMotion', 'Reduce Motion'],
];
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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <T variant="title2" accessibilityRole="header">
        {title}
      </T>
      {children}
    </View>
  );
}

export function Gallery() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const settings = useSettings();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollViewOffset(scrollRef);
  const tabs = useMinimiseOnScroll();
  const tabBarBottom = useTabBarBottom();
  const lang = useLang();

  const [chip, setChip] = useState('All');
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState(0);
  const [weekly, setWeekly] = useState(true);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string>();
  const [toast, setToast] = useState<string>();
  const [trayOpen, setTrayOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>('home');
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
          Component gallery
        </T>

        <Section title="Controls">
          <SegmentedControl
            accessibilityLabel="Theme"
            segments={['System', 'Light', 'Dark']}
            selectedIndex={THEMES.indexOf(settings.theme)}
            onChange={(i) => settings.setTheme(THEMES[i] ?? 'system')}
          />
          <SegmentedControl
            accessibilityLabel="Language"
            segments={['English', 'العربية']}
            selectedIndex={lang === 'ar' ? 1 : 0}
            onChange={(i) => setLanguage(i === 1 ? 'ar' : 'en')}
          />
          <GroupedList
            rows={FLAGS.map(([flag, title]) => ({
              key: flag,
              title,
              trailing: (
                <Switch
                  accessibilityLabel={title}
                  value={settings.devForce[flag]}
                  onValueChange={(on) => settings.setDevForce(flag, on)}
                />
              ),
            }))}
          />
          <T variant="footnote" color={c.label2}>
            {`Keys without approved Arabic: ${missing.length} [OPEN, needs a translator]`}
          </T>
        </Section>

        <Section title="Buttons">
          <Button label="Book a session" variant="primary" onPress={() => setToast('Primary pressed')} />
          <Button label="Message" variant="secondary" onPress={() => {}} />
          <Button label="Show 6 coaches" onPress={() => {}} />
          <Button label="Cancel booking" variant="destructive" onPress={() => {}} />
          <Button label="Cancel and refund 800 EGP" variant="destructiveFilled" onPress={() => {}} />
          <Button label="Pick a time" disabled onPress={() => {}} />
          <View style={styles.row}>
            <Button label="Reserve" size="small" variant="primary" onPress={() => {}} />
            <Button label="Edit" size="small" onPress={() => {}} />
            <Button label="Processing" size="small" busy onPress={() => {}} />
          </View>
        </Section>

        <Section title="Icon buttons">
          <View style={styles.row}>
            <IconButton icon="back" accessibilityLabel="Back" floating onPress={() => {}} />
            <IconButton icon="share" accessibilityLabel="Share" floating onPress={() => {}} />
            <IconButton icon="heart" accessibilityLabel="Favourite" floating onPress={() => {}} />
            <IconButton icon="close" accessibilityLabel="Close" onPress={() => {}} />
          </View>
        </Section>

        <Section title="Chips and pills">
          <View style={styles.wrap}>
            <Chip label="Filters · 2" outlined onPress={() => {}} />
            {['All', 'Pottery', 'Painting', 'Oud'].map((label) => (
              <Chip key={label} label={label} selected={chip === label} onPress={() => setChip(label)} />
            ))}
          </View>
          <View style={styles.wrap}>
            <Pill label="Confirmed" tone="ok" />
            <Pill label="Waiting for Nour to confirm" tone="warn" />
            <Pill label="Next: Today 17:30" tone="next" />
            <Pill label="Members' Circle" tone="gold" />
            <Pill label="Completed" />
          </View>
        </Section>

        <Section title="Search and segments">
          <SearchField value={search} onChangeText={setSearch} placeholder="Pottery, oud, photography…" />
          <SegmentedControl
            accessibilityLabel="Explore view"
            segments={['Workshops', '1:1 lessons']}
            selectedIndex={segment}
            onChange={setSegment}
          />
        </Section>

        <Section title="Switch and progress">
          <GroupedList
            rows={[
              {
                key: 'weekly',
                title: 'Repeat weekly',
                subtitle: 'Same time every Tuesday, cancel any week',
                trailing: (
                  <Switch accessibilityLabel="Repeat weekly" value={weekly} onValueChange={setWeekly} />
                ),
              },
            ]}
          />
          <Progress value={1} accessibilityLabel="Onboarding progress, step 1" />
          <Progress value={1.5} accessibilityLabel="Onboarding progress, step 2 half done" />
          <Progress value={3} accessibilityLabel="Onboarding progress, done" />
        </Section>

        <Section title="Cards">
          <InstructorCard instructor={yasmine} onPress={() => {}} />
          <InstructorCard instructor={nour} onPress={() => {}} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
            <WorkshopCard workshop={wheelTaster} layout="rail" onPress={() => {}} />
            <WorkshopCard workshop={photoWalk} layout="rail" onPress={() => {}} />
          </ScrollView>
          <WorkshopCard workshop={wheelTaster} onPress={() => {}} />
        </Section>

        <Section title="Grouped list">
          <GroupedList
            rows={[
              { key: 'family', title: 'Family & kids', icon: 'profile', onPress: () => {} },
              { key: 'lang', title: 'Language', value: 'English', icon: 'languages', onPress: () => {} },
              { key: 'appearance', title: 'Appearance', value: 'System', icon: 'more', onPress: () => {} },
              { key: 'out', title: 'Sign out', destructive: true, onPress: () => {} },
            ]}
          />
        </Section>

        <Section title="Dates and times">
          <View style={styles.row}>
            <DateTile date={WEEK[0]!.date} />
            <DateTile date={new Date('2026-10-06T09:00:00Z')} past />
          </View>
          <DayPicker
            monthLabel="October 2026"
            days={WEEK}
            selectedIndex={day}
            onSelect={setDay}
            onNextWeek={() => {}}
          />
          <TimeSlots slots={SLOTS} selectedId={slot} onSelect={(s) => setSlot(s.id)} />
        </Section>

        <Section title="Overlays">
          <View style={styles.row}>
            <CategoryButton category={settings.category} onPress={() => setTrayOpen(true)} />
          </View>
          <Button label="Show toast" onPress={() => setToast('Booking cancelled')} />
          <Button label="Open sheet" onPress={() => router.push('/gallery-sheet')} />
          <View style={[styles.barDemo, { backgroundColor: c.surface2 }]}>
            <BottomActionBar caption="Sat 17 Oct · 11:00 · 2 seats" price="1,300 EGP">
              <Button label="Reserve" size="small" variant="primary" onPress={() => {}} />
            </BottomActionBar>
          </View>
        </Section>
      </Animated.ScrollView>

      <NavigationBar
        title="Component gallery"
        titleAfterHero
        scrollY={scrollY}
        actions={[
          {
            icon: 'more',
            label: 'Gallery controls',
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
