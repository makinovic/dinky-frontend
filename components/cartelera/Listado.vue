<template>

<b-row>
 

 
 <v-app>
     <v-container fluid>
        <v-row >
            <v-col   v-for="resultados in datos.results" :key="resultados.id" cols="12" sm="6" md="4" >
                    <v-card  class="mx-auto"  max-width="344" >
                     <NuxtLink :to="getDetUrl(resultados.id) ">
                        <v-img
                            :src="getImgUrl(resultados.poster_path)"
                            height="200px"
                        ></v-img> 
                     </NuxtLink>           
                        <v-card-title class="text-no-wrap text-truncate">
                            {{resultados.title}}
                        </v-card-title>            
                        <v-card-subtitle>
                            <p class="card-text"> {{formatDate(resultados.release_date)}}
                            valoración: {{resultados.vote_average}}</p>
                        </v-card-subtitle>
                    </v-card>
            </v-col>
        </v-row>
     </v-container>
 </v-app>


 
 
    
</b-row>
</template>

<script>
export default {
     data() {
    return {
      datos: [],
           
    }
    
    },
    
    methods:{

            async fetchCartelera() {
            try { 
                const TOKEN='6bdc1df3c6f8152611725c52e06c49ed';
                this.datos = 
                await this.$axios.$get('https://api.themoviedb.org/3/discover/movie?api_key=' + TOKEN + '&language=es&region=ES'); 

         //  console.log(this.datos)                
            } catch (error) {
                console.log(error)                
            } 
        },
        getImgUrl(pet) {
            
            return 'https://image.tmdb.org/t/p/w500/'+pet
        },
        getDetUrl(pet){
            return '/cartelera/detalles?id=' + pet
        },
         formatDate(date) {
        // format the date to be displayed in a readable format
        return new Date(date).toLocaleDateString('es', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      },

    },
      mounted() {
    this.fetchCartelera();
   
    },
    

}
</script>

<style scoped>
.card{
   
    border-radius: 0.6em;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
}

.card-title{
    font-size: 1rem;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
    border-radius:  0.6em 0.6em 0 0;
    
}
</style>