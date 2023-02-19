import { createBrowserRouter } from "react-router-dom";
import { MapPage } from "./pages/MapPage";
import { SearchPage } from "./pages/SearchPage";

const router = createBrowserRouter([
    {
        'path': '/search',
        'element': <SearchPage />
    },
    {
        'path': '/map',
        'element': <MapPage />
    }
])

export default router;