import React from 'react';
import { Box } from '@mui/material';
import { ServiceItemComponentProps } from './my-services.types';
import noImage from '../../assets/no-image.png';
import './service-item.styles.scss';
import { Rating } from 'react-simple-star-rating'

const ServiceItemComponent: React.FC<ServiceItemComponentProps> = ({ ...props }) => {
    const { serviceItem } = props;
    const rating = 3.5;
    return (
        <Box sx={{
            width: '1200px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            <div className="service-item-container">
                <div className="upper-container">
                    <div className="image-container">
                        {
                            serviceItem && serviceItem.picture ?
                                <img src={serviceItem.picture} />
                                :
                                <img src={noImage} />
                        }
                    </div>
                    <div className="info-container">
                        <div className="first-row">
                            <h4>{serviceItem.name}</h4>
                            <div>{`Publish date: ${serviceItem.publishDate}`}</div>
                        </div>
                        <p>{`Category: ${serviceItem.category}`}</p>
                        <Rating initialValue={serviceItem.rating} ratingValue={0} readonly={true} />
                        <p>{`Duration: ${serviceItem.duration}`}</p>
                        <p>{`Price: ${serviceItem.price}$`}</p>
                    </div>
                </div>
                <div className="lower-container">
                    {serviceItem.description}
                </div>
                <div className="button-container">
                    <button className='submit-button'>
                        See more
                    </button>
                </div>
            </div>

        </Box>
    );
};

export default ServiceItemComponent;