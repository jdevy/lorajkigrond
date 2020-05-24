<template>
  <div class="flex pa1 justify-between nowrap orange">
    <div class="flex flex-fixed black">
      <div class="fw7 mr1">Hacker News</div>
      <router-link to="/" class="ml1 no-underline black">list</router-link>
      <div class="flex">
        <div class="ml1">|</div>
        <router-link to="/create" class="ml1 no-underline black">create</router-link>
      </div>
    </div>
    <div class="flex flex-fixed">
      <router-link to="/login" class="ml1 no-underline black">login &nbsp;</router-link>
      <span style="color:black;">The date stored in Vuex is {{ year }}-{{ month }}-{{ day }}.</span>
    </div>
  </div>
</template>

<script>
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings'
import { mapState } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['year', 'month', 'day'])
  },
  methods: {
    logout () {
      localStorage.removeItem(GC_USER_ID)
      localStorage.removeItem(GC_AUTH_TOKEN)
    }
  }
}
</script>
