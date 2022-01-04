import { Box } from '@mui/material';
import React from 'react';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { StoreState } from '../../redux/root-reducer';
import { ServiceItem } from '../services-page/my-services.types';
import { CartPageProps } from './cart-page.types';
import { connect } from 'react-redux';
import CartItem from './cart-item';
import './cart.styles.scss'
import StripeCheckoutButton from './cart-payment-button.component';

const CartPageComponent: React.FC<CartPageProps> = ({ ...props }) => {
    const { itemsInCart } = props;

    return (
        <Box sx={{
            width: '70%',
            height: '550px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 3px 6px #5fa6ff',
            opacity: 1,
            marginLeft: '15%',
            marginTop: '5%'
        }}>
            <h1 className='title'>Cart</h1>
            {
                itemsInCart.length > 0 ?
                    itemsInCart.map((item) => {
                        return <CartItem cartItem={item} />
                    })
                    :
                    <div>Cart is empty!</div>
            }
            {
                itemsInCart.length > 0 ?
                    <div className="button-container">
                        <StripeCheckoutButton/>
                    </div> : null
            }

        </Box>
    )
};

const mapStateToProps = (state: StoreState): { itemsInCart: ServiceItem[] } => {
    return {
        itemsInCart: selectCartItems(state),
    }
}

export default connect(mapStateToProps, null)(CartPageComponent);