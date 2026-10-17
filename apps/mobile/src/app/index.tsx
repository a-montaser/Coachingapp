import { Redirect } from 'expo-router';
import { View } from 'react-native';

// Phase 0 has no product screens; dev builds open the component gallery.
export default function Index() {
  return __DEV__ ? <Redirect href="/gallery" /> : <View />;
}
