import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form, useFormikContext } from "formik";
import { object, string } from "yup";

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

const FileUpload = ({ name }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      {name && <span>{name}</span>}
    </div>
  );
};

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  return (
    <>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Form>
    </>
  );
};

export default RegisterForm;
