<!--suppress HtmlUnknownAttribute -->
<template>
  <v-app style="background-color: #4e3a43;">
    <v-container v-resize="onResize">
      <v-row>
        <v-col>
          <!----- Alert if reports have been updated/created/deleted ----->
              <v-alert v-show="showMsg === 'new'"
                       dismissible
                       :value="true"
                       type="success"
              >
                New report has been created.
              </v-alert>
              <v-alert v-show="showMsg === 'update'"
                       dismissible
                       :value="true"
                       type="success"
              >
                Report information has been updated.
              </v-alert>
              <v-alert v-show="showMsg === 'deleted'"
                       dismissible
                       :value="true"
                       type="success"
              >
                Selected report has been deleted.
              </v-alert>

      <!------------------------- Card Title / Add Report ----------------------------->
          <v-card class="pa-2" elevation="6">
            <v-card-title class="justify-space-between">
              My Reports
                <v-btn class="white--text"
                       style="background-color: #401a19;"
                       elevation="2"
                       @click="addNewReport"
                       v-if="!isMobile">New Report</v-btn>
                <v-btn class="white--text"
                       color="#401a19"
                       elevation="2"
                       fab
                       small
                       @click="addNewReport"
                       v-else><v-icon>mdi-plus</v-icon></v-btn>
            </v-card-title>

            <!-- Desktop data table V2 EXPERIMENTAL -->
            <v-data-table
                :headers="headers"
                :items="reports"
                v-if="!isMobile"
                :single-expand="true"
                item-key="title"
                show-expand
                class="elevation-2"
            >



              <template v-slot:item.updated_date="{ item }">
                <td>{{ formatDate(item.updated_date) }}</td>
              </template>

              <template v-slot:item.update="{ item }">
                <td><v-icon @click="updateReport(item)">mdi-pencil</v-icon></td>
              </template>

              <template v-slot:item.delete="{ item }">
                <td><v-icon color="red lighten-1" @click="deleteReport(item)">mdi-delete</v-icon></td>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-container>
                    "{{ item.content }}"
                  </v-container>
                </td>
              </template>
            </v-data-table>

          <!-- Mobile data iterator -->
          <v-data-iterator
            :items="reports"
            hide-default-footer
            :single-expand="true"
            v-else
          >
            <template v-slot:default="{ items, isExpanded, expand }">
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="item.name"
                  cols="12"
                >
                  <v-card @click.native="expand(item, !isExpanded(item))">
                    <v-card-title class="pa-0">
                      <v-col cols="8" class="text-left body-2 text-truncate">{{item.title}}</v-col>
                      <v-col cols="4">
                        <v-card-actions>
                          <v-btn icon @click="updateReport(item)" class="small">
                            <v-icon>
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                          <v-btn icon color="red lighten-1" @click="deleteReport(item)">
                            <v-icon>
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-list v-show="isExpanded(item)" dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Content</v-list-item-title>
                          <v-list-item-subtitle class="wrap-text">{{ item.content }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Actor</v-list-item-title>
                          <v-list-item-subtitle>{{ item.actor_name }} of {{ item.company_name }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Last Updated</v-list-item-title>
                          <v-list-item-subtitle>{{ formatDate(item.updated_date) }}</v-list-item-subtitle>
                        </v-list-item-content>
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
import moment from 'moment';
const apiService = new APIService();

export default {
  name: "ReportList",
  data: () => ({
    expanded: {},
    reports: [],
    validUserName: "Guest",
    reportSize: 0,
    showMsg: '',
    isMobile: false,
    headers: [
      {text: 'Title', value: 'title', sortable: false, align: 'left',},
      {text: 'Actor', value: 'actor_name', sortable: false, align: 'left',},
      {text: 'Organization', value: 'company_name', sortable: false, align: 'left',},
      {text: 'Last Updated', value: 'updated_date', sortable: true, align: 'left',},
      {text: 'Update', value: 'update', sortable: false, align: 'left',},
      {text: 'Delete', value: 'delete', sortable: false, align: 'left',},
      {text: '', value: 'data-table-expand', align: 'center'},
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
    formatDate(value) {
      return moment(value).format("MMM DD, YYYY") + ' at ' +
        moment(value).format("hh:mma")
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
      router.push('/report-edit/' + report.id);
    },
    deleteReport(report) {
      this.$confirm("Are you sure you want to delete this report?").then(() => {
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
      })
    }
  }
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
}

</style>
