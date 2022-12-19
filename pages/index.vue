<template>
  <div class="min-h-screen w-[80vw] mx-auto px-5 py-20">
    <div class="container flex flex-col gap-y-5">
      <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-3 lg:gap-x-3 ">
        <div v-for="index in 3" :key="index" class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <div class="font-bold">
            Total Contracts Deployed
             <span class="group relative">
              <ion-icon name="alert-circle-sharp"></ion-icon>
              <div class="absolute text-sm font-normal bottom-8 min-w-[220px] rounded-lg p-2 left-0 hidden bg-slate-900 group-hover:inline-flex">
                The amount of contracts that deploy on terra mainnet.
              </div>
            </span>
          </div>
          <div class="text-2xl font-bold">750</div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-y-5 md:grid md:grid-cols-1 md:gap-y-5 lg:grid lg:grid-cols-3 gap-x-5">
        <div class="bg-slate-900 lg:col-span-2 border-2 border-white/50 p-5 rounded-lg w-full">
          <CreateChart />
          <div>
            
          </div>
          <div class="grid grid-cols-3 gap-x-2 bg-slate-700 p-1 mt-2 rounded-lg w-fit mx-auto justify-end self-end">
            <div class="p-2 rounded-lg text-sm text-center bg-slate-900 hover:bg-slate-900 hover:transition-all">Day</div>
            <div class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Week</div>
            <div class="p-2 rounded-lg text-sm text-center hover:bg-slate-900 hover:transition-all">Month</div>
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
export default {
  name: 'IndexPage'
}
</script>
