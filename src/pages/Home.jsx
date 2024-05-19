import React from "react";
import { Container } from "@mui/material";
import Background from "../assets/background.png";

function Home() {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingBottom: 0, // Ekran boyutlarına göre alt boşluk ayarı
          marginBottom: 0,
        }}
      >
        <img
          src={Background}
          width={1000}
          style={{
            width: "100%", // Resmin genişliği ebeveyn öğenin genişliğine göre ayarlanacak
            height: "auto", // Resmin orantılı olarak boyutunu korur
            maxHeight: "100%",
            maxWidth: "100%", // Resmin eni, ebeveyn öğenin eni kadar olacak şekilde ayarlanır
          }}
        />
      </Container>
    </>
  );
}

export default Home;
