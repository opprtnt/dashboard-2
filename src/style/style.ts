import styled from 'styled-components';

export const Button = styled.button`
  margin-left: 32px;
`;

export const NewTicketForm = styled.div`
  padding: 32px;
  border-radius: 8px;
  h3 {
    margin-bottom: 36px;
  }
`;

export const DashboardCard = styled.div`
  width: 258px;
  text-align: center;
  padding: 24px 32px;
  background-color: white;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  font-size: 40px;
  font-weight: 700;
  h3 {
    font-size: 19px;
    color: #9fa2b4;
    margin-bottom: 12px;
  }
  .precent {
    font-size: 24px;
    margin-left: 10px;
  }
  & + & {
    margin-left: 30px;
  }
`;
