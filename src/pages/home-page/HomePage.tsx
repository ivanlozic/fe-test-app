import React from 'react'
import SideNav from '../../components/layout/side-nav/SideNav'
import MainContent from '../../components/layout/main-content/MainContent'
import { Outlet } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideNav />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  )
}

export default HomePage
