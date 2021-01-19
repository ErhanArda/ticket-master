<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand">Ticket Master</a>

      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        v-model="searchText"
      />

    </nav>
    <Table />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash/debounce";
import Table from "./Table";

export default {
  components: {
    Table,
  },
  data() {
    return {
      searchText: "",
      space: {},
    };
  },

  computed: {
    ...mapGetters(["getEventList"]),
    // page: {
    //   get() {
    //     return this.$store.getters.getPage;
    //   },
    //   set(value) {
    //     return this.$store.commit("setPage", value);
    //   },
    // },
  },
  methods: {
    eventDetails(selectEventId) {
      console.log("id", selectEventId);
      this.$store.dispatch("loadEventDetails", selectEventId);
    },
  },
  watch: {
    // page() {
    //   this.$store.dispatch("fetchEventList");
    // },
    searchText: debounce(function(newVal) {
      if (newVal) {
        this.$store.dispatch("fetchEventList", newVal);
        this.searchText = "";
        console.log("newVal: ", newVal);
      }
    }, 2000),
  },
};
</script>

<style scoped></style>
