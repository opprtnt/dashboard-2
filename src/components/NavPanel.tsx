import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavPanel: FC = () => {
  return (
    <Nav>
      <Logo>
        <Icon>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#3751FF" />
            <path
              d="M11 10C11 9.44772 11.4477 9 12 9H15.9905C18.2127 9 19.9333 9.60955 21.1524 10.8287C22.3841 12.0478 23 13.765 23 15.9803C23 18.2088 22.3841 19.9391 21.1524 21.1713C19.9333 22.3904 18.2127 23 15.9905 23H12C11.4477 23 11 22.5523 11 22V10Z"
              fill="url(#paint0_linear_584_285)"
            />
            <defs>
              <linearGradient id="paint0_linear_584_285" x1="11" y1="9" x2="23" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.7" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </Icon>
        <LogoTitle>Dashboard Kit</LogoTitle>
      </Logo>
      <ul>
        <NavItem>
          <NavLink to="/dashboard">
            <ListItemIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M15.5232 8.94116H8.54412L13.1921 13.5891C13.3697 13.7667 13.6621 13.7812 13.8447 13.6091C14.9829 12.5367 15.7659 11.0912 15.9956 9.46616C16.035 9.18793 15.8041 8.94116 15.5232 8.94116ZM15.0576 7.03528C14.8153 3.52176 12.0076 0.714119 8.49412 0.471767C8.22589 0.453237 8 0.679413 8 0.948236V7.5294H14.5815C14.8503 7.5294 15.0762 7.30352 15.0576 7.03528ZM6.58824 8.94116V1.96206C6.58824 1.68118 6.34147 1.45029 6.06353 1.48971C2.55853 1.985 -0.120585 5.04705 0.00412089 8.71675C0.132356 12.4856 3.37736 15.5761 7.14794 15.5288C8.6303 15.5103 10 15.0326 11.1262 14.2338C11.3585 14.0691 11.3738 13.727 11.1724 13.5256L6.58824 8.94116Z" />
                </g>
                <defs>
                  <clipPath id="clip0_584_253">
                    <rect width="16" height="16" />
                  </clipPath>
                </defs>
              </svg>
            </ListItemIcon>
            <NavTitle>Dashboard</NavTitle>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/tickets">
            <ListItemIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.55556 5.33334H12.4444V10.6667H3.55556V5.33334ZM14.6667 8C14.6667 8.73639 15.2636 9.33334 16 9.33334V12C16 12.7364 15.4031 13.3333 14.6667 13.3333H1.33333C0.596944 13.3333 0 12.7364 0 12V9.33334C0.736389 9.33334 1.33333 8.73639 1.33333 8C1.33333 7.26362 0.736389 6.66667 0 6.66667V4.00001C0 3.26362 0.596944 2.66667 1.33333 2.66667H14.6667C15.4031 2.66667 16 3.26362 16 4.00001V6.66667C15.2636 6.66667 14.6667 7.26362 14.6667 8ZM13.3333 5.11112C13.3333 4.74292 13.0349 4.44445 12.6667 4.44445H3.33333C2.96514 4.44445 2.66667 4.74292 2.66667 5.11112V10.8889C2.66667 11.2571 2.96514 11.5556 3.33333 11.5556H12.6667C13.0349 11.5556 13.3333 11.2571 13.3333 10.8889V5.11112Z" />
              </svg>
            </ListItemIcon>
            <NavTitle>Tickets</NavTitle>
          </NavLink>
        </NavItem>
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  height: 100%;
  width: 255px;
  padding-top: 32px;
  color: ${({ theme }) => theme.colors.mediumGray2};
  background-color: ${({ theme }) => theme.colors.bgNav};
  @media ${({ theme }) => theme.media.large} {
    width: 76px;
  }
  svg {
    fill: ${({ theme }) => theme.colors.mediumGray2};
  }
`;

const Logo = styled.div`
  margin-left: 32px;
  margin-bottom: 59px;
  font-weight: 700;
  font-size: 19px;
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.media.large} {
    justify-content: center;
    margin: 0 0 32px 0;
  }
`;

const Icon = styled.span`
  margin-right: 12px;
  @media ${({ theme }) => theme.media.large} {
    margin: 0;
  }
`;

const LogoTitle = styled.span`
  @media ${({ theme }) => theme.media.large} {
    display: none;
  }
`;

const NavItem = styled.li`
  a {
    display: flex;
    padding: 18px 24px 18px 32px;
    @media ${({ theme }) => theme.media.large} {
      justify-content: center;
      padding: 18px 0;
    }
  }
  .active {
    background-color: ${({ theme }) => theme.colors.activeNavBg};
    padding-left: 29px;
    color: ${({ theme }) => theme.colors.activeNavFont};
    border-left: 3px solid ${({ theme }) => theme.colors.activeNavFont};
    svg {
      fill: ${({ theme }) => theme.colors.activeNavFont};
    }
    @media ${({ theme }) => theme.media.large} {
      padding-left: 0;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.activeNavBg};
  }
`;

const ListItemIcon = styled.span`
  display: flex;
  align-self: center;
  margin-right: 24px;
  @media ${({ theme }) => theme.media.large} {
    margin-right: 0;
  }
`;

const NavTitle = styled.span`
  @media ${({ theme }) => theme.media.large} {
    display: none;
  }
`;

export default NavPanel;
