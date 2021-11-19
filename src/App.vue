<template>
  <v-app id="page">
    <v-app-bar app color="black">
      <v-btn style="background-color: black" :to="home.url">
      <span>
        <v-img :src="require('@/assets/images/SBLogoBlack.jpg')" height="36px" width="36px" style="border: white solid 1px"></v-img>
      </span>
      <v-toolbar-title>
        <span style="color: white; padding-left: 18px;">SKETCHY</span><span style="font-weight: bold; color: white; padding-left: 2px">BOSS</span>
      </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>

      <div class="hidden-xs-only">
        <v-btn v-for="item in menu" :key="item.title" :to="item.url" text small rounded dark>{{ item.title }}</v-btn>
        <v-btn dark text rounded small v-if="!authenticated" @click="login">Log In</v-btn>
        <v-btn dark text rounded small v-if="authenticated" @click="logout">Log Out</v-btn>
      </div>

      <div class="hidden-sm-and-up">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in menu" :key="item.title" :to="item.url">{{ item.title }}</v-list-item>
          <v-list-item v-if="!authenticated" @click="login">Log in</v-list-item>
          <v-list-item v-if="authenticated" @click="logout">Log out</v-list-item>
        </v-list>
      </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import router from './router';
  import {APIService} from './http/APIService';
  const apiService = new APIService();

  export default {
    name: 'App',
    data: () => ({
      home: {url: "/"},
      authenticated: false,
      dialog: false,
      menu: [
        { title: 'Database', url: "/search"},
        { title: 'My Reports', url: '/report-list'},
        { title: 'Account', url: '/account'},
      ]
    }),

    mounted() {
      apiService.getReportList().then(response => {
        this.authenticated = true;
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          this.authenticated = false;
        }
      });
      console.log('this.authenticated--'+this.authenticated);
    },

    methods: {
      logout() {
        localStorage.removeItem('isAuthenticates');
        localStorage.removeItem('log_user');
        localStorage.removeItem('token');
        this.authenticated = false;
        // router.push('/');
        window.location = "/"
      },
      login() {
        router.push("/auth");
      },
    }
  };

</script>

<style>
#page {
  background-color: #4e3a43;
}
</style>
