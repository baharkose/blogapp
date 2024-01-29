import React, { useState } from "react";
import { Formik } from "formik";
import EditProfile, { registerSchema } from "./EditProfile";

const EditProfileContainer = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);

  // Example initial values, adjust as necessary
  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    bio: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    // Handle form submission here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <EditProfile {...formikProps} open={open} setOpen={setOpen} />
      )}
    </Formik>
  );
};

export default EditProfileContainer;
