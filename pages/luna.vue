<template>
<div class="min-h-screen w-[80rem] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-3 lg:gap-x-3 ">

            <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
              <template  v-if="!loading.statLoading">
                <div class="font-bold">
                  Luna Price
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Luna price in USD
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.price)  }} <span class="text-xs">USD</span></div>
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
                  Total Supply
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Total Supply of Luna.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.supply) }} <span class="text-xs">luna</span></div>
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
                  Circulating Supply
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Circulating supply of luna.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.circulating) }} <span class="text-xs">luna</span></div>
              </template>
              <template v-else>
                <div class="grid gap-2">
                  <Skeleton width="full" />
                  <Skeleton width="small" />
                </div>
              </template>
            </div>

      </div>

      <div class="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-2 lg:gap-x-3 ">

            <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
              <template  v-if="!loading.statLoading">
                <div class="font-bold">
                  Luna Marketcap
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Luna marketcap in USD.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.marketcap)  }} <span class="text-xs">USD</span></div>
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
                  Fully diluted valuation (FDV) 
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Fully diluted valuation (FDV) of Luna on terra mainnet.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.fdv)  }} <span class="text-xs">USD</span></div>
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

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-full ">
        <template v-if="!loading.historyPrice">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.historyPrice" :typeChart="'area'" title="Daily Luna Price" height="400" />
        </template>
        <div v-else class="grid gap-y-3 " >
            <Skeleton />
            <Skeleton height="big" width="full" />  
          </div>  
        </div>

      </div>

      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-1 lg:gap-x-5">

        <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full h-full ">
        <template v-if="!loading.historyPrice">
          <CreateChart :key="$store.state.theme"  :dataSeries="result.historyMarketcap" :typeChart="'area'" title="Daily Luna Marketcap" height="400" />
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
  name: 'luna',
  data(){
    return {
      loading: {
        statLoading: true,
        historyPrice: true
      },
      result: {
        price: null,
        supply: null,
        circulating: null,
        marketcap: null,
        fdv: null,
        historyPrice: null,
        historyMarketcap: null
      }
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    async fetchData(){
      this.loading.statLoading = true
      const data = await this.$axios.get('https://api.coingecko.com/api/v3/coins/terra-luna-2')
      this.result.price = data.data.market_data.current_price.usd;
      this.result.circulating = data.data.market_data.circulating_supply;
      this.result.supply = data.data.market_data.total_supply;
      this.result.marketcap = data.data.market_data.market_cap.usd;
      this.result.fdv = data.data.market_data.fully_diluted_valuation.usd;
      this.loading.statLoading = false
      this.loading.historyPrice = true
      const dataPrice = await this.$axios.get('https://api.coingecko.com/api/v3/coins/terra-luna-2/market_chart?vs_currency=usd&days=max&interval=daily');
      this.result.historyPrice = dataPrice.data.prices
      this.result.historyMarketcap = dataPrice.data.market_caps
      this.loading.historyPrice = false
    }
  }
}
</script>

<style>

</style>