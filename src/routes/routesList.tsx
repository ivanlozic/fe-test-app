import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/home-page/HomePage'
import About from '../components/about/About'
import Products from '../components/products/Products'
import { ROUTES } from '../constants/constants'
import PageNotFound from '../pages/404/PageNotFound'
import EditProductPage from '../pages/edit-product-page/EditProductPage'
import CreateProductPage from '../pages/create-product-page/CreateProductPage'
import Statistics from '../components/statistics/Statitstics'

const routesList = (
  <Routes>
    <Route path={ROUTES.ROOT} element={<HomePage />}>
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.PRODUCTS} element={<Products />} />
      <Route path={ROUTES.STATS} element={<Statistics />} />
    </Route>

  
    <Route path={ROUTES.EDIT_PRODUCT} element={<EditProductPage />} />
    <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProductPage />} />
    <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
  </Routes>
)
export default routesList
