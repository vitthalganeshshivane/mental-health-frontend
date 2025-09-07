import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null;
};

export default HomeRedirector;
