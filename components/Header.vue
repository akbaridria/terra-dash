<template>
  <div class="sticky top-0 h-screen w-[16vw] flex flex-col justify-between border-r-2 border-slate-700/50">
    <div>
    <div class="flex items-center justify-between text-lg p-5 mb-5">
        <img width="80px" src="@/assets/images/terra-black.svg" alt="terra-logo">
    </div>
    <div class="px-5 py-3 text-white/50">
        Dashboard
    </div>
    <div class="flex flex-col">
        <div v-for="(item, index) in listMenu" :key="index" class="px-5 py-3 flex items-center gap-x-3 hover:bg-slate-900" :class="index === 0 ? 'bg-slate-900' : null">
            <ion-icon :name="item.icon"></ion-icon>
            <div>{{ item.title }}</div>
        </div> 
    </div>
    </div>
    <div class="p-5">
       <ion-icon name="moon"></ion-icon>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
    data(){
        const listMenu = [
            {
                title: 'Network Stats',
                icon: 'podium-sharp',
                link: ''
            },
            {
                title: 'Contracts',
                icon: 'document',
                link: 'contracts'
            },
            {
                title: 'IBC Tokens',
                icon: 'share-social',
                link: 'ibc-tokens'
            },
            {
                title: 'Dex Screener',
                icon: 'swap-horizontal-sharp',
                link: 'dex'
            },
            {
                title: 'Cex Screener',
                icon: 'globe-sharp',
                link: 'cex'
            }
        ]
        return {
            listMenu
        }
    }
}
</script>

<style>

</style>