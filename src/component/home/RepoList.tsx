import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useLocalStorage from '../../hooks/storage';
import { IRepository } from '../../model/model';
import { selectedRepoState } from '../common/Atom';
import { FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';
import { dateTimeShow } from '../../hooks/dateConversion';
import { IconButton } from '@mui/material';
import { CommonAlert } from '../common/CommonAlert';

interface Props {}

const pStyle = css`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
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
  color: #ffffff;
`;

const repoDescStyle = css`
  background-color: #d9d9d9;
  border: 1px solid #bdbdbd;
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

const firstThStyle = css`
  min-width: 2rem;
  width: 10vw;
  background-color: #9e9e9e;
  border-top: 1px solid #424242;
  border-bottom: 1px solid #424242;
  color: #ffffff;
`;

const firstTdStyle = css`
  border-bottom: 1px solid #424242;
  border-top: 1px solid #424242;
  padding: 0.4rem;
  border-right: 1px solid #424242;
`;

const thStyle = css`
  min-width: 2rem;
  width: 10vw;
  background-color: #9e9e9e;
  border-bottom: 1px solid #424242;
  color: #ffffff;
`;

const tdStyle = css`
  border-bottom: 1px solid #424242;
  border-right: 1px solid #424242;
  padding: 0.4rem;
`;

export const RepoList: React.FC<Props> = () => {
  const [selectedRepo, setSelectedRepo] = useRecoilState(selectedRepoState);
  const resetSelectedRepo = useResetRecoilState(selectedRepoState);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [repoList, setRepoList] = useLocalStorage<IRepository[]>(
    'repoList',
    []
  );
  const onSubmitDelete = () => {
    setOpenAlert(false);
    const newRepoList = [...repoList].filter(r => r.id !== selectedRepo.id);
    setRepoList(newRepoList);
    resetSelectedRepo();
  };
  return (
    <>
      <p css={pStyle}>즐겨찾기</p>
      {repoList?.map((t, idx) => (
        <div css={repoStyle} key={idx.toString()}>
          <div
            css={repoTitleStyle}
            aria-hidden
            onClick={() =>
              selectedRepo.name === t.name
                ? resetSelectedRepo()
                : setSelectedRepo(t)
            }
          >
            <div className='dp_flex_center'>
              <p>{t.name}</p>
              <IconButton
                color='warning'
                css={{ padding: '7px 5px 5px' }}
                onClick={() => {
                  setSelectedRepo(t);
                  setAlertMessage(`${t.name}을 즐겨찾기에서 삭제하시겠습니까?`);
                  setOpenAlert(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>
            <ExpandMoreIcon
              css={selectedRepo.name !== t.name ? expandStyle : expandedStyle}
            />
          </div>
          <div
            css={
              selectedRepo.name === t.name ? repoDescStyle : { display: 'none' }
            }
          >
            <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to='/issue'>이슈 목록</Link>
            </div>
            <table
              css={{
                marginTop: '.5rem',
                wordBreak: 'break-word',
              }}
            >
              <tbody>
                <tr>
                  <th css={firstThStyle}>오너</th>
                  <td css={firstTdStyle}>{t.owner}</td>
                </tr>
                <tr>
                  <th css={thStyle}>설명</th>
                  <td css={tdStyle}>{t.description}</td>
                </tr>
                <tr>
                  <th css={thStyle}>토픽</th>
                  <td css={tdStyle}>
                    {t.topics?.map((topic: string, idx: number) => (
                      <span key={idx.toString()} css={{ marginRight: '.2rem' }}>
                        {topic}
                        {t.topics.length - 1 > idx ? ',' : ''}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th css={thStyle}>뷰</th>
                  <td css={tdStyle}>
                    <FormattedNumber value={t.watchersCount ?? 0} /> 뷰
                  </td>
                </tr>
                <tr>
                  <th css={thStyle}>푸쉬</th>
                  <td css={tdStyle}>{dateTimeShow(new Date(t.push))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <CommonAlert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        content={alertMessage}
        onSubmit={onSubmitDelete}
      />
    </>
  );
};
