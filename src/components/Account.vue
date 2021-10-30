<template>
  <v-app>

<v-card>
    <div class="hidden-sm-and-up">
      <Nav @pageChange="currPage = $event"></Nav>
    </div>
</v-card>


<v-card class="pa-12" id="page">
  <v-container fluid>
      <v-row>
        <v-col cols="12" xl="3" lg="3" md="3" sm="3" id="navContain">
          <div class="hidden-xs-only">
            <Nav @pageChange="currPage = $event"></Nav>
          </div>

        </v-col>


    <v-spacer></v-spacer>


      <v-col xl="8" lg="8" md="8" sm="8" xs="9" justify="center">
          <v-card elevation="24" id="contentCard">
            <div v-if="currPage == 'Reports'">
              <reports></reports>
            </div>
            <div v-else-if="currPage == 'Settings'">
              <settings></settings>
            </div>
            <div v-else>
              <search></search>
            </div>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-card>
  </v-app>
</template>

<script>
  import accountNav from '../components/AccountNav'
  import Search from '../components/Search'
  import Reports from '../components/Reports'
  import Settings from '../components/Settings'


  export default {
    name: 'Account',
    components: {
      'Nav': accountNav,
      'Search': Search,
      'Reports': Reports,
      'Settings': Settings
    },
    data () {
      return {
        currPage: '',
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
#page {
  background-color: #4e3a43;
}

#navContain {
  background-color: transparent;
}
#contentCard {
  display: block;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>

