<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Created at', value: 'created_at' },
        { text: 'Status', value: 'verification_status' },
      ],
      users: [],
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        let response = await fetch('http://127.0.0.1:8000/api/users')
        response = await response.json()
        this.users = response
      } catch (error) {
        this.users = []
      }
    },
  },
}
</script>

<style></style>
