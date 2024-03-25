import React from 'react';
import  ListItem  from '../components/ListItem';
import  ListItemForm  from '../components/ListItemForm';

// styles
import styles from '../components/scss/List.module.scss';
import { CartList, CartListItem } from '../types';

// props
interface Props { 
	onSubmitItem: (cartId: number, item: CartListItem) => void,
	onDeleteItem: (cartId: number, listId: number) => void,
	cart: CartList 
}

const List: React.FC<Props> = props => {

	const { onSubmitItem, cart } = props;

	// create new item in cart list
	const handleSubmitItem = (query: string) => {
  
		let oldItemList = cart.items;
		let newItem: CartListItem; 
		let duplicity = false;
	
		oldItemList.map(item => {
		  if(item.title == query){
			duplicity = true;
		  }
		});

		if (!duplicity){
			const id = oldItemList.length == 0 ? 1 : Math.max(...oldItemList.map(item => item.id)) + 1;
			newItem = {id: id, title: query};
			onSubmitItem(cart.id, newItem);		  
		}
	}

	// delete item from list
	const deleteCartListItem = (listId: number) => {
		props.onDeleteItem(cart.id, listId);
	}

	return (
		<div>
			<h2>Položky seznamu</h2>
			<ListItemForm onSubmit={handleSubmitItem}/>
			<ul className={styles.list}>
				{ cart.items.map(item => (
					<ListItem onDelete={deleteCartListItem} key={ item.id } list={ item } />
				)) }
			</ul>
		</div>
	)
}

export default List
