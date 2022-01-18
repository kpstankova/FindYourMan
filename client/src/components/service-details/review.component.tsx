import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { SingleReviewProps } from './service-details.types';
import './review.styles.scss';
import axios from 'axios';

const ReviewComponent: React.FC<SingleReviewProps> = ({ ...props }) => {

    const { review } = props;
    const [userName, setUserName] = useState<string>('');
    const token = localStorage.getItem('accessToken');

    const getUserById = () => {
        return axios
            .get(`http://localhost:3001/auth/${review.user_id}`, {
                'headers': { 
                    Authorization: 'Bearer ' + token 
                }
            })
            .then((response: any) => {
                setUserName(response.data.name)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getUserById();
    }, []);
    
    return (
        <Box sx={{
            width: '1300px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            <div className="review-container">
                <div>{`${userName}: ${review.comment}`}</div>
                <div>{`Publish date: ${review.publish_date.slice(0, 10)}`}</div>
                <Rating ratingValue={review.rating} readonly={true} />
            </div>
        </Box>
    )
};

export default ReviewComponent;