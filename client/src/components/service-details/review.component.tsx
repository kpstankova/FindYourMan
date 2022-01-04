import { Box } from '@mui/material';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { SingleReviewProps } from './service-details.types';
import './review.styles.scss';

const ReviewComponent: React.FC<SingleReviewProps> = ({ ...props }) => {

    const { review } = props;

    return (
        <Box sx={{
            width: '1300px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            <div className="review-container">
                <div>{`${review.user_id}: ${review.comment}`}</div>
                <div>{`Publish date: ${review.publish_date.slice(0, 10)}`}</div>
                <Rating initialValue={review.rating} ratingValue={0} readonly={true} />
            </div>
        </Box>
    )
};

export default ReviewComponent;