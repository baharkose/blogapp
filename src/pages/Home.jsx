import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styling for the CardMedia component to mimic the design
const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9 aspect ratio
});

// Custom styling for the main featured card to make it larger
const FeaturedCardMedia = styled(StyledCardMedia)({
  paddingTop: "75%", // Larger aspect ratio for featured card
});

const blogPosts = [
  {
    title: "Gülün Hikayesi",
    summary:
      "Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.Aşkın ve tutkunun simgesi olan gülün gizemli hikayesi.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Po4AIvfMGZJkOs2HY3Acl1UVjcMbVNWOtiSXhosNzQ&s",

    imageHeight: "140",
    readMoreUrl: "#",
  },
  {
    title: "Lale Devri",
    summary:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Po4AIvfMGZJkOs2HY3Acl1UVjcMbVNWOtiSXhosNzQ&s",
    imageUrl: "url-to-tulip-image",
    imageHeight: "180",
    readMoreUrl: "#",
  },
  {
    title: "Papatyaların Dili",
    summary: "Masumiyet ve saflığın temsili papatyaların bilinmeyen yönleri.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Po4AIvfMGZJkOs2HY3Acl1UVjcMbVNWOtiSXhosNzQ&s",
    imageHeight: "160",
    readMoreUrl: "#",
  },
  {
    title: "Papatyaların Dili",
    summary: "Masumiyet ve saflığın temsili papatyaların bilinmeyen yönleri.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Po4AIvfMGZJkOs2HY3Acl1UVjcMbVNWOtiSXhosNzQ&s",
    imageHeight: "160",
    readMoreUrl: "#",
  },
];
function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 2,
            bgcolor: "transparent ",
            boxShadow: 0,
            borderColor: "transparent",
          }}
        >
          <Grid container spacing={4}>
            {/* Main featured post */}
            <Grid item xs={12} md={8}>
              <Card>
                <FeaturedCardMedia
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Po4AIvfMGZJkOs2HY3Acl1UVjcMbVNWOtiSXhosNzQ&s" // Replace with your featured image URL
                  title="Featured Post"
                />
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Featured Post Title
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Featured Post Subtitle
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Featured Post description...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Other posts */}
            {blogPosts.map((post) => (
              <Grid item key={post.title} xs={12} md={4}>
                <Card>
                  <StyledCardMedia
                    image={post.imageUrl} // Replace with your image URL
                    title={post.title}
                  />
                  <CardContent>
                    <Typography component="h3" variant="h6">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {post.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default Home;
