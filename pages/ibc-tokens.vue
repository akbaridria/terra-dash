<template>
  <div class=" w-[80vw] mx-auto px-5 py-10">
    <div class="flex flex-col gap-y-5">
      <div class="container flex flex-col gap-y-5">
        <div class="flex gap-5 py-5  overflow-x-auto">
          <div class="text-sm flex gap-x-2 items-center px-4 py-2 rounded-xl justify-center bg-slate-700 hover:bg-slate-900 hover:transition-all " v-for="(item, index) in listTokens" :key="index">
            <img width="20" :src="item.icon" alt="">
            {{ item.name }}
          </div>
        </div>
        <div class="grid grid-cols-1 gap-y-5 lg:grid lg:grid-cols-3 lg:gap-x-3 ">
          <div v-for="index in 3" :key="index" class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
            <div class="font-bold">
              Total Contracts Deployed
              <span class="group relative">
                <ion-icon name="alert-circle-sharp"></ion-icon>
                <div class="absolute bottom-8 min-w-[250px] rounded-lg p-2 left-0 hidden bg-slate-900 group-hover:inline-flex">
                  The amount of contracts that deploy on terra mainnet.
                </div>
              </span>
            </div>
            <div class="text-2xl font-bold">750</div>
          </div>
        </div>
      </div>
      <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
        <CreateChart />
        <div>

        </div>
      </div>
      <div class="grid grid-cols-1 gap-y-5 lg:grid-cols-2 gap-x-5">
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <CreateChart />
        </div>
        <div class="bg-slate-900 border-2 border-white/50 p-5 rounded-lg w-full">
          <CreateChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ibc-tokens',
  data(){
    const listTokens = [
      {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
       {
        name: 'axlUSDC',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      }
    ]
    return {
      listTokens
    }
  }
}
</script>

<style>

</style>