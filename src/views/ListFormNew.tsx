import React, { useRef, FormEvent } from 'react'

interface Props {
    onSubmit: (query: string) => void
}

const ListFormNew: React.FC<Props> = props => {

    const newCartInput = useRef<HTMLInputElement>(null);

    // submit form
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let newCartName = newCartInput.current?.value;
        if (newCartName) props.onSubmit(newCartName);
	}

	return (
		<form onSubmit={handleSubmit}>
            <h2>Vytvoření nového seznamu</h2>
            <input placeholder="Název" type="text" ref={ newCartInput } />
            <input type="submit" value="Vytvořit" />
        </form>
	)
}

export default ListFormNew
