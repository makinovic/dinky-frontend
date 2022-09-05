<template>
  <div>
   <b-navbar toggleable="lg" type="light" variant="warning">
      <b-navbar-brand to="/">Dinky Island</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <client-only>
 
            <template v-if="$auth.loggedIn">
          <b-nav-item to="/upload">Mis Videos</b-nav-item>
          <b-nav-item to="/plans" v-if="!$auth.user.subscribed">Mejorar mi plan 🌟</b-nav-item>  
            </template>

          </client-only>        
               
       
        </b-navbar-nav>

        <client-only>
        <b-navbar-nav class="ml-auto">
          <template v-if="$auth.loggedIn">
            <b-nav-item>               
                    <app-usage/>

               </b-nav-item>
              <b-nav-item-dropdown right v-if="$auth.loggedIn">
                <template #button-content>{{$auth.user.name}}</template>
                <b-dropdown-item to="/panel/dashboard">Mi Cuenta</b-dropdown-item>
                <b-dropdown-item href="#" @click.prevent="logout">Cerrar Sesión</b-dropdown-item>
              </b-nav-item-dropdown>

          </template>
           
          <template v-else>
          <b-nav-item to="/login">Iniciar Sesión</b-nav-item>
          <b-nav-item to="/register">Registro</b-nav-item>
          </template>


        </b-navbar-nav>
        </client-only>
      </b-collapse>
   </b-navbar>



  </div>
</template>

<script>
import AppUsage from './videos/AppUsage.vue';

export default {
  components: { AppUsage },

  methods:{
    async logout(){
      await this.$auth.logout();
      this.$router.push('/')
    }
  }

}
</script>

<style>
.nuxt-link-exact-active {
    font-weight: bold;
    
}

</style>