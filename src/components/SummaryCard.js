import moment from 'moment';
import { React, useState, useEffect } from 'react';
import SkeletonCard from '../skeletons/SkeletonCard';

const SummaryCard = ({ day }) => {

    const [load, setLoad] = useState(false);


    const loader = (e) => {
        setLoad(true);
        console.log(e)
    }

    let day_icon = `${process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]}@2x.png`
    return (
        <div>
            {day &&
                <li className="cards-fade ease-in  p-4 flex items-center justify-center bg-gray-200 rounded-lg my-auto mr-1">
                    <div className="my-auto">
                        <p className="font-bold text-3xl text-pink-600 mb-2">{Math.round(day.main.temp)}&deg;C</p>
                        <p className="text-2xl text-gray-800 tracking-widest">{day.weather[0].main}
                            < img src={load ? day_icon : require('../style/icloud_001.png')} className="w-1/4 inline" onLoad={loader} />

                        </p>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">{day.weather[0].description}</p>
                        <p className="tracking-wider">{moment(day.dt_txt).format("dddd hh:mm")}am</p>
                    </div>
                </li>
            }

            {!day && <SkeletonCard />

            }
        </div>

    );
};

export default SummaryCard;
