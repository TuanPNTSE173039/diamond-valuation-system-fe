import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const GuestGuard = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) return <Navigate to={"/"} />;
  return <>{children}</>;
};

export default GuestGuard;
