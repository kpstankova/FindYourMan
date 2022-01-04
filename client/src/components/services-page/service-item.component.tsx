import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ServiceItem, ServiceItemComponentProps } from './my-services.types';
import noImage from '../../assets/no-image.png';
import './service-item.styles.scss';
import { Rating } from 'react-simple-star-rating'
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from 'react-redux';
import { ISetServiceDetails, TServiceDetailsReducerAction } from '../../redux/service-details/service-details.actions';
import { ServiceDetailsActionTypes } from '../../redux/service-details/service-details.types';
import { IAddToCart, TCartReducerActions } from '../../redux/cart/cart.actions';
import { CartActionTypes } from '../../redux/cart/cart.types';
import axios from 'axios';
import { StoreState } from '../../redux/root-reducer';
import { User } from '../../redux/user/user.types';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const ServiceItemComponent: React.FC<ServiceItemComponentProps> = ({ ...props }) => {
    const {currentUser, isInDetails, serviceItem, setServiceDetailsState, redirectToServiceDetails, addToCartAction } = props;

    const [serviceImageUrl, setServiceImageUrl] = useState<string>('');
    const token = localStorage.getItem('accessToken');

    const handleClick = () => {
        setServiceDetailsState(serviceItem);
        let path = serviceItem.service_id.toString() + '/category/' + serviceItem.category;
        redirectToServiceDetails(path);
    }

    const getImage = () => {
        return axios
            .get(`http://localhost:3001/files/getServicePic/${currentUser!.id}`, {
                'headers': { 
                    Authorization: 'Bearer ' + token 
                }
            })
            .then((response: any) => {
                setServiceImageUrl(response.data)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getImage();
    }, [])

    const handleAddToCart = () => {
        addToCartAction(serviceItem);
    }

    return (
        <Box sx={{
            width: '1700px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            <div className="service-item-container">
                <div className="upper-container">
                    <div className="image-container">
                        {
                            serviceItem && serviceImageUrl ?
                                <img src={serviceImageUrl} />
                                :
                                <img src={noImage} />
                        }
                    </div>
                    <div className="info-container">
                        <div className="first-row">
                            <h4>{serviceItem.name}</h4>
                            <div>{`Publish date: ${serviceItem.publish_date.slice(0, 10)}`}</div>
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
                {
                    !isInDetails ?
                        <div className="button-container">
                            <button className='submit-button' onClick={handleClick}>
                                See more
                            </button>
                        </div>
                        :
                        <div className="button-container">
                            <button className='submit-button' onClick={handleAddToCart}>
                                Add to cart
                            </button>
                        </div>
                }

            </div>

        </Box>
    );
};

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        currentUser: selectCurrentUser(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction | TServiceDetailsReducerAction | TCartReducerActions>) => {
    return {
        redirectToServiceDetails: (path: string) => dispatch(push('/service/' + path)),
        setServiceDetailsState: (item: ServiceItem) => dispatch<ISetServiceDetails>({ type: ServiceDetailsActionTypes.SET_SERVICE_STATE, data: item }),
        addToCartAction: (data: ServiceItem) => dispatch<IAddToCart>({ type: CartActionTypes.ADD_TO_CART, data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItemComponent);