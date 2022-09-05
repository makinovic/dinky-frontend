<template>

<div>
 <b-container align-v="center">
 
 <h3>SUBE TUS VIDEOS A AWS S3</h3>
  
  <div class="mt-3">
   <b-card-group deck class="mb-3">
   
    <b-card borderVariant="default" header="Gratis" header-bg-variant="secondary" header-text-variant="white" align="center"
        title="0€/mes" class="mb-5 mt-2">
        <b-card-text class="bt-2">Prueba gratis. Todos lo son, pero en fin...
        </b-card-text>
        <b-list-group flush>    
            <b-list-group-item></b-list-group-item>
            <b-list-group-item>500mb gratis</b-list-group-item>
            <b-list-group-item>1gb gratis de ancho de banda</b-list-group-item>
            <b-list-group-item></b-list-group-item>
        </b-list-group>
        <b-button variant="secondary" @click.prevent="$emit('cardClick')">Quiero probarlo</b-button>
    </b-card>
    <b-card borderVariant="info" header="Plata" header-bg-variant="info" header-text-variant="white" align="center"
    title="30€/mes" class="mb-5 mt-2">
    <b-card-text class="bt-2">En realidad todos son gratis. Solo estamos probando el bucket de AWS y la pasarela de Stripe (en modo sandbox)
    </b-card-text>
    <b-list-group flush>
        <b-list-group-item></b-list-group-item>
        <b-list-group-item>50gb de capacidad</b-list-group-item>
        <b-list-group-item>100gb de ancho de banda</b-list-group-item>
        <b-list-group-item></b-list-group-item>
    </b-list-group>
    <b-button variant="info" @click.prevent="$emit('cardClick')">Comprar ya</b-button>
    </b-card>
    <b-card borderVariant="primary" header="Oro" header-bg-variant="primary" header-text-variant="white" align="center"
    title="50€/mes" class="mb-5 mt-2">
    <b-card-text class="bt-2">Si, este plan también es gratis 🥳
    </b-card-text>
    <b-list-group flush>
        <b-list-group-item></b-list-group-item>
        <b-list-group-item>500gb de capacidad</b-list-group-item>
        <b-list-group-item>Ancho de banda ilimitado</b-list-group-item>
        <b-list-group-item></b-list-group-item>
    </b-list-group>
    <b-button variant="primary" @click.prevent="$emit('cardClick')">Comprar ya</b-button>
    </b-card>
   
   </b-card-group>
  </div>
 
 </b-container>

</div>

</template>

<script>
export default {
    
}
</script>