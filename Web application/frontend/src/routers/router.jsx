import {createBrowserRouter, Routes, Route} from "react-router-dom"
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import SingleProduct from "../pages/shop/SingleProduct";
import Contact from "../pages/contact/Contact";
import Login from "../components/Login"; 
import Register from "../components/Register"; 
import Checkout from '../pages/shop/Checkout';
import OrderSuccess from '../pages/shop/OrderSuccess';
import CartNavigationPage from "../pages/cartNavigationProcessing/CartNavigationPage";

const router =createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                 path: "/categories/:categoryName",
                 element: <CategoryPage/>
            },
            {
                path: "/shop",
                element: <Search/>
            },
            {
                path: "/shop/:id",
                element: <SingleProduct/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/login",
                element: <Login/>, 
            },
            {
                path: "/register",
                element: <Register/>, 
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/order-success",
                element: <OrderSuccess />
            },
            {
                path: "/cart-navigation",
                element: <CartNavigationPage />
            }
        ]
    }
]);
export default router;