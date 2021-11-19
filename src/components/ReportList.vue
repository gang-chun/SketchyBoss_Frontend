<template>
  <v-app class="content" style="background-color: #4e3a43;">
    <v-container pa-12>
      <v-row>
        <v-col cols="12" xl="12" md="12" lg="12" align="center" justify="center">

          <!----- Alert if reports have been updated/created/deleted ----->
          <div v-show="showMsg ==='new'">
              <v-alert v-if="showMsg === 'new'"
                       dismissible
                       :value="true"
                       type="success"
              >
                New report has been created.
              </v-alert>
              <v-alert v-if="showMsg === 'update'" dismissible
                       :value="true"
                       type="success"
              >
                Report information has been updated.
              </v-alert>
              <v-alert v-if="showMsg === 'deleted'" dismissible
                       :value="true"
                       type="success"
              >
                Selected Report has been deleted.
              </v-alert>
            </div>
          </v-col>

      <!------------------------- Data table ----------------------------->
        <v-col cols="12" lg="12" md="12">
          <v-card style="padding: 20px" elevation="24">
            <v-card-title class="justify-space-between">
              <h2>My Reports</h2>
                <v-btn class="white--text"
                         style="background-color: #401a19;"
                         elevation="6"
                         @click="addNewReport">New Report</v-btn>
            </v-card-title>

          <v-data-table
            :headers="headers"
            :items="reports"
            class="elevation-1"
            style="max-height: 300px; overflow-y: auto"
            v-if="!isMobile"
          >
            <template v-slot:item="props">
              <tr>
                <td nowrap="true">{{ props.item.title }}</td>
                <td nowrap="true">{{ props.item.actor_name }}</td>
                <td nowrap="true">{{ props.item.company_name }}</td>
                <td nowrap="true">{{ props.item.updated_date }}</td>
                <td><v-icon @click="updateReport(props.item)">mdi-pencil</v-icon></td>
                <td><v-icon @click="deleteReport(props.item)">mdi-delete</v-icon></td>
              </tr>
            </template>
          </v-data-table>
          <v-data-iterator
            :items="reports"
            hide-default-footer
            v-else
          >
            <template v-slot:default="{ items, isExpanded, expand }">
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="item.name"
                  cols="12"
                >
                  <v-card>
                    <v-card-title class="pb-0 pt-0 pl-0">
                      <v-col cols="9" class="text-left body-2 text-truncate">{{item.actor_name}} - {{item.company_name }}</v-col>
                      <v-col cols="3" class="text-center">
                        <v-card-actions>
                          <v-icon @click="updateReport(item)" class="small">mdi-pencil</v-icon>
                          <v-icon @click="deleteReport(item)" class="small">mdi-delete</v-icon>
                          <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                        </v-card-actions>
                      </v-col>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-list v-show="isExpanded(item)" dense>
                      <v-list-item>
                        <v-list-item-content class="align-end">{{ item.title }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Content:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.content }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Actor Information:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.actor_name }} from {{ item.company_name }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Last Updated:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.updated_date }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>

import router from '../router';
import {APIService} from '../http/APIService';
const apiService = new APIService();

export default {
  name: "ReportList",
  data: () => ({
    reports: [],
    validUserName: "Guest",
    reportSize: 0,
    showMsg: '',
    isMobile: false,
    headers: [
      {text: 'Title', sortable: false, align: 'left',},
      {text: 'Reportee', sortable: false, align: 'left',},
      {text: 'Company', sortable: false, align: 'left',},
      {text: 'Created/Modified', sortable: false, align: 'left',},
      {text: 'Update', sortable: false, align: 'left',},
      {text: 'Delete', sortable: false, align: 'left',}

    ],

  }),
  mounted() {
    this.getReports();
    this.showMessages();
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
    showMessages(){
      console.log(this.$route.params.msg)
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getReports() {
      apiService.getReportList().then(response => {
        this.reports = response.data.data;
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
    addNewReport() {
      if (localStorage.getItem("isAuthenticates")
        && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
        router.push('/report-create');
      } else {
        router.push("/auth");
      }
    },
    updateReport(report) {
      router.push('/report-create/' + report.id);
    },
    deleteReport(report) {
      apiService.deleteReport(report.id).then(response => {
        if (response.status === 204) {
          router.push('/report-list/deleted/')
          this.getReports()
        }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          router.push("/auth");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
