import React from 'react'
import { NavLink  } from 'react-router-dom'
import useBreadcrumbs from "use-react-router-breadcrumbs";

// styles
import styles from './scss/TheNavigation.module.scss'
import { CartList } from '../types';

interface Props {lists: CartList[]}

const TheNavigation: React.FC<Props> = props => {
	const { lists } = props;

	// list detail page
	const listRoutes = lists.map((list) => (
			{ path: "/" + list.uri, breadcrumb: 'Položky seznamu "' + list.title + '"' }
		));
	// list - edit form
	const listRoutesEdit = lists.map((list) => (
			{ path: "/edit-" + list.uri, breadcrumb: 'Úprava "' + list.title + '"' }
		));
	const defaultRoutes = [
			{ path: "/", breadcrumb: "Nákupní seznamy" },  // homepage - all lists
			{ path: "/novy-seznam", breadcrumb: "Vytvoření nového seznamu" }  // create new list form
		];

	const routes = [...listRoutes, ...listRoutesEdit, ...defaultRoutes ];
	
	const Breadcrumbs = () => {
		const breadcrumbs = useBreadcrumbs(routes);
		return (
			<React.Fragment>
			{breadcrumbs.map(({ match, breadcrumb }) => (
				<NavLink key={match.pathname} to={match.pathname}>
					{ breadcrumb }
				</NavLink>
			))}
			</React.Fragment>
		);
	};

	return (
		<nav className={styles.navigation}>
			{ Breadcrumbs() }
		</nav>
	)
}

export default TheNavigation
