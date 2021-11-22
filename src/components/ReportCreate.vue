<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Report information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-text-field
                      v-model="report.title"
                      label="Title"
                      required
                    />

                    <v-text-field
                      v-model="report.content"
                      label="Content"
                      required
                    />

                    <v-text-field
                      v-model="report.city"
                      label="City"
                      required
                    />

                    <v-text-field
                      v-model="report.state"
                      label="State"
                      required
                    />

                    <v-select
                      v-model="report.actor"
                      label="Actor"
                      :items="actorList"
                      item-value="id"
                      :item-text="item => item.fName + ' ' + item.lName"
                      required
                    ></v-select>

                    <v-select
                      v-model="report.company"
                      label="Company"
                      :items="companyList"
                      item-value="id"
                      item-text="name"
                      required
                    ></v-select>

                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createReport">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updateReport">Update</v-btn>
                  <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import router from '../router';
import {APIService} from '../http/APIService';
const apiService = new APIService();

export default {
  name: 'ReportCreate',
  components: {},
  data() {
    return {
      actors: [],
      companies: [],
      username: {},
      showError: false,
      report: {},
      pageTitle: "Add New Report",
      isUpdate: false,
      showMsg: '',
    };
  },
  computed:{
    actorList:{
      get () {
        return this.actors
      },
      set (newValue) {
        this.actors = newValue
      }
    },
    companyList:{
      get () {
        return this.companies
      },
      set (newValue) {
        this.companies = newValue
      }
    }
  },
  methods: {
    getActors() {
      apiService.getActorList().then(response => {
        this.actors = response.data.data;
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
    getCompanies() {
      apiService.getCompanyList().then(response => {
        this.companies = response.data.data;
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
    createReport() {
      apiService.addNewReport(this.report).then(response => {
        if (response.status === 201) {
          this.report = response.data;
          this.showMsg = "";
          router.push('/report-list/');
        }else{
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    },
    cancelOperation(){
      router.push("/report-list");
    },
    updateReport() {
      apiService.updateReport(this.report).then(response => {
        if (response.status === 200) {
          this.report = response.data;
          router.push('/report-list/update');
        }else{
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    }
  },
  mounted() {
    //this.getUser();
    this.getActors();
    this.getCompanies();
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Report";
      this.isUpdate = true;
      apiService.getReport(this.$route.params.pk).then(response => {
        this.report = response.data;
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }
      });
    }
  },
}
</script>
<style scoped>
</style>
