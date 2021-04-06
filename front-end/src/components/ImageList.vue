<template>
<div class="wrapper">
  <div class="images">
    <div class="image" v-for="image in images" :key="image.id">
      <div>
        <img id="imag" :src="'/images/'+image.image">
      </div>
      <div class="butn">
        <button class="auto" v-on:click='addHorizonImage(image)'>Horizon</button>
        <button class="auto" v-on:click='addGroundImage(image)'>Ground</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ImageList',
  props: {
    images: Array
  },
  methods: {
    addHorizonImage(image) {
      this.$root.$data.horizon.push(image);
      for(let i = 0; i < this.$root.$data.images.length; i++) {
        if (this.$root.$data.images[i].id == image.id) {
            this.$root.$data.images.splice(i, 1);
        }
      }
    },
    addGroundImage(image) {
      this.$root.$data.ground.push(image);
      for(let i = 0; i < this.$root.$data.images.length; i++) {
        if (this.$root.$data.images[i].id == image.id) {
            this.$root.$data.images.splice(i, 1);
        }
      }
    }
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

</style>
