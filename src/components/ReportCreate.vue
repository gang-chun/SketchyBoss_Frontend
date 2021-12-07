<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-show="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
                     transition="scroll-y-transition"
            >
              Please verify report information.
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
                      v-model="title"
                      label="Title"
                      color="#401a19"
                      required
                      id="title_ID"
                    />

                    <v-text-field
                      v-model="content"
                      label="Content"
                      color="#401a19"
                      required
                      id="content_ID"
                    />

                    <v-text-field
                      v-model="city"
                      label="City"
                      color="#401a19"
                      required
                      id="city_ID"
                    />

                    <v-text-field
                      v-model="state"
                      label="State"
                      color="#401a19"
                      required
                      id="state_ID"
                    />

                    <v-row>
                      <v-col cols="10">
                        <v-select
                          v-model="actor"
                          label="Actor"
                          color="#401a19"
                          :items="actorList"
                          item-value="id"
                          :item-text="item => item.fName + ' ' + item.lName"
                          required
                          id="actor_ID"
                        ></v-select>
                      </v-col>
                      <v-col cols="2" align-self="center">
                        <v-btn class="white--text"
                               style="background-color: #401a19"
                               elevation="6"
                               fab
                               x-small
                               @click="addActor"
                        ><v-icon>mdi-plus</v-icon></v-btn>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="10">
                        <v-select
                          v-model="company"
                          color="#401a19"
                          label="Organization"
                          :items="companyList"
                          item-value="id"
                          item-text="name"
                          required
                          id="org_ID"
                        ></v-select>
                      </v-col>
                      <v-col cols="2" align-self="center">
                        <v-btn class="white--text"
                               style="background-color: #401a19"
                               elevation="6"
                               fab
                               x-small
                               @click="addCompany"
                        ><v-icon>mdi-plus</v-icon></v-btn>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                        <v-btn
                          v-if="!isUpdate"
                          color="#401a19"
                          block
                          class="white--text"
                          @click="createReport">Save</v-btn>
                        <v-btn
                          v-if="isUpdate"
                          color="#401a19"
                          class="white--text"
                          block
                          @click="updateReport">Update</v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          outlined
                          block
                          color="#401a19"
                          @click="cancelOperation">Cancel</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
<!--        <div class="report">-->
<!--          <h2>Test</h2>-->
<!--            <div v-for="(item, index) in report1" :key="index">{{item}}</div>-->
<!--        </div>-->
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState, mapGetters, mapActions }  from 'vuex';
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
      report1: {},
      actor: '',
      company: '',
    };
  },
  computed: {
    ...mapGetters({
      title: 'reportTitle',
      content: 'reportContent',
      city: 'reportCity',
      state: 'reportState'
    }),

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
  created(){
  },
  methods: {
    ...mapActions(['updateTitle']),
    ...mapActions(['updateContent']),
    ...mapActions(['updateCity']),
    ...mapActions(['updateState']),
    ...mapActions(['updateActor']),
    ...mapActions(['updateCompany']),
    ...mapActions(['refreshState']),
    addActor() {
      this.updateForm()
      if (localStorage.getItem("isAuthenticates")
        && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
        router.push('/actor-create');
      } else {
        router.push("/auth");
      }
    },
    addCompany() {
      this.updateForm()
      if (localStorage.getItem("isAuthenticates")
        && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
        router.push('/org-create');
      } else {
        router.push("/auth");
      }
    },
    updateForm() {
      this.report1.title = document.getElementById('title_ID').value;
      this.report1.content = document.getElementById('content_ID').value;
      this.report1.city = document.getElementById('city_ID').value;
      this.report1.state = document.getElementById('state_ID').value;
      this.report1.actor = document.getElementById('actor_ID').value;
      this.report1.company = document.getElementById('org_ID').item;
      this.updateTitle(this.report1.title)
      this.updateContent(this.report1.content)
      this.updateCity(this.report1.city)
      this.updateState(this.report1.state)
      this.updateActor(this.report1.actor)
      this.updateCompany(this.report1.company)

      // let actor_det = this.actorList[this.report1.actor - 1].fName + ' ' + this.actorList[this.report1.actor - 1].lName
      // console.log(actor_det)
      // this.updateActor(actor_det.toString())
      // this.updateCompany(this.report1.company)
      console.log(this.report1)
    },
    refreshForm() {
      this.refreshState()
    },

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
      this.updateForm()
      this.report1.actor = this.actor
      this.report1.company = this.company
      apiService.addNewReport(this.report1).then(response => {
        if (response.status === 201) {
          this.report1 = response.data;
          this.showMsg = "";
          this.refreshForm()
          router.push('/report-list/new');
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
      this.refreshForm()
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
