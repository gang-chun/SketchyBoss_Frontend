<template>

  <v-app id="contains">

      <div class="hidden-sm-and-up">
        <v-bottom-navigation style="margin: 0px; padding: 0px">
          <v-btn v-for='item in items' :key="item.title" @click="changeContent(item.title)">
            <span>{{item.title}}</span>
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>


      <div class="hidden-xs-only">
        <v-card elevation="16">
          <v-navigation-drawer floating permanent>
            <v-list dense rounded >
              <v-list-item v-for="item in items" :key="item.title" @click="changeContent(item.title)">
                <v-list-item-icon>
                  <v-icon style="color: black;">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                    <v-list-item-content class="hidden-sm-and-down">
                      <v-list-item-title style="color: black; font-size: 14px; letter-spacing: 1px">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>

  </v-app>
</template>

<script>

  export default {
    name: 'AccountNav',
    data () {
      return {
        currPage: 'Search',
        items: [
          { title: 'Search', icon: 'mdi-account-search'},
          { title: 'Reports', icon: 'mdi-forum' },
          { title: 'Settings', icon: 'mdi-tools' },
        ],
      }
    },
    methods: {
      changeContent(page) {
        this.currPage = page;
        this.$emit('pageChange', this.currPage);
      },

      sendSearch() {
          console.log('test')
        }

    }
  }
</script>

<style>


#contains {
  background-color: #4e3a43;
}
</style>

