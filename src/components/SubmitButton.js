import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function SubmitButton() {
  const SubmitButton = styled.button`
    background: #3751ff;
    color: white;
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    padding: 13px 0 15px;
    border-radius: 8px;
    border: none;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    margin-top: 24px;
  `;
  return (
    <SubmitButton>
      <Link to={'/dashboard'}>Log In</Link>
    </SubmitButton>
  );
}
