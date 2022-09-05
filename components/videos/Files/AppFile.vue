<template>
<b-list-group  >
 <b-list-group-item  class=" d-flex"> 

    <span class="text-truncate">{{file.name}} - <span class="text-primary">({{sizeFormatted}})</span></span>
    <div class="ml-auto pl-2">    
      
      <AppFileShare :file="file"/>
      
      
    </div>  
    <div class="pl-4"> 

        <AppVideoView :file="file"/>  
    </div> 
    <div class="pl-4">
        <b-button variant="danger" size="sm" @click.prevent="deleteFile"><font-awesome-icon :icon="['fas', 'trash']"/></b-button>
    </div>
    
         
 
 </b-list-group-item>
 
 
  </b-list-group>
</template>




<script>
import {mapActions,mapMutations } from 'vuex';
import AppFileShare from '@/components/videos/Files/AppFileShare';
import AppVideoView from '@/components/videos/Files/AppVideoView';
import filesize from 'filesize';
export default {
   
   
    components:{
        AppFileShare,
        AppVideoView
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
       
        isSelected: function (i) {
            return i === this.selected
          },
        ...mapMutations({
            decrementUsage:'usage/DECREMENT_USAGE'
        }),
        ...mapActions({
            deleteFileAction:'files/deleteFile'
        }),
      async  deleteFile(){
        this.$bvModal.msgBoxConfirm("¿Quieres eliminarlo?",{
            okTitle:"Si",
            cancelTitle:"No"
        }).then(async (value) => {
            if(value){
                await this.deleteFileAction(this.file.uuid);
                this.decrementUsage(this.file.size);
            }
        })
           
        }
    }
    
}
</script>