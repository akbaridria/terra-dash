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
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <CreateChart v-if="!loading.dailyContracts" :dataSeries="result.dailyContracts" :typeChart="'bar'" />
          <div v-else class="grid gap-y-3" >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>
          <div>
          </div>
          <div class="grid grid-cols-3 gap-x-2 bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end">
            <div class="p-2 rounded-lg text-sm text-center bg-slate-900 hover:bg-slate-900 hover:transition-all">Day</div>
            <div class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Week</div>
            <div class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Month</div>
          </div>  
        </div>
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <CreateChart v-if="!loading.dailyContracts" :dataSeries="result.dailyContracts" :typeChart="'bar'" />
          <div v-else class="grid gap-y-3 " >
            <Skeleton />
            <Skeleton height="big" width="full" />
          </div>
          <div>
          </div>
          <div class="grid grid-cols-3 gap-x-2 bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end">
            <div class="p-2 rounded-lg text-sm text-center bg-slate-900 hover:bg-slate-900 hover:transition-all">Day</div>
            <div class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Week</div>
            <div class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Month</div>
          </div>  
        </div>
      </div>
      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full ">
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
              <tr class="text-left hover:bg-slate-700" v-for="index in 10" :key="index">
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ index }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">terraasd...1234asd</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">90</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full ">
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
              <tr class="text-left hover:bg-slate-700" v-for="index in 10" :key="index">
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ index }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">terraasd...1234asd</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">90</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken, getData} from '../utils/index'
import {queryTotalContracts, queryTotalContracts7d, queryTotalContractsPrev7d, queryTotalContractCreator, queryDailyContract} from '../utils/dataQuery'
export default {
  name: 'IndexPage',
  data(){
    return {
      loading: {
        totalContract: false,
        totalConatract7d: false,
        totalContractCreator: false,
        dailyContracts: false
      },
      result: {
        totalContract: null,
        totalConatract7d: null,
        rateTotalContract7d: null,
        totalContractCreator: null,
        dailyContracts: null
      }
    }
  },
  mounted(){
     this.fetchTotalContracts();
     this.fetchTotalContract7d();
     this.fetchTotalContractCreator();
     this.fetchDailyContract()
  },
  methods: {

    async fetchDailyContract(){
      this.loading.dailyContracts = true
      const token = await getToken(queryDailyContract, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result.status === 200) {
        this.result.dailyContracts = result.result.results
        console.log(this.result.dailyContracts);
        this.loading.dailyContracts = false
      }
    },

    async fetchTotalContracts() {
      this.loading.totalContract = true
      const token = await getToken(queryTotalContracts, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result.status === 200) {
        this.result.totalContract = result.result.results[0][0]
        this.loading.totalContract = false
      }
    },

    async fetchTotalContractCreator() {
      this.loading.totalContractCreator = true
      const token = await getToken(queryTotalContractCreator, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result.status === 200) {
        this.result.totalContractCreator = result.result.results[0][0]
        this.loading.totalContractCreator = false
      }
    },

    async fetchTotalContract7d(){
      this.loading.totalConatract7d = true
      const token = await getToken(queryTotalContracts7d, this.$axios);
      const result = await getData(token.result, this.$axios)
      if(result.status === 200) {
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
