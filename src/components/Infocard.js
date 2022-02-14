import { React, useState, useEffect } from 'react';
import DetailCards from './DetailCards';
import Header from './Header';
import SummaryCard from './SummaryCard';
import { SearchIcon, LocationMarkerIcon } from '@heroicons/react/solid';
// import { SearchIcon, LocationSearchingIcon } from '@mui/material';
import SkeletonCard from '../skeletons/SkeletonCard';
import SkeletonLarge from '../skeletons/SkeletonLarge';
import Maps from './Maps';

const Infocard = () => {

    const API_KEY = process.env.REACT_APP_API_KEY

    const [active, setActive] = useState('Weather');
    const [searchTerm, setSearchTerm] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('Unknown Location');
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {

            setCoordinates({ lat: latitude, lng: longitude })
            console.log(latitude)
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!searchTerm) {
            alert('Enter your city')
            return
        }
        setSearchTerm('')
        getWeather(searchTerm)
    }

    const getWeather = async (location) => {
        setWeatherData([])
        let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

        try {
            setTimeout(async () => {

                const res = await fetch(`${process.env.REACT_APP_URL + how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)

                const data = await res.json()
                if (data.cod != 200) {
                    // setNoData(`Location Not Found`)
                    return
                }
                setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
                setWeatherData(data)
                setCoordinates({ lat: data.city.coord.lat, lng: data.city.coord.lon })
                setCity(`${data.city.name}, ${data.city.country}`)
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }

    const myIp = async (location) => {
        const { latitude, longitude } = await location.coords
        setCoordinates({ lat: latitude, lng: longitude })
        getWeather([latitude, longitude])
    }

    return (
        <div className="bg-gray-800 flex items-center justify-center w-screen h-screen py-10">
            <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">

                < div className="form-container" >
                    <div className="flex items-center justify-center">
                        <h3 className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 
                                rounded-md bg-white bg-opacity-30">forecast</h3>
                        <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
                            <i className="fa fa-map my-auto" aria-hidden="true"></i>
                            <div className="text-right">
                                <p className="font-semibold text-sm ml-2">{city}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-white text-2xl">The Only Weather Forecast You Need</h1>
                        <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
                        <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
                            <input type="text"
                                placeholder="Enter location"
                                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                required />
                            <button type='submit' className='z-10'>
                                <SearchIcon className="-ml-12 h-12 w-12 border-l my-auto cursor-pointer hover:text-gray-700 duration-300 p-3"
                                    aria-hidden="true" type="submit">
                                </SearchIcon>
                            </button>
                            <LocationMarkerIcon className="h-12 w-12 my-auto cursor-pointer hover:text-sky-700 duration-300 text-white p-3" aria-hidden="true" onClick={() => {
                                navigator.geolocation.getCurrentPosition(myIp)
                            }}></LocationMarkerIcon>
                        </form>
                    </div>
                </div >
                {/* Right section   */}
                <div className="w-2/4 p-5">
                    <Header onactive={active} setactive={setActive} />


                    <div className="flex flex-col my-10">

                        {active === "Weather" &&
                            <div>
                                {weatherData.length === 0 ?
                                    <>
                                        {active}
                                        <SkeletonLarge shades="light" />
                                        <ul className="grid grid-cols-2 gap-2 mt-20">
                                            {[1, 2, 3, 4].map((n) => <SkeletonCard shades="light" key={n} />)}
                                        </ul>
                                    </> :
                                    <>
                                        <h1 className="text-5xl text-gray-800 mt-auto mb-4">Today</h1>
                                        <DetailCards weather_icon={weatherIcon} data={weatherData} />
                                        <h1 className="text-3xl text-gray-600 mb-4 mt-10">More On {city}</h1>
                                        <ul className="grid grid-cols-2  gap-2">

                                            {weatherData.list.map((days, index) => {
                                                if (index > 0) {
                                                    return (
                                                        <SummaryCard key={index} day={days} />
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </>}
                            </div>
                        }
                        {
                            active === "Map" && <Maps setBounds={setBounds} coordinates={coordinates} setCoordinates={setCoordinates} />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Infocard;
