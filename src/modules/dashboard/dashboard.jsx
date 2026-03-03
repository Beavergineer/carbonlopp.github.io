import { Typography } from '@mui/material';  // Add Button import
import MainButton from '../../components/ui/Button';

export default function Calculator() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        The dashboard
      </Typography>

      <MainButton variant="contained" color="primary" onClick={() => alert('Clicked!')}>
        Primary Action (MUI)
      </MainButton>

      <MainButton variant="contained" color="secondary" size="large" disabled>
        Secondary Disabled (Custom)
      </MainButton>
    </>
  );
}
