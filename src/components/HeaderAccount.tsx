import SearchTicket from './SearchTicket';
import { Avatar } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeButtons from './ThemeButtons';
import { useAppSelector } from '../store';

const HeaderAccount: FC = () => {
  const user = useAppSelector((state) => state.user.userData);
  const [userName, setSet] = useState('');
  const [userAvatar, setAvatar] = useState('');
  const location = useLocation();
  const visibleSearch = location.pathname === '/tickets';
  const title = useAppSelector((state) => state.user.titlePage);

  useEffect(() => {
    if (user) {
      setSet(user.displayName);
      setAvatar(user.photoURL);
    }
  }, [user]);

  return (
    <div className="container">
      <div className="container__content">
        <Header>
          <h1>{title}</h1>
          {visibleSearch && <SearchTicket />}
          <Account>
            <ThemeButtons />
            <UserName>{userName}</UserName>
            <Avatar src={userAvatar} />
          </Account>
        </Header>
      </div>
    </div>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const Account = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin: 0 14px 0 32px;
  font-weight: 600;
`;
export default HeaderAccount;
