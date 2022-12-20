<template>
  <div class="min-h-screen w-[80rem] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-3 lg:gap-x-3 ">

        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
        <template  v-if="!loading.totalContract">
          <div class="font-bold">
            Total Contracts Deployed
             <span class="group relative">
              <ion-icon name="alert-circle-sharp"></ion-icon>
              <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-slate-900 group-hover:inline-flex">
                The amount of contracts that deploy on terra mainnet.
              </div>
            </span>
          </div>
          <div class="text-2xl font-bold">{{ result.totalContract }}</div>
        </template>
        <template v-else>
          <div class="grid gap-2">
            <Skeleton width="full" />
            <Skeleton />
          </div>
        </template>
        </div>

        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.totalConatract7d">
            <div class="font-bold">
              Total Contracts Deployed (7d)
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-slate-900 group-hover:inline-flex">
                  The amount of contracts that deploy on terra mainnet for the last 7 days.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ result.totalConatract7d }} <span :class="{'text-sm': true, 'text-red-600': result.rateTotalContract7d < 0, 'text-green-600': result.rateTotalContract7d > 0}"> {{ parseFloat(result.rateTotalContract7d).toFixed(2) }} % </span> </div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton />
            </div>
          </template>
        </div>

        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <template  v-if="!loading.totalContractCreator">
            <div class="font-bold">
              Total Contract Creators
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-slate-900 group-hover:inline-flex">
                  Total unique wallet address that create contract on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">{{ result.totalContractCreator }} </div>
          </template>
          <template v-else>
            <div class="grid gap-2">
              <Skeleton width="full" />
              <Skeleton />
            </div>
          </template>
        </div>

      </div>
      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit ">
          <CreateChart v-if="!loading.dailyContracts" :dataSeries="result.dailyContracts" :typeChart="'bar'" title="Daily Contract Deployed" />
          <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>
          <div>
          </div>
          <div class="grid grid-cols-3 gap-x-2 bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-slate-900' : timeRangeDaily === 'day'}" @click="timeRangeDaily = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-slate-900' : timeRangeDaily === 'week'}" @click="timeRangeDaily = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-slate-900' : timeRangeDaily === 'month'}" @click="timeRangeDaily = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Month</div>
          </div>  
        </div>
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit ">
          <CreateChart v-if="!loading.cumulativeContract" :dataSeries="result.cumulativeContract" :typeChart="'area'" title="Cumulative Contract Deployed" />
          <div v-else class="grid gap-y-3 " >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>
          <div>
          </div>
          <div class="grid grid-cols-3 gap-x-2 bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end cursor-pointer">
            <div :class="{'bg-slate-900' : timeRangeCumulative === 'day'}" @click="timeRangeCumulative = 'day'" class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Day</div>
            <div :class="{'bg-slate-900' : timeRangeCumulative === 'week'}" @click="timeRangeCumulative = 'week'" class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Week</div>
            <div :class="{'bg-slate-900' : timeRangeCumulative === 'month'}" @click="timeRangeCumulative = 'month'" class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Month</div>
          </div>  
        </div>
      </div>
      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit ">
        <template v-if="!loading.topCreator">
          <div class="font-bold text-lg mb-5">
            Top Contract Creators
          </div>
          <div class="flex flex-col gap-y-3">
            <table class="table-auto text-sm">
            <thead>
              <tr class="font-semibold">
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">No</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Address</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Contract Deployed</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left hover:bg-slate-700" v-for="(item, index) in result.topCreator" :key="index">
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ index + 1 }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400"><a :href="`https://terrasco.pe/mainnet/address/${item[0]}`" target="_blank">{{ item[0].slice(0, 5) + '...' + item[0].slice(-5) }}</a></td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ item[1] }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </template>
        <div v-else class="grid gap-y-3 " >
            <Skeleton />
            <Skeleton height="big" width="full" />
        </div>
        </div>

        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-fit overflow-x-auto">
          <template v-if="!loading.trendingContract">
          <div class="font-bold text-lg mb-5">
            Trending Contract To Interact (7d)
          </div>
          <div class="flex flex-col gap-y-3">
            <table class="table-auto text-sm">
            <thead>
              <tr class="font-semibold">
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">No</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Contract_address</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Label</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Total Executed</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left hover:bg-slate-700" v-for="(item, index) in result.trendingContract" :key="index">
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ index + 1 }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400"><a :href="`https://terrasco.pe/mainnet/address/${item[0]}`" target="_blank">{{ item[0].slice(0, 5) + '...' + item[0].slice(-5) }}</a></td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ item[1] }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ item[2] }}</td>
              </tr>
            </tbody>
          </table>
          </div>
          </template>
          <div v-else class="grid gap-y-3 " >
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
  queryTotalContracts, 
  queryTotalContracts7d, 
  queryTotalContractsPrev7d, 
  queryTotalContractCreator, 
  queryDailyContract,
  queryCumulativeContract,
  queryTopCreatorContract,
  queryTrendinContract
} from '../utils/dataQuery'

