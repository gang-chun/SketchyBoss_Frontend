<template>
  <v-app class="content">
      <v-container pa-14 fluid>
        <v-row>
          <v-col cols="12" xl="12" lg="12" justify="center" align="center">
            <v-card style="padding: 20px" elevation="24" justify="center">
              <v-card-title><h2>Reports for {{ companyID }} </h2></v-card-title>

              <v-card
                v-for="(report,index) in companyReports"
                :key="index"
                style="margin: 10px; padding: 10px"
                elevation="2">
                <v-card-title>{{report.title}}</v-card-title>
                <v-card-subtitle>Actor: {{report.actor}}</v-card-subtitle>
                <v-card-text>{{ report.content }}</v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import {APIService} from '../http/APIService';
import router from '../router';
const apiService= new APIService();

export default {
  name: 'CompanyReports',
  company: '',
  data() {
    return {
      companyID: '',
      companyReports: '',
    }
  },
  mounted() {
    this.companyID = this.$route.params.pk
    this.getCompanyReports()
  },
  methods: {
    getCompanyReports() {
      apiService.getCompanyReports(this.companyID).then(response => {
        this.companyReports = response.data.data;
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          router.push("/auth");
        }
      });
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  background-color: #4e3a43;
}

#btn {
  font-weight: bolder;
  color: white;
  background-color: #401a19;
}
</style>
