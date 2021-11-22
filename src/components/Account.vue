<template>
  <v-app class="content" style="background-color: #4e3a43">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card elevation="24" class="contentCard">
            <v-card-title>Account Settings</v-card-title>
            <settings></settings>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
  import Settings from '../components/Settings'


  export default {
    name: 'Account',
    components: {
      'Settings': Settings
    },
    data () {
      return {
        currPage: 'Settings',
        msg: "Parent Method Message",
        items: [
          { title: 'Search', icon: 'mdi-account-search', url: '/account/search'},
          { title: 'Reports', icon: 'mdi-forum' },
          { title: 'Settings', icon: 'mdi-tools' },
        ],

      }
    },
      methods: {
      sendSearch() {
          console.log('test')
        }
    }
  }
</script>

<style>

</style>

