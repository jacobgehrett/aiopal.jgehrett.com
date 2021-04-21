<template>
<div class="main">
  <div class="menu">
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
  </div>
  <div>
    <h3>Your sorted photos:   ({{allImages.length}})</h3>
  </div>
  <div class="wrapper">
    <div v-if="allImages.length == 0">
      <p>No images added!</p>
    </div>
    <div class="images">
      <div class="image" v-for="image in allImages" :key="image.id">
        <h2>{{image.name}}</h2>
        <img :src="image.path" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MyPhotos',
  data() {
    return {
      show: false,
      userImages: [],
      usergImages: [],
      allImages: [],
    }
  },
  created() {
    this.getImages();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getImages() {
      try {
        let response = await axios.get("/api/horizonuserimages");
        this.userImages = response.data;
        response = await axios.get("/api/grounduserimages");
        this.usergImages = response.data;
        this.allImages = [].concat(this.userImages, this.usergImages);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: right;
}

.menu h2 {
  font-size: 14px;
}

.fas {
  color: #e6e6e6;
  background: #000066;
}

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
  margin-right: 10px;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #777777;
  opacity: 1; /* Firefox */
}

input {
  background-color: #e6e6e6;
  margin-bottom: 10px;
}

.photoInp {
  background-color: #000066;
}

img {
  width: 390px;
}
</style>
