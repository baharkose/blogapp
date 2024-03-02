import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8a96aa', // Gri mavi tonu
    },
    secondary: {
      main: '#b3cde0', // Açık mavi tonu
    },
    background: {
      default: '#f0f4f7', // Açık gri tonunda arka plan rengi
    },
    text: {
      primary: '#333', // Temel metin rengi
      secondary: '#666', // İkincil metin rengi
    },
  },
});

export default theme;
