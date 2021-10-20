<template>
  <v-app>
  <v-card
    class="pa-12"
    id="page"
    flat
  >
<v-container fluid>
  <v-row no-gutters>
    <v-col cols="6" md="3">
      <v-card elevation="20" width="256">

      <v-navigation-drawer floating permanent>
        <v-list dense rounded>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="showContent(item.title)">
            <v-list-item-icon>
              <v-icon style="color: black">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="color: black; font-size: 14px; letter-spacing: 1px">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      </v-card>
    </v-col>
        <v-spacer></v-spacer>
      <v-col cols="12" md="9">
          <v-card elevation="24" id="contentCard">
            <div v-if="contentField == 'My Reports'">
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

  import router from '../router'
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
          { title: 'My Reports', icon: 'mdi-forum' },
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
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>

