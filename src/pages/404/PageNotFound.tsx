import styles from './PageNotFound.module.css'
import { Link } from 'react-router-dom'

const PageNotFound = (): JSX.Element => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">
        <p>Back</p>
      </Link>
    </div>
  )
}

export default PageNotFound
