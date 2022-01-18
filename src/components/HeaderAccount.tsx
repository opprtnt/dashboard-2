import '../scss/HeaderAccount.scss';
import SearchTicket from './SearchTicket';
import { Avatar } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeButtons from './ThemeButtons';
import { useAppSelector } from '../store';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

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
          <div className="account row">
            <ThemeButtons />
            <span className="account__name">{userName}</span>
            <Avatar src={userAvatar} />
          </div>
        </Header>
      </div>
    </div>
  );
};
export default HeaderAccount;
