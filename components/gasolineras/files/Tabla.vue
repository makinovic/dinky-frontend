<template>
  <div class="mt-5 table" v-if="resultados.ListaEESSPrecio" >
   <b-table
                        
                        striped hover 
                        :items="resultados.ListaEESSPrecio" 
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        >
                          <template #cell(actions)>
        <b-button size="sm"  class="mr-2">
           Geolocalizar
        </b-button>

       
      </template>

  </b-table>
  </div>
</template>

<script>
export default {

   data() {
      return {
      
      resultados: [], 
      
      sortBy: 'PrecioProducto',
      fields: [
        { key: 'Dirección', label: 'Dirección' },
        { key: 'PrecioProducto', label: 'Precio',sortable: true },
        { key: 'Rótulo', label: 'Proveedor',sortable: true },
        { key: 'Horario', label: 'Horario' },
        { key: "actions",label:'Localizar' }
      ]
      
      
      }

    },
    async mounted() {
    
    this.$root.$on("resultado", (resultado) => {
      console.log(resultado.ListaEESSPrecio);
    this.resultados=resultado 
    
    });
  },
  methods: {
    update(data) {
      // I need to disable the button here
      this.output = data;
      data.item.name = "Dave";
      this.$refs["btn" + data.index].disabled = true      
    }
  }

}
</script>
<style scoped>
.table{
  height: 50vh;
  overflow-y:scroll;
}
</style>