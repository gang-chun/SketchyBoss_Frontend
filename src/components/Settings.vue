<template>
  <v-app class="content">
      <v-btn>
        <span>Change Password</span>
      </v-btn>
      <v-btn>
        <span>Un-publish Reports</span>
      </v-btn>
      <v-btn>
        <span>Delete All Reports</span>
      </v-btn>
  </v-app>
</template>

<script>

export default {
  name: 'Settings',
  data() {
    return {
      msg: 'Account Settings',
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
  padding: 20px;
}
</style>