export default {
  name: 'IndexPage',
  data(){
    return {
      timeRangeDaily:'day',
      timeRangeCumulative: 'day',
      loading: {
        totalContract: false,
        totalConatract7d: false,
        totalContractCreator: false,
        dailyContracts: false,
        cumulativeContract: false,
        topCreator: false,
        trendingContract: false,
      },
      result: {
        totalContract: null,
        totalConatract7d: null,
        rateTotalContract7d: null,
        totalContractCreator: null,
        dailyContracts: null,
        cumulativeContract: null,
        topCreator: null,
        trendingContract: null
      }
    }
  },
  watch: {
    timeRangeCumulative(newValue) {
      this.fetchCumulativeContract(newValue)
    },
    timeRangeDaily(newValue) {
      this.fetchDailyContract(newValue)
    }
  },
  mounted(){
     this.fetchTotalContracts();
     this.fetchTotalContract7d();
     this.fetchTotalContractCreator();
     this.fetchDailyContract();
     this.fetchCumulativeContract();
     this.fetchTopCreator();
     this.fetchTrendingContract();
  },
  methods: {

    async fetchTrendingContract(){
      this.loading.trendingContract = true
      const token = await getToken(queryTrendinContract, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.trendingContract = result.result.results
        this.loading.trendingContract = false
      }
    },

    async fetchTopCreator(){
      this.loading.topCreator = true
      const token = await getToken(queryTopCreatorContract, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.topCreator = result.result.results
        this.loading.topCreator = false
      }
    },

    async fetchCumulativeContract(time = 'day'){
      this.loading.cumulativeContract = true
      const token = await getToken(queryCumulativeContract(time), this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.cumulativeContract = result.result.results
        this.loading.cumulativeContract = false
      }
    },
    async fetchDailyContract(time = 'day'){
      this.loading.dailyContracts = true
      const token = await getToken(queryDailyContract(time), this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.dailyContracts = result.result.results
        this.loading.dailyContracts = false
      }
    },

    async fetchTotalContracts() {
      this.loading.totalContract = true
      const token = await getToken(queryTotalContracts, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.totalContract = result.result.results[0][0]
        this.loading.totalContract = false
      }
    },

    async fetchTotalContractCreator() {
      this.loading.totalContractCreator = true
      const token = await getToken(queryTotalContractCreator, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.totalContractCreator = result.result.results[0][0]
        this.loading.totalContractCreator = false
      }
    },

    async fetchTotalContract7d(){
      this.loading.totalConatract7d = true
      const token = await getToken(queryTotalContracts7d, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result && result.status === 200) {
        this.result.totalConatract7d = result.result.results[0][0]
        const tokenPrev = await getToken(queryTotalContractsPrev7d, this.$axios);
        const resultPrev = await getData(tokenPrev.result, this.$axios)
        if(resultPrev.status === 200) {
          this.result.rateTotalContract7d = ((this.result.totalConatract7d - resultPrev.result.results[0][0])/resultPrev.result.results[0][0])*100
          this.loading.totalConatract7d = false
        }
      }
    }
  }
}
</script>
