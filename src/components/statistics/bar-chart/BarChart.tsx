import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers/reducers'

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const products = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (chartRef.current) {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price)

      const top5LeastExpensive = sortedProducts.slice(0, 5)

      const leastExpensiveData = {
        labels: top5LeastExpensive.map((product) => product.name),
        datasets: [
          {
            label: 'Least Expensive',
            data: top5LeastExpensive.map((product) => product.price),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      }

      // Create a chart using leastExpensiveData
      const ctx = chartRef.current?.getContext('2d')

      if (ctx) {
        chartRef.current.width = 400
        chartRef.current.height = 300
        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: leastExpensiveData,
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Product Name'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Product Price'
                }
              }
            },
            plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                },
              },
          },
          
        })

        // Optionally, you can add interactivity or update the chart based on user actions.
        // For simplicity, this example doesn't include dynamic updates.

        return () => {
          // Cleanup on component unmount
          myBarChart.destroy()
        }
      }
    }
  }, [products])

  return <canvas ref={chartRef} />
}

export default BarChart
