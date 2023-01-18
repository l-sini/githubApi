import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useMany } from '../../hooks/api';
import { RepositorySearch } from './RepositorySearch';
import { useDebounce } from '../../hooks/debouncehook';
import { RepoList } from './RepoList';

interface Props {}

export const Home: React.FC<Props> = () => (
  <div css={{ padding: '1rem 0' }}>
    <RepositorySearch />
    <RepoList />
  </div>
);
