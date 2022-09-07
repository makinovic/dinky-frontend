<template>

<div class="container mt-5">
    <b-row>
        <b-col class="px-2" lg="8" offset-lg="2" md="6" offset-md="3" offset-sm="1">
        <h3>Inciciar sesión</h3></hr>


         <v-app>
          <form @submit.prevent="login">
                <v-text-field                 
                  v-model="form.email"
                  :state="!errors.email && null" 
                  :counter="10"
                  id="email"
                  label="Correo"
                  required                 
                >
                <v-icon slot="append" color="info">
                mdi-mailbox
                </v-icon>                
                </v-text-field> 
                <b-form-invalid-feedback v-if="errors.email">{{errors.email[0]}}</b-form-invalid-feedback>             
                 <v-text-field
                  v-model="form.password"
                  :state="!errors.password && null" 
                  :counter="10"
                  type='password'
                  id="password"
                  label="Contraseña"
                  required                 
                >
                <v-icon slot="append" color="info">
                mdi-key
                </v-icon>
                </v-text-field>
                <b-form-invalid-feedback v-if="errors.password">{{errors.password[0]}}</b-form-invalid-feedback>
                <v-btn color="info" class="mr-4" type="submit">enviar</v-btn>
                <v-btn color="warning" @click.prevent="clear">borrar</v-btn>
         </form>  
         </v-app>

      
        </b-col>
    </b-row>

</div>
</template>

<<script>
export default {
  head:{
    title:"Iniciar sesión"
  },
    data(){
        return{
                form:{
                email:"",
                password:""
                },
                errors: {}
        
        }
    },    
     methods: {
         async  login(){
            try{
               
                await this.$auth.loginWith("laravelSanctum",{
                data: this.form
                });
                this.$router.push('/');
            }
            catch(e){
              if(e.response.status === 422){
                this.errors= e.response.data.errors
               }else if (e.response.status === 401){
                    this.errors = { email: []}
                    this.errors.email[0]='El correo o la contraseña es incorrecto'
               }
                
            }
            
           }
     }
}
</script>