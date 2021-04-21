<template>
<div class="wrapper">
  <div v-if="horizonImages.length == 0">
    <p>No images added!</p>
  </div>
  <div class="images">
    <div class="image" v-for="image in horizonImages" :key="image.id">
      <h2>{{image.name}}</h2>
      <img :src="image.path" />
      <input v-model="findName" placeholder="New Descriptive Name" v-if="user">
      <button @click="editItem(image)" v-if="user">Edit</button>
      <button @click="deleteItem(image)" v-if="user">Delete</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Horizon',
  data() {
    return {
      horizonImages: [],
      findName: "",
    }
  },
  created() {
    this.getImages();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async getImages() {
      try {
        let response = await axios.get("/api/horizonImages");
        this.horizonImages = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/horizonImages/" + item._id);
        this.findItem = null;
        this.getImages();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/horizonImages/" + item._id, {
          name: this.findName,
        });
        this.findName = null;
        this.getImages();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.images {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.image {
  margin: 10px;
  margin-top: 50px;
  width: 390px;
}

#imag {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  width: 100%;
}

.butn {
  display: flex;
}

button {
  height: 50px;
  width: 90px;
  background: #42b983;
  color: white;
  border: 1px solid white;
  margin-top: 5px;
  margin-left: 10px;
  margin-left: 10px;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #777777;
  opacity: 1; /* Firefox */
}

input {
  background-color: #e6e6e6;
  margin-bottom: 10px;
  margin-right: 10px;
}

.photoInp {
  background-color: #000066;
}

img {
  width: 390px;
}

</style>
