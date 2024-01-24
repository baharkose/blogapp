import React from "react";
import { Container, Typography, Box, Paper, Grid, Avatar } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Avatar
          alt="Profil Resmi"
          src="/profile-pic.jpg" // Profil resminizin yolu
          sx={{ width: 100, height: 100, mx: "auto" }}
        />
        <Typography variant="h4" gutterBottom>
          Hakkımda
        </Typography>
        <Typography variant="body1">
          Ben Bahar, bir yazılım mühendisi ve teknoloji tutkunuyum. Yenilikçi
          çözümler üretmeyi ve yazılım geliştirmeyi seviyorum.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Eğitim</Typography>
            <Typography variant="body1">
              Gazi Yıldız - Bilgisayar Bilimleri Bölümü
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Deneyim</Typography>
            <Typography variant="body1">
              5 yıllık yazılım geliştirme deneyimim var ve çeşitli projelerde
              çalıştım.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box my={4}>
        <Typography variant="body1">
          Benimle iletişime geçmek isterseniz, baharkse17@mail.com adresinden
          ulaşabilirsiniz.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
