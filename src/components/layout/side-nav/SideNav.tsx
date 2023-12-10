import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SideNav.module.css'
import { ROUTES } from '../../../constants/constants'

const SideNav: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.sideNav}>
        <ul>
          <li className={styles.products}>
            <Link to={ROUTES.PRODUCTS} className={styles.linkButton}>
              Products
            </Link>
          </li>
          <li className={styles.about}>
            <Link to={ROUTES.ABOUT} className={styles.linkButton}>
              About
            </Link>
          </li>
          <li className={styles.about}>
            <Link to={ROUTES.STATS} className={styles.linkButton}>
              Stats
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNav
