
<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data () {
    return {
      chartData: {
        labels: ['1 Sep', '2 Sep', '3 Sep', '4 Sep', '5 Sep', '6 Sep', '7 Sep'],
        datasets: [
          {
            label: '總收入',
            backgroundColor: '#28a745',
            data: [10000, 8500, 12000, 9000, 7500, 8000, 13000],
            fill: false,
            borderColor: '#28a745'
          },
          {
            label: '總成本',
            backgroundColor: '#ae0000',
            data: [2500, 3000, 1200, 1500, 1300, 2000, 1100],
            fill: false,
            borderColor: '#ae0000'
          },
          {
            label: '淨收入',
            backgroundColor: '#17a2b8',
            data: [7500, 5500, 10800, 7500, 6200, 6000, 10900],
            fill: false,
            borderColor: '#17a2b8'
          }
        ]
      },
      options: {
        responsive: 'true',
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    const vm = this
    vm.renderChart(vm.chartData, vm.options)
  }
}
</script>
