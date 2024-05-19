import React from "react";
import { Container, Typography, Box, Paper, Grid, Avatar } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box
        my={4}
        textAlign="center"
        sx={{
          bgcolor: "#fbf6f3",
        }}
      >
        
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1">Hello, my name is Bahar.</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Eğitim</Typography>
            <Typography variant="body1">
              Gazi & Yildiz Technic University - Software Developer
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Experience</Typography>
            <Typography variant="body1">
              Hello, my name is Bahar. I am a proud alumnus of Gazi University,
              where I graduated with high honors from the Computer and
              Instructional Technologies Education program. My academic journey
              was complemented by a keen interest in software development and
              staying abreast with the latest technologies, which I pursued
              alongside my formal education. While at Gazi University, I not
              only focused on my studies but also applied my burgeoning skills
              in technology and software development in a practical setting. I
              worked part-time for nearly three years as a Content Developer at
              the university's Informatics Institute, where I was actively
              involved in developing and implementing innovative software
              solutions. My commitment to social good intersected through my
              active involvement in various charity organizations, such as TEGV
              Following this, I joined Boğaziçi University, serving as an EBYS
              system administrator and editor-in-chief for approximately 3.5
              years. This role allowed me to further hone my skills in software
              development and stay connected with evolving technologies in the
              educational sector. Currently, I am enriching my expertise in
              technology as a master's student at Yıldız Technical University in
              the Computer and Instructional Technologies Department, with a
              specialization in Artificial Intelligence in Education. This
              program has been an excellent platform for me to delve deeper into
              the latest developments in AI and its applications in education.
              Alongside my academic pursuits, I have taken a career break from
              my Master's program to focus on practical applications of my
              skills. I am currently embracing the role of an ITC teacher at
              Eyüp Sultan Central Secondary School in Istanbul, where I am
              applying my knowledge in software development and current
              technologies to inspire and educate the next generation of tech
              enthusiasts.
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
