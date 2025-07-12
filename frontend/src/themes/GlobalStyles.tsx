// src/GlobalStyles.tsx
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      body: {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 320,
        minHeight: '100vh',
        backgroundColor: '#2e2e2e',
        color: '#ffffff',
      },
      '.dashboard': {
        height: '100vh',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
      },
      '.split': {
        display: 'flex',
        height: '100%',
      },
      '.split > div': {
        overflow: 'auto',
        backgroundColor: '#424242',
        borderRadius: '8px',
        padding: '12px',
        margin: '4px',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      },
      '.split > div:hover': {
        backgroundColor: '#4a4a4a',
        boxShadow: '0 0 8px rgba(255, 255, 255, 0.05)',
      },
      '.task-card': {
        border: '1px solid #555',
        borderRadius: '8px',
        padding: '12px',
        margin: '4px 0',
      },
      '.task-card:hover': {
        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.05)',
      },
      '@media (max-width: 768px)': {
        body: {
          fontSize: '0.95rem',
        },
        h1: {
          fontSize: '2rem',
        },
        '.split': {
          flexDirection: 'column',
        },
      },
    }}
  />
);

export default GlobalStyles;
