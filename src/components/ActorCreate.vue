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
              Please verify actor information.
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
                      v-model="actor.fName"
                      label="First Name"
                      required
                      color="#401a19"
                      id="fName_id"
                    />

                    <v-text-field
                      v-model="actor.lName"
                      label="Last Name"
                      required
                      color="#401a19"
                      id="lName_id"
                    />

                    <v-text-field
                      v-model="actor.job_position"
                      label="Job Position"
                      required
                      color="#401a19"
                      id="jobPosition_id"
                    />

                    <v-row>
                      <v-col cols="6">
                        <v-btn
                          v-if="!isUpdate"
                          class="white--text"
                          block
                          color="#401a19"
                          @click="createActor">Save</v-btn>
                        <v-btn
                          v-if="isUpdate"
                          class="white--text"
                          block
                          color="#401a19"
                          @click="updateActor">Update</v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          @click="cancelOperation"
                          block
                          outlined
                          color="#401a19">Cancel</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
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
  name: 'ActorCreate',
  components: {},
  data() {
    return {
      username: {},
      showError: false,
      pageTitle: "Add New Actor",
      isUpdate: false,
      showMsg: '',
      actor: {},
    };
  },
  created(){
  },
  methods: {
    createActor() {
      apiService.addNewActor(this.actor).then(response => {
        if (response.status === 201) {
          this.actor = response.data;
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
    updateActor() {
      apiService.updateActor(this.actor).then(response => {
        if (response.status === 200) {
          this.actor = response.data;
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
      this.pageTitle = "Edit Actor";
      this.isUpdate = true;
      apiService.getActor(this.$route.params.pk).then(response => {
        this.actor = response.data;
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
