import { useSelector } from "react-redux";

const RoleBasedGuard = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user || !allowedRoles.includes(user.role)) return <>Unauthorized</>;
  return <>{children}</>;
};
