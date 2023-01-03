<template>
  <div class="sticky top-0 h-screen w-[16vw] flex flex-col justify-between border-r-2 border-slate-700/50">
    <div>
    <div class="flex items-center gap-x-2 text-lg px-5 pt-10 pb-5 mb-5">
        <!-- <img width="80px" class="hidden lg:inline-flex" src="@/assets/images/terra-black.svg" alt="terra-logo"> -->
        <img width="20rem" src="@/assets/images/terra-logo-mobile.svg" alt="terra-logo">
        <div class="text-2xl font-bold hidden lg:inline-flex">TerraDash</div>
        <!-- <div class="text-2xl font-bold lg:hidden">TD</div> -->

    </div>
    <div class="px-5 py-5 text-black/50 dark:text-white/50 hidden lg:inline-flex">
        Dashboard
    </div>
    <div class="flex flex-col">
        <NuxtLink :class="{'bg-gray-200 dark:bg-slate-700': $route.path === item.link}" :to="`${item.link}`" v-for="(item, index) in listMenu" :key="index" class="px-5 py-5 flex items-center gap-x-3 dark:hover:bg-slate-700 hover:bg-gray-200 hover:transition-all">
            <ion-icon :name="item.icon"></ion-icon>
            <div class="hidden lg:inline-flex">{{ item.title }}</div>
        </NuxtLink> 
    </div>
    </div>
    <div  class="p-5">
       <ion-icon class="cursor-pointer" @click="$emit('changeTheme')" :key="theme" :name="theme === 'dark' ? 'moon' : 'sunny'"></ion-icon>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        theme: {
            type: String,
            required: false,
            default: 'dark'
        }
    },
    data(){
        const listMenu = [
            {
                title: 'Network Stats',
                icon: 'podium-sharp',
                link: '/'
            },
            {
                title: 'Wallets',
                icon: 'wallet-sharp',
                link: '/wallets'
            },
            {
                title: 'Contracts',
                icon: 'document',
                link: '/contracts'
            },
            {
                title: 'IBC Tokens',
                icon: 'share-social',
                link: '/ibc-tokens'
            },
            {
                title: 'Dex Screener',
                icon: 'swap-horizontal-sharp',
                link: '/dex'
            },
            {
                title: 'Cex Screener',
                icon: 'globe-sharp',
                link: '/cex'
            }
        ]
        return {
            listMenu
        }
    },
}
</script>

<style>

</style>