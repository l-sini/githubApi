import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { useMany } from '../../hooks/api';
import useLocalStorage from '../../hooks/storage';

interface Props {}

interface TProps {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

const test01 = 'HanGyulKang';
const test02 = 'l-sini';
const test03 = 'tanstack';

export const RepositorySearch: React.FC<Props> = () => {
  const { VITE_GITHUB_ID } = import.meta.env;
  const [searchOwner, setSearchOwner] = useState<string>('');
  const [searchRepo, setSearchRepo] = useState<string>('');
  const [repoList, setRepoList] = useLocalStorage<string[]>('repoList', []);

  const onChangeSearchOwner = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchOwner(evt.target.value);
    },
    []
  );
  const onChangeSearchRepo = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchRepo(evt.target.value);
    },
    []
  );

  const { data, refetch } = useMany<any>(
    `/repos/${test03}/${searchRepo.trim()}`,
    {},
    [],
    false
  );

  useEffect(() => {
    data && console.log(data);
  }, [data]);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type='text' value={searchRepo} onChange={onChangeSearchRepo} />
        <button onClick={() => refetch()} style={{ marginLeft: '.44rem' }}>
          리포지토리 검색
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            repoList.length > 3
              ? console.log('err>>')
              : setRepoList([...repoList, data.name]);
          }}
        >
          추가
        </button>
        <p>owner {data.owner?.login}</p>
        <p>설명 : {data.description}</p>
        <p>마지막 푸쉬 : {data.pushed_at}</p>
        <p>homepage : {data.homepage}</p>
        <p>html_url : {data.html_url}</p>
        <p>name : {data.name}</p>
        <p>issue : {data.open_issues_count}</p>
        <p>topics</p>
        <ul>
          {data.topics?.map((topic: string, idx: number) => (
            <li key={idx.toString()}>{topic}</li>
          ))}
        </ul>
        <p>visibility : {data.visibility}</p>
        <p>
          watchers : <FormattedNumber value={data.watchers ?? 0} />
        </p>
        <p>
          watchers_count : <FormattedNumber value={data.watchers_count ?? 0} />
        </p>
      </div>
    </>
  );
};
