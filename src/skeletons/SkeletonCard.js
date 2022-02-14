import React from 'react';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';
import './Skeleton.css'

const SkeletonCard = ({ shades }) => {

    const shade = `skeleton-wrapper ${shades}`

    return (
        <div className={shade}>
            <div className='cards-fade skeleton-article'>
                <SkeletonElement type="avatar" />
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonCard;
