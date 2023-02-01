import { createSlice } from '@reduxjs/toolkit';
import { fetchRickAndMortyCharacters } from '../../lib/rickAndMortyApi';
import { RICK_AND_MORTY_CHARACTERS_ENDPOINT } from '../../lib/constants';
import { Alert } from 'react-native';

export const API_RETURN_STATUSES = {
  FULFILLED: 'fulfilled',
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected'
}

export interface CharacterType {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: {
    name: string,
    url: string
  },
  location: {
    name: string,
    url: string
  },
  image: string,
  episode: [],
  url: string,
  created: string
}

interface InitialState {
  status: string,
  characters: [CharacterType] | [],
  nextPage: string | undefined,
}

const initialState: InitialState = {
  status: 'idle',
  characters: [],
  nextPage: RICK_AND_MORTY_CHARACTERS_ENDPOINT(1),
}

export const rickAndMortySlice = createSlice({
  name: 'rickAndMortyCharacters',
  initialState,
  reducers: {
    resetCharacters: (state) => {
      state.status = 'idle';
      state.characters = [];
      Alert.alert("Great, we reset the character list!")
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRickAndMortyCharacters.pending, (state, action) => {
      state.status = API_RETURN_STATUSES.PENDING
    })
    builder.addCase(fetchRickAndMortyCharacters.rejected, (state, action) => {
      Alert.alert("Sorry, we failed to fetch your characters");
      state.status = API_RETURN_STATUSES.REJECTED
    })
    builder.addCase(fetchRickAndMortyCharacters.fulfilled, (state, action) => {
      state.status = API_RETURN_STATUSES.FULFILLED
      state.nextPage = action.payload?.data?.info?.next;

      let payloadCharacters = action.payload?.data?.results;
      let newCharactersState: any = state.characters;

      for(let n = 0; n < payloadCharacters.length; n++) {
        const fetchedCharacter = payloadCharacters[n];
        let addItem = true;
        for(let s = 0; s < state.characters.length; s++) {
          if(state.characters[s].id === payloadCharacters[n].id) {
            addItem = false;
          }
        }
        if(addItem) {
          newCharactersState.push(fetchedCharacter);
        }
      }
      
      state.characters = newCharactersState;
    })
  }
})

export const { resetCharacters } = rickAndMortySlice.actions;
export default rickAndMortySlice.reducer;