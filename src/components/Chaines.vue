<template>
  <div>
    <div class="wrapper">
      <div class="card" v-for="chaine in myListeChaines" :key="chaine.id">
        <!-- <div
          @click="$router.push({ name: 'emissions', params: { prefixUrl: chaine.prefix_url, idChaine: chaine.id }})"
          style="cursor: pointer;"
        >-->
        <div @click="updateSelectedChaine(chaine); $router.push({ name: 'emissions'})" style="cursor: pointer;">
          <img v-bind:src="iconUrl(chaine.logo)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";

export default {
  name: "Chaines",

  data() {
    return {};
  },
  computed: {
    ...mapState({
      myListeChaines: "listeChaines"
    })
  },
  methods: {
    iconUrl(logo) {
      return require("@/assets/" + logo);
    },
    ...mapActions(["updateSelectedChaine"])
  }
};
</script>

<style scoped>
html,
body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}

div#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hotpink {
  background: hotpink;
}

.green {
  background: green;
}

.box {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.wrapper {
  display: flex;
  max-width: 844px;
  flex-wrap: wrap;
  padding-top: 12px;
}

.card {
  /* box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px,
    rgba(0, 0, 0, 0.117647) 0px 1px 4px; */
  max-width: 200px;
  margin: 12px;
  transition: 0.15s all ease-in-out;
  padding: 10px;
}
.card .a {
  text-decoration: none;
  padding: 12px;
  color: #03a9f4;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>