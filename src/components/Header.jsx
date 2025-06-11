import { Link } from 'react-router';
import { useShopContext } from '../context/useShopContext';
import styles from './Header.module.scss';

export default function Header() {
  const shopCtx = useShopContext();

  return (
    <div className={styles.header}>
      <Link className={styles.logo} to="/">
        PhoneMarket
      </Link>
      <div className={styles.cartContainer}>
        <span className="material-symbols-sharp">shopping_cart</span>
        <div className={styles.label}>Cart</div>
        {shopCtx.cartItems !== 0 && <div className={styles.items}>
          {shopCtx.cartItems}
        </div>}
      </div>
    </div>
  )
}