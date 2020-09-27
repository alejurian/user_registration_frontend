<template>
  <v-container>
    <form @submit.prevent="registerUser">
      <v-row>
        <v-col cols="12" sm="6" offset-md="3" md="6">
          <v-text-field v-model="user.name" label="Nombre"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" offset-md="3" md="6">
          <v-text-field
            v-model="user.email"
            type="email"
            label="Correo electrónico"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" offset-md="3" md="6">
          <v-text-field
            v-model="user.password"
            type="password"
            label="Contraseña"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" offset-md="3" md="6">
          <v-text-field
            v-model="user.password_confirmation"
            type="password"
            label="Repetir Contraseña"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn type="submit" color="primary">Registrar</v-btn>
        </v-col>
      </v-row>
    </form>
    <v-snackbar v-model="snackbar" :color="snackbarSuccess ? 'green' : 'red'">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'Admin',
        email: 'admin@paulus.com',
        password: '123456',
        password_confirmation: '123456',
      },
      snackbar: false,
      snackbarText: '',
      snackbarSuccess: false,
    }
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.snackbarText = ''
          this.snackbarSuccess = false
        }, 100)
      }
    },
  },
  methods: {
    async registerUser() {
      try {
        const { user } = this
        let response = await fetch('http://127.0.0.1:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
        response = await response.text()
        if (response.split('{').length > 1) {
          response = `{${response.split('{')[1]}`
        }
        response = JSON.parse(response)
        if (typeof response === 'object') {
          this.snackbar = true
          this.snackbarText = response[Object.keys(response)[0]][0]
          this.snackbarSuccess = false
          return null
        }
        this.snackbar = true
        this.snackbarText =
          'Usuario creado exitosamente. Se envío un correo para confirmar el usuario'
        this.snackbarSuccess = true
        this.user = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      } catch (error) {
        this.snackbar = true
        this.snackbarText = error
        this.snackbarSuccess = false
      }
    },
  },
}
</script>

<style></style>
