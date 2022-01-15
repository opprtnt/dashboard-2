import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/Loader';
import TotalBar from '../components/TotalBar';
import { useDispatch, useSelector } from 'react-redux';
import { setTitlePage } from '../store/authSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextLogin } from '../';

export default function Dashboard() {
  const DashboardCard = styled.div`
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
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);
  const [countHight, setCountHight] = useState();
  const [countNormal, setCountNormal] = useState();
  const [countLow, setCountLow] = useState();
  const [countAll, setCountAll] = useState();
  const [countAllUser, setCountAllUser] = useState();
  const [countHighUser, setCountHighUser] = useState();
  const [countNormalUser, setCountNormalUser] = useState();
  const [countLowUser, setCountLowUser] = useState();
  const db = getFirestore();
  const docRef = collection(db, 'tickets');
  const queryHigh = query(docRef, where('priority', '==', 2), where('completed', '==', false));
  const queryNormal = query(docRef, where('priority', '==', 1), where('completed', '==', false));
  const queryLow = query(docRef, where('priority', '==', 0), where('completed', '==', false));
  const queryAllTicket = query(docRef);
  const totalUncompletedPrecent = Math.round((countAll / 100) * (countNormal + countLow + countHight) * 100);
  const totalUncompletedUserPrecent = Math.round(
    (countAllUser / 100) * (countNormalUser + countLowUser + countHighUser) * 100
  );
  let queryHighUser, queryNormalUser, queryLowUser, queryAllTicketUser;

  useEffect(() => {
    if (user) {
      queryHighUser = query(
        docRef,
        where('priority', '==', 2),
        where('completed', '==', false),
        where('user.uid', '==', user.uid)
      );
      queryNormalUser = query(
        docRef,
        where('priority', '==', 1),
        where('completed', '==', false),
        where('user.uid', '==', user.uid)
      );
      queryLowUser = query(
        docRef,
        where('priority', '==', 0),
        where('completed', '==', false),
        where('user.uid', '==', user.uid)
      );
      queryAllTicketUser = query(docRef, where('user.uid', '==', user.uid));
    }
  }, [user]);

  useEffect(async () => {
    const docSnap = await getDocs(queryHigh);
    setCountHight(docSnap.docs.length);
    console.log(user);
  }, []);
  useEffect(async () => {
    const docSnap = await getDocs(queryNormal);
    setCountNormal(docSnap.docs.length);
  }, []);
  useEffect(async () => {
    const docSnap = await getDocs(queryLow);
    setCountLow(docSnap.docs.length);
    const allTicketSnap = await getDocs(queryAllTicket);
    setCountAll(allTicketSnap.docs.length);
    const highUserSnap = await getDocs(queryHighUser);
    setCountHighUser(highUserSnap.docs.length);
    const normalUserSnap = await getDocs(queryNormalUser);
    setCountNormalUser(normalUserSnap.docs.length);
    const lowUserSnap = await getDocs(queryLowUser);
    setCountLowUser(lowUserSnap.docs.length);
    const allTicketUserSnap = await getDocs(queryAllTicketUser);
    setCountAllUser(allTicketUserSnap.docs.length);
  }, []);

  const dispatch = useDispatch();
  dispatch(setTitlePage('Dashboard'));

  if (
    (countHight && countLow && countNormal && countHighUser && countNormalUser) === undefined ||
    isNaN(totalUncompletedPrecent) ||
    isNaN(totalUncompletedUserPrecent)
  )
    return <Loader />;
  return (
    <div className="container">
      <div className="container__content">
        <div className="row">
          <DashboardCard className="white">
            <h3 className="gray">Total High</h3>
            <div className="count">{countHight}</div>
          </DashboardCard>
          <DashboardCard className="white">
            <h3 className="gray">Total Normal</h3>
            <div className="count">{countNormal}</div>
          </DashboardCard>
          <DashboardCard className="white">
            <h3 className="gray">Total Low</h3>
            <div className="count">{countLow}</div>
          </DashboardCard>
          <DashboardCard className="white">
            <h3 className="gray">Total Uncompleted</h3>
            <div className="count">
              {countNormal + countLow + countHight}
              <span className="precent">{totalUncompletedPrecent}%</span>
            </div>
          </DashboardCard>
        </div>
        <TotalBar db={db} docRef={docRef} />
        <div className="row">
          <DashboardCard className="white">
            <h3 className="gray">High</h3>
            {countHighUser}
          </DashboardCard>
          <DashboardCard className="white">
            <h3 className="gray">Normal</h3>
            {countNormalUser}
          </DashboardCard>
          <DashboardCard className="white">
            <h3 className="gray">Low</h3>
            {countLowUser}
          </DashboardCard>
          <DashboardCard className="white">
            <h3 className="gray">Total Uncompleted</h3>
            <div className="count">
              {countNormalUser + countLowUser + countHighUser}
              <span className="precent">{totalUncompletedUserPrecent}%</span>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
