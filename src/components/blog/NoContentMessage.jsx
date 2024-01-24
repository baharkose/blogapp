import React from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NoContentMessage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Henüz İçerik Paylaşılmadı
        </Typography>
        <Typography variant="body1">
          Bu bölümde henüz bir içerik bulunmuyor. İlk gönderinizi oluşturarak burayı doldurabilirsiniz.
        </Typography>
      </Paper>
    </Container>
  );
};

export default NoContentMessage;
