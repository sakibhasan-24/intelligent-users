import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Private({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  //   console.log("hey", currentUser);
  if (currentUser) {
    return children;
  }
  return <Navigate to="/signup" />;
}
