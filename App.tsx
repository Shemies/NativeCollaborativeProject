import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}
