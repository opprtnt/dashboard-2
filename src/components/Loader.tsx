import React from 'react';
import styled from 'styled-components';

export default function Loader() {
  return (
    <LoaderContainer>
      <div className="lds-dual-ring" />
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid rgba(56, 12, 56, 0.171);
    border-color: rgb(65, 57, 65) transparent rgb(68, 65, 68) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
