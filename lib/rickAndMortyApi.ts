import fetch from './fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRickAndMortyCharacters = createAsyncThunk('data/fetchRickAndMortyCharacters', async (url: string): Promise<{}> => {
  const data = await fetch(url, { responseType: 'json' });
  return data;
})

export const resetCharacterList = createAsyncThunk('data/resetCharacters', async (): Promise<[]> => {
  return [];
})