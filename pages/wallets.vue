<template>
  <div class="min-h-screen w-[80rem] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-3 lg:gap-x-3 ">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.allWallets">
            <div class="font-bold">
              Total Wallets
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  Total unique wallets that initiate the transactions on terra mainnet
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.allWallets)  }} <span class="text-xs">wallets</span></div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton width="small" />
            </div>
          </template>
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.activeWallet">
            <div class="font-bold">
              Active Wallet (7d)
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  Total unique active wallet for the last 7 days on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.activeWallet) }}<span :class="{'text-xs': true, 'text-red-600': result.percentageActiveWallets < 0, 'text-green-600': result.percentageActiveWallets > 0}">{{ result.percentageActiveWallets > 0 ? '+' : null}}{{parseInt(result.percentageActiveWallets)}}%</span></div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton width="small" />
            </div>
          </template>
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.newWallet">
            <div class="font-bold">
              New Wallets (7d)
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                  Total new wallets by their first time initiate transaction for the last 7 days
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.newWallet) }}<span :class="{'text-xs': true, 'text-red-600': result.percentageNewWallet < 0, 'text-green-600': result.percentageNewWallet > 0}">{{ result.percentageNewWallet > 0 ? '+' : null}}{{parseInt(result.percentageNewWallet)}}%</span></div>
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
        <template v-if="!loading.dailyWallet">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.dailyWallet" :typeChart="'bar'" title="New Wallets" height="400" />
          <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDailyWallet === 'day'}" @click="timeRangeDailyWallet = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDailyWallet === 'week'}" @click="timeRangeDailyWallet = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDailyWallet === 'month'}" @click="timeRangeDailyWallet = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
          </div>
        </template>
         <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>  
        </div>

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-full ">
        <template v-if="!loading.cumulativeWallet">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.cumulativeWallet" :typeChart="'area'" title="Cumulative Wallets" height="400" />
        </template>
        <div v-else class="grid gap-y-3 " >
            <Skeleton />
            <Skeleton height="big" width="full" />  
          </div>  
        </div>

      </div>

       <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-1 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit">
        <template v-if="!loading.dailyActiveWallet">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.dailyActiveWallet" :typeChart="'bar'" title="Active Wallets" height="400" />
          <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDailyActive === 'day'}" @click="timeRangeDailyActive = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDailyActive === 'week'}" @click="timeRangeDailyActive = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeDailyActive === 'month'}" @click="timeRangeDailyActive = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
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
  queryAllWallets, 
  queryNewWallet, 
  queryActiveWallet,
  queryDailyNewWallet,
  queryCumulativeWallets,
  queryDailyActiveWallets
} from '../utils/dataQueryWallets'

export default {
  name: 'wallets',
  data(){
    return {
      loading: {
        allWallets: true,
        newWallet: true,
        activeWallet: true,
        dailyWallet: true,
        cumulativeWallet: true,
        dailyActiveWallet: true
      },
      result: {
        allWallets: null,
        newWallet: null,
        activeWallet: null,
        percentageActiveWallets: null,
        percentageNewWallet: null,
        dailyWallet: null,
        cumulativeWallet: null,
        dailyActiveWallet: null
      },
      timeRangeDailyWallet: 'week',
      timeRangeDailyActive: 'week'
    }
  },
  watch: {
    timeRangeDailyWallet(){
      this.fetchDailyWallets();
    },
    timeRangeDailyActive(){
      this.fetchDailyActiveWallet();
    }
  },
  mounted(){
    this.runAll();
  },
  methods: {
    runAll (){
      this.fetchAllWallets();
      this.fetchActiveWallets();
      this.fetchNewWallets();
      this.fetchDailyWallets();
      this.fetchCumulativeWallet();
      this.fetchDailyActiveWallet();
    },
    async fetchAllWallets(){
      this.loading.allWallets = true
      const token = await getToken(queryAllWallets, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.allWallets = result.result.results[0][0]
        this.loading.allWallets = false
      }
    },
    async fetchActiveWallets(){
      this.loading.activeWallet = true
      const token = await getToken(queryActiveWallet, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.activeWallet = result.result.results[0][0]
        this.result.percentageActiveWallets = result.result.results[0][1]
        this.loading.activeWallet = false
      }
    },
    async fetchNewWallets(){
      this.loading.newWallet = true
      const token = await getToken(queryNewWallet, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.newWallet = result.result.results[0][0]
        this.result.percentageNewWallet = result.result.results[0][1]
        this.loading.newWallet = false
      }
    },
    async fetchDailyWallets(){
      this.loading.dailyWallet = true
      const token = await getToken(queryDailyNewWallet(this.timeRangeDailyWallet), this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailyWallet = result.result.results
        this.loading.dailyWallet = false
      }
    },
    async fetchCumulativeWallet(){
      this.loading.cumulativeWallet = true
      const token = await getToken(queryCumulativeWallets, this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.cumulativeWallet = result.result.results
        this.loading.cumulativeWallet = false
      }
    },
    async fetchDailyActiveWallet(){
      this.loading.dailyActiveWallet = true
      const token = await getToken(queryDailyActiveWallets(this.timeRangeDailyActive), this.$axios,this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailyActiveWallet = result.result.results
        this.loading.dailyActiveWallet = false
      }
    },
    
  }
}
</script>

<style>

</style>