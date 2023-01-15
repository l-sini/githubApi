import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useMany } from '../../hooks/api';
import { RepositorySearch } from './RepositorySearch';
import { useDebounce } from '../../hooks/debouncehook';

interface Props {}

const test01 = 'HanGyulKang';
const test02 = 'l-sini';
const test03 = 'tanstack';

export const Home: React.FC<Props> = () => {
  const { VITE_GITHUB_ID } = import.meta.env;
  const [searchWord, setSearchWord] = useState<string>('');

  const onChangeSearchWord = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchWord(evt.target.value);
    },
    []
  );

  // Headers application/vnd.github+json
  // Path parameters
  // owner: string (Required)
  // repo : string (Required)
  // 200	OK
  // 301	Moved permanently
  // 403	Forbidden
  // 404	Resource not found
  const { data, refetch } = useMany<any>(
    `/repos/${test03}/${searchWord.trim()}`,
    {},
    [],
    false
  );

  const { data: issueList, refetch: refetchIssueList } = useMany<any>(
    `/repos/${test03}/${searchWord.trim()}/issues`,
    {},
    [],
    false
  );

  const testClick = () => refetch();
  const testClick02 = () => refetchIssueList();

  const debounceTest = useDebounce(() => searchWord && refetch(), 500, [
    searchWord,
  ]);

  useEffect(() => {
    console.log('data>>>>', data);
  }, [data]);
  return (
    <div css={{ padding: '1rem 0' }}>
      <RepositorySearch />
      <div>리포지토리 관리</div>
      <div>이슈 보기</div>
    </div>
  );
};
