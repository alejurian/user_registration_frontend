<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Usuarios</h1>
      </div>
      <v-spacer></v-spacer>

      <router-link to="/users">
        <span class="mr-2 white--text">Listado de usuarios</span></router-link
      >
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
