import { BrowserRouter, Route, Routes } from 'react-router';
import styles from './App.module.scss';
import Header from './components/Header';
import ProductListPage from './pages/ProductList/page';
import ProductPage from './pages/Product/page';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
          <ScrollToTop />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
