import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useMany } from '../../hooks/api';
import { dateTimeShow } from '../../hooks/dateConversion';
import { ownerState, selectedRepoState } from '../common/Atom';
import { CustomPagination } from '../common/CustomPagination';

interface Props {}

const ROWSPERPAGELIST = [15, 30, 50];

const titleStyle = css`
  font-weight: 700;
  font-size: 1.3rem;
`;

const backButtonStyle = css`
  background: none;
  margin-top: 5px;
`;

const tCenterStyle = css`
  text-align: center;
  border-bottom: 1px solid #424242;
  padding: 0.5rem;
`;

const otherTdStyle = css`
  text-align: center;
  padding: 3rem 0;
`;

const firstThStyle = css`
  min-width: 1.5rem;
  width: 10vw;
  background-color: #757575;
  border-bottom: 1px solid #424242;
  color: #ffffff;
  padding: 0.5rem;
`;

const thStyle = css`
  min-width: 2rem;
  width: 10vw;
  background-color: #757575;
  border-bottom: 1px solid #424242;
  color: #ffffff;
  border-left: 1px solid #424242;
  padding: 0.5rem;
`;

export const IssuePage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const searchOwner = useRecoilValue(ownerState);
  const selectedRepo = useRecoilValue(selectedRepoState);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const {
    data: issueList,
    refetch: refetchIssueList,
    isFetching,
  } = useMany<any>(
    `/repos/${searchOwner}/${selectedRepo.name}/issues`,
    { page: page, per_page: rowsPerPage },
    [],
    false
  );

  useEffect(() => {
    selectedRepo && selectedRepo.name && refetchIssueList();
  }, [page, selectedRepo]);

  return (
    <div className='mt05rem mb05rem'>
      <div className='dp_flex_center mt05rem mb1rem'>
        <button css={backButtonStyle} onClick={() => navigate('/')}>
          <ArrowBackIosIcon />
        </button>
        <div css={titleStyle}>리파지토리 : {selectedRepo.name}</div>
      </div>
      {isFetching ? (
        <div>loading...</div>
      ) : issueList === 404 ? (
        <div css={otherTdStyle}>
          <ErrorOutlineIcon css={{ fontSize: '2rem' }} />
          <p>리소스를 찾을 수 없습니다.</p>
        </div>
      ) : (
        <table>
          <colgroup>
            <col width='4%' />
            <col width='22%' />
            <col width='22%' />
            <col width='10%' />
            <col width='17%' />
            <col width='25%' />
          </colgroup>
          <thead>
            <tr>
              <th css={firstThStyle}>●</th>
              <th css={thStyle}>이슈유저</th>
              <th css={thStyle}>생성시간</th>
              <th css={thStyle}>하트</th>
              <th css={thStyle}>코멘트</th>
              <th css={thStyle}>이슈링크</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={6} css={otherTdStyle}>
                  <CircularProgress color='inherit' />
                  <p>loading...</p>
                </td>
              </tr>
            ) : issueList && issueList.length ? (
              issueList.map((issue: any, idx: number) => (
                <tr key={idx.toString()}>
                  <td css={tCenterStyle}>{idx + 1}</td>
                  <td css={tCenterStyle}>{issue.user.login}</td>
                  <td css={tCenterStyle}>{dateTimeShow(issue.created_at)}</td>
                  <td css={tCenterStyle}>{issue.reactions.heart}</td>
                  <td css={tCenterStyle}>{issue.comments}</td>
                  <td css={tCenterStyle}>
                    <a href={issue.html_url} target='_blank'>
                      보기
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} css={otherTdStyle}>
                  <ErrorOutlineIcon css={{ fontSize: '2rem' }} />
                  <p>데이터가 없습니다.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {!!issueList.length && (
        <CustomPagination
          page={page}
          handleChangePage={handleChangePage}
          count={Math.ceil(selectedRepo?.issueCount / rowsPerPage)}
        />
      )}
    </div>
  );
};
