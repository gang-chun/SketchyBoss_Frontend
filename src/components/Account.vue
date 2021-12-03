<template>
  <v-app class="content" style="background-color: #4e3a43">
    <v-container fluid>
      <v-row>
        <v-col cols="12">

          <v-card elevation="24" class="contentCard">
            <v-card-title>Account Settings</v-card-title>

          <v-card elevation="24" style="padding: 20px" class="contentCard">

              <v-list>
                <v-list-item link>
                  1. Change Password
                </v-list-item>
                <v-list-item link>
                  2. Unpost and archive all reports
                </v-list-item>
                <v-list-item @click="deleteAllReports()">
                  3. Permanently delete all reports
                </v-list-item>
              </v-list>
          </v-card>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
  import router from "../router";
  import {APIService} from '../http/APIService';
  const apiService = new APIService();


  export default {
    name: 'Account',
    data() {
      return {
        currPage: 'Settings',
        msg: "Parent Method Message",
        validUserName: '',

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
      deleteAllReports() {
        this.$confirm("Are you sure you want to delete all reports?").then(() => {
          apiService.deleteAllReports().then(response => {
            if (response.status === 204) {
              router.push('/account')
              this.$alert("All reports associated with your account have been deleted.")
            }
          }).catch(error => {
            if (error.response.status === 401) {
              localStorage.removeItem('isAuthenticates');
              localStorage.removeItem('log_user');
              localStorage.removeItem('token');
              router.push("/auth");
            }
          })
        })
      }
    }
  }
</script>

<style>

</style>

