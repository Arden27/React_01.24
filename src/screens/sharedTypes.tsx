import { Dispatch, SetStateAction } from 'react';

export interface SetQuizStateProps {
  setQuizState: Dispatch<SetStateAction<'create'| 'play' | 'result'>>;
}