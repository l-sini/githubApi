import { Button, Dialog, Divider } from '@mui/material';
import { css } from '@emotion/react';
import React from 'react';

interface Props {
  content: string;
  onClose: () => void;
  onSubmit?: () => void;
  confirm?: string;
  close?: string;
  open: boolean;
}

const alertBoxStyle = css`
  background: #fff;
  width: 80vw;
  max-width: 400px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin: 0 auto;
  position: relative;
`;

const alertTitleStyle = css`
  text-align: left;
  color: #333;
  line-height: 23px;
  padding: 1.5rem;
  min-height: 113px;
  box-sizing: border-box;
`;

const alertButtonBoxStyle = css`
  height: 3rem;
  margin: 0;
  display: flex;
  line-height: 3rem;
  border-top: 1px solid #ebecf0;
`;

export const CommonAlert: React.FC<Props> = ({
  content,
  onClose,
  onSubmit,
  confirm = '확인',
  close = '취소',
  open,
}) => (
  <>
    <Dialog open={open}>
      <div css={alertBoxStyle}>
        <div css={alertTitleStyle}>
          <p css={{ whiteSpace: 'pre' }}>{content}</p>
        </div>
        <div css={alertButtonBoxStyle}>
          <Button
            color={close === '확인' ? 'primary' : 'error'}
            onClick={onClose}
            fullWidth
          >
            {close}
          </Button>
          {(onSubmit || close !== '확인') && (
            <>
              <Divider
                sx={{ p: 0, m: '10px 0', height: '24px' }}
                orientation='vertical'
              />
              <Button
                color={confirm === '확인' ? 'primary' : 'error'}
                onClick={onSubmit}
                fullWidth
              >
                {confirm}
              </Button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  </>
);
