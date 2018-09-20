<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    })
  }
}
</script>
