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

</style>
