<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Verificando el usuario
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="snackbarSuccess ? 'green' : 'red'">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      snackbar: false,
      snackbarText: '',
      snackbarSuccess: false,
    }
  },
  async created() {
    if (this.$route.params.id) {
      const token = this.$route.params.id
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/api/verification/${token}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        response = await response.json()
        if (!response.token) {
          this.snackbarText = response[Object.keys(response)[0]][0]
          this.snackbarSuccess = false
        } else {
          this.snackbarText = 'Usuario verificado exitosamente.'
          this.snackbarSuccess = true
        }
        this.dialog = false
        this.snackbar = true
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 6000)
      } catch (error) {
        this.dialog = false
        this.snackbar = true
        this.snackbarText = 'Hubo un error al verificar el usuario'
        this.snackbarSuccess = false
      }
    } else {
      this.dialog = false
      this.snackbar = true
      this.snackbarText = 'No hay un token'
      this.snackbarSuccess = false
    }
  },
}
</script>

<style></style>
