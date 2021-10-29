
<template>
  <v-app class="content">

    <v-expansion-panels>
    <v-expansion-panel v-for="(report,index) in reports" :key="index">
      <v-expansion-panel-header>
        {{report.report_title}}
        {{report.report_date_created}} | actor | company
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        <br>
        <div class="btns">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="normal" v-bind="attrs" v-on="on"> ACTIONS </v-btn>
            </template>
          <v-list>

            <v-list-item v-for="(item, index) in actions" :key="index" @click="methods.showReport()">


              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </v-app>
  </template>

<script>
import {APIService} from '../http/APIService';
const apiService= new APIService();

export default {
  name: 'Reports',
  data () {
    return {
      msg: 'This is the reports component',
      act: '',
      reports1: '',
      actions: [
        {
          'title': 'Unpublish',
        },
        {
          'title': 'Modify',
        },
        {
          'title': 'Delete',
        }
      ],
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
      methods: {
        btn_action(item) {
          if (item.title == 'Delete') {
            alert("Are you sure you want to delete this report permanently?")
          }
        },
        showReport() {
          console.log("hello")
        },
        editReport() {
          apiService.editReport(this.report).then(response => {
            if (response.status == 200) {
              this.report = reponse.data;
              router.push('/report-list/update');
            } else {
              this.showMsg = "error";
            }
          })
        }
      }
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

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
