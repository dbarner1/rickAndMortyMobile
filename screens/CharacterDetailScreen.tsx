import { Image, useColorScheme, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { BLACK, WHITE  } from '../utils/colors';
import AccessibleText from '../components/AccessibleText';
import Spacer from '../components/Spacer';
import { CharacterType } from '../storage/slices/rickAndMortySlice';

export default function CharacterDetailScreen( { route }: any): JSX.Element {
  const character: CharacterType = route.params.character;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? BLACK : WHITE,
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, ...styles.screenContainer }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Image source={{ uri: character.image }} resizeMode="contain" style={styles.image} />
        <Spacer height={40} />
        {character.name && (<AccessibleText style={styles.name}>{character.name}</AccessibleText>)}
        <Spacer height={10} />
        {character.origin?.name && (<AccessibleText style={styles.secondaryAttribute}>{`Originally from: ${character.origin.name}`}</AccessibleText>)}
        {character.location?.name && (<AccessibleText style={styles.secondaryAttribute}>{`From: ${character.location.name}`}</AccessibleText>)}
        {character.species && (<AccessibleText style={styles.secondaryAttribute}>{`Species: ${character.species}`}</AccessibleText>)}
        {character.gender && (<AccessibleText style={styles.secondaryAttribute}>{`Gender: ${character.gender}`}</AccessibleText>)}
        {character?.type && (<AccessibleText style={styles.secondaryAttribute}>{`Type: ${character?.type}`}</AccessibleText>)}
        {character?.episode && (<AccessibleText style={styles.secondaryAttribute}>{`Episodes: ${character?.episode?.length}`}</AccessibleText>)}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    padding: 20
  },
  image: {
    height: 200, 
    width: '100%'
  },
  name: {
    fontWeight: '600',
    fontSize: 30
  },
  secondaryAttribute: {
    fontWeight: '300',
    fontSize: 20
  }
})