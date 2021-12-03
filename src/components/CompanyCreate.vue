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
              Please verify company information.
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
                      v-model="company.name"
                      label="Company Name"
                      required
                      id="name_id"
                    />

                    <v-text-field
                      v-model="company.industry"
                      label="Industry"
                      required
                      id="industry_id"
                    />
                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createCompany">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updateCompany">Update</v-btn>
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
  name: 'CompanyCreate',
  components: {},
  data() {
    return {
      username: {},
      showError: false,
      pageTitle: "Add New Company",
      isUpdate: false,
      showMsg: '',
      company: {},
    };
  },
  created(){
  },
  methods: {
    createCompany() {
      apiService.addNewCompany(this.company).then(response => {
        if (response.status === 201) {
          this.company = response.data;
          this.showMsg = "";
          router.push('/report-create');
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
      router.push("/report-create");
    },
    updateCompany() {
      apiService.updateCompany(this.company).then(response => {
        if (response.status === 200) {
          this.company = response.data;
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
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Company";
      this.isUpdate = true;
      apiService.getCompany(this.$route.params.pk).then(response => {
        this.company = response.data;
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
