<template>
  <v-app class="content">
      <v-container fluid>
        <v-row>
          <v-col cols="12" xl="12" lg="12" justify="center" align="center">
            <v-card style="padding: 20px" elevation="24" justify="center">
              <v-card-title>Search the Sketchy Boss database...</v-card-title>
                <v-form>
                  <v-row class="pa-4 justify-space-between" align="center">
                    <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                      <v-select :items="fields" v-model="searchField"></v-select>
                    </v-col>
                    <v-col cols="12" xl="7" lg="7" md="7" sm="7">
                        <v-text-field
                          v-model="input"
                          style="color: white; padding-left: 15px"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" xl="2" lg="2" md="2" sm="1" class="justify-center align-self-center">
                      <v-btn id='searchBTN' elevation="8" :to="'/search/' + searchField + '/' + input">
                        Search
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              <v-data-table>

              </v-data-table>

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
      searchField: '',
      input: '',
      fields: ['By Name', 'By Company'],
      companies: [],
      companySize: 0,
      companyTable: true,
      companyHeads: ['company'],
      msg: 'This is the search component',
    }
  },
  mounted() {
    this.getCompanyList();
  },
      methods: {
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

        enterSearch() {
          this.$emit('searchEntered', this.searchField, this.input);
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
