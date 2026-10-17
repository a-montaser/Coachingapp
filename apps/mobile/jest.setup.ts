import 'react-native-gesture-handler/jestSetup';
import { setUpTests } from 'react-native-reanimated';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// Native-only modules that need a JS stand-in under Jest.
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
setUpTests();
