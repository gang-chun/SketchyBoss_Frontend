<template>
  <v-app>
    <div>
      <h2>Search Test</h2>
      <div class="companies">
        <div v-for="company in allCompanies" :key="company.id" class="company">
          {{ company.name }}
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions }  from 'vuex';

export default {
  name: "SearchTest",
  methods: {
    ...mapActions(['fetchCompanies']),
  },
  computed: mapGetters(['allCompanies']),
  created() {
    this.fetchCompanies();
  }
}
</script>
