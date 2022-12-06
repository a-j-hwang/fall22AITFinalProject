<template>

<form @submit.prevent="addTable" class="mb-3">
    <div class="form-element">
     <label for="title">Title</label>
     <input
       v-model="tables.title"
       type="text"

       class="form-control"
       placeholder="Enter title for your table"
       id="title" required>
     </div>

     <div class="form-element" id="usernameForm">
     <label for="username">Username</label>
     <input
       v-model="tables.postedBy"
       type="text"
       class="form-control"
       placeholder="Enter your username"
       id="postedBy" required>
   </div>
     <button type="submit" class="btn btn-primary">Generate a random aesthetic!</button>
   </form>



  <div>
    <hr>
      <li class="media">
        <div class="media-body">
          <div class="list-unstyled" v-for="table in tables" :key="table._id">
            <h1 class="mt-0 mb-1">{{table.title}}</h1>
            <h5 class="mt-0 mb-1">{{table.postedBy}}</h5>
            <h6 class="mt-0 mb-1">{{table.createdAt}}</h6>
          </div>
          <br />
        </div>
      </li>
      <hr>
  </div>
</template>

<script>

const API_URL_TABLEDATA = "https://shy-blue-blackbuck-tie.cyclic.app/table";

export default {
  name: "app",
  data: () => ({
    error: "",
    tables: []
  }),

  mounted() {
    fetch(API_URL_TABLEDATA)
      .then(response => response.json())
      .then(result => {
      console.log(result);
        this.tables = result;
      });

  },
  methods: {
  addTable() {
    console.log(this.tables);
    fetch(API_URL_TABLEDATA, {
      method: "POST",
      body: JSON.stringify(this.tables)
    })
      .then(response => response.json())
      .then(result => {
        if (result.details) {
          // there was an error...
          const error = result.details
            .map(detail => detail.message)
            .join(". ");
          this.error = error;
        } else {
          this.error = "";
          this.showMessageForm = false;
          this.tables.push(result);
        }
      });
  }
  }
};
</script>

<style>

body{
  text-align:center;
  margin:300px;
}


form{
text-align:left;
width:400px;
margin:auto;
}

button{
  margin-top:40px;
  width:300px;
  margin-left:50px;
}



.tableForm{
  width:100px;
  height: 100px;

}

#usernameForm{
  margin-top:20px;
  width:200px;
}

aesTable{
  display: flex;

}

h5, h6{
  margin-left:10px;
}

h6{
  font-size:6px;
  opacity:0.7;
}


</style>
