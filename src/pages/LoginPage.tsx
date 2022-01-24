import React, { FC } from 'react';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';

const LoginPage: FC = () => {
  return (
    <Wrapper>
      <LoginWindow className="white">
        <LoginHeader>
          <Logo>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#3751FF" />
              <path
                d="M16.5 14.5C16.5 13.9477 16.9477 13.5 17.5 13.5H23.9857C27.319 13.5 29.9 14.4143 31.7286 16.243C33.5762 18.0716 34.5 20.6475 34.5 23.9705C34.5 27.3132 33.5762 29.9087 31.7286 31.757C29.9 33.5857 27.319 34.5 23.9857 34.5H17.5C16.9477 34.5 16.5 34.0523 16.5 33.5V14.5Z"
                fill="url(#paint0_linear_4856_189)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4856_189"
                  x1="16.5"
                  y1="13.5"
                  x2="34.5"
                  y2="34.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.7" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          </Logo>
          <h3 className="gray">Dashboard Kit</h3>
        </LoginHeader>
        <LoginTitle>Log In to Dashboard Kit</LoginTitle>
        <form>
          <SubmitButton />
        </form>{' '}
      </LoginWindow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.colors.bgNav};
  align-items: center;
`;

const LoginWindow = styled.div`
  width: 380px;
  margin: auto;
  text-align: center;
  padding: 40px 32px;
  border-radius: 8px;
`;

const LoginTitle = styled.h1`
  margin-bottom: 12px;
`;

const Logo = styled.div`
  margin-bottom: 12px;
`;

const LoginHeader = styled.div`
  margin-bottom: 32px;
`;

export default LoginPage;
