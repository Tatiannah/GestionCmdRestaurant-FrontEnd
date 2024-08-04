<template>
  <div>
    <canvas style="width: 450px;height: 275px;" :id="canvasId"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    labelsField: {
      type: String,
      required: true
    },
    valuesField: {
      type: String,
      required: true
    },
    canvasId: {
      type: String,
      default: 'chartCanvas'
    },
    chartType: {
      type: String,
      default: 'bar'
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    data: {
      handler() {
        this.destroyChart();
        this.renderChart();
      },
      deep: true
    }
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById(this.canvasId).getContext('2d');
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: {
          labels: this.data.map(item => item[this.labelsField]),
          datasets: [{
            label: 'Bénéfice Journalière',
            data: this.data.map(item => item[this.valuesField]),
            backgroundColor: 'yellowgreen',
            borderColor: 'black',
            borderWidth: 1,
            
          }]
        },
        options: {
            ...this.chartOption
        }
      });

      this.chart.data.datasets[0].backgroundColor = [
        'rgba(255, 99, 132, 0.5)', // Rouge pour les commandes traitées
        'rgba(54, 162, 235, 0.5)', // Bleu pour les commandes annulées
      ];
    this.chart.update(); 
    },
    destroyChart() {
      if (this.chart) {
        this.chart.destroy();
      }
    }
  },
  beforeDestroy() {
    this.destroyChart();
  }
};
</script>

<style scoped>

</style>
