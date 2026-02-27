import { useState } from 'react';
import { Box} from '@mui/material';
import AppLayout from './components/layout/AppLayout';
import Calculator from './modules/calculator/calculator';
import Dashboard from './modules/dashboard/dashboard'

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const renderContent = () => {
    switch(currentTab) {
      case 0: return <Calculator />;
      case 1: return <Dashboard />;
      case 2: return <div>Rapports en construction...</div>;
      default: return <Calculator />;
    }
  };

  return (
    <AppLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      <Box sx={{ mt: 2 }}>
        {renderContent()}
      </Box>
    </AppLayout>
  );
}

export default App;
