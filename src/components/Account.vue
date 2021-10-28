<template>
  <v-app>

    <div class="hidden-sm-and-up">
      <v-bottom-navigation>
        <v-btn v-for='item in items' :key="item.title" @click="showContent(item.title)">
          <span>{{item.title}}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>

  <v-card class="pa-12" id="page" flat>

<v-container fluid>
  <v-row no-gutters>
    <v-col cols="12" lg="8" md="3" xs="12">
      <div class="hidden-xs-only">
        <v-card elevation="20">
          <v-navigation-drawer floating permanent>
            <v-list dense rounded>
              <v-list-item v-for="item in items" :key="item.title" @click="showContent(item.title)">
                <v-list-item-icon>
                  <v-icon style="color: black">{{ item.icon }}</v-icon></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title style="color: black; font-size: 14px; letter-spacing: 1px">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>
    </v-col>

    <v-spacer></v-spacer>

      <v-col cols="12" xl="8" lg="8" md="8" xs="12" justify="center">
          <v-card elevation="24" id="contentCard">
            <div v-if="contentField == 'Reports'">
              <reports></reports>
            </div>
            <div v-else-if="contentField == 'Settings'">
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

  import Search from '../components/Search'
  import Reports from '../components/Reports'
  import Settings from '../components/Settings'

  export default {
    name: 'Account',
    components: {
      search: Search,
      reports: Reports,
      settings: Settings
    },
    data () {
      return {
        content: '',
        contentField: 'Search',
        msg: "Parent Method Message",
        currentPage: 'Search',
        items: [
          { title: 'Search', icon: 'mdi-account-search', url: '/account/search'},
          { title: 'Reports', icon: 'mdi-forum' },
          { title: 'Settings', icon: 'mdi-tools' },
        ],
      }
    },
    methods: {
      showContent(content) {
        this.contentField = content;
        console.log(content)
        console.log(this.contentField)
      },

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

#contentCard {
  display: block;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>

