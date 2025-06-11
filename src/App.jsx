import { BrowserRouter, Route, Routes } from 'react-router';
import styles from './App.module.scss';
import Header from './components/Header';
import ProductListPage from './pages/ProductList/page';
import ProductPage from './pages/Product/page';
import ScrollToTop from './components/ScrollToTop';
import NotFoundPage from './pages/NotFound/page';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
          <ScrollToTop />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/product" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
