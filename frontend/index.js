import { registerRootComponent } from 'expo';
import { AppRegistry, Platform} from 'react-native'
import { name as appName} from './app.json'

import App from './App';

AppRegistry.registerComponent('main', () => App);

if(Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
