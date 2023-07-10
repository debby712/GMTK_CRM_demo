<template>
  <div class="tab-inner">
    <div class="margin-selector">
      <div class="row q-gutter-x-sm justify-between">
        <q-select
          class="col"
          v-model="accTypeFilter"
          :options="formattedAccTypes"
          emit-value
          map-options
          dropdown-icon="expand_more"
          hide-selected-icon
          color="primary"
        />
        <q-select
          class="col"
          v-model="transTypeFilter"
          :options="formattedTransTypes"
          emit-value
          map-options
          dropdown-icon="expand_more"
          hide-selected-icon
          color="primary"
          @clear="resetFilters"
        />
        <q-select
          class="col"
          v-model="statusFilter"
          :options="formattedStatusTypes"
          emit-value
          map-options
          dropdown-icon="expand_more"
          hide-selected-icon
          color="primary"
          @clear="resetFilters"
        />
      </div>
      <div class="row">
        <q-field
          class="col-lg-4 col-md-6 col-12"
          @click="() => (dateDialog = true)"
        >
          <template v-slot:control>
            {{ startDateFilter }}
            {{ $t("label.to") }}
            {{ endDateFilter }}
          </template>
        </q-field>

        <q-popup-proxy v-model="dateDialog">
          <q-dialog v-model="dateDialog" persistent>
            <q-card style="background-color: #f6f6f6" class="date_dialog">
              <q-card-section class="row items-center q-pb-none">
                <div class=" ">
                  <q-btn
                    flat
                    @click="setCurrentMonth()"
                    :active="activeButton === 'month'"
                    :class="
                      activeButton === 'month' ? 'active-button-class' : ''
                    "
                    >{{ $t("label.this_month") }}</q-btn
                  >
                  <q-btn
                    flat
                    @click="setCurrentWeek()"
                    :active="activeButton === 'week'"
                    :class="
                      activeButton === 'week' ? 'active-button-class' : ''
                    "
                    >{{ $t("label.this_week") }}</q-btn
                  >
                  <q-btn
                    flat
                    @click="setToday()"
                    :active="activeButton === 'today'"
                    :class="
                      activeButton === 'today' ? 'active-button-class' : ''
                    "
                    >{{ $t("label.today") }}</q-btn
                  >
                  <q-btn
                    flat
                    @click="custom()"
                    :class="
                      activeButton === 'custom' ? 'active-button-class' : ''
                    "
                    :active="isCustomDateRange"
                    >{{ $t("label.other_day") }}</q-btn
                  >
                </div>
                <q-space />
                <div class="fixed">
                  <q-btn
                    color="grey-6"
                    icon="close"
                    class="no-shadow text-my-gray close-btn-date"
                    round
                    v-close-popup
                  />
                </div>
              </q-card-section>
              <q-separator class="full-width" />
              <q-card-section>
                <q-card class="date_card">
                  <!--start-->
                  <div class="row justify-between">
                    <q-field
                      v-model="startDateFilter"
                      class="col-lg-5 col-md-5 col-sm-12 col-xs-12"
                      @click="showStartPicker = true"
                      stack-label
                      :label="$t('label.from')"
                    >
                      <q-popup-proxy v-model="showStartPicker" ref="startProxy">
                        <q-date
                          v-model="startDateFilter"
                          mask="YYYY-MM-DD"
                          placeholder="Start Date"
                          color="primary"
                          @update:model-value="$refs.startProxy.hide()"
                        />
                      </q-popup-proxy>
                      <template v-slot:control>
                        <div class="q-field__append">
                          <div class="selected_date">
                            {{
                              startDateFilter
                                ? startDateFilter
                                : $t("history.all_date")
                            }}
                          </div>
                        </div>
                      </template>
                    </q-field>

                    <!--end-->

                    <q-field
                      v-model="endDateFilter"
                      placeholder="End Date"
                      class="col-lg-5 col-md-5 col-sm-12 col-xs-12"
                      @click="showEndPicker = true"
                      stack-label
                      :label="$t('label.to')"
                    >
                      <q-popup-proxy v-model="showEndPicker" ref="endProxy">
                        <q-date
                          v-model="endDateFilter"
                          mask="YYYY-MM-DD"
                          placeholder="end Date"
                          color="primary"
                          @update:model-value="$refs.endProxy.hide()"
                        />
                      </q-popup-proxy>
                      <template v-slot:control>
                        <div class="q-field__append">
                          <div class="selected_date">
                            {{
                              endDateFilter
                                ? endDateFilter
                                : $t("history.all_date")
                            }}
                          </div>
                        </div>
                      </template>
                    </q-field>
                  </div>
                  <div class="row justify-center">
                    <q-btn
                      @click="getHistory"
                      class="confrim_btn no-shadow"
                      v-close-popup
                    >
                      {{ $t("auth.confirm") }}
                    </q-btn>
                  </div>
                </q-card>
                <!--end inside popup-->
              </q-card-section>
            </q-card>
            <div class="row fixed-bottom items-center full">
              <q-btn
                color="grey-6"
                icon="close"
                class="no-shadow text-my-gray lt-sm mobile-close-btn"
                round
                v-close-popup
              />
            </div>
          </q-dialog>
        </q-popup-proxy>
      </div>
    </div>
    <!--end selector-->
    <q-card class="my-shadow q-pa-xs my-table" style="border-radius: 10px">
      <table class="full-width">
        <thead class="bg-primary my-shadow">
          <tr class="text-white text-left">
            <th class="ref-col" style="border-radius: 10px 0 0 0">
              {{ $t("history.ref_no") }}
            </th>
            <th class="date-col">
              {{ $t("history.date") }}
            </th>
            <th class="gt-md acc-col">
              {{ $t("history.acc_type") }}
            </th>
            <th class="gt-md trans-col">
              {{ $t("history.trans_type") }}
            </th>
            <th class="gt-md amount-col">
              {{ $t("history.amount") }}
            </th>
            <th style="border-radius: 0px 10px 0 0px" class="status-col">
              {{ $t("history.status") }}
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedRecords.length > 0">
          <tr
            v-for="record in paginatedRecords"
            :key="record.ref_no"
            style="border-radius: 10px"
            class="table_text text-dard q-my-md"
            @click="selectRecord(record)"
          >
            <td>{{ record.ref_no }}</td>
            <td>
              {{ record.date }}
            </td>

            <td class="gt-md">{{ formattedAccType(record.acc_type) }}</td>
            <td class="gt-md">{{ formattedTransType(record.trans_type) }}</td>
            <td class="gt-md">
              {{ formattedAmount(record.amount, record.trans_type) }}
            </td>
            <td>
              <div class="status-width">
                <div class="lt-lg">
                  {{ formattedAmount(record.amount, record.trans_type) }}
                </div>

                <div class="status" :id="record.status">
                  {{ formattedStatus(record.status) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="full-width">
          <td>
            <div style="width: 100%" class="q-ma-md">
              {{ $t("history.norecord") }}
            </div>
          </td>
        </tbody>
      </table>
    </q-card>

    <q-pagination
      v-model="currentPage"
      :min="1"
      :max="maxPage"
      class="justify-end q-my-xl"
      flat
      :max-pages="7"
      color="grey"
      active-text-color="primary"
      active-design="flat"
      @input="setCurrentPage"
    />

    <!--dialog-->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="dialog">
        <q-card-section class="row justify-end gt-xs">
          <div class="fixed">
            <q-btn
              color="grey-6"
              icon="close"
              class="no-shadow text-my-gray close-btn"
              round
              @click="showDialog = false"
            /></div
        ></q-card-section>
        <q-card-section>
          <div class="row hr justify-between items-end">
            <div class="col text-left">{{ $t("history.ref_no") }}:</div>
            <div class="col text-right">{{ selectedRecord.ref_no }}</div>
          </div>
          <div class="row hr justify-between items-end">
            <div class="col text-left">{{ $t("history.status") }}:</div>
            <div class="col justify-end">
              <div class="status-selected" :id="selectedRecord.status">
                {{ formattedStatus(selectedRecord.status) }}
              </div>
            </div>
          </div>
          <div class="row hr justify-between items-end">
            <div class="col text-left">{{ $t("history.status_detail") }}:</div>
            <div class="col text-right">
              {{ formattedTransType(selectedRecord.trans_type) }} - to Fund
              Wallet
            </div>
          </div>
          <div class="row hr justify-between items-end">
            <div class="col text-left">{{ $t("history.date") }}:</div>
            <div class="col text-right">{{ selectedRecord.date }}</div>
          </div>

          <div class="row hr justify-between items-end">
            <div class="col text-left">計算金額:</div>
            <div
              class="col text-right"
              v-if="selectedRecord.trans_type === 'transfer'"
            >
              USD
            </div>
            <div class="col text-right" v-else>USDT</div>
          </div>

          <div class="row hr justify-between items-end">
            <div class="col text-left">金額:</div>
            <div class="col text-right">
              {{ formattedAmount(selectedRecord.amount) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row fixed-bottom items-center full">
        <q-btn
          color="grey-6"
          icon="close"
          class="no-shadow text-my-gray lt-sm mobile-close-btn"
          round
          @click="showDialog = false"
        />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { records } from "src/components/acc_data.js";
import moment from "moment";

import { ref } from "vue";
export default {
  components: {},
  name: "HistoryComponent",
  data() {
    return {
      records,
      selectedRecord: null,
      showDialog: false,
      currentPage: 1,
      rowsPerPage: 10,
      accTypeFilter: "",
      transTypeFilter: "", // Add a new data property for the trans_type filter
      statusFilter: "", // Add a new data property for the status filter
      startDateFilter: null,
      endDateFilter: null,
      showPicker: false,
      showEndPicker: false,
      dateDialog: false,
      activeButton: "",
    };
  },
  computed: {
    filteredRecords() {
      // Filter the records array based on the filters
      return this.records.filter((record) => {
        if (this.accTypeFilter && record.acc_type !== this.accTypeFilter) {
          return false;
        }
        if (
          this.transTypeFilter &&
          record.trans_type !== this.transTypeFilter
        ) {
          return false;
        }
        if (this.statusFilter && record.status !== this.statusFilter) {
          return false;
        }
        // Apply date range filter
        if (
          this.startDateFilter &&
          moment(record.date) < moment(this.startDateFilter)
        ) {
          return false;
        }
        if (
          this.endDateFilter &&
          moment(record.date) > moment(this.endDateFilter)
        ) {
          return false;
        }
        return true;
      });
    },
    accTypes() {
      // Get a list of unique acc_type values from the records array
      const accTypesSet = new Set(
        this.records.map((record) => record.acc_type)
      );
      return Array.from(accTypesSet);
    },
    formattedAccTypes() {
      const accTypesSet = new Set(
        this.records.map((record) => record.acc_type)
      );
      const accTypesArray = Array.from(accTypesSet);

      // Create a new array of objects with formatted values for each acc_type option
      const formattedAccTypes = [
        { label: this.$t("history.all_acc"), value: "" },
        { label: this.formattedAccType("Standard"), value: "Standard" },

        { label: this.formattedAccType("Prime"), value: "Prime" },
        // Remove the "Pro" account type from the array
        { label: this.formattedAccType("Pro"), value: "Pro" },
        ...accTypesArray
          .filter((accType) => !["Standard", "Prime", "Pro"].includes(accType))
          .map((accType) => ({
            label: this.formattedAccType(accType),
            value: accType,
          })),
      ];

      return formattedAccTypes;
    },
    transTypes() {
      // Get a list of unique trans_type values from the records array
      const transTypesSet = new Set(
        this.records.map((record) => record.trans_type)
      );
      return Array.from(transTypesSet);
    },
    formattedTransTypes() {
      // Create a new array of objects with formatted values for each trans_type option
      return [
        { label: this.$t("history.all_type"), value: "" },
        ...this.transTypes.map((transType) => ({
          label: this.formattedTransType(transType),
          value: transType,
        })),
      ];
    },
    statusTypes() {
      // Get a list of unique status values from the records array
      const statusTypesSet = new Set(
        this.records.map((record) => record.status)
      );
      return Array.from(statusTypesSet);
    },
    formattedStatusTypes() {
      // Create a new array of objects with formatted values for each status option
      return [
        { label: this.$t("history.all_status"), value: "" },
        ...this.statusTypes.map((statusType) => ({
          label: this.formattedStatus(statusType),
          value: statusType,
        })),
      ];
    },
    maxPage() {
      const filteredRecordsLength = this.filteredRecords.length;
      if (filteredRecordsLength === 0) {
        return 1;
      } else {
        return Math.ceil(filteredRecordsLength / this.rowsPerPage);
      }
    },
    paginatedRecords() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      const filteredRecords = this.filteredRecords.filter((record) => {
        if (this.startDateFilter && this.endDateFilter) {
          return (
            new Date(record.date) >= new Date(this.startDateFilter) &&
            new Date(record.date) <= new Date(this.endDateFilter)
          );
        } else if (this.startDateFilter) {
          return new Date(record.date) >= new Date(this.startDateFilter);
        } else if (this.endDateFilter) {
          return new Date(record.date) <= new Date(this.endDateFilter);
        } else {
          return true;
        }
      });
      return filteredRecords.slice(startIndex, endIndex);
    },
  },
  methods: {
    isTodayRange() {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        23,
        59,
        59
      );
      return (
        this.startDateFilter === startOfDay.toISOString().substr(0, 10) &&
        this.endDateFilter === endOfDay.toISOString().substr(0, 10)
      );
    },
    isMonthRange() {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      return (
        this.startDateFilter === startOfMonth.toISOString().substr(0, 10) &&
        this.endDateFilter === endOfMonth.toISOString().substr(0, 10)
      );
    },
    isWeekRange() {
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 7)
      );
      return (
        this.startDateFilter === startOfWeek.toISOString().substr(0, 10) &&
        this.endDateFilter === endOfWeek.toISOString().substr(0, 10)
      );
    },
    custom() {
      this.activeButton = "custom";
    },
    setToday() {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        0, // hours
        0, // minutes
        0, // seconds
        0 // milliseconds
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        23, // hours
        59, // minutes
        50 // seconds
      );

      this.startDateFilter = startOfDay.toISOString().substr(0, 10);
      this.endDateFilter = endOfDay.toISOString().substr(0, 10);
      this.activeButton = "today";
    },
    setCurrentMonth() {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setDate(startOfMonth.getDate() + 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      this.startDateFilter = startOfMonth.toISOString().substr(0, 10);
      this.endDateFilter = endOfMonth.toISOString().substr(0, 10);
      this.activeButton = "month";
    },
    setCurrentWeek() {
      // get the current week's start and end dates
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 1)
      );
      const endOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 7)
      );

      // set the start and end dates
      this.startDateFilter = startOfWeek.toISOString().substr(0, 10);
      this.endDateFilter = endOfWeek.toISOString().substr(0, 10);
      this.activeButton = "week";

      // close the dialog
    },
    selectRecord(record) {
      this.selectedRecord = record;
      this.showDialog = true;
    },
    formattedBalance(amount) {
      const formatted = (amount / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formatted;
    },
    formattedAmount(amount, trans_type) {
      let formatted = "";
      if (trans_type === "transfer" || trans_type === "deposit") {
        formatted = this.formattedBalance(amount);
      } else {
        formatted = amount.toLocaleString("en-US") + " USDT";
      }
      if (trans_type === "withdraw" || trans_type === "transfer") {
        return "-" + formatted;
      } else {
        return "+" + formatted;
      }
    },
    formattedAccType(acc_type) {
      const accTypeMap = {
        Standard: "Standard",
        Prime: "Prime",
        Pro: "Pro X",
        acc: this.$t("label.my_acc"),
      };

      if (acc_type in accTypeMap) {
        return accTypeMap[acc_type] || acc_type;
      }
    },
    formattedTransType(trans_type) {
      const transTypeMap = {
        transfer: this.$t("wallet.transfer"),
        deposit: this.$t("wallet.s_transfer"),
        withdraw: this.$t("wallet.Blackchain_out"),
      };

      if (trans_type in transTypeMap) {
        return transTypeMap[trans_type] || trans_type;
      }
    },
    formattedStatus(status) {
      const statusMap = {
        success: this.$t("history.success"),
        failed: this.$t("history.failed"),
        pending: this.$t("history.pending"),
      };

      if (status in statusMap) {
        return statusMap[status] || status;
      }
    },
    resetFilters() {
      this.accTypeFilter = "";
      this.transTypeFilter = "";
      this.statusFilter = "";
    },
  },
  mounted() {
    // Set the start and end dates for the current month when the dialog is opened
    this.setCurrentMonth();
    setTimeout(() => {
      this.getHistory();
    }, 100);
  },
  watch: {
    startDateFilter: function (newStartDate, oldStartDate) {
      if (newStartDate && this.endDateFilter) {
        if (this.isTodayRange()) {
          this.activeButton = "today";
        } else if (this.isMonthRange()) {
          this.activeButton = "month";
        } else if (this.isWeekRange()) {
          this.activeButton = "week";
        } else {
          this.activeButton = "custom";
        }
      }
    },
    endDateFilter: function (newEndDate, oldEndDate) {
      if (newEndDate && this.startDateFilter) {
        if (this.isTodayRange()) {
          this.activeButton = "today";
        } else if (this.isMonthRange()) {
          this.activeButton = "month";
        } else if (this.isWeekRange()) {
          this.activeButton = "week";
        } else {
          this.activeButton = "custom";
        }
      }
    },
    currentPage(val) {
      this.paginatedRecords;
    },
    rowsPerPage(val) {
      this.paginatedRecords;
    },
  },
};
</script>

