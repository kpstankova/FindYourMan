import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StoreState } from '../../redux/root-reducer';
import { selectServiceItem } from '../../redux/service-details/service-details.selectors';
import { headers } from '../register/register-modal.types';
import { ServiceItem } from '../services-page/my-services.types';
import ReviewComponent from './review.component';
import { Review, ReviewsProps } from './service-details.types';
import { connect } from 'react-redux';

const ReviewsComponent: React.FC<ReviewsProps> = ({ ...props }) => {

    const { serviceItem } = props;

    const [reviews, setReviews] = useState<Review[]>([])

    const getAllReviews = () => {
        return axios
            .post(`http://localhost:3001/service/allReviews`, {
                service_id: serviceItem!.service_id
            }, { headers: headers })
            .then((response: any) => {
                console.log(response.data);
                setReviews(response.data);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getAllReviews();
    }, []);

    return (
        <Box sx={{
            width: '1500px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            {
                reviews.length > 0 ?
                    reviews.map((review) => {
                        return <ReviewComponent review={review} />
                    }) :
                    <div>{"No reviews yet!"}</div>
            }
        </Box>
    );
};

const mapStateToProps = (state: StoreState): { serviceItem: ServiceItem | null } => {
    return {
        serviceItem: selectServiceItem(state)
    }
}

export default connect(mapStateToProps, null)(ReviewsComponent);