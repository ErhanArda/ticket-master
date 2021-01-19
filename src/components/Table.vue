<template>
  <div class="container">
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
    };
  },
  methods: {
    eventDetail(selectEventId) {
      console.log("id", selectEventId);
      this.$store.dispatch("loadEventDetails", selectEventId);
      // this.$store.commit("setEventList", this.Lists);
    },
  },
  computed:{
        ...mapGetters(["getEventList","getEventDetails"]),
  },
  watch: {
    // page() {
    //   this.$store.dispatch("fetchEventList");
    // },
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
