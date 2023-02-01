const RICK_AND_MORTY_BASE_API = 'https://rickandmortyapi.com/api';
const RICK_AND_MORTY_CHARACTERS = 'character';
export const RICK_AND_MORTY_CHARACTERS_ENDPOINT = (pageNum: number) => `${RICK_AND_MORTY_BASE_API}/${RICK_AND_MORTY_CHARACTERS}/?page=${pageNum}`;