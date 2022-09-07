<template>
    <div>
      
    <b-container >    
       
        <b-row>             
        
        <b-col class="px-2 mt-4" cols="12" >  
          <h3>ACTUALMENTE EN CINES</h3>  
          <p>Usando Vuetify</p>         
             <listado/>
        </b-col>    
        </b-row>   
    </b-container>
 </div>
 
</template>

<script>
import Listado from '../../components/cartelera/Listado.vue'
export default {
  components: { Listado },

}
</script>

<style>

</style>