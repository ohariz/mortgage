import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

const Wrapper = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export default function Settings({ settings, setSettings }) {
  const getNumberFieldSetter = (key) => (e) => setSettings({ ...settings, [key]: e.target.value });
  const getCheckboxSetter = (key) => () => setSettings({ ...settings, [key]: !settings[key] });
  return (
    <Wrapper>
      <TextField
        id="priceInput"
        type="number"
        size="small"
        label="Purchase price ($)"
        value={settings.price}
        onChange={getNumberFieldSetter('price')}
      />
      <TextField
        id="priceInflationInput"
        type="number"
        size="small"
        label="Projected value inflation (%)"
        value={settings.priceInflation}
        onChange={getNumberFieldSetter('priceInflation')}
      />
      <FormControlLabel
        control={(
          <Checkbox
            id="includeEquityInput"
            checked={settings.includeEquity}
            onChange={getCheckboxSetter('includeEquity')}
          />
        )}
        label="Include property equity"
      />
      <TextField
        id="rentInput"
        type="number"
        size="small"
        label="Monthly rent savings/earnings ($)"
        value={settings.rent}
        onChange={getNumberFieldSetter('rent')}
      />
      <TextField
        id="rentInflationInput"
        type="number"
        size="small"
        label="Projected yearly rent inflation (%)"
        value={settings.rentInflation}
        onChange={getNumberFieldSetter('rentInflation')}
      />
      <div />
      <TextField
        id="interestInput"
        type="number"
        size="small"
        label="Projected interest on cash (%)"
        value={settings.interest}
        onChange={getNumberFieldSetter('interest')}
      />
    </Wrapper>
  );
}
