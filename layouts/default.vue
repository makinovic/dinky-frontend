<template>
<div>   

            <template>
                <div style="min-height:100vh; display:flex; flex-direction:column; 
                        ">
                    <Navbar/>
                    <Nuxt />

                </div>

            </template>
            <template>
                <div>
                    <FooterB/>
                </div>
            
            </template>
</div>
</template>
<script>
 import Navbar from '../components/Navbar.vue'
 import FooterB from '../components/FooterB.vue'
 export default{
    components:{
        Navbar,
        FooterB
    }

 }
</script>

<style src="../assets/styles/app.css" ></style>
