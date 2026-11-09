import 'react-native-gesture-handler/jestSetup';
import { setUpTests } from 'react-native-reanimated';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Native-only modules that need a JS stand-in under Jest.
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
setUpTests();

// Gesture handler 3 under Jest (SDK 58): Worklets resolves to its web build here, so the UI-runtime hook-up
// gesture handler runs on load would throw, and its dev check for a GestureHandlerRootView ancestor fails
// for components rendered alone. The app's root layout has the root view; the e2e journey covers it.
jest.mock('react-native-gesture-handler/lib/module/handlers/gestures/installUIRuntimeBindings', () => ({
  installUIRuntimeBindings: () => {},
}));
jest.mock('react-native-gesture-handler/lib/module/v3/detectors/useEnsureGestureHandlerRootView', () => ({
  useEnsureGestureHandlerRootView: () => {},
}));
