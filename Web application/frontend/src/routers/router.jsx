import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import Home from "../pages/home/home";


const router =createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }//,
            // {
            //     path: "/about",
            //     element: <div>About page</div>
            // }
        ]
    }
]);
export default router;