import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IProduct } from '../../constants/interfaces';
import PieChart from './pie-chart/PieChart';
import BarChart from './bar-chart/BarChart';

const StatisticsPage: React.FC = () => {
  const products = useSelector((state: { products: IProduct[] }) => state.products);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Statistics</h2>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ margin: '50px' }}>
          <BarChart />
        </div>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;