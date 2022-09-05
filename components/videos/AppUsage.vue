
<<template  >
    <div class="usage" v-if="$auth.loggedIn">
        Uso: {{ usageFormatted }} /{{storageFormatted}} ({{percentageUsed}}%)
    </div>
</template>

<<script>
 import{mapActions,mapGetters} from 'vuex';
 import filesize from 'filesize';
export default {
   
    methods:{
 
        ...mapActions({
            getUsage:'usage/getUsage'  
        })
    },
    computed:{
        ...mapGetters({
            usage:'usage/usage'
        }),
        usageFormatted(){
            return filesize(this.usage);
        },
        storageFormatted(){
           return filesize(this.$auth.user.plan.storage)
        },
        percentageUsed(){
           return ((this.usage / this.$auth.user.plan.storage) * 100).toFixed(1);
        }
    },
    mounted(){
        this.getUsage();       
    }
    
}
</script>

<style scoped >
.usage{
    color:black;
    background-color:#FFC107;
    padding:0 0.5rem;
    border-radius:5px;
    cursor:default;
}
    
</style>