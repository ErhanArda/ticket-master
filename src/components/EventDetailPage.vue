<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand">Ticket Master</a>
    <button class="btn btn-primary sm" @click="home">Back to Home</button>
  </nav>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Names</th>
          <th scope="col">Status</th>
          <th scope="col">Info</th>
          <th scope="col">Price</th>
          <th scope="col">İmages</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>{{ getEventDetails.name }}</td>
          <td>{{ getEventDetails.dates.status.code }}</td>
          <td>{{ getEventDetails.info || "NO INFO" }}</td>
          <td>{{ priceRange || "NO INFO" }}</td>
          <td>
            <img
              :src="getEventDetails.images[0].url"
              class="img-thumbnail"
              alt="..."
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getEventDetails"]),
    priceRange() {
      if (this.getEventDetails.priceRanges == undefined) {
        return "NO INFO";
      } else {
        let range = `${this.getEventDetails.priceRanges[0].min} - ${this.getEventDetails.priceRanges[0].max} ${this.getEventDetails?.priceRanges[0].currency}`;
        return range;
      }
    },
  },
  methods: {
    home() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.img-thumbnail {
  width: 10vw;
}
</style>
