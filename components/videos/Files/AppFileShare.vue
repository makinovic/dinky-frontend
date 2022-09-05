<template>
    <b-button @click.prevent="getShareLink" variant="light" size="sm">

       <template v-if="generatingLink">
           <b-spinner small type="grow"></b-spinner>
           Compartiendo...
       </template>

        <template v-else>
            Link para compartir
        </template>
         
    </b-button>
</template>

<script>
export default {
    data(){
        return{ 
            generatingLink: false
        }
    },
    props:{
        file:{ 
            required: true,
            type: Object 
        }
           
    },
methods:{
    copyToClipboard(url){
        
        let textarea = document.createElement("textarea")       
        textarea.value = url       
        document.body.appendChild(textarea)       
        textarea.focus()
        textarea.select()        
        document.execCommand("copy")      
        document.body.removeChild(textarea)
    },
    
    async getShareLink(){
        try{
            this.generatingLink=true;
            const response = await this.$axios.$post(`/api/file/${this.file.uuid}/share`);           
            this.copyToClipboard(response.data.url);     
            
            this.$bvToast.toast("Enlace copiado al portpapeles",{
                title:"Enlace generado",
                variant:"primary",
                toaster: "b-toaster-bottom-center",
                autoHideDelay: 4000
            });
            this.generatingLink = false;
        } catch(error){
            this.generatingLink = false;
        }
    }
},
    
}
</script>