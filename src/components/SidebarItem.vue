<template>
  <li class="waves-effect waves-block" :class="isActive ? 'active' : ''">
   <router-link :to="link">
        <i class="material-icons">{{icon}}</i>
        <span>{{title}}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    title: {
      required: true
    },
    icon: {
      required: true
    },
    isActive: {
      default: false
    },
    link: {
      default: '/'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
