import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/maps';
import Map from './Map';


const MapContainer = ({ lat, lng }) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Map apiKey={key} lat={lat} lng={lng} />
  );
}


export default MapContainer;
