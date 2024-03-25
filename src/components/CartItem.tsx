import React from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './scss/CartItem.module.scss'
import { CartList } from '../types'

interface Props {
    onDelete: (cartId: number) => void,
    list: CartList
}

const CartItem: React.FC<Props> = props => {
    const { list } = props

    // delete list from cart
    const deleteCartItem = () => {
        if(window.confirm('Opravdu smazat "' + list.title + '"?')) {
            props.onDelete(list.id);
        }
    }

	return (
		<li className={styles.cartItem}>
            <Link className={ styles.cartLink } to={ '/' + list.uri }>{ list.title }</Link>
            <Link className={ styles.ctrlEdit } to={ '/edit-' + list.uri }>Upravit</Link>
            <button className={ styles.ctrl } onClick={deleteCartItem}>Smazat</button>
        </li>
	)
}

export default CartItem
