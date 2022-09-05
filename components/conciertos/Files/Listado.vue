<template>

<div id="res" class=" col-md-6 mt-2 mb-2  d-inline-flex ">
  <b-card  no-body class="overflow-hidden" >
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="concierto.images[0].url" :alt="concierto.name" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body class="text-truncate" :title="concierto.name">
          <b-card-text >
           This is a wider card with supporting text as a natural lead-in to additional content.
            This content is a little bit longer.
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
import {mapActions,mapMutations } from 'vuex';
export default {
    props:{
        concierto:{
            required: true,
            type: Object
        }      
    },

  
}
</script>
<style scoped>
.card{   
    border-radius: 0.3em;
    
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
}



.card-title{
    font-size: 1rem;
}
.text-truncate {
    
    white-space: normal;
}
img {
    width: 100%;    
    object-fit: cover;
    border-radius:  0.6em 0.6em 0 0;    
}
</style>
