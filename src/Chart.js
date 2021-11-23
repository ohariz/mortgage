import styled from '@emotion/styled';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getColor, formatCurrency } from './utils';

const Wrapper = styled.div`
  flex: 1 1 auto;
`;

export default function Chart({ data }) {
  const formattedData = data.length > 0 ? data[0].values.map((_, i) => ({ name: `${i}` })) : [];
  data.forEach(({ values }, i) => {
    values.forEach((value, index) => {
      formattedData[index][`${i + 1}`] = value;
    });
  });
  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4" />
          <Tooltip formatter={formatCurrency} />
          {data.map(({ key }, i) => (
            <Line key={key} type="monotone" dataKey={`${i + 1}`} stroke={getColor(i)} activeDot={{ r: 8 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
