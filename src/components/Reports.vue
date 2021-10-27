
<template >
  <v-app class="content">
    <h2>{{ msg }}</h2>
    <v-row class="d-flex flex-column">
      <v-col cols="12" class="d-flex flex-column mb-6"
        v-for="(report,index) in reports"
        :key="index">
          <v-card>
            <v-card-title style="font-weight: bolder">{{report.report_title}}</v-card-title>
            <v-card-subtitle>{{report.report_date_created}} | actor | company </v-card-subtitle>
          </v-card>
      </v-col>
    </v-row>
  </v-app>
  </template>

<script>

export default {
  name: 'Reports',
  data() {
    return {
      msg: 'This is the reports component',
      reports: [
        {
          "report_title": 'First report',
          "report_date_created": "1/1/23",
          "last_name": "Butler",
          "address": "6649 N Blue Gum St",
          "city": "New Orleans",
          "state": "LA",
          "zip": 70116,
          "donor": false
        },
        {
          "report_title": 'Second report',
          "report_date_created": "2/4/23",
          "last_name": "Darakjy",
          "address": "4 B Blue Ridge Blvd",
          "city": "Brighton",
          "state": "MI",
          "zip": 48116,
          "donor": true
        },
        {
          "report_title": 'Third report',
          "report_date_created": "5/23/20",
          "last_name": "Venere",
          "address": "8 W Cerritos Ave #54",
          "city": "Bridgeport",
          "state": "NJ",
          "zip": 8014,
          "donor": true
        },
      ],
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: block;
  justify-content: center;
  align-content: center;
  padding: 40px;
}
</style>
