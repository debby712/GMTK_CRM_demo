<template>
  <div class="doughnut_container">
    <vue-apex-charts type="donut" :options="chartOptions" :series="series" />
  </div>
</template>
<style scoped>
.doughnut_container {
  pointer-events: none;
}
</style>
<script>
import VueApexCharts from "vue3-apexcharts";
import { accounts } from "./acc_data.js";

export default {
  name: "DoughNut",
  components: {
    VueApexCharts,
  },
  data() {
    const pro_balance = accounts.pro.balance;
    const prime_balance = accounts.prime.balance;
    const standard_balance = accounts.standard.balance;
    const acc_balance = accounts.acc_balance.balance;
    const total = pro_balance + prime_balance + standard_balance + acc_balance;

    return {
      series: [pro_balance, prime_balance, standard_balance, acc_balance],

      chartOptions: {
        chart: { type: "donut" },

        fill: {
          colors: ["#fe6b4b", "#b642d3", "#42d3c2", "#2c77bc"],
        },

        stroke: {},
        value: [{ show: false }],

        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            customScale: 0.8,

            dataLabels: {
              show: false,
            },

            donut: {
              size: "110%",
              labels: {
                show: true,
                name: { show: true },
                value: {
                  show: true,
                  fontSize: "28px",
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                  color: "#080C18",

                  offsetY: 0,
                },
                total: {
                  show: true,
                  label: this.$t("label.my_balance"),
                  color: "#969696",
                  fontSize: "14px",

                  fontFamily: "Barlow, sans-serif",
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce(
                      (a, b) => a + b,
                      0
                    );
                    return `$${total.toLocaleString()}`;
                  },
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        noData: {
          text: undefined,
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "14px",
            fontFamily: undefined,
          },
        },
      },
    };
  },
};
</script>
