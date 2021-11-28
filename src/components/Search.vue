<template>
  <v-app class="content">
      <v-container pa-2 fluid>
        <v-row>
          <v-col cols="12" xl="12" lg="12" justify="center" align="center">
            <v-card style="padding: 20px" elevation="24" justify="center">
              <v-card-title>Search the database...</v-card-title>
                <v-form>
                  <v-row class="pa-4" align="left">
<!--                    <v-col cols="12" xl="3" lg="3" md="3" sm="3">-->
<!--                      <v-select :items="fields" v-model="searchField"></v-select>-->
<!--                    </v-col>-->
                    <v-col cols="12" xl="7" lg="7" md="7" sm="7">
                        <v-text-field
                          v-model="queryInput"
                          label="Find the company"
                          style="color: white; padding-left: 15px"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" xl="2" lg="2" md="2" sm="1">
                      <v-btn id='searchBTN' elevation="8" @click="submitSearch">
                        Search
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              <!--------------- End of User Input ------------------->

              <!-------------- Company Table ----------------------->
              <v-data-table
                :headers="companyHeaders"
                :items="companies"
                class="elevation-1"
                style="max-height: 300px; overflow-y: auto"
                v-if="!isMobile"
              >
              <template v-slot:item="props">
                <tr v-show="filterRow(props.item.name)">
                  <td nowrap="true">{{ props.item.name }}</td>
                  <td nowrap="true">{{ props.item.industry }}</td>
                  <td nowrap="true"></td>
                  <td><v-btn @click="findCompanyReports(props.item)">See reports</v-btn></td>
                </tr>
              </template>
              </v-data-table>
              <!-------------- End of Company Table ----------------------->

              <!-------------- Start of Actors Table ----------------------->
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


<!--v-expansion-panels v-on="companyTable">
      <v-expansion-panel v-for="(company,index) in companies" :key="index">
        <v-expansion-panel-header >
          <v-card elevation="0" style="margin: 0px; padding: 0px;">
            <v-card-title style="padding-left: 0px;">{{company.name}}</v-card-title>
            <v-card-subtitle style="padding-left: 0px;">Created: {{company.industry}}</v-card-subtitle>
          </v-card>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>
</v-expansion-panels -->



          <!--v-row>
        <v-data-table v-on="searchField = 'Company'"
              :headers="companyHeads"
              :items="companies"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.company }}</td>
                        <td align="left">{{ props.item.industry }}</td>                      </tr>
                    </template>
              </v-data-table>
      </v-row-->

  </v-app>
</template>

<script>
import {APIService} from '../http/APIService';
import router from '../router';
const apiService= new APIService();

export default {
  name: 'Search',
  data () {
    return {
      searchField: 'By Company',
      queryInput: '',
      fields: ['By Name', 'By Company'],
      companies: [],
      companySize: 0,
      companyTable: true,
      companyHeads: ['company'],
      companyHeaders: [
        {text: 'Company', sortable: false, align: 'left',},
        {text: 'Field/Industry', sortable: false, align: 'left',},
        {text: 'Total Reports', sortable: false, align: 'left',},
        {text: '', sortable: false, align: 'left',}
      ],
      msg: 'This is the search component',
      validUserName: '',
    }
  },
  mounted() {
    this.verifyUser();
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
    submitSearch() {
      if(this.searchField == 'By Company') {
            apiService.getCompanyList().then(response => {
            this.companies = response.data.data;
            console.log(response.data.data);
            console.log(response.data);
            this.companySize = this.companies.length;
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
          }
        },
        filterRow(company_name) {
          let result = true;
          let query = this.queryInput.toLowerCase();
          let company = company_name.toLowerCase();
          result = query.includes(company)
          return result;
        },

        findCompanyReports(company) {
          router.push("/company/reports/" + company.id)
        },

        getCompanyList() {
          this.companyTable = true;
          apiService.getCompanyList().then(response => {
            this.companies = response.data.data;
            console.log(response.data.data);
            console.log(response.data);
            this.companySize = this.companies.length;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: flex;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  background-color: #4e3a43;
}

#searchBTN {
  font-weight: bolder;
  color: white;
  background-color: #401a19;
}
</style>
