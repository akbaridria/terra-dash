<template>
  <div :class="$store.state.theme === 'light' ? 'light': 'dark'">
    <div class="min-h-screen font-roboto flex dark:bg-slate-800 dark:text-white">
      <Header :theme="theme" @changeTheme="changeTheme($event)" />

      <Nuxt />
      
      <!-- <Footer /> -->
    </div>


    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
  </div>
  
</template>

<script>
export default {
  name: 'default-layout',
  methods: {
    changeTheme(){
      if(this.$store.state.theme === 'dark') {
       this.$store.commit('SET_THEME', 'light')
      } else {
        this.$store.commit('SET_THEME', 'dark')
      }
    }
  }
}

</script>



<style>

</style>