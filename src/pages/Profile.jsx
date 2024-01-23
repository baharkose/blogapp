import React from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Container,
} from "@mui/material";

const Profile = () => {
  const { currentUserInfo } = useAuthContext();
  console.log(currentUserInfo);

  return (
    <Container>
      <Card sx={{
        marginTop:4,
      }}>
        <CardMedia
          style={{ height: 250, width: 250 }}
          image={currentUserInfo?.image} // Profil fotoğrafının yolu
          title="Profil Fotoğrafı"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Kullanıcı Adı: {currentUserInfo?.username || "yok"}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Ad Soyad: {currentUserInfo?.firstName}{" "}
            {currentUserInfo?.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentUserInfo?.bio}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            İletişim bilgileri: {currentUserInfo?.email}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
