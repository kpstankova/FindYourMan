
import axios from 'axios';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selectors';
import { StoreState } from '../../redux/root-reducer';
import { StripeCheckoutButtonProps } from './cart-page.types';
import { connect } from 'react-redux';
import logoImage from '../../assets/logo.png'
import { headers } from '../register/register-modal.types';
import { IClearCart, TCartReducerActions } from '../../redux/cart/cart.actions';
import { CartActionTypes } from '../../redux/cart/cart.types';
import { Dispatch } from "redux";
import { ServiceItem } from '../services-page/my-services.types';

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ ...props }) => {
    const { clearCart, totalPrice, cartItems } = props;
    const priceForStripe = totalPrice! * 100;
    const publishableKey = 'pk_test_51KBJB8DoDutteg47DzIdkk3hXHfVwi4PWwH0UpUerPybqWdPHhwJLWey158l2lzl5dphqifPTnx4sFxD4ZBINUvS00gIUWVHZV';
    const authToken = localStorage.getItem('accessToken');

    const onToken = (token: any) => {
        return axios
            .post(`http://localhost:3001/payment/`, {
                // token: token.id,
                sessionId: token.id, 
                services: cartItems
            }, { headers: { Authorization: 'Bearer ' + authToken } }
            )
            .then((response: any) => {
                alert("Payment was successfull!");
                clearCart();
                return response.data;
            })
            .catch((error: any) => {
                alert("Error");
                // clearCart();
                console.log(error)
            })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Find your man'
            billingAddress
            shippingAddress
            image={logoImage}
            description={`Your total is $${totalPrice}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

const mapStateToProps = (state: StoreState): { totalPrice: number, cartItems: ServiceItem[] } => {
    return {
        totalPrice: selectTotalPrice(state),
        cartItems: selectCartItems(state)
    }
};

const mapDispatchToProps = (dispatch: Dispatch< TCartReducerActions>) => {
    return {
        clearCart: () => dispatch<IClearCart>({ type: CartActionTypes.CLEAR_CART})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton);