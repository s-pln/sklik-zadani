import React, { useRef, FormEvent, useState } from 'react';
import { CartList } from '../types';

// props
interface Props { 
    onDeleteCartItem: (cartId: number) => void,
    onEdit: (cartId: number, query: string) => void,
    cart: CartList 
}

const ListFormEdit: React.FC<Props> = props => {
    const { cart } = props;

    const editCartInput = useRef<HTMLInputElement>(null);
    const [enteredText, setEnteredText] = useState(cart.title); 

    // submit form
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let newCartName = editCartInput.current?.value;
        if (newCartName) props.onEdit(cart.id, newCartName);
	}

    // delete list
    const deleteCartItem = () => {
        if(window.confirm('Opravdu smazat "' + cart.title + '"?')) {
            props.onDeleteCartItem(cart.id);
        }
	}

	return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Úprava seznamu</h2>
                <input 
                    placeholder='Název'
                    type="text" 
                    value={enteredText} 
                    onChange={(e) => setEnteredText(e.target.value)}  
                    ref={ editCartInput } 
                />
                <input type="submit" value="Upravit" />
                
            </form>
            <button className="deleteButton" onClick={deleteCartItem}>Smazat</button>
        </div>
		
	)
}

export default ListFormEdit
