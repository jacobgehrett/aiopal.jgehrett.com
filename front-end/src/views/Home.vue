<template>
<div>
  <div>
    <p>Help train the OPAL algorithm! Upload images of Mars/other planetary bodies. Categorize them by whether the horizon is visible in the photo (click either "Horizon" or "Ground") and give the image a descriptive name.</p>
    <p>After you have finished, go through the sorted tabs and correct any mistakes.</p>
    <p>Thank you!</p>
  </div>
  <ImageList :images="images" v-if="user"/>
  <p v-else><br><em>NOTE: To upload images, click on user icon in menu to sign in/register. Then return to this page!</em></p>
</div>
</template>

<script>
import axios from 'axios';
import ImageList from "../components/ImageList.vue"
export default {
  name: 'Home',
  components: {
    ImageList
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
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
