import * as React from 'react';
import CharactersScreen from '../../screens/CharactersScreen';
import CharacterDetailScreen from '../../screens/CharacterDetailScreen';
import { CHARACTERS_SCREEN, CHARACTER_DETAIL_SCREEN} from '../../navigation/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={CHARACTERS_SCREEN} component={CharactersScreen} />
      <Stack.Screen name={CHARACTER_DETAIL_SCREEN} component={CharacterDetailScreen} />
    </Stack.Navigator>
  )
}