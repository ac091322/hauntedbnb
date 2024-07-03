import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
import SpotsListing from './components/Spots/SpotsListing';
import SpotDetails from './components/Spots/SpotDetails';
import SpotForm from './components/Spots/CreateSpot';
import ManageSpots from './components/Spots/ManageSpots';
import ManageReviews from './components/Reviews/ManageReviews';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsListing />
      },
      {
        path: '/spots',
        element: <SpotsListing />
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetails />
      },
      {
        path: "/spots/create",
        element: <SpotForm />
      },
      {
        path: "/spots/:userId/manage",
        element: <ManageSpots />
      },
      {
        path: "/reviews/:userId/manage",
        element: <ManageReviews />
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  },

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}


export default App;
