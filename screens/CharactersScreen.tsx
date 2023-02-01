import { FlatList, StyleSheet, useColorScheme, SafeAreaView, StatusBar, View } from 'react-native';
import { BLACK, WHITE  } from '../utils/colors';
import Header from '../views/charactersList/Header';
import Empty from '../views/charactersList/Empty';
import Loader from '../views/charactersList/Loader';
import CharacterRow from '../views/charactersList/CharacterRow';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../storage/store';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchRickAndMortyCharacters } from '../lib/rickAndMortyApi';
import { resetCharacters, API_RETURN_STATUSES } from '../storage/slices/rickAndMortySlice';
import { RICK_AND_MORTY_CHARACTERS_ENDPOINT } from '../lib/constants';

export default function CharactersScreen({ navigation }: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? BLACK : WHITE,
    flex: 1,
  };

  const characters = useSelector((state: RootState) => state.rickAndMorty.characters)
  const nextPage = useSelector((state: RootState) => state.rickAndMorty.nextPage)
  const status = useSelector((state: RootState) => state.rickAndMorty.status)
  const reduxDispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const resetCharacterList = () => {
    reduxDispatch(resetCharacters())
  }

  const fetchMoreCharactersOnEnd = () => {
    if(status === 'fulfilled' && nextPage) {
      reduxDispatch(fetchRickAndMortyCharacters(nextPage))
    }
  }

  const fetchInitialCharacters = () => {
    reduxDispatch(fetchRickAndMortyCharacters(RICK_AND_MORTY_CHARACTERS_ENDPOINT(1)))
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
      />
      <Button style={styles.resetButton} onPress={resetCharacterList} title="Reset" />
      <FlatList
        ListHeaderComponent={<Header />}
        data={characters}
        renderItem={({item}) => <CharacterRow navigation={navigation} item={item} />}
        keyExtractor={item => "" + item.id}
        ListFooterComponent={status === API_RETURN_STATUSES.PENDING ? <Loader /> : <View />}
        ListEmptyComponent={<Empty />}
        onRefresh={fetchInitialCharacters}
        onEndReached={fetchMoreCharactersOnEnd}
        onEndReachedThreshold={0.8}
        refreshing={status === API_RETURN_STATUSES.PENDING}
        initialNumToRender={30}
      />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  resetButton: {
    marginRight: 20, 
    marginVertical: 10, 
    alignSelf: 'flex-end'
  }
});