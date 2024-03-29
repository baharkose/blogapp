import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form, useFormikContext } from "formik";
import { object, string } from "yup";
import Modal from "@mui/material/Modal";
import { DialogTitle } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

// motivation commit
export const registerSchema = object({
  username: string()
    .max(20, "Kullanıcı adı 20 karakterden az olmalıdır.")
    .required("Kullanıcı adı zorunludur"),
  firstName: string()
    .max(20, "İsim 20 karakterden az olmalıdır.")
    .required("İsim zorunludur"),
  lastName: string()
    .max(20, "Soyisim 20 karakterden az olmalıdır.")
    .required("Soyisim zorunludur"),
  email: string()
    .email("Lütfen geçerli bir email giriniz.")
    .required("Email zorunludur"),
  // image: string()
  //   .test(
  //     "fileSize",
  //     "Dosya boyutu çok büyük",
  //     (value) => !value || (value && value.size <= 1024 * 1024)
  //   )
  //   .test(
  //     "fileType",
  //     "Sadece resim dosyaları kabul edilir",
  //     (value) => !value || (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
  //   ),
  image: string().url("Lütfen geçerli bir resim URL'si giriniz."),
  password: string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(20, "Şifre en fazla 20 karakter olmalıdır")
    .matches(/\d+/, "Şifre bir sayı içermelidir")
    .matches(/[a-z]/, "Şifre bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre bir büyük harf içermelidir")
    .matches(/[!/[@$!%*?&]+/, "Şifre bir özel karakter içermelidir"),
});

const EditProfile = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  open,
  setOpen,
}) => {
  // const [editedUser, setEditedUser] = useState(values);
  // console.log(editedUser)
  const { updateProfile } = useAuthContext();

  const { currentUserInfo } = useAuthContext();
  console.log(currentUserInfo);
  // tatil molası ne diyelim
  // handleChange = (e) => {
  //   setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  // };

  const handleSubmit = () => {
    updateProfile(currentUserInfo?._id, values);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <DialogTitle textAlign={"center"}>Update Profile</DialogTitle>
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2, // Ayarladığınız boşluk miktarı
              }}
            >
              {" "}
              <TextField
                label="User Name"
                name="username"
                type="text"
                variant="outlined"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={errors.username}
              />
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={errors.email}
              />
              {/* <FileUpload name="image" /> */}
              <TextField
                label="Image"
                name="image"
                type="text"
                variant="outlined"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.image && Boolean(errors.image)}
                helperText={errors.image}
              />
              <TextField
                label="Bio"
                name="bio"
                type="text"
                variant="outlined"
                // value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                // error={touched.bio && Boolean(errors.bio)}
                // helperText={errors.bio}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default EditProfile;
