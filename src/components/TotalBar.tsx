import { CollectionReference, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { convertDate, convertTime } from '../functions';

let dateNow = new Date();
let dateTable = Date.now() / 1000;
dateNow.setHours(0, 0, 0, 0);
const period = new Date(dateNow.getTime() - 14 * 24 * 60 * 60 * 1000);

const TotalBar: FC<{ docRef: CollectionReference }> = ({ docRef }) => {
  const queryPeriod = query(docRef, where('completed', '==', true), where('date', '>', period));
  const [dataOfPeriod, setDataOfPeriod] = useState([]);
  const [dataBar, setDataBar] = useState([{ date: 0, Low: 0, Normal: 0, High: 0 }]);
  const theme = useTheme();

  useEffect(() => {
    async function setDataPeriod() {
      const docSnap = await getDocs(queryPeriod);
      let container: any = [];
      docSnap.forEach((v) => container.push(v.data()));
      setDataOfPeriod(container);
    }
    setDataPeriod();
  }, []);

  useEffect(() => {
    if (dataOfPeriod) createDataForBar();
  }, [dataOfPeriod]);

  function createDataForBar() {
    let dataBar = [{ date: 0, Low: 0, Normal: 0, High: 0 }];
    for (let i = 0; i < 14; i++) {
      let date = new Date(dateNow.getTime() - i * 24 * 60 * 60 * 1000);
      dataBar[i] = { date: date.getDate(), Low: 0, Normal: 0, High: 0 };
    }
    dataOfPeriod.forEach((ticket: { date: Timestamp, priority: number }) => {
      let date = ticket.date.toDate().getDate();
      const idx = dataBar.findIndex((v) => v.date === date);
      if (idx === -1) return;
      if (ticket.priority === 0) dataBar[idx].Low += 1;
      if (ticket.priority === 1) dataBar[idx].Normal += 1;
      if (ticket.priority === 2) dataBar[idx].High += 1;
    });
    setDataBar(dataBar);
  }

  return (
    <Diagramma className="white">
      <h3>Completed trends</h3>
      <p className="grey">
        as of {convertDate(dateTable)}, {convertTime(dateTable)}
      </p>
      <ResponsiveContainer height={388} width={'100%'}>
        <BarChart data={dataBar}>
          <XAxis axisLine={false} tickLine={false} dataKey="date" reversed={true} />
          <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip />
          <Legend
            wrapperStyle={{
              top: -40,
              left: 41,
            }}
            verticalAlign="top"
            iconType={'circle'}
            align="left"
          />
          <Bar stackId="pv" barSize={18.35} dataKey="High" fill={theme.colors.high} />
          <Bar stackId="pv" barSize={18.35} dataKey="Normal" fill={theme.colors.normal} />
          <Bar stackId="pv" barSize={18.35} dataKey="Low" fill={theme.colors.low} />
        </BarChart>
      </ResponsiveContainer>
    </Diagramma>
  );
};
const Diagramma = styled.div`
  margin: 30px 0;
  border: 1px solid ${({theme})=>theme.colors.border};
  border-radius: 8px;
  padding: 32px 64px 32px 32px;
  h3 {
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 72px;
    font-size: 12px;
  }
`;

export default TotalBar;
