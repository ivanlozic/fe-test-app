import { Chart, ChartConfiguration } from 'chart.js';
import 'chart.js/auto';
import { DoughnutController, CategoryScale } from 'chart.js';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/reducers';

function PieChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<'pie'> | null>(null);


  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {

    Chart.register(DoughnutController, CategoryScale);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current?.getContext('2d');

    if (myChartRef) {
      const manufacturers = Array.from(new Set(products.map((product) => product.manufacturer.name)));
      const data = manufacturers.map((manufacturer) => {
        const productsFromManufacturer = products.filter((product) => product.manufacturer.name === manufacturer);
        return productsFromManufacturer.length;
      });

      const chartOptions: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: manufacturers,
          datasets: [
            {
              data: data,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
            
              ],
            },
          ],
        },
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          }, maintainAspectRatio: false, 
          aspectRatio: 1, 
        },
      };

      chartInstance.current = new Chart(myChartRef, chartOptions);
    }
  }, [products]); 

  return (
    <div>
  <canvas ref={chartRef} width={300} height={300} />

    </div>
  );
}

export default PieChart;
