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
  const { currentUser } = useAuthContext();
  console.log(currentUser);

  return (
    <Container>
      <Card sx={{
        marginTop:4,
      }}>
        <CardMedia
          style={{ height: 250, width: 250 }}
          image={currentUser?.user?.image} // Profil fotoğrafının yolu
          title="Profil Fotoğrafı"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Kullanıcı Adı: {currentUser?.user?.username || "yok"}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Ad Soyad: {currentUser?.user?.firstName}{" "}
            {currentUser?.user.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentUser?.user?.bio}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            İletişim bilgileri: {currentUser?.user?.email}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
