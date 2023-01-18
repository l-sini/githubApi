import React, { ChangeEvent, useCallback } from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { ownerState } from '../common/Atom';

interface Props {}

const divStyle = css`
  background-color: #263238;
  height: 5vh;
  width: 100%;
  position: absolute;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const OwnerInputStyle = css`
  width: 6rem;
  padding: 0.2rem 0.4rem !important;
  margin-right: 0.5rem;
`;

export const TopNavi: React.FC<Props> = () => {
  const [searchOwner, setSearchOwner] = useRecoilState(ownerState);
  const onChangeSearchOwner = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchOwner(evt.target.value);
    },
    []
  );
  return (
    <>
      <div css={divStyle}>
        <div>
          <input
            type='text'
            value={searchOwner}
            onChange={onChangeSearchOwner}
            css={OwnerInputStyle}
            placeholder='오너 설정'
          />
        </div>
        <p>리포지토리 관리</p>
      </div>
    </>
  );
};
