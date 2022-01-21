import { collection, getDocs, getFirestore, query, where, getDoc, doc } from 'firebase/firestore';
import React, { FC, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import TotalBar from '../components/TotalBar';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../store/appSlice';
import { DashboardCard } from '../style/style';
import { useAppSelector } from '../store';

const Dashboard: FC = () => {
  const user = useAppSelector((state) => state.user.userData);
  const [countHight, setCountHight] = useState(0);
  const [countNormal, setCountNormal] = useState(0);
  const [countLow, setCountLow] = useState(0);
  const [countAll, setCountAll] = useState(0);
  const [countAllUser, setCountAllUser] = useState(0);
  const [countHighUser, setCountHighUser] = useState(0);
  const [countNormalUser, setCountNormalUser] = useState(0);
  const [countLowUser, setCountLowUser] = useState(0);
  const db = getFirestore();
  const docRef = collection(db, 'tickets');
  const docCount = doc(db, 'count', 'count');
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
  const totalUncompletedPrecent = Math.round((100 / countAll) * (countNormal + countLow + countHight));
  const totalUncompletedUserPrecent = Math.round(
    (100 / countAllUser) * (countNormalUser + countLowUser + countHighUser)
  );
  //const componentMounted = useRef(true);


  useEffect(() => {
    async function setValueForCards() {
      if (user) {
        const docSnapQueryHigh = await getDocs(queryHigh);
        setCountHight(docSnapQueryHigh.docs.length);
        const docSnapQueryNormal = await getDocs(queryNormal);
        setCountNormal(docSnapQueryNormal.docs.length);
        const docSnap = await getDocs(queryLow);
        setCountLow(docSnap.docs.length);
        const allTicketSnap = await getDoc(docCount);
        setCountAll(allTicketSnap.data()!.count);
        const highUserSnap = await getDocs(queryHighUser);
        setCountHighUser(highUserSnap.docs.length);
        const normalUserSnap = await getDocs(queryNormalUser);
        setCountNormalUser(normalUserSnap.docs.length);
        const lowUserSnap = await getDocs(queryLowUser);
        setCountLowUser(lowUserSnap.docs.length);
        const allTicketUserSnap = await getDocs(queryAllTicketUser);
        setCountAllUser(allTicketUserSnap.docs.length);
      }
    }
    setValueForCards();
    //return () => (componentMounted.current = false);
  }, [user]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitlePage('Dashboard'));
  }, [dispatch]);

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
              {Number.isFinite(totalUncompletedPrecent)&&<span className="precent">{totalUncompletedPrecent}%</span>}
            </div>
          </DashboardCard>
        </div>
        <TotalBar docRef={docRef} />
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
              {Number.isFinite(totalUncompletedUserPrecent) && <span className="precent">{totalUncompletedUserPrecent}%</span>}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
