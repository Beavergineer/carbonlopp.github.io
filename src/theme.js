import { createTheme } from '@mui/material/styles';

export const carbonTheme = createTheme({
  palette: {
    primary: { main: '#059669' },    // Vert forêt
    secondary: { main: '#28540A' },  // Vert émeraude
    background: { 
    default: '#F4F7F4',               // 🟢 Fond vert très très clair (moins blanc)
    paper: '#FFFFFF'                  // Cartes restent blanches pour contraste
    } 
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
          }
        },
        containedPrimary: {
          backgroundColor: '#64748B',
          '&:hover': { backgroundColor: '#475569' }
        },
        containedSecondary: {
          backgroundColor: '#16A34A',
          '&:hover': { backgroundColor: '#15803D' }
        }
      }
    }}
});
