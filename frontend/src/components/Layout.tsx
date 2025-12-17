import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import theme from '../styles/theme';
import Chatbot from './Chatbot';

const Layout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        ml: sidebarOpen ? '280px' : '80px',
                        transition: 'margin 0.3s ease',
                        width: `calc(100% - ${sidebarOpen ? 280 : 80}px)`,
                        minHeight: '100vh',
                        bgcolor: 'background.default',
                    }}
                >
                    <Outlet />
                </Box>
                <Chatbot />
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
