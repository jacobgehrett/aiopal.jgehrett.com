<template>
<div class="wrapper">
  <div class="images">
    <div class="image">
      <div class="form">
        <input v-model="name" placeholder="Descriptive Name">
        <input class="photoInp" type="file" name="photo" @change="fileChanged">
        <button @click="addHorizonImage">Horizon</button>
        <button @click="addGroundImage">Ground</button>
      </div>
      <div class="addHorizonImage" v-if="horizonImage">
        <h2>{{horizonImage.name}}</h2>
        <img :src="horizonImage.path" />
      </div>
      <div class="addGroundImage" v-if="groundImage">
        <h2>{{groundImage.name}}</h2>
        <img :src="groundImage.path" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ImageList',
  data() {
    return {
      name: "",
      file: null,
      horizonImage: null,
      groundImage: null,
      horizonImages: [],
      groundImages: [],
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async addHorizonImage() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/horizonphotos', formData);
        let r2 = await axios.post('/api/horizonImages', {
          name: this.name,
          path: r1.data.path
        });
        this.horizonImage = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addGroundImage() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/groundphotos', formData);
        let r2 = await axios.post('/api/groundImages', {
          name: this.name,
          path: r1.data.path
        });
        this.groundImage = r2.data;
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
