import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/stacks/AppStack';
import { store } from './storage/store';
import { Provider } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
