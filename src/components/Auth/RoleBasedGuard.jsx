import { useSelector } from "react-redux";

const RoleBasedGuard = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user || !allowedRoles.includes(user?.account.role))
    return <>Unauthorized</>;
  return <>{children}</>;
};

export default RoleBasedGuard;
