import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Chart from './Chart';
import Rates from './Rates';
import Settings from './Settings';
import Table from './Table';
import { DEFAULT_RATES, DEFAULT_SETTINGS } from './conts';
import { computeData } from './utils';

const Wrapper = styled.div`
  margin: 16px;
`;

const Heading = styled.h1`
  margin: 16px 0 24px;
`;

const Flex = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export default function App() {
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')) || DEFAULT_SETTINGS);
  const [rates, setRates] = useState(JSON.parse(localStorage.getItem('rates')) || DEFAULT_RATES);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('rates', JSON.stringify(rates));
  }, [settings, rates]);

  const data = computeData(settings, rates);

  return (
    <Wrapper>
      <Heading>Mortgage comparison tool</Heading>
      <Settings settings={settings} setSettings={setSettings} />
      <Flex>
        <Rates rates={rates} setRates={setRates} />
        <Chart data={data} />
      </Flex>
      <Table data={data} />
    </Wrapper>
  );
}
