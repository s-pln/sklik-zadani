import React, { useState } from 'react';
import './App.scss';
import { Route, Routes, useNavigate  } from 'react-router-dom';
import { CartList, CartListItem } from './types';

// components
import TheNavigation from './components/TheNavigation';
import Cart  from './views/Cart';
import List  from './views/List';
import ListFormNew  from './views/ListFormNew';
import ListFormEdit  from './views/ListFormEdit';
import carts from './carts.json';

function App() {

  const navigate = useNavigate();
  let [cartLists, setCartList] = useState(
    carts.cart
      .map((list: CartList) => extractData(list))
  );

  // create new list
  const handleSubmit = (query: string) => {
  
    let oldCartLists = cartLists;
    let newCartList: CartList; 
    let duplicity = false;

    oldCartLists.map(item => {
      if(item.title == query){
        duplicity = true;
      }
    });
    if (!duplicity){
      const uri = slug(query);
      newCartList = extractData({id: Math.max(...oldCartLists.map(item => item.id)) + 1, title: query, uri: uri, items: []});
      const newCartLists = [ ...oldCartLists, ...[newCartList]];
      setCartList(newCartLists);
      navigate(uri);
    }
  }

  // create new item in list
  const handleSubmitItem = (cartId: number, newItem: CartListItem) => { 
		const oldCartLists = [ ...cartLists ];
		const newCartLists = oldCartLists.map((list) => {
        if(list.id == cartId){
          const newItems = [ ...list.items, ...[newItem]];
          console.log(newItems);
          return list = extractData({ id: list.id, title: list.title, uri: list.uri, items: newItems });
        }
        else
        {
          return list = extractData({ id: list.id, title: list.title, uri: list.uri, items: list.items });
        }
		});
    setCartList(newCartLists);
		
	}

  // delete list from cart
  const handleDeleteCartItem = (cartId: number) => {
    const oldCartLists = [ ...cartLists ];
		const newCartLists = oldCartLists.filter((list => list.id != cartId));
    console.log(newCartLists);
    
    setCartList(newCartLists); 
    navigate("/");
  }

  // delete item from list
  const handleDeleteItem = (cartId: number, listId: number) => {
    const oldCartLists = [ ...cartLists ];
    const newCartLists = oldCartLists.map((list) => {
      if(list.id == cartId){
        const newItems = list.items.filter((list => list.id != listId));
        return list = extractData({ id: list.id, title: list.title, uri: list.uri, items: newItems });
      }
      else
      {
        return list;
      }
    });
    console.log(newCartLists);
    
    setCartList(newCartLists); 
  }

  // edit list
  const handleEdit = (cartId: number, query: string) => {
  
		const oldCartLists = [ ...cartLists ];
    const newUri = slug(query);
    
		const newCartLists = oldCartLists.map((list) => {
      if(list.id == cartId){
        return list = extractData({ id: list.id, title: query, uri: newUri, items: list.items });
      }
      else
      {
        return list;
      }
		});
    setCartList(newCartLists);
    navigate("edit-" + newUri);
		
	}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Můj košík</h1>
        <TheNavigation lists={cartLists} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Cart onDeleteCartItem={handleDeleteCartItem} lists={cartLists} />} />
          <Route path="/novy-seznam" element={<ListFormNew onSubmit={handleSubmit} />}/>
          { cartLists.map(cartList => (
              <Route 
                key={ cartList.id } 
                path={ "/" + cartList.uri} 
                element={<List onDeleteItem={handleDeleteItem} onSubmitItem={handleSubmitItem} cart={ cartList } />}
              />
          )) }
          { cartLists.map(cartList => (
              <Route 
                key={ cartList.id }
                path={ "/edit-" + cartList.uri }
                element={<ListFormEdit onDeleteCartItem={handleDeleteCartItem} onEdit={handleEdit} cart={ cartList } />}
              />
          )) }
        </Routes>
      </main>
    </div>
  );
}

function slug (title: string, seperator = '-') {
  const slug = title.toString()
  .normalize('NFD')                   // split an accented letter in the base letter and the acent
  .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
  .replace(/\s+/g, seperator);
  return slug == 'novy-seznam' ? 'seznam-' + slug : slug;
}

const extractData = ({
  id: id,
  title: title,
  uri: uri,
  items: itemsList
}: CartList) => {
    const items = itemsList
      .filter((list: CartListItem) => list)
      .map((list: CartListItem) => extractDataItems(list));
    return { id, title, uri, items } as CartList; 
}

const extractDataItems = ({
  id: id,
  title: title
}: CartListItem) => {
  return { id, title } as CartListItem
}

export default App;