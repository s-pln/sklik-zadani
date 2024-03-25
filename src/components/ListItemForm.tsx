import React, { useRef, useState, FormEvent } from 'react'

interface Props {
    onSubmit: (
        query: string, 
    ) => void
}

const ListItemForm: React.FC<Props> = props => {

    const newItemInput = useRef<HTMLInputElement>(null);
    const [enteredText, setEnteredText] = useState(''); 

    // submit form
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let newItemName = newItemInput.current?.value;
        if (newItemName) props.onSubmit(newItemName);
        setEnteredText('')
	}

	return (
		<form action="" onSubmit={handleSubmit} >
            <input type="text" value={enteredText} ref={ newItemInput } onChange={(e) => setEnteredText(e.target.value)}   />
            <input type="submit" value="Přidat" />
        </form>
	)
}



export default ListItemForm
