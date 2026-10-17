import { Redirect } from 'expo-router';
import { Gallery } from '@/dev/Gallery';

/** Dev-only component gallery (Phase 0 R9). Never reachable in production builds. */
export default function GalleryRoute() {
  return __DEV__ ? <Gallery /> : <Redirect href="/" />;
}
