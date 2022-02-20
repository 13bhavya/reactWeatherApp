import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonLarge = ({ shades }) => {

    const shade = `grid grid-rows-2 lg:mt-20 mt-15 skeleton-wrapper ${shades}`
    return (
        <div className={shade}>
            <div className='grid grid-cols-2 mt-5'>
                <SkeletonElement type="largeavatar" />
                <div>
                    <SkeletonElement type="largetext" />
                    <SkeletonElement type="largetext" />
                    <SkeletonElement type="largetext" />
                </div>
            </div>
            <div className='grid grid-cols-2 mt-15'>
                <div>
                    <SkeletonElement type="largetitle" />
                    <SkeletonElement type="largetitle" />
                </div>
                <div>
                    <SkeletonElement type="largetitle" />
                    <SkeletonElement type="largetitle" />
                </div>
            </div>
            <Shimmer />
        </div>

    );
};

export default SkeletonLarge;
