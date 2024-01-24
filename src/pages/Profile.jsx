import React from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';

const Profile = () => {
  const { currentUserInfo } = useAuthContext();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
        <Avatar
          sx={{ width: 150, height: 150 }}
          src={currentUserInfo?.image || "/default-avatar.png"}
          alt="Profil Fotoğrafı"
        />
      </Box>
      <Paper sx={{ p: 2 }}>
        <Card>
          <CardHeader
            title={`${currentUserInfo?.firstName} ${currentUserInfo?.lastName}`}
            subheader={`@${currentUserInfo?.username || "Kullanıcı Adı"}`}
            titleTypographyProps={{ variant: 'h4' }}
            subheaderTypographyProps={{ variant: 'h6' }}
            avatar={
              <Avatar
                sx={{ bgcolor: 'primary.main' }}
                src={currentUserInfo?.image || "/default-avatar.png"}
              />
            }
          />
          <CardContent>
            <Typography variant="body1" paragraph>
              {currentUserInfo?.bio || "Biografi bilgisi bulunamadı."}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="E-mail" secondary={currentUserInfo?.email} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Diğer Bilgiler" secondary="Ek bilgiler burada yer alabilir." />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default Profile;
