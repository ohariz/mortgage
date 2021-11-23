import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import MUITableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatCurrency } from './utils';

function TableCell(props) {
  return <MUITableCell sx={{ padding: '6px 8px' }} {...props} />;
};

export default function Table({ data }) {
  return (
    <MUITable size="small">
      <TableHead>
        <TableRow key="head">
          <TableCell />
          <TableCell key="m">Monthly payment</TableCell>
          <TableCell key="0">Initial cost</TableCell>
          {[...Array(30).keys()].map((index) =>
            index > 4 && (index + 1) % 5 !== 0 ? null : (
              <TableCell key={index + 1}>Year {index + 1}</TableCell>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ key, monthlyPayment, values }, index) => (
          <TableRow key={index}>
            <TableCell key="title">{key}</TableCell>
            <TableCell key="payment">{formatCurrency(monthlyPayment)}</TableCell>
            {values.map((value, index) =>
              index > 5 && index % 5 !== 0 ? null : (
                <TableCell key={index}>{formatCurrency(value)}</TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </MUITable>
  );
}
