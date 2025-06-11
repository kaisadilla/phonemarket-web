import { Link, useLocation } from 'react-router';
import { useShopContext } from '../context/useShopContext';
import styles from './Header.module.scss';
import { Anchor, Breadcrumbs } from '@mantine/core';

export default function Header() {
  const shopCtx = useShopContext();

  const loc = useLocation();
  const pathnames = loc.pathname.split('/').filter(Boolean);

  return (
    <div className={styles.header}>
      <div className={styles.top}>
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
      <div className={styles.breadcrumbs}>
        <Breadcrumbs>
          {pathnames.map((v, i) => {
            const to = "/" + pathnames.slice(0, i + 1).join("/");

            const displayName = (() => {
              if (v === 'product') return "Home";
              if (i === 1 && pathnames[0] === 'product') return "This phone";
              return v;
            })();

            return (
              <Anchor component={Link} to={to} key={to}>
                {displayName}
              </Anchor>
            )
          })}
        </Breadcrumbs>
      </div>
    </div>
  )
}