 <template>
  <v-main class="page">
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12" id="intro">
          <blockquote>
            Welcome, {{validUserName}}.
            <footer>
              <small>
                <em>"Every creeper knows a good window when they see [through] one." &mdash;Anonymous</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
            sm="10"
            md="8"
        >
          <v-card class="elevation-9">
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                    <v-card-text>
                      <strong>Purpose:</strong> The purpose of this project is to build a
                      preliminary full stack application that allows people to warn other people of bad behavior in the workplace.
                      The term “whisper networks” describes the networks that have formed for women to warn other women
                      of alleged sexual harassers or abusers. Our app will allow victims of abuse to report these incidents,
                      not to incite legal litigations, but to simply warn others of bad actors while keeping their identity anonymous.
                      <br>
                      <br>
                      <strong>Users:</strong> The most common type of user for this app will be women,
                      but will not exclude men as they can face abuse/harrassment in the workplace as well.
                      Users will be able to post reports, edit their own reports and unpublish or completely delete their reports.
                      They will also be able to look up different organizations to review
                      whether or not there have been any reports about bad actors made within.
                    </v-card-text>
                </v-col>

              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      validUserName: "Guest"
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.page {
  background-color: #4b3a41;
}

#intro {
  font-weight: bolder;
  font-size: 18px;
  color: white;
}
</style>
