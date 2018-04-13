<template>
  <div id="app">
    <PageLoad/>
    <div class="overlay"></div>
    <Navbar/>
    <section>
        <Sidebar/>
    </section>
    <section class="content">
       <router-view/>
    </section>
    <Footer/>
  </div>
</template>

<script>
import PageLoad from '@/components/PageLoad'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default {
  components: {
    PageLoad,
    Navbar,
    Sidebar,
    Footer
  },
  name: 'App'
}
</script>

<style>
  #nprogress .bar { background: white !important; }
  #nprogress .peg { box-shadow: 0 0 10px white, 0 0 5px white !important; }
  #nprogress .spinner-icon { border-top-color: white !important; border-left-color: white !important; }
</style>
