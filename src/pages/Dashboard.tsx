import { collection, getDocs, query, where, getDoc, doc, Query } from 'firebase/firestore';
import React, { FC, useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import TotalBar from '../components/TotalBar';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../store/appSlice';
import { useAppSelector } from '../store';
import { ContextLogin } from '..';
import styled from 'styled-components';

type setCount = React.Dispatch<React.SetStateAction<number | undefined>>;

const Dashboard: FC = () => {
  const user = useAppSelector((state) => state.user.userData);
  const [countHigh, setCountHigh] = useState<number>();
  const [countNormal, setCountNormal] = useState<number>();
  const [countLow, setCountLow] = useState<number>();
  const [countAll, setCountAll] = useState<number>();
  const [countAllUser, setCountAllUser] = useState<number>();
  const [countHighUser, setCountHighUser] = useState<number>();
  const [countNormalUser, setCountNormalUser] = useState<number>();
  const [countLowUser, setCountLowUser] = useState<number>();
  const {db} = useContext(ContextLogin);

  const totalUncompletedPrecent = Math.round((100 / countAll!) * (countNormal! + countLow! + countHigh!));
  const totalUncompletedUserPrecent = Math.round(
    (100 / countAllUser!) * (countNormalUser! + countLowUser! + countHighUser!)
  );

  useEffect(() => {
    let isMounted = true; 
    const docRef = collection(db, 'tickets'); 
    async function setValueForCards(query:Query, setCountFunc:setCount) { 
        const docSnap = await getDocs(query);
        setCountFunc(docSnap.docs.length);
    }
    async function setDocumentCount() {
      const docCount = doc(db, 'count', 'count');
      const allTicketSnap = await getDoc(docCount);
      setCountAll(allTicketSnap.data()!.count);
    }

    if (isMounted&&user){
      const queryHigh = query(docRef, where('priority', '==', 2), where('completed', '==', false));
      const queryNormal = query(docRef, where('priority', '==', 1), where('completed', '==', false));
      const queryLow = query(docRef, where('priority', '==', 0), where('completed', '==', false));
      const queryHighUser = query(
        docRef,
        where('priority', '==', 2),
        where('completed', '==', false),
        where('user.uid', '==', user.uid)
      );
      const queryNormalUser = query(
        docRef,
        where('priority', '==', 1),
        where('completed', '==', false),
        where('user.uid', '==', user.uid)
      );
      const queryLowUser = query(
        docRef,
        where('priority', '==', 0),
        where('completed', '==', false),
        where('user.uid', '==', user.uid)
      );
      const queryAllTicketUser = query(docRef, where('user.uid', '==', user.uid));
    setValueForCards(queryHigh, setCountHigh);
    setValueForCards(queryNormal, setCountNormal);
    setValueForCards(queryLow, setCountLow);
    setValueForCards(queryNormalUser, setCountNormalUser);
    setValueForCards(queryHighUser, setCountHighUser);
    setValueForCards(queryLowUser, setCountLowUser);
    setValueForCards(queryAllTicketUser, setCountAllUser);
    setDocumentCount();
  }
    return () => {isMounted = false};
  }, [user, db]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitlePage('Dashboard'));
  }, [dispatch]);

if(countHigh===undefined||countLow===undefined||countNormal===undefined||countHighUser===undefined||countLowUser===undefined||countNormalUser===undefined) return <div className="container"><Loader/></div>

  return (
    <div className="container">
      <div className="container__content">
        <div className="row">
          <DashboardCard>
            <h3>Total High</h3>
            <div className="count">{countHigh}</div>
          </DashboardCard>
          <DashboardCard>
            <h3>Total Normal</h3>
            <div className="count">{countNormal}</div>
          </DashboardCard>
          <DashboardCard>
            <h3>Total Low</h3>
            <div className="count">{countLow}</div>
          </DashboardCard>
          <DashboardCard>
            <h3>Total Uncompleted</h3>
            <div className="count">
              {countNormal + countLow + countHigh}
              {Number.isFinite(totalUncompletedPrecent)&&<span className="precent">{totalUncompletedPrecent}%</span>}
            </div>
          </DashboardCard>
        </div>
        <TotalBar/>
        <div className="row">
          <DashboardCard>
            <h3>High</h3>
            {countHighUser}
          </DashboardCard>
          <DashboardCard>
            <h3>Normal</h3>
            {countNormalUser}
          </DashboardCard>
          <DashboardCard>
            <h3>Low</h3>
            {countLowUser}
          </DashboardCard>
          <DashboardCard>
            <h3>Total Uncompleted</h3>
            <div className="count">
              {countNormalUser + countLowUser + countHighUser}
              {Number.isFinite(totalUncompletedUserPrecent) && <span className="precent">{totalUncompletedUserPrecent}%</span>}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};
export const DashboardCard = styled.div`
  width: 258px;
  text-align: center;
  padding: 24px 32px;
  background-color: ${({theme})=>theme.colors.contentBg};
  border: 1px solid ${({theme})=>theme.colors.border};
  border-radius: 8px;
  font-size: 40px;
  font-weight: 700;
  h3 {
    font-size: 19px;
    color: ${({theme})=>theme.colors.headColor};
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
export default Dashboard;