<style scoped>
.active-button-class {
  background-color: #fff;
  color: #000;
  border-bottom: 2px solid #045de9;
  border-radius: 0;
}

.date_dialog {
  background-color: #f6f6f6;
  width: 700px;
  padding: 20px;
  border-radius: 8px;
}

.date_card {
  background-color: #fff;
  padding: 30px 60px;
  width: 100%;
  box-shadow: 6px 6px 20px 0px #0000000d;
  align-content: center;
  justify-content: center;
}

.status-width {
  width: 100%;
}

.selected_date {
  font-size: 14px;
  color: #080c18;
  margin-left: -10px;
}

.dialog {
  padding: 0px 30px 10px;
  min-width: 30vw;
  width: 100%;
}

.hr :after {
  content: "";
  display: block;
  border-bottom: 1px solid #ebebeb;
  /* add a separator line */
  /* or */
  /* border-top: 1px solid #ccc; */
  /* add a separator line */
  /* border-left: 1px solid #ccc; */
  /* add a border */
  /* border-right: 1px solid #ccc; */
  /* add a border */
  margin: 12px 0;
}

.dialog .hr:last-child :after {
  content: "";
  display: block;
  border-bottom: none !important;
  /* add a separator line */
  /* or */
  /* border-top: 1px solid #ccc; */
  /* add a separator line */
  /* border-left: 1px solid #ccc; */
  /* add a border */
  /* border-right: 1px solid #ccc; */
  /* add a border */
}

