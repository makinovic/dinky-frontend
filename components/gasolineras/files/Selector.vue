<template>
  <b-form ref="anyName">
                <b-form-group label="Provincia" label-for="provincia">
                    <b-form-select  v-model="sProvincia" @change="fetchLocalidades" :disabled="!provincias.length" >
                        <option value="" selected disabled>Provincia</option>
                        <b-form-select-option 
                            v-for="(provincia,index) in provincias"  
                            :key="index" 
                            :value="provincia.IDPovincia">
                        {{provincia.Provincia}}
                        </b-form-select-option>
                    </b-form-select>
                </b-form-group>   

                <b-form-group label="Localidad" label-for="localidad">
                    <b-form-select  v-model="sLocalidad" @change="fetchCarburantes"  :disabled="!localidades.length" >
                        <option value="" selected disabled>Localidad</option>
                        <b-form-select-option 
                            v-for="localidad in localidades"  
                            :key="localidad.IDMunicipio" 
                            :value="localidad.IDMunicipio">
                        {{localidad.Municipio}}
                        </b-form-select-option>
                    </b-form-select>
                </b-form-group>    


                 <b-form-group label="Carburante" label-for="carburante">
                    <b-form-select  v-model="sCarburante" @change="fetchResultados" :disabled="!carburantes.length"  >
                        <option value="" selected disabled>Carburante</option>
                        <b-form-select-option 
                            v-for="carburante in carburantes"  
                            :key="carburante.IDProducto" 
                            :value="carburante.IDProducto">
                        {{carburante.NombreProducto}}
                        </b-form-select-option>
                    </b-form-select>
                </b-form-group>              
            </b-form>
</template>

<script>
export default { 

    data() {
      return {
      provincias: [],
      localidades:[],
      carburantes:[],
      resultados: [], 
      sProvincia: {},
      sLocalidad: {},
      sCarburante:{},
      sortBy: 'PrecioProducto',
      fields: [
        { key: 'Dirección', label: 'Dirección' },
        { key: 'PrecioProducto', label: 'Precio',sortable: true },
        { key: 'Rótulo', label: 'Proveedor',sortable: true },
        { key: 'Horario', label: 'Horario' }
      ]           
      }
    },
    methods: {

        async fetchProvincias() {
            try {
                this.provincias = await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/').then(res =>
            res.json())          
                
            } catch (error) {
                console.log(error)                
            } 
        },

        async fetchLocalidades() {
            this.carburantes.splice(0);
            try {
                this.localidades = 
                await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/'+ this.sProvincia).then(res=>res.json())
            } catch (error) {
                console.log(error)
                
            }

          //  console.log(this.localidades)
        },
        async fetchCarburantes() {
            try {
                this.carburantes = await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/').then(res =>
            res.json())
            } catch (error) {

                console.log(error)
                
            } 
          //  console.log(this.carburantes)
        },
         async fetchResultados() {
            try {
                this.resultados = await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/'+this.sLocalidad+'/'+ this.sCarburante).then(res =>
            res.json())
            this.$root.$emit('resultado', this.resultados);
             this.$refs.anyName.reset();
             this.localidades.length=0;
             this.carburantes.length=0;
             this.sProvincia=null;
             this.sLocalidad=null;
             this.sCarburante=null;
             console.log(this.resultados)
            } catch (error) {
                console.log(error)                
            } 
        },
    },
    mounted() {
    this.fetchProvincias();   
    }
}
</script>
