import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';
import { useSettings, type A11yFlag } from './settings';

export type A11y = Record<A11yFlag, boolean>;

const contrastEvent = Platform.OS === 'ios' ? 'darkerSystemColorsChanged' : 'highTextContrastChanged';
const isContrast = () =>
  Platform.OS === 'ios'
    ? AccessibilityInfo.isDarkerSystemColorsEnabled()
    : AccessibilityInfo.isHighTextContrastEnabled();

export function mergeA11y(system: A11y, force: A11y): A11y {
  return {
    reduceTransparency: system.reduceTransparency || force.reduceTransparency,
    increaseContrast: system.increaseContrast || force.increaseContrast,
    reduceMotion: system.reduceMotion || force.reduceMotion,
  };
}

/** System accessibility settings (§4.3, §12), OR-ed with the gallery's dev overrides. */
export function useA11y(): A11y {
  const force = useSettings((s) => s.devForce);
  const [system, setSystem] = useState<A11y>({
    reduceTransparency: false,
    increaseContrast: false,
    reduceMotion: false,
  });

  useEffect(() => {
    const update = (flag: A11yFlag) => (on: boolean) => setSystem((s) => ({ ...s, [flag]: on }));
    AccessibilityInfo.isReduceTransparencyEnabled().then(update('reduceTransparency'));
    AccessibilityInfo.isReduceMotionEnabled().then(update('reduceMotion'));
    isContrast().then(update('increaseContrast'));
    const subs = [
      AccessibilityInfo.addEventListener('reduceTransparencyChanged', update('reduceTransparency')),
      AccessibilityInfo.addEventListener('reduceMotionChanged', update('reduceMotion')),
      AccessibilityInfo.addEventListener(contrastEvent, update('increaseContrast')),
    ];
    return () => subs.forEach((s) => s.remove());
  }, []);

  return mergeA11y(system, force);
}
