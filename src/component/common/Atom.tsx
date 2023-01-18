import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { DefaultRepository, IRepository } from '../../model/model';

const { persistAtom } = recoilPersist();

export const selectedRepoState = atom<IRepository>({
  key: 'selectedRepo',
  default: DefaultRepository,
  effects_UNSTABLE: [persistAtom],
});

export const ownerState = atom<string>({
  key: 'owner',
  default: 'tanstack',
  effects_UNSTABLE: [persistAtom],
});
