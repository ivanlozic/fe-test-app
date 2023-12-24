import React from 'react'
import PieChart from './pie-chart/PieChart'
import BarChart from './bar-chart/BarChart'

const StatisticsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Statistics</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ margin: '50px' }}>
          <BarChart />
        </div>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage
