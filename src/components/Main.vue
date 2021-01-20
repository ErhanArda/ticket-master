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
    <Table :searchText="searchText" />
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
    ...mapGetters(["getEventList"])
  },
  methods: {
    eventDetails(selectEventId) {
      console.log("id", selectEventId);
      this.$store.dispatch("loadEventDetails", selectEventId);
    },
    next() {},
  },
  watch: {
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
