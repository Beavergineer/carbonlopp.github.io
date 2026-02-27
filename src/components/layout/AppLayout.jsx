import { 
  Box, Container, AppBar, Toolbar, Typography, Drawer, 
  List, ListItem, ListItemButton, ListItemText, Divider,
  useTheme 
} from '@mui/material';

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
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            CarbonLoop
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Persistent Drawer - always visible */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="permanent"  // Changed to permanent
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none'  // Clean look
            }
          }}
          open
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
