import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Profile from '../pages/dashboard/profile/Profile';
import Products from '../pages/dashboard/Products/Products';
import Customers from '../pages/dashboard/Customers';
import Users from '../pages/dashboard/Users';
import Inspections from '../pages/dashboard/Inspections/Inspections';
import InspectionDetails from '../pages/dashboard/Inspections/InspectionDetails';
import AddProducts from '../pages/dashboard/Products/AddProducts';
import EditProducts from '../pages/dashboard/Products/EditProducts';
import ProductsEditCategory from '../pages/dashboard/Products/ProductsEditCategory';
import EditSubCategory from '../pages/dashboard/Products/EditSubCategory';
import InspectionsCreate from '../pages/dashboard/Inspections/InspectionsCreate';
import AllInspectCategory from '../pages/dashboard/Inspections/AllInspectCategory';
import InspectSubCategory from '../pages/dashboard/Inspections/InspectSubCategory';
import SubmitInspections from '../pages/dashboard/Inspections/SubmitInspections';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'products', element: <Products /> },
            { path: 'products-add', element: <AddProducts /> },
            { path: 'products-edit', element: <EditProducts /> },
            { path: 'products-edit/:category', element: <ProductsEditCategory /> },
            { path: 'products-edit/:category/:subCategory', element: <EditSubCategory /> },
            { path: 'customers', element: <Customers /> },
            { path: 'employees', element: <Users /> },
            { path: 'inspections', element: <Inspections /> }, 
            { path: 'inspections-details', element: <InspectionDetails /> },
            { path: 'inspections-create/:category', element: <InspectionsCreate /> },
            { path: 'inspections-creates/:category', element: <AllInspectCategory /> },
            { path: 'inspections-create/:category/:category/:subcategory', element: <InspectSubCategory /> },
            { path: 'inspections/submitInspections', element: <SubmitInspections /> },
            { path: 'settings', element: <Profile /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
