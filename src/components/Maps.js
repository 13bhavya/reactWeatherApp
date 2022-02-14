import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { React, useState } from 'react';

const Maps = ({ setBounds, setCoordinates, coordinates }) => {

    const MAP_KEY = process.env.REACT_APP_MAP_KEY

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: MAP_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={11}
                options={''}

                // onChange={(e) => {
                //     // console.log(e)
                //     // // setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                //     // // setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                // }}
            >
                <button id='refButton'
                    onClick={e => {
                        console.log( e.currentTarget)
                        setOpen(!open)
                        setAnchorEl(e.currentTarget)
                    }} >
                    <LocationOnIcon id="forwardRef" lat={coordinates.lat} lng={coordinates.lng} />
                </button>
                <Popper id="refButton" open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps}>
                            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                The content of the Popper.
                            </Box>
                        </Fade>
                    )}
                </Popper>
            </GoogleMapReact>
        </div >
    );
};

export default Maps;

