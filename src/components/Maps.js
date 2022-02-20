import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

const Maps = ({ coordinates }) => {

    const MAP_KEY = process.env.REACT_APP_MAP_KEY;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    return (
        <div className='cover-map' >
            <GoogleMapReact
                bootstrapURLKeys={{ key: MAP_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={11}
                options={''}

            >
                <button id='refButton'
                    onClick={e => {
                        console.log(e.currentTarget)
                        setOpen(!open)
                        setAnchorEl(e.currentTarget)
                    }} >
                    <LocationOnIcon id="forwardRef" lat={coordinates.lat} lng={coordinates.lng} />
                </button>
            </GoogleMapReact>
        </div >
    );
};

export default Maps;

