<template>
  <v-app class="content">
    <v-list>
      <v-list-item link>
          1. Change Password
      </v-list-item>
      <v-list-item link>
          2. Unpost and archive all reports
      </v-list-item>
      <v-list-item link>
          3. Permanently delete all reports
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
  padding: 20px;
}
</style>
