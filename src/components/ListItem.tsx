import React from 'react'
import { Link } from 'react-router-dom'

// styles
import styles from './scss/ListItem.module.scss'
import { CartListItem } from '../types'

interface Props {
    onDelete: (listId: number) => void,
    list: CartListItem
}

const ListItem: React.FC<Props> = props => {
    const { list } = props;

    // delete item from list
    const deleteListItem = () => {
        if(window.confirm('Opravdu smazat "' + list.title + '"?')) {
            props.onDelete(list.id);
        }
    }

	return (
		<li>
            <a className={styles.ctrl} onClick={deleteListItem}>x</a>
            { list.title }
        </li>
	)
}

export default ListItem