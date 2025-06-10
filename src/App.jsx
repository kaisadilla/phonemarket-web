import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter, Route, Routes } from 'react-router';
import styles from './App.module.scss';
import Header from './components/Header';
import ProductList from './pages/ProductList';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <BrowserRouter>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={"Kek"} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
