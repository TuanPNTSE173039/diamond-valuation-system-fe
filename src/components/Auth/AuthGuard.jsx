import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={"/auth/login"} />;
  return <>{children}</>;
};

export default AuthGuard;
