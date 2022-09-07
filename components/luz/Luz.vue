<template>
<div>
  <b-container >
    
  <h2>EL PRECIO DE LA LUZ HOY</h2> 
   
  <h6>Datos reales obtenidos de <strong>Red Eléctrica de España</strong> (www.ree.es/es)  </h6>
  
          <template v-if="loadingForm">
            <div class="d-flex justify-content-center mb-3 mt-4">
                <b-spinner variant="primary" style="width: 4rem;height:4rem;"></b-spinner>
            </div>
        </template>
        <template v-else>

    
					
								<div id="home-scroll-down" >

									<div id="price_summary" class="col-xs-12 block">

										<div id="current_info" class="row block">

											<div class="col-lg-12 mt-4">
												<div class="row">
													<div class="col-sm-3">
														<div class="inner_block gauge_hour">
															<h2 class="title">Precio a las
																{{this.hora}}</h2>
                                <span class="main_text">{{this.horaActual.precio}}€</span>
																
															<span class="col-sm-12 sub_text text--center"></span>
														</div>
													</div>

													<div class="col-sm-3">
														<div class="inner_block gauge_day">
															<h2 class="title">Precio medio del día</h2>
															<span class="main_text">{{avg}} €</span>
															<span class="sub_text">{{this.fecha}}</span>
														</div>
													</div>

													<div class="col-sm-3">
														<div class="inner_block gauge_low">
															<h2 class="title">Precio más bajo del día</h2>
															<span class="main_text">{{this.rangoFechaMin}}</span>
															<span class="sub_text green">
																<div class="arrow-down"></div>
																{{this.precioHoraMin.precio}}
																€/kWh
															</span>
														</div>
													</div>

													<div class="col-sm-3 block">
														<div class="inner_block gauge_hight">
															<h2 class="title">Precio más alto del día</h2>
															<span class="main_text">{{this.rangoFechaMax}}</span>
															<span class="sub_text red">
																<div class="arrow-up"></div>
																{{this.precioHoraMax.precio}}
																€/kWh
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
             	<h2 class="title mt-4" itemprop="name">PRECIO DEL KWH DE LUZ POR HORAS</h2>
        </template>

        <div class="col-lg-12 ">
				
					<div id="hour_prices" class="col-display-4">
            <div   v-for="dato in this.datos" :key="dato.id">
													<div class="col-xs-3 barra" :style="{'background-color':dato.color} "></div>
          <div class="col-xs-9" style="color:#f4a321;"><span style="color: #333;float:left;padding-right:5px;" itemprop="description">{{dato.rango}}: </span> <span itemprop="price">{{dato.precio}} €/kWh</span><meta itemprop="priceCurrency" content="EUR"></div>
													
            </div>							
			  </div>
				</div>
						
					<div class="mb-4 mt-4">
            <LineChart />
          </div>
         
  </b-container>
</div>
     
  
</template>

<script>

import LineChart from './lineChart.vue';


