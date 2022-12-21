<template>
  <div class=" w-[80vw] mx-auto px-5 py-10">
    <div class="flex flex-col gap-y-5">
      <div class="container flex flex-col gap-y-5">
        <div class="flex gap-5 py-5 px-2  overflow-x-auto">
          <div @click="changeToken(item)" :class="{'outline outline-offset-2 outline-color-inherit' : selectedIBC.name === item.name}" class="text-sm cursor-pointer flex gap-x-2 items-center px-6 py-2 rounded-xl justify-center bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-900 hover:transition-all hover:outline hover:outline-offset-2  hover:outline-inherit " v-for="(item, index) in listTokens" :key="index">
            <img width="20" :src="item.icon" alt="">
            {{ item.name }}
          </div>
        </div>
        <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-3 lg:gap-x-3 ">
          
          <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
            <template  v-if="!loading.supplyIBC">
              <div class="font-bold">
                Current Supply {{ selectedIBC.name }}
                <span class="group relative">
                  <ion-icon name="alert-circle-sharp"></ion-icon>
                  <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                    The circulating supply of {{ selectedIBC.name }} on terra mainnet.
                  </div>
                </span>
              </div>
              <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.supplyIBC) }} <span class="text-sm text-inherit/50">{{ selectedIBC.name }}</span></div>
            </template>
            <template v-else>
              <div class="grid gap-2">
                <Skeleton width="full" />
                <Skeleton />
              </div>
            </template>
          </div>

          <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
            <template  v-if="!loading.inflowIBC">
              <div class="font-bold">
                Inflow of {{ selectedIBC.name }} (7d)
                <span class="group relative">
                  <ion-icon name="alert-circle-sharp"></ion-icon>
                  <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                    The amount of {{ selectedIBC.name }} transfer into terra mainnet last 7 days.
                  </div>
                </span>
              </div>
              <div class="text-2xl text-green-600 font-bold">{{ new Intl.NumberFormat().format(result.inflowIBC) }}  <span class="text-sm text-inherit/50">{{ selectedIBC.name }}</span></div>
            </template>
            <template v-else>
              <div class="grid gap-2">
                <Skeleton width="full" />
                <Skeleton />
              </div>
            </template>
          </div>

          <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
            <template  v-if="!loading.outflowIBC">
              <div class="font-bold">
                Outflow of {{ selectedIBC.name }} (7d)
                <span class="group relative">
                  <ion-icon name="alert-circle-sharp"></ion-icon>
                  <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                    The amount of {{ selectedIBC.name }} transfer from terra mainnet last 7 days.
                  </div>
                </span>
              </div>
              <div class="text-2xl text-red-600 font-bold">{{ new Intl.NumberFormat().format(result.outflowIBC) }}  <span class="text-sm text-inherit/50">{{ selectedIBC.name }}</span></div>
            </template>
            <template v-else>
              <div class="grid gap-2">
                <Skeleton width="full" />
                <Skeleton />
              </div>
            </template>
          </div>

        </div>
      </div>
      <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
        <CreateChart :key="$store.state.theme" v-if="!loading.dailySupplyIBC" :dataSeries="result.dailySupplyIBC" :title="`Daily Supply of ${selectedIBC.name}`" />
        <div v-else class="grid gap-y-3 " >
          <Skeleton />
          <Skeleton height="big" width="full" />
        </div>
      </div>
      <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
      <template v-if="!loading.dailyNetflowIBC">
        <CreateChart  :key="$store.state.theme"  :dataSeries="result.dailyNetflowIBC" :title="`Daily Netflow of ${selectedIBC.name}`" typeChart="bar" />
        <div class="grid grid-cols-3 gap-x-2 bg-gray-400 dark:bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
          <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeNetflow === 'day'}" @click="timeRangeNetflow = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Day</div>
          <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeNetflow === 'week'}" @click="timeRangeNetflow = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Week</div>
          <div :class="{'bg-gray-200 dark:bg-slate-900' : timeRangeNetflow === 'month'}" @click="timeRangeNetflow = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-gray-200 dark:hover:bg-slate-900 hover:transition-all">Month</div>
        </div>
      </template>
        <div v-else class="grid gap-y-3 " >
          <Skeleton />
          <Skeleton height="big" width="full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken, getData} from '../utils/index'
import {
  queryDailySupplyIBC,
  queryDailyNetFlowIBC,
  queryCurrentSupplyIBC,
  queryInflowIBC,
  queryOutflowIBC
} from '../utils/dataQuery'

