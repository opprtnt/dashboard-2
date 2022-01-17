import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { convertDate, convertTime } from '../functions';

let dateNow = new Date();
let dateTable = Date.now() / 1000;
dateNow.setHours(0, 0, 0, 0);
const period = new Date(dateNow - 14 * 24 * 60 * 60 * 1000);

export default function TotalBar({ docRef }) {
  const queryPeriod = query(docRef, where('completed', '==', true), where('date', '>', period));
  const [dataOfPeriod, setDataOfPeriod] = useState();
  const [dataBar, setDataBar] = useState();
  const Diagramma = styled.div`
    margin: 30px 0;
    border: 1px solid #dfe0eb;
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

  useEffect(() => {
    async function setDataPeriod() {
      const docSnap = await getDocs(queryPeriod);
      let container = [];
      docSnap.forEach((v) => container.push(v.data()));
      setDataOfPeriod(container);
    }
    setDataPeriod();
  }, []);

  useEffect(() => {
    if (dataOfPeriod) createDataForBar();
  }, [dataOfPeriod]);

  function createDataForBar() {
    let dataBar = [];
    for (let i = 0; i < 14; i++) {
      let day = dateNow - i * 24 * 60 * 60 * 1000;
      let date = new Date(day);
      dataBar.push({ date: date.getDate(), Low: 0, Normal: 0, High: 0 });
    }
    dataOfPeriod.forEach((ticket) => {
      let date = ticket.date.toDate().getDate();
      const idx = dataBar.findIndex((v) => v.date === date);
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
        <BarChart data={dataBar} align="center">
          <XAxis axisLine={false} tickLine={false} dataKey="date" reversed={true} />
          <YAxis axisLine={false} tickLine={false} alLOwDecimals={false} />
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
          <Bar stackId="pv" barSize={18.35} dataKey="High" fill="#EB5757" />
          <Bar stackId="pv" barSize={18.35} dataKey="Normal" fill="#29CC97" />
          <Bar stackId="pv" barSize={18.35} dataKey="Low" fill="#F2C94C" />
        </BarChart>
      </ResponsiveContainer>
    </Diagramma>
  );
}
