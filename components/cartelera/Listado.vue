<template>

<b-row>
 
<div class=" col-md-3 mt-4 mb-4  d-flex align-items-stretch"  v-for="resultados in datos.results" :key="resultados.id">
 
 <b-card no-body class="rounded-4">
     <NuxtLink :to="getDetUrl(resultados.id) ">
         <img class="card-img-top " :src="getImgUrl(resultados.poster_path)" alt="Card image cap">
     </NuxtLink>
            <div class="card-body">
                <h5 class="card-title">{{resultados.title}}</h5>
                <p class="card-text"> {{formatDate(resultados.release_date)}}
                       valoración: {{resultados.vote_average}}</p>
               
            </div>
  </b-card>
 
  </div>
    
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