.q-badge {
  padding: 3px 15px;
}

.status {
  border-radius: 45px;
  font-size: 14px;
  line-height: 22px;
  width: 100%;
  text-align: center !important;
}

.status-selected {
  border-radius: 45px;
  font-size: 14px;
  text-align: center;
  max-width: 60px;
  margin-right: 0;
  margin-left: auto;
}

.status-selected::after {
  content: "";
  display: none !important;
  border-bottom: none !important;
  /* add a separator line */
}

#success {
  border: 0.5px solid #12b298;
  background: rgba(18, 178, 152, 0.1);
  color: #12b298;
}

#pending {
  background: rgba(150, 150, 150, 0.1);
  border: 0.5px solid #969696;
  color: #12b298;
  color: #969696;
}

#failed {
  background: rgba(249, 90, 80, 0.1);
  border: 0.5px solid #f95a50;
  color: #f95a50;
}

#processing {
  background: #fff;
  border: 0.5px solid #12b298;
  color: #12b298;
}

.my_table {
  border-radius: 8px !important;
  padding: 2px;
  width: 100%;
}

.table {
  border-collapse: collapse;
  border-radius: 10px;
}

.table.full-width {
  border-radius: 10px;
}

table {
  border-collapse: collapse;
  border-radius: 10px;
}

