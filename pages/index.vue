<template>
  <div class="min-h-screen w-[80rem] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-4 lg:gap-x-3 ">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.totalTransaction">
            <div class="font-bold">
              Total Transactions
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  The amount of transactions on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.totalTransaction)  }} <span class="text-xs">tx</span></div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton width="small" />
            </div>
          </template>
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.rateSuccess">
            <div class="font-bold">
              Success Rate Tx
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  Percentage of success tx rate on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ parseInt(result.rateSuccess) }}<span class="text-xs">%</span></div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton width="small" />
            </div>
          </template>
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.averageFee">
            <div class="font-bold">
              Average Tx Fee
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  Average transaction fee on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ parseFloat(result.averageFee).toFixed(4) }} <span class="text-xs">luna</span></div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton width="small" />
            </div>
          </template>
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.blockTime">
            <div class="font-bold">
              Average Block Time
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  Average time in second between blocks on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ parseInt(result.blockTime) }} <span class="text-xs">second</span></div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton width="small" />
            </div>
          </template>
        </div>  

      </div>

      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit">
        <template v-if="!loading.dailyTx">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.dailyTx" :typeChart="'bar'" title="Total Transactions" height="400" />
          <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDaily === 'day'}" @click="timeRangeDaily = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDaily === 'week'}" @click="timeRangeDaily = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDaily === 'month'}" @click="timeRangeDaily = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
          </div>
        </template>
         <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>  
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-full ">
        <template v-if="!loading.cumulativeTx">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.cumulativeTx" :typeChart="'area'" title="Cumulative Transactions" height="400" />
        </template>
        <div v-else class="grid gap-y-3 " >
            <Skeleton />
            <Skeleton height="big" width="full" />  
          </div>  
        </div>

      </div>

      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-1 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit">
        <template v-if="!loading.dailySuccessRate">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.dailySuccessRate" :typeChart="'line'" title="Success Rate Tx" height="400" />
          <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeSuccessRate === 'day'}" @click="timeRangeSuccessRate = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeSuccessRate === 'week'}" @click="timeRangeSuccessRate = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeSuccessRate === 'month'}" @click="timeRangeSuccessRate = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
          </div>
        </template>
         <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>  
        </div>

      </div>

      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-1 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit">
        <template v-if="!loading.dailyAvgFee">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.dailyAvgFee" :typeChart="'line'" title="Average Fee" height="400" />
          <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeAvgFee === 'day'}" @click="timeRangeAvgFee = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeAvgFee === 'week'}" @click="timeRangeAvgFee = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeAvgFee === 'month'}" @click="timeRangeAvgFee = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
          </div>
        </template>
         <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>  
        </div>
        
      </div>

      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-1 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit">
        <template v-if="!loading.dailyBlockTime">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.dailyBlockTime" :typeChart="'line'" title="Block TIme Average" height="400" />
          <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeBlockTime === 'day'}" @click="timeRangeBlockTime = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeBlockTime === 'week'}" @click="timeRangeBlockTime = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeBlockTime === 'month'}" @click="timeRangeBlockTime = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
          </div>
        </template>
         <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>  
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import {getToken, getData} from '../utils/index'
import { 
  queryTotalTransactions, 
  queryRateSuccess, 
  queryAverageFee, 
  queryBlockTime,
  queryDailyTx,
  queryCumulativeTx,
  queryDailySuccessRate,
  queryDailyAvgFee,
  queryDailyBlockTime
} from '../utils/dataQueryOverview'

export default {
  name: 'IndexPage',
  data(){
    return {
      loading: {
        totalTransaction: true,
        rateSuccess: true,
        averageFee: true,
        blockTime: true,
        dailyTx: true,
        cumulativeTx: true,
        dailySuccessRate: true,
        dailyAvgFee: true,
        dailyBlockTime: true
      },
      result: {
        totalTransaction: null,
        rateSuccess: null,
        averageFee: null,
        blockTime: null,
        dailyTx: null,
        cumulativeTx: null,
        dailySuccessRate: null,
        dailyAvgFee: null,
        dailyBlockTime: null
      },
      timeRangeDaily: 'week',
      timeRangeSuccessRate: 'day',
      timeRangeAvgFee: 'day',
      timeRangeBlockTime: 'day'
    }
  },
  watch: {
    timeRangeDaily() {
      this.fetchDailyTx();
    },
    timeRangeSuccessRate() {
      this.fetchDailySuccessRate();
    },
    timeRangeAvgFee() {
      this.fetchDailyAvgFee();
    },
    timeRangeBlockTime() {
      this.fetchDailyBlockTime();
    }
  },
  mounted(){
    this.runAll();
  },
  methods: {
    runAll(){
      this.fetchTotalTransactions();
      this.fetchRateSuccess();
      this.fetchAverageFee();
      this.fetchBlockTime();
      this.fetchDailyTx();
      this.fetchCumulativeTx();
      this.fetchDailySuccessRate();
      this.fetchDailyAvgFee();
      this.fetchDailyBlockTime();
    },
    async fetchTotalTransactions(){
      this.loading.totalTransaction = true
      const token = await getToken(queryTotalTransactions, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.totalTransaction = result.result.results[0][0]
        this.loading.totalTransaction = false
      }
    },
    async fetchRateSuccess(){
      this.loading.rateSuccess = true
      const token = await getToken(queryRateSuccess, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.rateSuccess = result.result.results[0][0]
        this.loading.rateSuccess = false
      }
    },
    async fetchAverageFee(){
      this.loading.averageFee = true
      const token = await getToken(queryAverageFee, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.averageFee = result.result.results[0][0]
        this.loading.averageFee = false
      }
    },
    async fetchBlockTime(){
      this.loading.blockTime = true
      const token = await getToken(queryBlockTime, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.blockTime = result.result.results[0][0]
        this.loading.blockTime = false
      }
    },
    async fetchDailyTx(){
      this.loading.dailyTx = true
      const token = await getToken(queryDailyTx(this.timeRangeDaily), this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailyTx = result.result.results
        this.loading.dailyTx = false
      }
    },
    async fetchCumulativeTx(){
      this.loading.cumulativeTx = true
      const token = await getToken(queryCumulativeTx, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.cumulativeTx = result.result.results
        this.loading.cumulativeTx = false
      }
    },
    async fetchDailySuccessRate(){
      this.loading.dailySuccessRate = true
      const token = await getToken(queryDailySuccessRate(this.timeRangeSuccessRate), this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailySuccessRate = result.result.results
        this.loading.dailySuccessRate = false
      }
    },
    async fetchDailyAvgFee(){
      this.loading.dailyAvgFee = true
      const token = await getToken(queryDailyAvgFee(this.timeRangeAvgFee), this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailyAvgFee = result.result.results
        this.loading.dailyAvgFee = false
      }
    },
    async fetchDailyBlockTime(){
      this.loading.dailyBlockTime = true
      const token = await getToken(queryDailyBlockTime(this.timeRangeBlockTime), this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailyBlockTime = result.result.results
        this.loading.dailyBlockTime = false
      }
    },
  }
}
</script>
