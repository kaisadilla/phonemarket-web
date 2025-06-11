import { Text } from '@mantine/core';
import styles from './Product.module.scss';
import { Link } from 'react-router';
import fuzzysort from 'fuzzysort';

export default function Product ({
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
    <Link
      className={styles.product}
      to={`/product/${product.id}`}
    >
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
    </Link>
  )
}