.table_text {
  font-family: "Barlow";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  cursor: pointer;
}

.table_text:nth-child(even) {
  background-color: #f8f8f8;
}

.table_text:nth-child(odd) {
  background-color: #ffffff;
}

.even {
  background-color: #f8f8f8;
}

table.full-width th,
table.full-width td {
  padding: 16px 18px !important;
}

.margin-selector {
  margin: -20px 6px 40px 6px;
}

@media screen and (max-width: 600px) {
  .dialog {
    padding: 10px 16px;
  }

  .dialog .row {
    height: auto;
  }

  .status {
    border-radius: 45px;
    font-size: 14px;
  }
}

.close-btn {
  margin-right: -20px;
  font-size: 12px;
  color: #d9d9d9;
  right: 0;
  transform: translate(40px, -30px);
}

.close-btn-date {
  margin-right: -20px;
  font-size: 12px;
  color: #d9d9d9;
  right: 0;
  transform: translate(500px, -50px);
}

.mobile-close-btn {
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.q-bar {
  margin: 20px 0 0 0;
}

.ref-col {
  width: 14%;
}

.date-col {
  width: 24%;
}

.acc-col {
  width: 14%;
}

.trans-col {
  width: 16%;
}

.amount-col {
  width: 18%;
}

.status-col {
  width: 14%;
}

@media screen and (max-width: 1024px) {
  .ref-col {
    width: 20%;
  }

  .date-col {
    width: 35%;
  }

  .acc-col {
    display: none;
  }

  .trans-col {
    display: none;
  }

  .amount-col {
    display: none;
  }

  .status-col {
    width: 45%;
  }
}

@media screen and (max-width: 600px) {
  .q-bar {
    margin: 0px 0 0 0;
  }

  .date_card {
    padding: 30px 20px;
    width: 100%;
    box-shadow: 6px 6px 20px 0px #0000000d;
    height: auto;
    align-content: center;
    justify-content: center;
  }
}
</style>
