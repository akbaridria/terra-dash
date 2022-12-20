<template>
  <div class=" w-[80vw] mx-auto px-5 py-10">
    <div class="flex flex-col gap-y-5">
      <div class="container flex flex-col gap-y-5">
        <div class="flex gap-5 py-5 px-2  overflow-x-auto">
          <div class="text-sm flex gap-x-2 items-center px-6 py-2 rounded-xl justify-center bg-slate-700 hover:bg-slate-900 hover:transition-all hover:outline hover:outline-offset-2  hover:outline-slate-700 " v-for="(item, index) in listTokens" :key="index">
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
        path: '	transfer/channel-6',
        denom: 'uusdc',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDC.svg'
      },
      {
        name: 'axlUSDT',
        path: 'transfer/channel-6',
        denom: 'uusdt',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlUSDT.svg'
      },
      {
        name: 'Atom',
        path: 'transfer/channel-0',
        denom: 'uatom',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/ATOM.svg'
      },
      {
        name: 'Osmo',
        path: 'transfer/channel-1',
        denom: 'uosmo',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/OSMO.svg'
      },
      {
        name: 'Juno',
        path: 'transfer/channel-2',
        denom: 'ujuno',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/JUNO.svg'
      },
       {
        name: 'Secret ',
        path: 'transfer/channel-3',
        denom: 'uscrt',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/SCRT.svg'
      },
      {
        name: 'Graviton',
        path: 'transfer/channel-4',
        denom: 'ugraviton',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/GRAV.svg'
      },
      {
        name: 'Evmos',
        path: 'transfer/channel-5',
        denom: 'aevmos',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/EVMOS.svg'
      },
      {
        name: 'axlFrax',
        path: 'transfer/channel-6',
        denom: 'frax-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlFRAX.svg'
      },
      {
        name: 'axlAVAX',
        path: 'transfer/channel-6',
        denom: 'wavax-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/wAVAX.png'
      },
       {
        name: 'axlBTC',
        path: 'transfer/channel-6',
        denom: 'wbtc-satoshi',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlWBTC.svg'
      },
      {
        name: 'axlETH',
        path: 'transfer/channel-6',
        denom: 'weth-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlETH.svg'
      },
       {
        name: 'axlMatic',
        path: 'transfer/channel-6',
        denom: 'wmatic-wei',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/axlMATIC.svg'
      },
      {
        name: 'USK',
        path: 'transfer/channel-10',
        denom: 'factory:kujira1qk00h5atutpsv900x202pxx42npjr9thg58dnqpa72f2p7m2luase444a7:uusk',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/USK.svg'
      },
      {
        name: 'Kujira',
        path: 'transfer/channel-10',
        denom: 'ukuji',
        icon: 'https://extraterra-assets.s3.us-east-2.amazonaws.com/images/SVG/KUJI.svg'
      },
    ]
    return {
      listTokens
    }
  }
}
</script>

<style>

</style>