import {officialArtworkUrl} from '../constants';

export const OfficialArtwork = (PokeID: string) => {
  if (!PokeID) {
    return null;
  }
  return `${officialArtworkUrl}/${PokeID}.png`;
};
