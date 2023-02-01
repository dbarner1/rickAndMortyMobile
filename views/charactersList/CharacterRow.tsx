import { useMemo } from 'react';
import { Image, Pressable, useColorScheme, StyleSheet, View } from 'react-native';
import AccessibleText from '../../components/AccessibleText';
import { CharacterType } from '../../storage/slices/rickAndMortySlice';
import { CHARACTER_DETAIL_SCREEN } from '../../navigation/constants';

interface Props {
  navigation: any,
  item: CharacterType
}

export default function CharacterRow( { item: character, navigation }: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const borderColor = isDarkMode ? 'white' : 'black';
  const navigationToCharacterDetail = () => {
    navigation.navigate(CHARACTER_DETAIL_SCREEN, { character: character })
  }

  const EpisodeHistory = () => {
    const episodeList = useMemo(() => {
      const eList = new Set();
      if(character.episode?.length >= 1) {
        character.episode.forEach((episode: string) => {
          const splitEpisodeUrl = episode.split('/');
          const episodeName = splitEpisodeUrl[splitEpisodeUrl.length -1]
          eList.add(episodeName);
        })
  
        const finalList = [...eList]
  
        return { firstEpisode: finalList[0], mostRecentEpisode: finalList[finalList.length -1] };
      } else {
        return { firstEpisode:'Not available', mostRecentEpisode: 'Not available' };
      }
    }, [character]);
    
    const { firstEpisode, mostRecentEpisode } = episodeList;

    return(
      <>
        <AccessibleText style={styles.minorDetail}>{`FIRST EPISODE: ${firstEpisode}`}</AccessibleText>
        <AccessibleText style={styles.minorDetail}>{`MOST RECENT EPISODE: ${mostRecentEpisode}`}</AccessibleText>
      </>
    )
  }

  return (
    <Pressable 
      onPress={navigationToCharacterDetail}
      style={{ ...styles.container, borderColor }}
    >
      <Image source={{ uri: character.image }} resizeMode="contain" style={styles.image} />
      <View style={{ flexDirection: 'column', width: '70%'}}>
        <AccessibleText style={styles.characterName}>{character.name}</AccessibleText>
        <AccessibleText style={styles.minorDetail}>{`FIRST EPISODE: ${character.status}`}</AccessibleText>
        <EpisodeHistory />
      </View>
      <AccessibleText style={styles.rightCarot}>{'>'}</AccessibleText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    width: '100%', 
    borderWidth: 0.25, 
    padding: 20, 
    justifyContent: 'space-between',
  },
  characterName: {
    fontWeight: '600', 
    fontSize: 20
  },
  minorDetail: {
    fontWeight: '400', 
    fontSize: 13
  },
  rightCarot: {
    paddingRight: 20
  },
  image: {
    width: '20%',
    height: 60
  }
})

