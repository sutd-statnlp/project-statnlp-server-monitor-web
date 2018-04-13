<template>
  <div class="">
    <aside id="leftsidebar" class="sidebar m-sidenav">
    <!-- Menu -->
        <div class="menu">
            <ul class="list">
                <li class="active"></li>
                <SidebarItem title="Dashboard" icon="dashboard" isActive="true" />
                <SidebarItem title="CPU" icon="developer_board" link="/cpu" />
                <SidebarItem title="Memory" icon="memory" link="/memory" />
                <SidebarItem title="GPU" icon="grain" link="/gpu" />
                <SidebarItem title="Host" icon="dns" link="/host" />
                <SidebarItem title="Load" icon="line_style" link="/load" />
                <SidebarItem title="Disk" icon="storage" link="/disk" />
                <SidebarItem title="Network" icon="network_cell" link="/network" />
            </ul>
        </div>
        <!-- #Menu -->
        <LegalFooter />
    </aside>
  </div>
</template>

<script>
import SidebarItem from '@/components/SidebarItem'
import LegalFooter from '@/components/LegalFooter'
export default {
  components: {
    SidebarItem,
    LegalFooter
  },
  name: 'Sidebar',
  data () {
    return {
    }
  },
  mounted () {
    let js = document.createElement('script')
    js.setAttribute('src', './static/js/admin.js')
    document.body.appendChild(js)

    $('.m-sidenav ul li').click(function () {
      $('.m-sidenav ul li').removeClass('active')
      $(this).addClass('active')
    })

    let currentPath = '#' + this.$route.path
    $('.m-sidenav ul li').each(function () {
      let itemPath = $(this).find('a').attr('href')
      if (currentPath === itemPath) {
        $('.m-sidenav ul li').removeClass('active')
        $(this).addClass('active')
      }
    })
  }
}
</script>

<style scoped>

</style>
