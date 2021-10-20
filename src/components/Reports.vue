
<template >
  <v-app class="content">
    <h2>{{ msg }}</h2>
  </v-app>
  </template>

<script>

export default {
  name: 'Reports',
  data() {
    return {
      msg: 'This is the reports component',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: block;
  justify-content: center;
  align-content: center;
  padding: 40px;
}
</style>
