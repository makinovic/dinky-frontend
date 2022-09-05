<template>

<b-container fluid>
  
    
  
	<div class="row fondo " :style="imageStyleObject">
       
            <div class="col-md-3 card-overlay">
                <img :src="poster" :alt="this.datos.title" class="mt-4 mb-4 rounded-4 img-fluid ">
            </div>
            <div class="col-md-9 card-overlay">
                <h2 class="mt-4">{{this.datos.title}}</h2>
                <p>{{formatDate(this.datos.release_date)}}</p>
                <p>{{this.datos.tagline}}</p>
                 <p>{{this.datos.overview}}</p>
            </div>  
    </div><hr> 
    <b-container fluid style="display:inline-flex">   
        
            <div class="my-grid mb-4 col-md-6 col-xs-12 col-sm-12 "> 
              
                    <b-card v-for="(actor,index) in this.actores.cast" v-if="index <= 11" :key="actor.id"  :title="actor.name" :img-src="getImgUrl(actor.profile_path)" :img-alt="actor.name" img-top>         
                        <b-card-text>               
                                <span>{{actor.character}}</span>
                        </b-card-text>
                    </b-card>
               
            </div>  
              
                
            <div class="col-md-6 col-xs-12 col-sm-12">   
                <h3>TRAILER</h3>
                <div class="embed-responsive embed-responsive-16by9" >
                    <iframe class="embed-responsive-item" v-if="videos"  :src="idVideo" allowfullscreen></iframe>
                </div>
            </div>
        
    </b-container>
</b-container>
  
</template>

<script>

export default {
  

    data(){
        return {
            datos:[],
            videos:[],
            actores:[],
            idVideo:'',
            poster:'',
            idPic: "",
            idPet: '',
            backImage:''            
        }
        },
    methods: {
           
         async fetchDetalles() {
             
            try { 
                const TOKEN='6bdc1df3c6f8152611725c52e06c49ed';
                this.datos = 
                await fetch('https://api.themoviedb.org/3/movie/' + this.$route.query.id +'?api_key=' + TOKEN + '&language=es&region=ES').then(res =>
            res.json())  
             this.backImage="https://image.tmdb.org/t/p/w500/" + this.datos.backdrop_path;

                this.actores =
                await fetch('https://api.themoviedb.org/3/movie/' + this.$route.query.id +'/credits?api_key=' + TOKEN + '&language=es&region=ES').then(res =>
            res.json())
            



                this.videos = 
                await fetch('https://api.themoviedb.org/3/movie/' + this.$route.query.id +'/videos?api_key=' + TOKEN + '&language=es&region=ES').then(res =>
            res.json())
             //console.log(this.videos)   
            this.poster='https://image.tmdb.org/t/p/w500/'+ this.datos.poster_path
            this.idVideo='https://www.youtube.com/embed/'+ this.videos.results[0].key
           //console.log(this.idVideo)
            
           

          //  console.log(this.backImage)
          // console.log(this.videos.results[0].key)              
            } catch (error) {
                console.log(error)                
            } 
        }, 
        getImgUrl(pet) {
            
            return 'https://image.tmdb.org/t/p/w138_and_h175_face/'+pet
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
        this.fetchDetalles()
        
         this.idPic =this.$route.params.id;
       
        
      },
      computed: { // will be re-computed when the image property changes
      
        imageStyleObject() {

            const estilo="backgroundImage:" + `url(${this.backImage})` 
           
           return estilo;
           
        }
      }
      

   

}
</script>

<style scoped>
.my-grid {
  display: grid;
  justify-items: center;
  /* 280px is the minimum a column can get, you might need to adjust it based on your needs. */
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 0.5rem;
}
h4, .h4 {
    font-size: 1rem;
}
span{
    color:#000000;
    font-size: 0.8rem;
}

.my-grid > * {
  width: 100%;
  max-width: 20rem;
}
.card{
   
    border-radius: 0.6em;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
}

h2{
    color: #ffffff;
}
p{
    color: #ffffff;
}

.fondo { 
    background-size: contain;
   background-repeat:no-repeat;
background-size:cover;
background-position:center;

    
}
.card-overlay {
  background: rgba(0, 0, 0, 0.8);
  padding-right: 0;
  
}

</style>