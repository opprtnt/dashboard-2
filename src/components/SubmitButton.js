import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function SubmitButton() {
  const SubmitButton = styled.button`
    background: #3751ff;
    color: white;
    width: 100%;
    font-size: 1em;
    margin: 1em;
    padding: 13px 0 15px;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `;
  return (
    <SubmitButton>
      <Link to={'/dashboard'}>Log In</Link>
    </SubmitButton>
  );
}
