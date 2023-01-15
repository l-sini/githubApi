import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMany } from '../../hooks/api';
import { dateTimeShow } from '../../hooks/dateConversion';
import { selectedRepoState } from '../common/Atom';

interface Props {}

const test01 = 'HanGyulKang';
const test02 = 'l-sini';
const test03 = 'tanstack';

const ROWSPERPAGELIST = [15, 30, 50];

export const IssuePage: React.FC<Props> = () => {
  const { pathname } = useLocation();
  const selectedRepo = useRecoilValue(selectedRepoState);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };
  const onChangeRowsPerPage = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(evt.target.value));
    setPage(1);
  };

  const {
    data: issueList,
    refetch: refetchIssueList,
    isFetching,
  } = useMany<any>(
    `/repos/${test03}/${selectedRepo}/issues`,
    { page: page, per_page: rowsPerPage },
    [],
    false
  );

  useEffect(() => {
    selectedRepo && refetchIssueList();
  }, [pathname, page]);

  return (
    <>
      <div>리파지토리 {selectedRepo}</div>
      {isFetching ? (
        <div>loading...</div>
      ) : (
        issueList &&
        issueList.map((issue: any, idx: number) => (
          <div key={idx.toString()}>
            <a href={issue.html_url} target='_blank'>
              html_url
            </a>
            <p>author_association : {issue.author_association}</p>
            <p>created_at : {dateTimeShow(issue.created_at)}</p>
            <p>updated_at : {dateTimeShow(issue.updated_at)}</p>
            <p>hearts : {issue.reactions.heart}</p>
            <p>confused : {issue.reactions.confused}</p>
            <p>eyes : {issue.reactions.eyes}</p>
            <p>laugh : {issue.reactions.laugh}</p>
            <p>rocket : {issue.reactions.rocket}</p>
            <p>hooray : {issue.reactions.hooray}</p>
            <p>total_count : {issue.reactions.total_count}</p>
            <p>login : {issue.user.login}</p>
            <p>comments : {issue.comments}</p>
          </div>
        ))
      )}
    </>
  );
};
