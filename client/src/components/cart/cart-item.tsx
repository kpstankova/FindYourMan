import React from 'react';
import { CartItemProps } from './cart-page.types';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import './cart.styles.scss'
import { IRemoveFromCart, TCartReducerActions } from '../../redux/cart/cart.actions';
import { CartActionTypes } from '../../redux/cart/cart.types';
import { Dispatch } from "redux";
import { connect } from 'react-redux';

const CartItem: React.FC<CartItemProps> = ({ ...props }) => {

    const { cartItem, removeItemFromCart } = props;

    const handleDelete = () => {
        removeItemFromCart(cartItem.service_id);
    }

    return (
        <div className="cart-container">
            <div>{`${cartItem.name}`}</div>
            <div>{`Duration: ${cartItem.duration}`}</div>
            <div>{`Price: ${cartItem.price}$`}</div>
            <IconButton type="reset" onClick={handleDelete}
                sx={{ p: '10px' }} aria-label="reset" size="large">
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<TCartReducerActions>) => {
    return {
        removeItemFromCart: (data: number) => dispatch<IRemoveFromCart>({ type: CartActionTypes.REMOVE_FROM_CART, data: data})
    }
}


export default connect(null, mapDispatchToProps)(CartItem);