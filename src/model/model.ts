export interface IRepository {
  owner: string;
  description: string;
  push: string;
  name: string;
  issueCount: number;
  watchersCount: number;
  starCount: number;
  topics: string[];
  id: number;
}

export const DefaultRepository: IRepository = {
  owner: '',
  description: '',
  push: '',
  name: '',
  issueCount: 0,
  watchersCount: 0,
  starCount: 0,
  topics: [],
  id: 0,
};
