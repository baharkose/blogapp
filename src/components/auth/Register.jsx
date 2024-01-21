import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
// import image from "../assets/result.svg"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import RegisterForm, { registerSchema } from "../RegisterForm";
import { Formik } from "formik";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
// import useAuthCalls from "../service/useAuthCalls"

const Register = () => {
  const { signUp } = useAuthContext();
  

  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight + 150);
    }
  }, []);

  // const { register } = useAuthCalls()

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} sm={10} md={6} ref={formRef}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              bio: "",
              image: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              signUp(values)
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="login">Do you have an account?</Link>
          </Box>
        </Grid>
        {/* <Box style={{ height: 250 }}></Box> */}
        <Grid item style={{ height: formHeight }}>
          {/* Boşluk için ek içerik gerekmez */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
