import React, { useState } from 'react';
import { css } from '@emotion/react';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormattedNumber } from 'react-intl';
import { useMany } from '../../hooks/api';
import { useEffect } from 'react';
import useLocalStorage from '../../hooks/storage';
import { useRecoilState } from 'recoil';
import { selectedRepoState } from '../common/Atom';
import { Link } from 'react-router-dom';

interface Props {}

const divStyle = css`
  background-color: #263238;
  height: 100%;
  width: 324px;
  position: absolute;
  color: #ffffff;
`;

const repoStyle = css`
  background-color: #616161;
  margin-bottom: 0.2rem;
`;

const repoTitleStyle = css`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
`;

const repoDescStyle = css`
  background-color: #d9d9d9;
  padding: 1rem;
  color: #5c5c5c;
  translate: 0.5s;
`;

const expandStyle = css`
  cursor: pointer;
  &:hover {
    color: #263238;
  }
`;

const expandedStyle = css`
  cursor: pointer;
  &:hover {
    color: #263238;
  }
  rotate: 180deg;
`;

const test01 = 'HanGyulKang';
const test02 = 'l-sini';
const test03 = 'tanstack';

const testlist = ['query', 'table', 'router', 'form'];

export const SideNavi: React.FC<Props> = () => {
  const [openRepo, setOpenRepo] = useState<number>(-1);
  const [selectedRepo, setSelectedRepo] = useRecoilState(selectedRepoState);
  const [repoList, setRepoList] = useLocalStorage('repoList', []);
  const { data, refetch, isFetching } = useMany<any>(
    `/repos/${test03}/${selectedRepo}`,
    {},
    [],
    false
  );

  useEffect(() => {
    selectedRepo && refetch();
  }, [selectedRepo]);

  return (
    <>
      <div css={divStyle}>
        <div css={{ fontSize: '24px', fontWeight: 700, padding: '1rem 2rem' }}>
          리파지토리
          <StarIcon />
        </div>
        <div>
          {repoList?.map((t, idx) => (
            <div css={repoStyle} key={idx.toString()}>
              <div
                css={repoTitleStyle}
                aria-hidden
                onClick={() =>
                  selectedRepo === t ? setSelectedRepo('') : setSelectedRepo(t)
                }
              >
                {t}
                <ExpandMoreIcon
                  css={selectedRepo !== t ? expandStyle : expandedStyle}
                />
              </div>
              {!isFetching ? (
                <div
                  css={selectedRepo === t ? repoDescStyle : { display: 'none' }}
                >
                  <Link to='/issue'>이슈보러 가기</Link>
                  <p>주인 : {data.owner?.login}</p>
                  <p>설명 : {data.description}</p>
                  <p>마지막 푸쉬 : {data.pushed_at}</p>
                  <p>홈페이지 : {data.homepage}</p>
                  <p>url : {data.html_url}</p>
                  <p>이름 : {data.name}</p>
                  <p>
                    이슈 :{' '}
                    {data.has_issues ? (
                      <FormattedNumber value={data.open_issues_count ?? 0} />
                    ) : (
                      '없음'
                    )}
                  </p>
                  <p>토픽</p>
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
                    watchers_count :{' '}
                    <FormattedNumber value={data.watchers_count ?? 0} />
                  </p>
                </div>
              ) : (
                <div
                  css={
                    selectedRepo === t
                      ? {
                          height: '4rem',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2rem',
                          backgroundColor: '#d9d9d9',
                          color: '#5c5c5c',
                        }
                      : { display: 'none' }
                  }
                >
                  loading...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
