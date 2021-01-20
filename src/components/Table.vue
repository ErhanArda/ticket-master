<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary sm mr-auto" @click="prev">Prev</button>
      <p class="mx-auto">{{ getPage.number }}</p>
      <button class="btn btn-primary sm" @click="next">Next</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(selectEvent, index) in getEventList" :key="selectEvent.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ selectEvent.name }}</td>
          <td>{{ selectEvent.dates.start.localDate }}</td>
          <td>
            <button
              class="btn btn-primary sm"
              @click="eventDetail(selectEvent.id)"
            >
              detail page
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      Lists: [],
      count: 1,
    };
  },
  methods: {
    eventDetail(selectEventId) {
      console.log("id", selectEventId);
      this.$store.dispatch("loadEventDetails", selectEventId);
      // this.$store.commit("setEventList", this.Lists);
    },
    prev() {
      let nextPage = (this.count -= 1);
      this.$store.dispatch("nextEventList", nextPage);
    },
    next() {
      let nextPage = (this.count += 1);
      this.$store.dispatch("nextEventList", nextPage);
    },
  },
  computed: {
    ...mapGetters(["getEventList", "getEventDetails", "getPage"]),
  },
  watch: {
    async getEventDetails() {
      Object.keys(this.getEventDetails).length > 0
        ? this.$router.push({
            path: `/event-detail/${this.getEventDetails.id}`,
          })
        : console.log("WRONG WAY!");
    },
  },
};
</script>

<style scoped></style>
