import { render, screen } from '@testing-library/react-native';
import '@/i18n';
import { fitLines, T } from './T';

test('fit allows one line per word, capped, so a word is never split across lines', () => {
  expect(fitLines('Photography', 2)).toBe(1); // one word: one line, shrink if too wide
  expect(fitLines('Arabic calligraphy', 2)).toBe(2);
  expect(fitLines('Kids clay club for ages', 2)).toBe(2);
  expect(fitLines('  Padel  ', 3)).toBe(1);
  expect(fitLines(undefined, 2)).toBe(2); // non-text children: the cap
});

test('a fitted label shrinks to fit (down to 75%) instead of wrapping mid-word', async () => {
  await render(<T fit={2}>Photography</T>);
  const p = screen.getByText('Photography').props;
  expect(p).toMatchObject({ numberOfLines: 1, adjustsFontSizeToFit: true, minimumFontScale: 0.75 });
  await render(<T>Free text</T>);
  expect(screen.getByText('Free text').props.adjustsFontSizeToFit).toBeUndefined(); // body copy wraps normally
});
