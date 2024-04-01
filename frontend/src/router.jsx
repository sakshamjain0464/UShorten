import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Redirection from "./components/Redirection";

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
                path : '/about',
                element : <h1>About</h1>
            },
            {
                path : '/contact',
                element : <h1>Contact</h1>
            },
            {
                path : '/:shortID',
                element : <Redirection />
            }
        ]
    },
]

const router = createBrowserRouter(routes);

export default router;