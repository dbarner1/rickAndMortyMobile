import * as React from 'react';
import { useColorScheme } from 'react-native';
import CharactersScreen from '../../screens/CharactersScreen';
import CharacterDetailScreen from '../../screens/CharacterDetailScreen';
import { CHARACTERS_SCREEN, CHARACTER_DETAIL_SCREEN} from '../../navigation/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLACK, WHITE } from '../../utils/colors';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: isDarkMode ? BLACK : WHITE,
      },
      headerTintColor: isDarkMode ? WHITE : BLACK,
    }}>
      <Stack.Screen 
        name={CHARACTERS_SCREEN} 
        component={CharactersScreen} 
      />
      <Stack.Screen name={CHARACTER_DETAIL_SCREEN} component={CharacterDetailScreen} />
    </Stack.Navigator>
  )
}