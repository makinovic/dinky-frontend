<template>
 <div>
   
    <b-container >
        <h2>PRECIO DE COMBUSTIBLES POR GASOLINERAS</h2>
        <h6>Datos reales obtenidos del <strong>Ministerio Para La Transformación Ecológica Y El Reto Demográfico</strong> (miteco.gob.es/es/) </h6>
       <h6>Los datos se actualizan cada media hora</h6>
        <b-row class="mt-4">
             
        <b-col class="px-2">
            
           
               <selector/>         

        </b-col>
        <b-col class="px-2" cols="8">
             
             <mapa/> 

        </b-col>
        
   
        </b-row>
        <b-row>
           <tabla/>
        </b-row>

    </b-container>
 </div>
</template>

<script>

import Mapa from '../gasolineras/files/Mapa.vue';
import Selector from '../gasolineras/files/Selector.vue';
import Tabla from '../gasolineras/files/Tabla.vue';
export default {

    components:{
        Selector,
        Mapa,
        Tabla
    }
 


}
</script>
