import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getColor } from './utils';

const Wrapper = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonRow = styled.div`
  margin-left: 24px;
`;

const DotWrapper = styled.span(({ color }) => ({ color }));

export default function Rates({ rates, setRates }) {
  const updateRow = (index, key, value) => {
    const ratesCopy = [...rates];
    ratesCopy.splice(index, 1, { ...rates[index], [key]: parseFloat(value)});
    setRates(ratesCopy);
  };
  const deleteRow = (index) => {
    const ratesCopy = [...rates];
    ratesCopy.splice(index, 1);
    setRates(ratesCopy);
  };
  const addRow = () => {
    setRates([...rates, { downpayment: 0, rate: 0, points:0 }]);
  };

  return (
    <Wrapper>
      {rates.map((row, index) => (
        <Row key={index}>
          <DotWrapper color={getColor(index)}>⦿</DotWrapper>
          <TextField
            id={`downpaymentInput${index}`}
            type="number"
            size="small"
            sx={{ width: 120 }}
            label="Downpayment (%)"
            value={row.downpayment}
            onChange={(e) => updateRow(index, 'downpayment', e.target.value)}
          />
          <TextField
            id={`rateInput${index}`}
            type="number"
            size="small"
            label="Rate (%)"
            sx={{ width: 120 }}
            inputProps={{ step: 0.125 }}
            value={row.rate}
            onChange={(e) => updateRow(index, 'rate', e.target.value)}
          />
          <TextField
            id={`pointsInput${index}`}
            type="number"
            size="small"
            label="Points (%)"
            sx={{ width: 120 }}
            inputProps={{ step: 0.25 }}
            value={row.points}
            onChange={(e) => updateRow(index, 'points', e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: 0, height: 40, width: 40 }}
            onClick={() => deleteRow(index)}
          >
            -
          </Button>
        </Row>
      ))}
      <ButtonRow>
        <Button
          variant="contained"
          sx={{ minWidth: 0, height: 40, width: 80 }}
          onClick={() => addRow()}
        >
          +
        </Button>
      </ButtonRow>
    </Wrapper>
  );
}
