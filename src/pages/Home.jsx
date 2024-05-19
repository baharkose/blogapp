import React from "react";
import { Container } from "@mui/material";
import Background from "../assets/background.png";

function Home() {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
        }}
      >
        <img src={Background} width={1000} />
      </Container>
    </>
  );
}

export default Home;
