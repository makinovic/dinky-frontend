<template>
<div class="container">
    
   <template v-if="isFetchingConciertos">
            <div class="d-flex justify-content-center mb-3 mt-4">
                <b-spinner variant="primary" style="width: 4rem;height:4rem;"></b-spinner>
            </div>
        </template>
        <template  v-else>
            <h3>PRÓXIMOS CONCIERTOS</h3> 

            
           <div class=" content-row">
                <b-pagination
                 size="md"
                 class="customPagination"
                 :total-rows="this.conciertos.length"
                 v-model="currentPage"
                 :per-page="perPage">
                </b-pagination>

              
            <div class="row">

                <Listado  v-for="concierto in paginador(conciertos)" 
                :key="concierto.id" 
                :concierto="concierto" 
                /> 

             </div>
           </div>
        </template>
      
    </div>
  
</template>

<script>
import {mapActions,mapMutations,mapGetters } from 'vuex';
import Listado from '../conciertos/Files/Listado.vue'
export default {
     data(){
        return{
        errors:{},
        totalRows: 10,
        currentPage:1,
        perPage:10, 
        }
    },
     components:{
        Listado,
    },
    
     methods:{  
           ...mapActions({
            
            getConciertos: 'conciertos/getConciertos'            
        }),
         setValidationErrors(errors){
            this.errors=errors;
        },

        paginador(conciertos) {
          
          const indiceInicio = (this.currentPage - 1) * this.perPage;
          const indiceFinal =
            indiceInicio + this.perPage > conciertos.length
              ? conciertos.length
              : indiceInicio  + this.perPage;
          return conciertos.slice(indiceInicio , indiceFinal );
       
    }
          
    },
     computed:{
     
        ...mapGetters({
            conciertos:'conciertos/conciertos',
                 
            isFetchingConciertos:'conciertos/isFetchingConciertos'
        })
    },
   
   mounted(){
         
     this.getConciertos(this.currentPage).catch(error => {
      console.error(error)
    })  
   // console.log(this.$store.getters.currentPage)
       
    
    }

}
</script>

<style scoped>
.page-item.active .page-link {
    
    color:#000;
    background-color:#FFC107!important;
    border-color:#FFC107;
}
.customPagination > li > button {
  color: red;
}
.customPagination > li.active > bottom,
.customPagination > li > button:hover
{
  color: white;
  background-color: green!important;
}
</style>
