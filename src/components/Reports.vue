
<template>
  <v-app class="content">

    <v-expansion-panels>
      <v-expansion-panel v-for="(report,index) in reports" :key="index">
        <v-expansion-panel-header >
          <v-card elevation="0" style="margin: 0px; padding: 0px;">
            <v-card-title style="padding-left: 0px;">{{report.title}}</v-card-title>
            <v-card-subtitle style="padding-left: 0px;">Created: {{report.created_date}}</v-card-subtitle>
          </v-card>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <strong>{{ report.company}} - {{report.actor}}</strong>
          <br>
          {{ report.content}}
          <br>
          <div class="btns">
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="normal" v-bind="attrs" v-on="on"> ACTIONS </v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteReport()">
                  <v-list-item-title>Unpublish</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteReport()">
                  <v-list-item-title >Modify</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteReport()">
                  <v-list-item-title >Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-app>
  </template>

<script>
import {APIService} from '../http/APIService';
import router from '../router';
const apiService= new APIService();


export default {
  name: 'Reports',
  data () {
    return {
      msg: 'This is the reports component',
      act: '',
      reports: [],
      reportSize: 0,
    }
  },
  mounted () {
    this.getReportList();
    },
      methods: {
        getReportList() {
          apiService.getReportList().then(response => {
            this.reports = response.data.data;
            console.log(response.data.data);
            console.log(response.data);
            this.reportSize = this.reports.length;
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
        deleteReport(){
          console.log('pressed delete report action')
        },
        editReport() {
          apiService.editReport(this.report).then(response => {
            if (response.status == 200) {
              this.report = reponse.data;
              router.push('/report-list/update');
            } else {
              this.showMsg = "error";
            }
          })
        }
      }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: block;
  justify-content: center;
  align-content: center;
  padding: 40px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
