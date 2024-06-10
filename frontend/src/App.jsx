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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
