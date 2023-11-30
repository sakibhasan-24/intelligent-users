import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Private() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("hey", currentUser);
  if (currentUser) {
    return <Outlet />;
  }
  return <Navigate to="/signup" />;
}
