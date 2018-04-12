import Vue from 'vue'
import Router from 'vue-router'
import DashboardPage from '@/pages/DashboardPage'
import CpuPage from '@/pages/CpuPage'
import MemoryPage from '@/pages/MemoryPage'
import HostPage from '@/pages/HostPage'
import LoadPage from '@/pages/LoadPage'
import DiskPage from '@/pages/DiskPage'
import NetworkPage from '@/pages/NetworkPage'
import AppsPage from '@/pages/AppsPage'
import GpuPage from '@/pages/GpuPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashboardPage',
      component: DashboardPage
    },
    {
      path: '/cpu',
      name: 'CpuPage',
      component: CpuPage
    },
    {
      path: '/memory',
      name: 'MemoryPage',
      component: MemoryPage
    },
    {
      path: '/host',
      name: 'HostPage',
      component: HostPage
    },
    {
      path: '/load',
      name: 'LoadPage',
      component: LoadPage
    },
    {
      path: '/disk',
      name: 'DiskPage',
      component: DiskPage
    },
    {
      path: '/network',
      name: 'NetworkPage',
      component: NetworkPage
    },
    {
      path: '/apps',
      name: 'AppsPage',
      component: AppsPage
    },
    {
      path: '/gpu',
      name: 'GpuPage',
      component: GpuPage
    }
  ]
})
