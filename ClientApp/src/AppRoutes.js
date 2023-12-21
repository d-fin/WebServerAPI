import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes'; 
import { Home } from "./components/Home";
import ViewFile from './components/ViewFiles';
import Login from './components/api-auth/Login';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    /*  {
        path: '/upload-file',
        //requireAuth: true,
        element: <UploadFile />
      },*/
    {
        path: '/view-file',
        //requireAuth: true,
        element: <ViewFile />
    },
    /* {
         path: '/download-file',
         //requireAuth: true,
         element: <DownloadFile />
   },*/
    {
        path: '/login-page',
        element: <Login />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
