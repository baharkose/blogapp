import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footers = () => {
  return (
    <div className="footer"
    style={{}}
    >
      <Box sx={{ bgcolor: "#FBF6F3" }}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            © 2024 Bahar Kose. Tüm hakları saklıdır.
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="#" color="inherit">
              Gizlilik Politikası
            </Link>
            {" | "}
            <Link href="#" color="inherit">
              Kullanım Şartları
            </Link>
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Footers;
