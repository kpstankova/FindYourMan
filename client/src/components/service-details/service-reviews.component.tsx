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

    const { serviceItem, reviews } = props;

    return (
        <Box sx={{
            width: '1700px',
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