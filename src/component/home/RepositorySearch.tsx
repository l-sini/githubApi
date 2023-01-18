import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { FormattedNumber } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useMany } from '../../hooks/api';
import useLocalStorage from '../../hooks/storage';
import { IRepository } from '../../model/model';
import { dateTimeShow } from '../../hooks/dateConversion';
import { CommonAlert } from '../common/CommonAlert';
import { useRecoilValue } from 'recoil';
import { ownerState } from '../common/Atom';
import { useDebounce } from '../../hooks/debouncehook';

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

const inputBoxStyle = css`
  display: flex;
  align-items: center;
  position: relative;
  width: 93vw;
  max-width: 600px;
  min-width: 200px;
`;

const startButtonStyle = css`
  padding-top: 4px;
  border-radius: 50%;
`;

const inputStyle = css`
  width: 93vw;
  max-width: 600px;
  min-width: 200px;
`;

const searchButtonStyle = css`
  position: absolute;
  right: 3px;
  padding-top: 8px;
  border-radius: 50%;
`;

const searchResultNoneBoxStyle = css`
  display: none;
`;

const searchResultBoxStyle = css`
  background-color: #424242;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  color: #ffffff;
`;

const otherStyle = css`
  text-align: center;
  padding: 3rem 0;
`;

const topBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleStyle = css`
  margin-left: 1rem;
  fontsize: 1.4rem;
  font-weight: 700;
`;

const issueCountStyle = css`
  margin-left: 0.5rem;
  fontsize: 1rem;
  font-weight: 500;
`;

const tableBoxStyle = css`
  border-top: 1px solid #8899b6;
  margin: 1rem 0;
`;

const tableStyle = css`
  margin-top: 0.5rem;
  word-break: break-word;
  width: 100%;
`;

const thStyle = css`
  min-width: 2rem;
  width: 10vw;
  background-color: #757575;
  padding: 0.5rem 1rem;
`;

const tdStyle = css`
  padding: 0.5rem 1rem;
`;

const topicStyle = css`
  margin-right: 0.2rem;
`;

export const RepositorySearch: React.FC<Props> = () => {
  const searchOwner = useRecoilValue(ownerState);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [searchRepo, setSearchRepo] = useState<string>('');
  const [repoList, setRepoList] = useLocalStorage<IRepository[]>(
    'repoList',
    []
  );

  const onChangeSearchRepo = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchRepo(evt.target.value);
    },
    []
  );

  const addRepo = () => {
    if (repoList.length > 3) {
      setAlertMessage('이미 4개의 즐겨찾기 리포지토리가 있습니다.');
      setOpenAlert(true);
      return;
    }
    const newRepo = {
      owner: data.owner.login,
      description: data.description,
      topics: data.topics,
      name: data.name,
      push: data.pushed_at,
      issueCount: data.open_issues_count,
      watchersCount: data.watchers_count,
      starCount: data.stargazers_count,
      id: data.id,
    };
    setRepoList([...repoList, newRepo]);
  };

  const { data, refetch, isFetching } = useMany<any>(
    `/repos/${searchOwner}/${searchRepo.trim()}`,
    {},
    { id: '' },
    false
  );

  const searchRepoDebounce = useDebounce(() => searchRepo && refetch(), 3000, [
    searchRepo,
  ]);

  return (
    <>
      <div css={inputBoxStyle}>
        <input
          type='text'
          value={searchRepo}
          onChange={onChangeSearchRepo}
          css={inputStyle}
        />
        <button onClick={() => refetch()} css={searchButtonStyle}>
          <SearchIcon />
        </button>
      </div>
      {isFetching ? (
        <div css={otherStyle}>
          <CircularProgress color='inherit' />
          <p>loading...</p>
        </div>
      ) : data && !data.id && data === 404 ? (
        <div css={otherStyle}>
          <ErrorOutlineIcon css={{ fontSize: '2rem' }} />
          <p>데이터가 없습니다.</p>
        </div>
      ) : (
        <div
          css={
            data && data.id ? searchResultBoxStyle : searchResultNoneBoxStyle
          }
        >
          <div css={topBoxStyle}>
            <div className='dp_flex_center'>
              <button onClick={addRepo} css={startButtonStyle}>
                {!repoList.some(repo => repo.id === data.id) ? (
                  <StarBorderIcon css={{ fontSize: '2rem' }} />
                ) : (
                  <StarIcon css={{ fontSize: '2rem', color: '#1976D2' }} />
                )}
              </button>
              <p css={titleStyle}>
                {data.name}
                <span css={issueCountStyle}>
                  [<FormattedNumber value={data.issueCount ?? 0} />]
                </span>
              </p>
            </div>
            <p className='dp_flex_center'>
              <StarBorderIcon css={{ fontSize: '1.6rem' }} />
              <FormattedNumber value={data.starCount ?? 0} />
            </p>
          </div>
          <div css={tableBoxStyle}>
            <table css={tableStyle}>
              <tbody>
                <tr>
                  <th css={thStyle}>오너</th>
                  <td css={tdStyle}>{data.owner?.login}</td>
                </tr>
                <tr>
                  <th css={thStyle}>설명</th>
                  <td css={tdStyle}>{data.description}</td>
                </tr>
                <tr>
                  <th css={thStyle}>토픽</th>
                  <td css={tdStyle}>
                    {data.topics?.map((topic: string, idx: number) => (
                      <span key={idx.toString()} css={topicStyle}>
                        {topic}
                        {data.topics.length - 1 > idx ? ',' : ''}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th css={thStyle}>뷰</th>
                  <td css={tdStyle}>
                    <FormattedNumber value={data.watchers_count ?? 0} /> 뷰
                  </td>
                </tr>
                <tr>
                  <th css={thStyle}>푸쉬</th>
                  <td css={tdStyle}>
                    {dateTimeShow(new Date(data.pushed_at ?? 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CommonAlert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        content={alertMessage}
        close='확인'
      />
    </>
  );
};
