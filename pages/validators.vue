<template>
  <div class="min-h-screen w-[80rem] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-3 lg:gap-x-3 ">

            <div class="bg-gray-200 dark:bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
              <template  v-if="!loading.statLoading">
                <div class="font-bold">
                  Total Validator
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Total Validator on terra.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.totalValidator)  }} <span class="text-xs">Validators</span></div>
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
                  Total Luna Staked
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Total Luna Staked on terra mainnet.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.lunaStaked) }} <span class="text-xs">luna</span></div>
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
                  Percentage Luna Staked
                  <span class="group relative">
                    <ion-icon name="alert-circle-sharp"></ion-icon>
                    <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 -left-20 hidden bg-gray-300 dark:bg-slate-900 group-hover:inline-flex">
                      Percentage Luna Staked by total supply on terra mainnet.
                    </div>
                  </span>
                </div>
                <div class="text-2xl font-bold">{{ new Intl.NumberFormat().format(result.percentageStake) }} <span class="text-xs">%</span></div>
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
            Validators
          </div>
          <div class="flex flex-col gap-y-3 overflow-auto">
            <table class="table-auto text-sm">
            <thead>
              <tr class="font-semibold">
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">No</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Validator Name</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Address</th>
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Voting Power</th>
                <!-- <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Unique Delegation</th> -->
                <th class="border-b dark:border-slate-600 font-medium p-3  pt-0 pb-2 text-slate-400 dark:text-slate-200 text-sm text-left">Commissions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left hover:bg-slate-700" v-for="(item, index) in result.listValidators" :key="index">
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ index + 1 }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ item.description.moniker }}</td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400"><a :href="`https://terrasco.pe/mainnet/validator/${item.operator_address}`" target="_blank">{{ item.operator_address.slice(0, 5) + '...' + item.operator_address.slice(-5) }}</a></td>
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ new Intl.NumberFormat().format(item.tokens/1e6) }}</td>
                <!-- <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ new Intl.NumberFormat().format(item.uniqueDelegates) }}</td> -->
                <td class="border-b border-slate-100 text-sm dark:border-slate-700 p-2  text-slate-500 dark:text-slate-400">{{ parseInt(parseFloat(item.commission.commission_rates.rate)*100) }}%</td>
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
  name: 'validators',
  data(){
    return {
      loading: {
        statLoading: true
      },
      result: {
        lunaStaked: null,
        apr: null,
        totalValidator: null,
        listValidators: null,
        percentageStake: null
      }
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    async fetchData(){
      this.loading.statLoading = true
      const data = await this.$axios.get('https://phoenix-lcd.terra.dev/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=999')
      const data2 = await this.$axios.get('https://api.coingecko.com/api/v3/coins/terra-luna-2')
      const totalSupply = data2.data.market_data.total_supply;
      let totalStaked = 0
      data.data.validators.forEach(element => {
        totalStaked += parseInt(element.tokens)
      });
      this.result.lunaStaked = totalStaked/1e6;
      this.result.percentageStake = (this.result.lunaStaked/totalSupply)*100
      this.result.totalValidator = data.data.validators.length;
      this.result.listValidators = data.data.validators.sort((a,b) => parseInt(b.tokens) - parseInt(a.tokens));
      this.loading.statLoading = false
    }
  }
}
</script>

<style>

</style>