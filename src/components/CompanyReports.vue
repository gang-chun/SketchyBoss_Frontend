<template>
  <v-app class="content">
      <v-container fluid>
        <v-row>
          <v-col cols="12" xl="12" md="12" lg="12" align="center" justify="center">
            <v-card style="padding: 20px" elevation="24" align="left">
              <v-card-title><h2>Reports for "{{ companyDetails.name }}" </h2></v-card-title>

              <v-card
                v-for="(report,index) in companyReports"
                :key="index"
                style="margin: 10px; padding: 0px"
                elevation="2">
                <v-card-title><strong>{{report.title}}</strong></v-card-title>
                <v-card-text>{{ report.content }}</v-card-text>
                <v-card-subtitle>Published on {{formatDate(report.created_date)}} on <strong>{{report.actor_name}}</strong></v-card-subtitle>

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
import moment from "moment";
const apiService= new APIService();

export default {
  name: 'CompanyReports',
  data() {
    return {
      companyID: '',
      companyReports: '',
      companyDetails: [],
    }
  },
  mounted() {
    this.companyID = this.$route.params.pk
    this.getCompany()
    this.getCompanyReports()
    console.log("Company details below")
    console.log(this.companyDetails)
  },
  methods: {
    formatDate(value) {
      return moment(value).format("MMM DD, YYYY") + ' at ' +
        moment(value).format("hh:mma")
    },
    getCompany() {
      apiService.getCompany(this.companyID).then(response => {
        this.companyDetails = response.data;
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
      })
    },
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

.v-card subtitle {
  padding-top: 0px;
}
</style>
