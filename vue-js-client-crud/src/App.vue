<template>
  <div>
    <hr>
    <div class="list-unstyled" v-for="user in users" :key="user._id">
      <li class="media">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{user.username}}</h4>

          <div class="list-unstyled" v-for="table in tables" :key="table._id">
            <h5 class="mt-0 mb-1">{{table.title}}</h5>
          </div>
          <br />
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>

const API_URL_USERDATA = "https://shy-blue-blackbuck-tie.cyclic.app/user";
const API_URL_TABLEDATA = "https://shy-blue-blackbuck-tie.cyclic.app/table";

export default {
  name: "app",
  data: () => ({
    error: "",
    users: [],
    tables: []
  }),

  mounted() {
    fetch(API_URL_USERDATA)
      .then(response => response.json())
      .then(result => {
      console.log(result);
        this.users = result;
      });
    fetch(API_URL_TABLEDATA)
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
