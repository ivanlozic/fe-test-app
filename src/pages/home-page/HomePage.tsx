import React, { useEffect, useState } from 'react'
import SideNav from '../../components/layout/side-nav/SideNav'
import MainContent from '../../components/layout/main-content/MainContent'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/constants'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    if (initialRender) {
      navigate(ROUTES.PRODUCTS)
      setInitialRender(false)
    }
  }, [navigate, initialRender])
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