export default {
  name:'ibc-tokens',
  data(){
    const listTokens = [
      {
        name: 'axlUSDC',
        path: 'transfer/channel-6',
        denom: 'uusdc',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg',
        decimal: 6
      },
      {
        name: 'axlUSDT',
        path: 'transfer/channel-6',
        denom: 'uusdt',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg',
        decimal: 6
      },
      {
        name: 'Atom',
        path: 'transfer/channel-0',
        denom: 'uatom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg',
        decimal: 6
      },
      {
        name: 'Osmo',
        path: 'transfer/channel-1',
        denom: 'uosmo',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/OSMO.svg',
        decimal: 6
      },
      {
        name: 'Juno',
        path: 'transfer/channel-2',
        denom: 'ujuno',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/JUNO.svg',
        decimal: 6
      },
      {
        name: 'Graviton',
        path: 'transfer/channel-4',
        denom: 'ugraviton',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/GRAV.svg'
      },
      {
        name: 'axlFrax',
        path: 'transfer/channel-6',
        denom: 'frax-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlFRAX.svg',
        decimal: 18
      },
      {
        name: 'axlAVAX',
        path: 'transfer/channel-6',
        denom: 'wavax-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/wAVAX.png',
        decimal: 18
      },
       {
        name: 'axlBTC',
        path: 'transfer/channel-6',
        denom: 'wbtc-satoshi',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlWBTC.svg',
        decimal: 8
      },
      {
        name: 'axlETH',
        path: 'transfer/channel-6',
        denom: 'weth-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlETH.svg',
        decimal: 18
      },
       {
        name: 'axlMatic',
        path: 'transfer/channel-6',
        denom: 'wmatic-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlMATIC.svg',
        decimal: 18
      },
      {
        name: 'USK',
        path: 'transfer/channel-10',
        denom: 'factory:kujira1qk00h5atutpsv900x202pxx42npjr9thg58dnqpa72f2p7m2luase444a7:uusk',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/USK.svg',
        decimal: 6
      },
      {
        name: 'Kujira',
        path: 'transfer/channel-10',
        denom: 'ukuji',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/KUJI.svg',
        decimal: 6
      },
    ]
    return {
      listTokens,
      loading: {
        dailySupplyIBC: false,
        dailyNetflowIBC: false,
        inflowIBC: false,
        outflowIBC: false,
        supplyIBC: false
      },
      result: {
        dailySupplyIBC: null,
        dailyNetflowIBC: null,
        inflowIBC: null,
        outflowIBC: null,
        supplyIBC: null
      },
      selectedIBC: listTokens[0],
      timeRangeNetflow : 'day'

    }
  },
  watch: {
    timeRangeNetflow(newValue){
       this.fetchDailyNetflowIBC(this.selectedIBC.path + '/' + this.selectedIBC.denom, this.selectedIBC.denom, this.selectedIBC.decimal, newValue);
    }
  },
  mounted(){
    this.runAll()
  },
  methods:{
    changeToken(data){
      this.selectedIBC = data
      this.runAll()
    },
    runAll(){
      this.fetchDailySupplyIBC(this.selectedIBC.path + '/' + this.selectedIBC.denom, this.selectedIBC.denom, this.selectedIBC.decimal);
      this.fetchDailyNetflowIBC(this.selectedIBC.path + '/' + this.selectedIBC.denom, this.selectedIBC.denom, this.selectedIBC.decimal, this.timeRangeNetflow);
      this.fetchCurrentSupply(this.selectedIBC.path + '/' + this.selectedIBC.denom, this.selectedIBC.denom, this.selectedIBC.decimal);
      this.fetchOutflow(this.selectedIBC.denom, this.selectedIBC.decimal);
      this.fetchInflow(this.selectedIBC.path + '/' + this.selectedIBC.denom, this.selectedIBC.decimal);
    },  
    async fetchOutflow(denom = "uusdc", decimal='6'){
      this.loading.outflowIBC = true
      const token = await getToken(queryOutflowIBC(denom, decimal), this.$axios, this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.outflowIBC = await result.result.results[0][0]
        this.loading.outflowIBC = false
      }
    },

    async fetchInflow(path = "transfer/channel-6/uusdc", decimal='6'){
      this.loading.inflowIBC = true
      const token = await getToken(queryInflowIBC(path, decimal), this.$axios, this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.inflowIBC = await result.result.results[0][0]
        this.loading.inflowIBC = false
      }
    },

    async fetchCurrentSupply(path = "transfer/channel-6/uusdc", denom = "uusdc", decimal='6'){
      this.loading.supplyIBC = true
      const token = await getToken(queryCurrentSupplyIBC(path, denom, decimal), this.$axios, this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.supplyIBC = await result.result.results[0][1]
        this.loading.supplyIBC = false
      }
    },
    async fetchDailySupplyIBC(path = "transfer/channel-6/uusdc", denom = "uusdc", decimal='6'){
      this.loading.dailySupplyIBC = true
      const token = await getToken(queryDailySupplyIBC(path, denom, decimal), this.$axios, this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailySupplyIBC = await result.result.results
        this.loading.dailySupplyIBC = false
      }
    },
    async fetchDailyNetflowIBC(path = "transfer/channel-6/uusdc", denom = "uusdc", decimal='6', time="day"){
      this.loading.dailyNetflowIBC = true
      const token = await getToken(queryDailyNetFlowIBC(path, denom, decimal, time), this.$axios, this.$config.apiKey);
      const result = await getData(token.result, this.$axios, this.$config.apiKey)
      if(result && result.status === 200) {
        this.result.dailyNetflowIBC = await result.result.results
        this.loading.dailyNetflowIBC = false
      }
    }
  }
}
</script>

<style>

</style>