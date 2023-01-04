<template>
  <div class="min-h-screen w-[80rem] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="bg-yellow-600 border-2 border-white/50 p-5 rounded-lg w-full text-sm">
        We remove 
        <a class="underline decoration-solid" href="https://terrasco.pe/mainnet/address/terra1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3nln0mh" target="_blank">terra1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3nln0mh</a> (bonded token pool) and 
        <a class="underline decoration-solid" href="https://terrasco.pe/mainnet/address/terra1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8pm7utl" target="_blank">terra1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8pm7utl</a> (core distributor) address in the rich list  
      </div>  

      <div class="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-3 lg:gap-x-3 ">

            <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
              <template  v-if="!loading.statLoading">
                <div class="font-bold">
                  Top 10
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Top 10 address luna balance percentage of luna supply.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.top10*100)  }} <span class="text-xs">% of supply</span></div>
              </template>
              <template v-else>
                <div class="grid gap-2">
                  <Skeleton width="full" />
                  <Skeleton width="small" />
                </div>
              </template>
            </div>

            <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
              <template  v-if="!loading.statLoading">
                <div class="font-bold">
                  Top 50
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Top 50 address luna balance percentage of luna supply.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.top50*100) }} <span class="text-xs">% of supply</span></div>
              </template>
              <template v-else>
                <div class="grid gap-2">
                  <Skeleton width="full" />
                  <Skeleton width="small" />
                </div>
              </template>
            </div>

            <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
              <template  v-if="!loading.statLoading">
                <div class="font-bold">
                  Top 100
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                     Top 100 address luna balance percentage of luna supply.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.top100*100) }} <span class="text-xs">% of supply</span></div>
              </template>
              <template v-else>
                <div class="grid gap-2">
                  <Skeleton width="full" />
                  <Skeleton width="small" />
                </div>
              </template>
            </div>

      </div>

      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-1 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full  ">
        <template v-if="!loading.statLoading">
          <div class="font-bold text-lg mb-5">
            Top 100 Luna Holders
          </div>
          <div class="flex flex-col gap-y-3 overflow-auto">
            <table class="table-auto text-sm">
            <thead>
              <tr class="font-semibold">
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">No</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Address</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Address Balance</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Stake Balance</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Total Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left hover:bg-slate-700" v-for="(item, index) in result.listAddress.slice(2)" :key="index">
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ index + 1 }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400"><a :href="`https://terrasco.pe/mainnet/address/${item.address}`" target="_blank">{{ item.address.slice(0, 5) + '...' + item.address.slice(-5) }}</a></td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ new Intl.NumberFormat().format(item.addressBalance) }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ new Intl.NumberFormat().format(item.totalStake) }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ new Intl.NumberFormat().format(item.totalBalance) }}</td>
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
export default {
  name: 'rich-list',
  data(){
    return {
      loading: {
        statLoading: true
      },
      result: {
        top10: null,
        top50: null,
        top100: null,
        listAddress: null
      }
    }
  },
  mounted(){
    this.fetchData();
  },
  methods:{
    async fetchData(){
      this.loading.statLoading = true
      const data = await this.$axios.get('https://7nkwv3z5t1.execute-api.us-east-1.amazonaws.com/prod/richlist?pageSize=102&page=1&type=address&key=2mwTEDr9zXJH323M&token=1672811883&app=LUNA')
      this.result.listAddress = data.data.data
      let tokenSupply = parseInt(data.data.coinStat.totalSupply)
      let top10Balance = 0
      let top50Balance = 0
      let top100Balance = 0
      for(let i = 0; i <= 9; i++) {
        top10Balance += this.result.listAddress[i+2].totalBalance
      }
      this.result.top10 = top10Balance/tokenSupply
      for(let i = 0; i <= 49; i++) {
        top50Balance += this.result.listAddress[i+2].totalBalance
      }
      this.result.top50 = top50Balance/tokenSupply

      for(let i = 0; i <= 99; i++) {
        top100Balance += this.result.listAddress[i+2].totalBalance
      }
      console.log(top100Balance);
      console.log(tokenSupply)
      this.result.top100 = top100Balance/tokenSupply
      this.loading.statLoading = false
    }
  }
}
</script>

<style>

</style>