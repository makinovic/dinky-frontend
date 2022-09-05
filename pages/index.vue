<template>
    <div class="mb-4">
      <b-jumbotron style="color:#ffffff; background: linear-gradient(90deg, rgb(36, 114, 181) 0%, rgb(56, 70, 96) 100%); min-height: 79.8906px;"
      fluid
      header="Dinky Island"
      lead="Web de pruebas y experimentos con Nuxt(Vue 3) como frontend y Laravel actuando como Saas. Echa un vistazo a la sección Documentación para ver de que va esto"
      >
         <b-button variant="warning" @click.prevent="handleClickEvent">Almacena tus videos en AWS S3 </b-button>
      </b-jumbotron>     
   
  
        <div id="nav" :class="{sticky:active}"> 
            <div id="nav-container" :class="toggleNavClass()">
              <ul>
                <li :class="[active ? 'show-logo' :'logo']" >Dinky Island</li>              
                <li><a   @click="scrollToSection('luz')">Precio Luz</a></li> |
                <li><a    @click="scrollToSection('videos')">Videos</a></li> |
                <li><a    @click="scrollToSection('gas')">Precio Combustibles</a></li> |
                <li><a   @click="scrollToSection('conciertos')">Conciertos</a></li> |
                <li><a    @click="scrollToSection('cartelera')">Cartelera</a></li> 
              </ul>
           </div> 
            <client-only>
              <b-navbar-nav style="padding: 0.5rem 1rem;" class="ml-auto logo" :class="[active ? 'show-login' :'logo']">
                  <b-nav-item-dropdown right v-if="$auth.loggedIn">
                    <template #button-content>{{$auth.user.name}}</template>
                    <b-dropdown-item to="/panel/dashboard">Mi Cuenta</b-dropdown-item>
                    <b-dropdown-item href="#" @click.prevent="logout">Cerrar Sesión</b-dropdown-item>
                  </b-nav-item-dropdown>
                  <template v-else>
                  <b-nav-item to="/login">Iniciar Sesión</b-nav-item>
                  <b-nav-item to="/register">Registro</b-nav-item>
                  </template>
              </b-navbar-nav>
            </client-only>
        </div>     
        <hr>
        <luz id="luz" /><hr>
        <PlansList  @cardClick="handleClickEvent" id="videos"/><hr> 
        <Gasolineras id="gas"/><hr>
        <conciertos id="conciertos"/><hr>
        <cartelera id="cartelera"/>           
     
   
    </div> 
</template>

<script>
import Conciertos from '../components/conciertos/Conciertos.vue'
import FooterB from '../components/FooterB.vue'
import Gasolineras from '../components/gasolineras/Gasolineras.vue'
import Luz from '../components/luz/Luz.vue'
import PlansList from '../components/videos/PlansList.vue'
import Cartelera from './cartelera/cartelera.vue'



export default {
  
  components:{
    Gasolineras,
    Luz,
    PlansList,
    Cartelera,
    FooterB,
    Conciertos
  },
  name: 'IndexPage',
   data(){
    return{
      active: false
    }
  },
  methods: {
     async logout(){
      await this.$auth.logout();
      this.$router.push('/')
    },
     handleClickEvent(){
        if(!this.$auth.loggedIn){
          this.$router.push({'name': 'register'});
        }
      },

    scrollToSection(data){
      const id = data;
      const yOffset = -100; 
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

window.scrollTo({top: y, behavior: 'smooth'});
    },
    toggleNavClass(){
        if(this.active == false){
          return 'nav'
        } else {
          return 'sticky-nav'
        }

    },
    
  },
  mounted(){
  window.document.onscroll = () => {
      let navBar = document.getElementById('nav');
      if(window.scrollY > navBar.offsetTop){
        this.active = true;
        } else {
        this.active = false;
      }
    }
  }
}
</script>
<style>

.jumbotron {   
    margin-bottom: 1rem;   
}
#nav {
 /* transition: 100ms;*/
 flex-flow: row nowrap;
    justify-content: flex-start;
   
    width: 100%;
    padding-right: 0.5rem;
    
    margin-right: auto;
    margin-left: auto;
}

#nav ul {
    margin: 0;
    padding: 0;
    
    list-style-type: none;
}
#nav ul li{
  display:  inline-block;
}
#nav ul li a{
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  
}
#nav ul li a:hover{
  color:#2571B3;
  
  text-decoration: none;
  cursor: pointer;
}
.logo{
   display: none !important; 
}
 .show-logo{
    font-weight: bold;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
    display: inline-block !important;
  }
  .show-login{
    display: inline-block !important;
    
  }
.sticky-nav{
 /* transition: 100ms;*/
 padding: 0.5rem 1rem;
}

#nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;
  text-align: center  !important;
  padding-left: 1rem;
}

/* have to add the ID nav (#nav) otherwise the backgrnd color won't change as the previous background color is set in an ID and ID trumps class notation */
#nav.sticky{
 /* transition: 150ms;*/
  z-index: 300;
  background-color:#FFC107 ;
  position: fixed;
  top: 0;
  padding-left: 0;
  }
 
/*
.jumbotron {
  background-image: url('@/assets/images/header.jpg');
  background-size: cover;
}
*/
</style>
