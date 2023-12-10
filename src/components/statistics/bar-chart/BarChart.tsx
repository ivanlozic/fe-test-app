import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers/reducers'

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const products = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')

      if (ctx) {
        chartRef.current.width = 800
        chartRef.current.height = 300

        const sortedProducts = [...products].sort((a, b) => a.price - b.price)

        const top5LeastExpensive = sortedProducts.slice(0, 5)
        const top5MostExpensive = sortedProducts.slice(-5)

        const labels = [...top5LeastExpensive, ...top5MostExpensive].map(
          (product) => product.name,
        )
        const data = [...top5LeastExpensive, ...top5MostExpensive].map(
          (product) => product.price,
        )

        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Product Prices',
                data,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Product',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Product Price',
                },
              },
            },
            plugins: {
              legend: {
                display: false,
                position: 'bottom',
              },
            },
          },
        })

        return () => {
          myBarChart.destroy()
        }
      }
    }
  }, [products])

  return (
    <div>
      <div id="legendContainer"></div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default BarChart
