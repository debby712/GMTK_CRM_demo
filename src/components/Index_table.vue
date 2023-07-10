<template>
  <div class="">
    <table class="full-width q-pa-md" v-if="showLast">
      <thead>
        <tr class="text-grey-5 table_heading_text">
          <th class="col-lg-4 text-left" style="padding-left: -10px">
            {{ $t("label.product") }}
          </th>
          <th class="col-lg-2 col-2 text-right">{{ $t("label.buy") }}</th>
          <th class="col-lg-2 col-2 text-right">{{ $t("label.sell") }}</th>
          <th class="col-lg-1 col-1 text-right">{{ $t("label.updrop") }}</th>
          <th class="col-lg-3 text-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="border-radius: 10px"
          v-for="item in product"
          :key="item.name"
          class="table_text q-my-md"
          :class="index % 2 === 0 ? 'even' : 'odd'"
        >
          <td class="col-lg-4">
            <q-avatar>
              <img :src="item.icon" />
            </q-avatar>
            {{ item.name }}
          </td>
          <td class="col-lg-2 text-right">{{ item.buy }}</td>
          <td class="col-lg-2 text-right">{{ item.sell }}</td>
          <td
            class="col-lg-1 text-right"
            :class="{
              'text-positive': item.precentage > 0,
              'text-negative': item.precentage < 0,
            }"
          >
            {{ item.precentage }}%
          </td>
          <td class="col-lg-3 text-right">
            <q-btn
              to="../auth/register"
              target="_blank"
              class="chart-btn"
              color="primary"
              :label="$t('label.login')"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Index_Table",
  props: {
    showLast: {
      type: Boolean,
      required: false,
      default: true,
    },

    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    maxRows: {
      type: Number,
      required: false,
      default: 10, // Default to 10 rows if not provided
    },
  },

  setup() {
    return {
      product: [
        {
          name: "CN50",
          icon: require("../assets/CNY.png"),
          buy: "12497.50",
          sell: "12477.50",
          precentage: "-0.86",
          link: "",
        },
        {
          name: "GER40",
          icon: require("../assets/GER.png"),
          buy: "15943.70",
          sell: "15941.20",
          precentage: "-0.57",
          link: "",
        },
        {
          name: "HKG33",
          icon: require("../assets/HKD.png"),
          buy: "18691.50",
          sell: "18687.50",
          precentage: "+0.93",
          link: "",
        },
        {
          name: "SPX500",
          icon: require("../assets/USD.png"),
          buy: " 4278.82",
          sell: "4277.94",
          precentage: "-0.16",
          link: "",
        },
        {
          name: "NAS100",
          icon: require("../assets/USD.png"),
          buy: "14552.70",
          sell: "14520.30",
          precentage: "-0.29",
          link: "",
        },
      ],
    };
  },
});
</script>

<style scoped>
.q-avatar {
  height: 30px;
  width: auto;
  margin-right: 10px;
}
.my-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 25px 40px -15px rgb(154 154 154 / 40%),
    0 -15px 40px -15px rgb(0 0 0 / 10%);
}
table {
  border-collapse: collapse;
  border-radius: 10px;
}

.chart-btn {
  font-size: 16px;
  padding: 8px 42px;
}
td {
  font-size: 16px;
}
th {
  font-weight: 400 !important;
  font-size: 14px;
}
.table_heading_text {
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
}
.table_text {
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
}

.table_text:nth-child(even) {
  background-color: #f8f8f8;
}

.table_text:nth-child(odd) {
  background-color: #ffffff;
}
table.full-width th,
table.full-width td {
  padding: 13px 18px !important;
}

@media screen and (max-width: 600px) {
  table.full-width td {
    padding: 6px 6px !important;
  }
  .q-avatar {
    height: 20px;
    width: auto;
    margin-right: 2px;
  }
  .q-btn {
    font-size: 12px;
    padding: 2px 10px;
    width: 100%;
  }
  th {
    font-weight: 400 !important;
    font-size: 10px;
  }
  table.full-width th,
  table.full-width td {
    padding: 6px 6px !important;
  }
  table.full-width td {
    font-size: 14px;
  }
  table.full-width td:first-child {
    padding: 6px 6px 6px 12px !important;
  }
  table.full-width td:last-child {
    padding: 6px 12px 6px 6px !important;
  }
}
</style>
