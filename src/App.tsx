import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { HomePage } from './components/RulesPage';
import { ShopPage } from './components/List/ShopPage';
import { AddGoods } from './components/addGoods';
import { Zaglushka } from './components/zaglushka';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { actions } from './features/goods';

function App () {
  const admin = useAppSelector(state => state.user || '');
  const data = useAppSelector(state => state.goods || []);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(data.length === 0) {
      fetch('https://dummyjson.com/products?limit=100&select=id,title,description,price,images,rating,stock,category')
        .then(res => res.json())
        .then(good => {
          dispatch(actions.setGoods(good.products));
        }
        )
        .catch();
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="Home" element={<HomePage />} />
        <Route path="Shop" element={admin === 'admin'? <ShopPage /> : <Zaglushka />} />
        <Route path="AddGoods" element={admin === 'admin'? <AddGoods /> : <Zaglushka />} />

        <Route path="*" element={
          <p>Page not found</p>
        } />
      </Routes>
    </div>
  );
}

export default App;
