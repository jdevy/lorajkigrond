<template>
  <div id="app">
    <div class="search-wrapper">
      <label>Search title :</label>
      <input type="text" v-model="search" placeholder="Search title.." />
    </div>
    <div class="wrapper">
      <div class="card" v-for="emission in filteredList" :key="emission.uri">
        <div @click="go(emission)" style="cursor: pointer;">
          <span>{{ emission.titre }}</span>
        </div>
      </div>
    </div>
    <br />

    <!-- <ApolloQuery :query="require('../constants/graphql')" :variables="{url: this.myUrl, first:10}"> -->
    <div v-if="this.selectedEmission.uri">
      <ApolloQuery
        :query="this.theLastDiffusions"
        :variables="{url: this.myUrl, first:$options.pageSize, after: ''}"
      >
        <template v-slot="{ result: { error, data }, isLoading, query }">
          <!-- Loading -->
          <div v-if="isLoading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred {{ error }} {{ myUrl }}</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <emissions :emissions="data.diffusionsOfShowByUrl.edges"></emissions>
            <button v-if="hasPrevious()" @click="loadMore(query, getPreviousCursor(data))">Prev</button>
            <button v-if="hasMore(data)" @click="loadMore(query, getNextCursor(data))">Next</button>
          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>

    <br />
  </div>
</template>

<script>
/* eslint-disable */
import Emissions from "./Emissions";
import { mapState } from "vuex";
import { LAST_DIFFUSIONS, PAGE_SIZE } from "../constants/graphql";
import graphqlClient from "../utils/graphql";

export default {
  pageSize: 10,
  name: "LinkList",
  data() {
    return {
      search: "",
      theLastDiffusions: LAST_DIFFUSIONS,
      selectedEmission: { uri: "", titre: "" },
      loading: 0,
      cursors: [],
      isGoingAhead: true
    };
  },
  components: {
    Emissions
  },
  methods: {
    go(emission) {
      console.log("j'ai cliqué " + emission.uri);
      graphqlClient.clearStore().then(() => {
        this.cursors = [];
        this.selectedEmission = emission;
      });
    },
    async loadMore(query, pCursor) {
      await query.fetchMore({
        variables: {
          after: pCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return fetchMoreResult ? fetchMoreResult : previousResult;
        }
      });
    },
    getNextCursor(currentData) {
      if (this.cursors.length == 0) {
        this.cursors.push("");
      }
      var tCursor =
        currentData.diffusionsOfShowByUrl.edges[PAGE_SIZE - 1].cursor;
      this.cursors.push(tCursor);
      this.isGoingAhead = true;
      return tCursor;
    },
    getPreviousCursor(currentData) {
      if (this.isGoingAhead) {
        this.cursors.pop();
        this.isGoingAhead = false;
      }
      return this.cursors.pop();
    },
    hasPrevious() {
      return this.cursors.length > 0;
    },
    hasMore(currentData) {
      return this.getCurrentListLength(currentData) == PAGE_SIZE;
    },
    getCurrentListLength(currentData) {
      var len = 0;
      if (this.listIsNotEmpty(currentData)) {
        len = currentData.diffusionsOfShowByUrl.edges.length;
      }
      return len;
    },
    listIsNotEmpty(currentData) {
      return (
        currentData &&
        currentData.diffusionsOfShowByUrl &&
        currentData.diffusionsOfShowByUrl.edges.length > 0
      );
    }
  },
  mounted() {
    console.log("prefix " + this.myCurrentPrefixUrl);
    if (!this.myCurrentPrefixUrl) {
      window.location.href = "/"; // si refresh, retour à la liste
    }
  },
  computed: {
    ...mapState({
      mylistEmission: "listeChaineChoisie",
      myCurrentPrefixUrl: "currentPrefixUrl"
    }),
    myUrl() {
      console.log(
        "prefix " + this.myCurrentPrefixUrl + " - " + this.selectedEmission.uri
      );
      return (
        this.myCurrentPrefixUrl +
        (this.selectedEmission != null
          ? this.selectedEmission.uri
          : "emissions/remede-a-la-melancolie")
      );
    },
    filteredList() {
      return this.mylistEmission.filter(emission => {
        return emission.titre.toLowerCase().includes(this.search.toLowerCase());
      });
    }
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

.search-wrapper1 {
  position: relative;
  position: absolute;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  top: 8px;
  left: 12px;
  z-index: -1;
  transition: 0.15s all ease-in-out;
}

.wrapper {
  display: flex;
  max-width: 844px;
  flex-wrap: wrap;
  padding-top: 12px;
}

.card {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px,
    rgba(0, 0, 0, 0.117647) 0px 1px 4px;
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