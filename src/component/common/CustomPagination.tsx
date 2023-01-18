import { Box, Pagination } from '@mui/material';
import React from 'react';

interface Props {
  page: number;
  handleChangePage: (_event: any, newPage: number) => void;
  count: any;
  sibling?: number;
}

export const CustomPagination: React.FC<Props> = ({
  page,
  handleChangePage,
  count,
  sibling = 2,
}) => (
  <>
    <Box sx={{ p: '.6rem', display: 'flex', justifyContent: 'center' }}>
      <Pagination
        color='primary'
        siblingCount={sibling}
        boundaryCount={3}
        page={page}
        onChange={handleChangePage}
        count={count}
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '13px',
            m: 0,
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            color: '#00a2ff',
            background: 'none',
            fontWeight: 500,
          },
          '& .MuiPaginationItem-root.Mui-selected:hover': {
            backgroundColor: 'rgb(0,162,255,0.3)',
          },
        }}
        size='small'
      />
    </Box>
  </>
);
