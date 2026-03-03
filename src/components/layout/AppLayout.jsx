import { 
  Box, Container, AppBar, Toolbar, Typography, Drawer, 
  List, ListItem, ListItemButton, ListItemText, Divider,
  useTheme
} from '@mui/material';
import { 
  Menu
} from '@mui/icons-material'
import React from 'react';
import { useState } from 'react'; 

const menuItems = [
  { text: 'Calculateur ACV', path: 'calculator', index: 0 },
  { text: 'Dashboard', path: 'dashboard', index: 1 },
  { text: 'Rapports', path: 'reports', index: 2 },
];

export default function AppLayout({ children, currentTab = 0, setCurrentTab }) {
  const theme = useTheme();
  const drawerWidth = 240;

  const handleTabChange = (index) => {
    setCurrentTab(index);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false); // Mini-variant state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setDesktopOpen(!desktopOpen);
    };

    const MenuToggle = ({ onClick }) => (
    <button
        onClick={onClick}
        style={{
        background: 'none',
        border: 'none',
        padding: '8px 12px',
        cursor: 'pointer',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        marginRight: '16px',
        minWidth: '40px',
        height: '40px',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
        }}
    >
        <Menu />
    </button>
    );


  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={currentTab === item.index}
              onClick={() => handleTabChange(item.index)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar - shifts right on desktop */}
      <AppBar
        position="fixed"
        sx={{
            width: { md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
            ml: { md: desktopOpen ? `${drawerWidth}px` : 0 }, 
            transition: 'all 0.2s ease-in-out' 
        }}
      >
        <Toolbar>
            <MenuToggle onClick={handleDrawerToggle} />
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                CarbonLoop
            </Typography>
        </Toolbar>
      </AppBar>

      {/* Persistent Drawer */}
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            <Drawer
                variant="persistent"
                open={desktopOpen || mobileOpen}
                onClose={() => { 
                    setMobileOpen(false); 
                    setDesktopOpen(false); 
                }}
                sx={{
                    display: { xs: 'block', md: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    border: 'none',
                    }
                }}
                >
                {drawer}
            </Drawer>
        </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: '64px',  // AppBar height
          width: { md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </Box>
  );
}
