
<template >
  <v-app class="content">
    <h2>{{ msg }}</h2>





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





    <v-form>
      <v-row>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12">
          <v-select :items="fields" v-model="searchField"></v-select>
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="6" sm="12">
          <v-text-field v-model="input" style="color: white; margin-left: 20px"></v-text-field>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12">
          <v-btn id='searchBTN' elevation="8" :to="'/search/' + searchField + '/' + input">
            Search
          </v-btn>





        </v-col>
      </v-row>

    </v-form>

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
      fields: ['Person', 'Company'],
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
  padding: 40px;
}

#searchBTN {
  font-weight: bolder;
  margin-left: 10px;
  padding: 10px;
  color: white;
  background-color: #401a19;
}
</style>
