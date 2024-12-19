
import { Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../redux/features/auth/authApi";


const PrivateRoute = ({ children }:{children: React.ReactNode}) => {
  const location = useLocation();
  const { data:profile, isLoading, isFetching, isError } = useGetProfileQuery(undefined); 
  
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError || !profile?.data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (profile?.data?.role === "CUSTOMER" || profile?.data?.role === "SUPERADMIN") {
    return children; 
  }

  
  return <Navigate to="/login" />;
};

export default PrivateRoute;