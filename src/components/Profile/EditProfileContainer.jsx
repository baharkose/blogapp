import React, { useState } from "react";
import { Formik } from "formik";
import EditProfile, { registerSchema } from "./EditProfile";
import { useAuthContext } from "../../context/AuthContext";

const EditProfileContainer = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const { currentUserInfo } = useAuthContext();
  console.log(currentUserInfo);
  // Example initial values, adjust as necessary
  const initialValues = {
    username: currentUserInfo?.username,
    firstName: currentUserInfo?.firsName,
    lastName: currentUserInfo?.lastName,
    email: currentUserInfo?.email,
    image: currentUserInfo?.image,
    bio: currentUserInfo?.bio,
    // password: currentUserInfo?.password,
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
