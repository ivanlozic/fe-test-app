import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/home-page/HomePage'
import About from '../components/about/About'
import Products from '../components/products/Products'
import { ROUTES } from '../constants/constants'
import PageNotFound from '../pages/404/PageNotFound'

const routesList = (
  <Routes>
    <Route path={ROUTES.ROOT} element={<HomePage />}>
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.PRODUCTS} element={<Products />} />
    </Route>

    <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
  </Routes>
)
export default routesList
