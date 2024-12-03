import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

const Dashboard = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#e2e8f0',
                        }}
                    >
                        <Typography variant="h6">Người dùng mới</Typography>
                        <Typography variant="h4">150</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#e2e8f0',
                        }}
                    >
                        <Typography variant="h6">Bài học đã hoàn thành</Typography>
                        <Typography variant="h4">320</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
