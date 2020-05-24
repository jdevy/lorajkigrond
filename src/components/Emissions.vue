<template>
  <div v-if="emissions">
    <div v-for="item in emissions" :key="item.cursor">
      <div>
        {{ $moment(item.node.published_date * 1000).format("ddd DD-MM-YYYY") }} -
        {{ item.node.title }} -
        <a v-if="item.node.podcastEpisode" v-bind:href="item.node.url">emission</a> -
        <a v-if="item.node.podcastEpisode" v-bind:href="item.node.podcastEpisode.url">podcast</a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Emissions",
  props: ["emissions"],
};
</script>