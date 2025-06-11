import { Pagination, Text, TextInput } from '@mantine/core';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import fuzzysort from 'fuzzysort';
import Product from './Product';
import useProductList from '../../hooks/useProductList';

export default function ProductListPage () {
  const ITEMS_PER_PAGE = 8;

  const { data: products, isLoading, error } = useProductList();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [query, setQuery] = useState("");

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (products === undefined) {
      setFilteredProducts([]);
      setPageCount(1);
      setCurrentPage(1);
      return;
    }

    if (query === "") {
      setFilteredProducts(products);
      setPageCount(Math.ceil(products.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
      return;
    }

    const brandResults = fuzzysort.go(query, products, { key: 'brand' }).map(p => p.obj);
    const modelResults = fuzzysort.go(query, products, { key: 'model' }).map(p => p.obj);

    const map = new Map();

    for (const p of brandResults) {
      map.set(p.id, p);
    }
    for (const p of modelResults) {
      map.set(p.id, p);
    }

    const res = Array.from(map.values());

    setFilteredProducts(res);
    setPageCount(Math.max(Math.ceil(res.length / ITEMS_PER_PAGE), 1));
    setCurrentPage(1);
  }, [products, query]);

  return (
    <div className={styles.productListPage}>
      <div className={styles.listHeader}>
        <TextInput
          classNames={{
            root: styles.queryInput,
            wrapper: styles.wrapper,
          }}
          value={query}
          onChange={evt => setQuery(evt.currentTarget.value)}
          placeholder='Filter items'
        />
      </div>
      <div className={styles.productContainer}>
        {
          getItemsInPage(currentPage)
            .map(p => <Product key={p.id} product={p} query={query} />)
        }
                
        {false && products.map(p => <div key={p.id}>{p.model}</div>)}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          total={pageCount}
          value={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );

  function getItemsInPage (page) {
    return filteredProducts
      .slice(
        (page - 1) * ITEMS_PER_PAGE,
        Math.min((page * ITEMS_PER_PAGE), filteredProducts.length)
      );
  }
}
