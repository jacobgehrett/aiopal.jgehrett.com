<template>
<div>
  <div>
    <p>Help train the OPAL algorithm! Categorize the following images based upon whether or not the horizon is visible.</p>
    <p>After you have finished, go through the sorted tabs and correct any mistakes.</p>
    <p>Thank you!</p>
  </div>
  <ImageList :images="images" />
</div>
</template>

<script>
import ImageList from "../components/ImageList.vue"
export default {
  name: 'Home',
  components: {
    ImageList
  },
  data() {
    return {
    }
  },
  computed: {
    images() {
      return this.$root.$data.images;
    }
  },
}
</script>

<style>

.home {
  width: auto;
}

</style>
