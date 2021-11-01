
<template >
  <v-app class="content">
    <h2>{{ msg }}</h2>
    <v-list>
      <v-list-item link>
          1. Change username
      </v-list-item>
      <v-list-item link>
          2. Reset Password
      </v-list-item>
      <v-list-item link>
          3. Unpost and archive all reports
      </v-list-item>
      <v-list-item link>
          4. Permanently delete all reports
      </v-list-item>
    </v-list>
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
  padding: 40px;
}
</style>
