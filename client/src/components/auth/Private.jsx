import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const user = useSelector((state) => state.auth);
  
  if (user) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
};

export default Private;
