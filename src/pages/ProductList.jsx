import { Pagination, Text, TextInput } from '@mantine/core';
import styles from './ProductList.module.scss';
import { useEffect, useState } from 'react';
import fuzzysort from 'fuzzysort';

export default function ProductList() {
  const ITEMS_PER_PAGE = 8;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [query, setQuery] = useState("");

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    (async () => {
      console.log("Loading products.");

      try {
        const res = await fetch("https://itx-frontend-test.onrender.com/api/product");
        if (!res.ok) {
          throw new Error("Request error. Status: " + res.status);
        }

        const prods = await res.json();
        setProducts(prods.filter(p => p.price));
      }
      catch (err) {
        console.error("Failed to load products.", err);
        setError(err.message || "Unknown error");
      }
      finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
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
    <div className={styles.productList}>
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
          filteredProducts
            .slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              Math.min((currentPage * ITEMS_PER_PAGE), filteredProducts.length - 1)
            )
            .map(p => <_Product key={p.id} product={p} query={query} />)
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
        (currentPage - 1) * ITEMS_PER_PAGE,
        Math.min((currentPage * ITEMS_PER_PAGE), filteredProducts.length - 1)
      );
  }
}

function _Product ({
  product,
  query,
}) {
  const brand = (() => {
    if (query === "") {
      return <span>{product.brand}</span>
    }
    else {
      const res = fuzzysort.single(query, product.brand);
      return res?.highlight((m, i) => <strong>{m}</strong>) ?? product.brand;
    }
  })();

  const model = (() => {
    if (query === "") {
      return <span>{product.model}</span>
    }
    else {
      const res = fuzzysort.single(query, product.model);
      return res?.highlight((m, i) => <strong>{m}</strong>) ?? product.model;
    }
  })();

  return (
    <div className={styles.product}>
      {false && <svg height="100%" width="100%">
        <rect
          className={styles.line}
          height="100%"
          width="100%"
          stroke-linejoin="round"
        />
      </svg>}
      <div className={styles.image}>
        <img
          src={product.imgUrl}
          alt=""
        />
      </div>
      <div className={styles.info}>
        <div className={styles.naming}>
          <div className={styles.brand}>
            {brand}
          </div>
          <Text className={styles.name} lineClamp={2}>
            {model}
          </Text>
        </div>
        <div className={styles.price}>
          {product.price}€
        </div>
      </div>
    </div>
  )
}