import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import Home from "../pages/home/home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import SingleProduct from "../pages/shop/SingleProduct";
import Contact from "../pages/contact/Contact";
import Login from "../components/Login"; 
import Register from "../components/Register"; 

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
            }
        ]
    }
]);
export default router;