import { Dispatch, SetStateAction } from 'react';

export interface SetIsPlayingProps {
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}