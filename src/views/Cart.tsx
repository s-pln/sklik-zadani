import React from 'react'
import { Link } from 'react-router-dom'
import  CartItem  from '../components/CartItem'

// styles
import styles from '../components/scss/Cart.module.scss'

// types
import { CartList } from '../types'

// props
interface Props {
	onDeleteCartItem: (cartId: number) => void,
	lists: CartList[]
}

const Cart: React.FC<Props> = props => {
	const { lists } = props;

	// delete cart
	const handleDeleteCartItem = (cartId: number) => {
		props.onDeleteCartItem(cartId);
	}
	return (
		<div>
			<Link className={ styles.newListButton } to='/novy-seznam'>Vytvořit</Link>
			<ul>
				{ lists.map(list => (
					<CartItem onDelete={handleDeleteCartItem} key={ list.id } list={ list } />
				)) }
			</ul>
		</div>
	)
}



export default Cart
