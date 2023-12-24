import React, { useEffect} from 'react'
import SideNav from '../../components/layout/side-nav/SideNav'
import MainContent from '../../components/layout/main-content/MainContent'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/constants'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const currentRoute = location.pathname
    localStorage.setItem('currentRoute', currentRoute)
  }, [location.pathname])

  useEffect(() => {
    const storedRoute = localStorage.getItem('currentRoute') || ROUTES.PRODUCTS
    navigate(storedRoute)
  }, [navigate])

  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  )
}

export default HomePage
