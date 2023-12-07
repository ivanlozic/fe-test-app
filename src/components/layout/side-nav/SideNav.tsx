import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideNav.module.css';

const SideNav: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.sideNav}>
        <ul>
          <li className={styles.products}>
            <Link to='/products' className={styles.linkButton}>
              Products
            </Link>
          </li>
          <li className={styles.about}>
            <Link to='/about' className={styles.linkButton}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
