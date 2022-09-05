<template>
    <div class="player">
        <video controls  :key="url" width="350" crossorigin="anonymous">
            <source :src="url" type="video/mp4">
            <track label="English" kind="captions" srcLang="en" :src="url" default>
        </video>
      
    </div>
</template>

<script> 
    import {mapActions,mapGetters,mapMutations} from 'vuex'; 
export default {
    data(){
        return{                
                url:""        
        }
    },    
    
    
    props:{
        file:{
            required: true,
            type: Object
        }
           
    },
    computed:{
        sizeFormatted(){
            return filesize(this.file.size);
        }
    },
        methods:{
           async  getUrl(){
                const response = await this.$axios.$get('/api/filesSrc',{
                  params:{
                      name: this.file.name,
                      extension: 'mp4',
                      size: this.file.size
                  
                  }
                 
                });    
                this.url =response
                
              }
    },
    mounted () {
        this.getUrl()
      }
    
    
  
    
}
</script>