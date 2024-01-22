import React, { useEffect } from "react";
import { useBlogContext } from "../context/BlogContext";

const Dashboard = () => {
  const { getBlog } = useBlogContext();

  useEffect(() => {
    getBlog();
  }, []);


  return <div>dashboard</div>;
};

export default Dashboard;
