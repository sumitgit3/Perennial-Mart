import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import '../assets/styles/rating.css'
const Rating = ({ value, text }) => {
    return (
        <div className='rating'>
             {/* Check if value is greater than or equal to 1 to display a full star ,do this 5 times=>can be done alternatively by storing data in array by calculation and then render*/}
            <span>
                {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            {/*prop to something to write about product */}
            <span className='rating-text'>
                {text && text }
            </span>
        </div>
    )
}

export default Rating
