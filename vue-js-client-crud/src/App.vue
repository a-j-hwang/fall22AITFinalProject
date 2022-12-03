<template>
  <div>
    <hr>
    <div class="list-unstyled" v-for="user in users" :key="user._id">
      <li class="media">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{user.username}}</h4>
          <h5 class="mt-0 mb-1">{{user.password}}</h5>

          <br />

        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>

const API_URL = "https://shy-blue-blackbuck-tie.cyclic.app/user";

export default {
  name: "app",
  data: () => ({
    error: "",
    users: []
  }),

  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
      console.log(result);
        this.users = result;
      });
  },
  methods: {}
};
</script>

<style>
</style>
