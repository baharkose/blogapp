import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footers = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 'auto' }}>
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    © 2024 Bahar Kose. Tüm hakları saklıdır.
                </Typography>
                <Typography variant="body2" align="center">
                    <Link href="#" color="inherit">
                        Gizlilik Politikası
                    </Link>
                    {' | '}
                    <Link href="#" color="inherit">
                        Kullanım Şartları
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footers;
