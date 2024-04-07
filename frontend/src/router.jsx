import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Redirection from "./components/Redirection";
import Login from "./components/Login";
import Signup from "./components/Signup";

const routes = [
    {
        path : '/',
        element : <App />,
        children : [
            {
                path : '/',
                element : <Home />
            },
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '/signup',
                element : <Signup />
            },
            {
                path : '/s/:shortID',
                element : <Redirection />
            }
        ]
    },
]

const router = createBrowserRouter(routes);

export default router;