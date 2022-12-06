<template>

<form @submit.prevent="addTable" class="mb-3">
    <div class="form-element">
     <label for="title">Title</label>
     <input
       v-model="table.title"
       type="text"

       class="form-control"
       placeholder="Enter title for your table"
       id="title" required>
     </div>

     <div class="form-element" id="usernameForm">
     <label for="username">Username</label>
     <input
       v-model="table.postedBy"
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
            <div class="flexbox">
            <div v-for="(image,index) in table.images" :key="index">
                   <img  :src=image alt="img">
            </div>
            </div>
                  <button @click="great(table)" class="btn btn-primary gb"><p class="mt-0 mb-1">{{table.great}}</p>  👍</button>
                  <button @click="bad(table)" class="btn btn-primary gb"><p class="mt-0 mb-1">{{table.bad}}</p>  👎</button>

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
    tables: [],
    table:{
      title:"",
      postedBy:"",
      great:"",
      bad:"",
      tempcomment:"",
      comment:[],
    }
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
    fetch(API_URL_TABLEDATA, {
      method: "POST",
      body: JSON.stringify(this.table),
      headers: {
          "content-type": "application/json"
        }
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
      })
  },

great(table){
fetch(API_URL_TABLEDATA+"/great", {
  method: "POST",
  body: JSON.stringify(table),
  headers: {
      "content-type": "application/json"
    }
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
  })

},
bad(table){
fetch(API_URL_TABLEDATA+"/bad", {
  method: "POST",
  body: JSON.stringify(table),
  headers: {
      "content-type": "application/json"
    }
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
  })

},


  }
};



</script>

<style>

body{
  text-align:center;
  margin:auto;
  margin-top:300px;
  max-width:800px;
}

img{
width:200px;
margin:10px;
height:200px;
}

.flexbox{
display: flex;
flex-direction:row;
align-items: center;
justify-content: center;
flex-wrap:wrap;
}

.gb{
  width:100px;
  text-align:center;
  margin:10px;
  margin-top:50px;
  margin-bottom:90px;
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


#usernameForm{
  margin-top:20px;
  width:200px;
}


h5, h6{
  margin-left:10px;
}

h6{
  font-size:6px;
  opacity:0.7;
}


</style>
