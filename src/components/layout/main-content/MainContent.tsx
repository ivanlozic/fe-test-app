import React from 'react'

interface MainContentProps {
  children: React.ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <div style={{ flex: '1', padding: '20px' }}>{children}</div>
}

export default MainContent