export default {
  components: { LineChart },
     data() {
    return {
      resultados:[],
      datos: [],
      precioHoraMax:'',
      precioHoraMin:'',      
      maxVal:'',
	    minVal:'',
      avg:'',
      fecha:'',
      hora:'',
      horaActual:[],
      rangoFechaMax:'',
      rangoFechaMin:'',
      colorVal:'',
      loadingForm:true,
    }
    
    },

      methods: {

        async fetchLuz() {
            try {  
                const TOKEN='b185b3c4e3b710b539d9e8fe83e8e2fe2abe50a00e4fead48081a507047b15e3';
                const luz = 
                await fetch('https://api.esios.ree.es/indicators/10391?geo_ids[]=8741',{
                  'headers':{'mode': 'no-cors','Accept': 'application/json; application/vnd.esios-api-v1+json','Content-Type':'application/json','Host':'api.esios.ree.es','Authorization':'Token token=' + TOKEN,
                }}).then(res =>
            res.json())

           this.resultados = luz['indicator']['values']           
            let suma=0;
            let rangoH='';
            let rangoConcat='';
            let valorR='';            
            const maxInicial=Math.max(...this.resultados.map(o => o.value));            
               
            this.resultados.forEach((value, index) => {
                valorR=this.formatDate(value.datetime).toString();
                rangoH=valorR.substr(0, valorR.indexOf(':'));
                rangoConcat=rangoH + 'h' + '-' + this.pad((parseInt(rangoH)+ 1)) + 'h';

               this.colorVal=this.setColor(value.value,maxInicial)
                
                this.datos.push({precio:(value.value / 1000).toFixed(5),fecha:this.formatDate(value.datetime),rango:rangoConcat,color:this.colorVal});
               suma +=value.value;
            });
            this.$root.$emit('datos', this.datos);
           
           this.avg=((suma / 24) / 1000 ).toFixed(5)
            this.maxVal = Math.max(...this.datos.map(o => o.precio)).toFixed(5);            
            this.minVal = Math.min(...this.datos.map(o => o.precio)).toFixed(5);
            this.precioHoraMax = this.datos.find(o => o.precio === ''+this.maxVal+'');          
            this.precioHoraMin = this.datos.find(o => o.precio === ''+this.minVal+'');
            let horaMax=this.precioHoraMax.fecha.substr(0, this.precioHoraMax.fecha.indexOf(':'));
            let horaMin=this.precioHoraMin.fecha.substr(0, this.precioHoraMin.fecha.indexOf(':'));            
            this.rangoFechaMax=horaMax + 'h'+ ' - ' + (parseInt(horaMax) + 1) + 'h'; 
            this.rangoFechaMin=horaMin + 'h'+ ' - ' + (parseInt(horaMin) + 1) + 'h';
            let current = new Date();
            this.fecha=current.toLocaleDateString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            }); 
            
            this.hora = current.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            });
            current.setMinutes(0)
            current.setSeconds(0)
            let calHoraActual = current.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
            this.horaActual = this.datos.find(o => o.fecha === ''+calHoraActual+'');
            
           
            } catch (error) {

                console.log(error)
                
            } 
            this.loadingForm=false;
        },

        pad(d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        },

        setColor(precio,maxPrecio){

          let color='';
          const percentage= ((100 * precio)/maxPrecio)
          
                  if(percentage <=80){
                      color='#0FAF10';
                      return color;
                  }
                  if(percentage > 80 && percentage <=90){
                      color='#F4A321';
                      return color;
                  }
                   if(percentage > 90 ){
                      color='#F23C25';
                      return color;
                  }
                  

        },
        
         formatDate(date) {
        // format the date to be displayed in a readable format
        return new Date(date).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
      },
      },
    mounted() {
         this.fetchLuz();
    }

}
</script>
<style scoped>
.barra{
  height:0.9em; margin-top:1%;border-radius: 3px;
}
.col-xs-3 {
    -webkit-box-flex: 0;
    flex: 0 0 25%;
    max-width: 25%;
    
}
.col-xs-9 {
    -webkit-box-flex: 0;
    flex: 0 0 75%;
    max-width: 75%;
    
}
.title {
    text-align: center !important;
    color: #494949;
    font-weight: 700;
    font-size: 17px;
    border-bottom: 1px solid;
    border-bottom-color: #bbb;
    font-family: 'Ubuntu', sans-serif;
    line-height: 1.44em;
    margin-bottom: 0.72em;
    text-transform: uppercase;
}
 .inner_block {
    text-align: center;
}
.col-display-4 {
    column-count: 4;
}
.main_text {
    font-size: 50px !important;
    margin-top: 23px;
    display: block;
}
.sub_text {
    font-size: 2.5em;
    font-family: 'Ubuntu', sans-serif;
    font-size: 23px !important;
}
.arrow-down {
    display: inline-block;
    margin-top: 4%;
    border-color: #0faf10 transparent transparent transparent;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 21.7px 12.5px 0 12.5px;
}
.arrow-up {
    display: inline-block;
    margin-top: 4%;
    border-color: transparent transparent #f23c25 transparent;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12.5px 21.7px 12.5px;
}

.arrow-down, .arrow-up {
    margin-top: 0 !important;
}

#hour_price{
 
}
 #hour_prices [class*=col-] {
    float: left;
     font-size: 14px;
     font-weight: 400;

}
[class*=col-] {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}

.precios{
  font-size:2em;
  color:#17A2B8;
  font-weight: 600;
}
</style>

