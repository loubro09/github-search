import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import Home from "../../pages/Home";
import Results from "../../pages/Results";
import Saved from "../../pages/Saved";
import Repo from "../../pages/Repo";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Home />},
            { path: "results", element: <Results />},
            { path: "saved", element: <Saved /> },
            { path: "repo/:id", element: <Repo />},
        ]
    }
])