import '../scss/HeaderAccount.scss';
import SearchTicket from './SearchTicket';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ThemeButtons from './ThemeButtons';

export default function HeaderAccount() {
  const user = useSelector((state) => state.user.userData);
  const [userName, setSet] = useState();
  const [userAvatar, setAvatar] = useState();
  const location = useLocation();
  const visibleSearch = location.pathname === '/tickets';
  const title = useSelector((state) => state.user.titlePage);

  useEffect(() => {
    if (user) {
      setSet(user.displayName);
      setAvatar(user.photoURL);
    }
  }, [user]);

  const HeaderAccount = styled.header`
    display: flex;
    justify-content: space-between;
  `;

  return (
    <div className="container">
      <div className="container__content">
        <HeaderAccount className="header">
          <h1>{title}</h1>
          {visibleSearch && <SearchTicket />}
          <div className="account row">
            <ThemeButtons className="theme-btn" />
            <span className="account__name">{userName}</span>
            <Avatar src={userAvatar} />
          </div>
        </HeaderAccount>
      </div>
    </div>
  );
}
