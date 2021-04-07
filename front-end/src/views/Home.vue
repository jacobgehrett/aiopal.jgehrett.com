<template>
<div>
  <div>
    <p>Help train the OPAL algorithm! Upload images of Mars/other planetary bodies. Categorize them by whether the horizon is visible in the photo (click either "Horizon" or "Ground") and give the image a descriptive name.</p>
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
