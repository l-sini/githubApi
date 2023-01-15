import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const selectedRepoState = atom<string>({
  key: 'selectedRepo',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
