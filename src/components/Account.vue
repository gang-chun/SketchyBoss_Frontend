<template>
  <v-app class="content" style="background-color: #4e3a43">
    <v-container fluid class="pa-14" style="background-color: #4e3a43">
      <v-row>
        <v-col cols="12">
          <v-card elevation="24" style="padding: 20px" class="contentCard">
            <v-card-title><h2>Account Settings</h2></v-card-title>
            <settings></settings>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
  import Settings from '../components/Settings'
  import router from "../router";


  export default {
    name: 'Account',
    components: {
      'Settings': Settings
    },
    data () {
      return {
        currPage: 'Settings',
        msg: "Parent Method Message",
        validUserName: '',
        items: [
          { title: 'Search', icon: 'mdi-account-search', url: '/account/search'},
          { title: 'Reports', icon: 'mdi-forum' },
          { title: 'Settings', icon: 'mdi-tools' },
        ],

      }
    },
    mounted() {
      this.verifyUser()
    },
    methods: {
      verifyUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        } else {
          router.push("/auth");
        }
      },
    }
  }
</script>

<style>

</style>

