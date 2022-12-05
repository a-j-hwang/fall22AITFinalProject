<template>
  <div>
    <hr>
    <div class="list-unstyled" v-for="user in users" :key="user._id">
      <li class="media">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{user.username}}</h4>
          <h5 class="mt-0 mb-1">{{table.title}}</h5>
          <table>
          <tr v-for="image in images">
            <td>
                      <form @submit="onSubmit">
                        <input type="file" ref="fileInput" />
                        <img :src="`data:image/jpeg;base64,${fileData}`" />
                      </form>
                      <br />
              <img :src="`data:image/jpeg;base64,${image.data}`" />
            </td>
          </tr>
          </table>

        </div>
      </li>
      <hr>
    </div>
  </div>




</template>

<script>
import axios from 'axios';
const API_URL = "https://shy-blue-blackbuck-tie.cyclic.app/user";

export default {
  name: "app",
  data: () => ({
    error: "",
    users: [],
    images: []
  }),
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
      console.log(result);
        this.users = result;
      });

  },
  created() {
    axios.get('/api/image').then(response => {
      this.image = response.data;
    });
  },
  methods: {
  onSubmit() {
    const file = this.$refs.fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      this.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
};
</script>

<style>
</style>
