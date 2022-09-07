<template>

<div class="container mt-5">
    <b-row>
        <b-col class="px-2" lg="8" offset-lg="2" md="6" offset-md="3" offset-sm="1">
        <h3>Crear cuenta</h3></hr>
        <h6>Puedes inventarte los datos porque no se comprueba el e-mail, pero acuérdate de lo que pusistes 😜</h6>
  <v-app>
          <form @submit.prevent="register">
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
                <v-text-field
                  v-model="form.name"
                  :state="!errors.name && null" 
                  :counter="10"
                  id="name"
                  label="Nombre"
                  required                  
                >
                <v-icon slot="append" color="info">
                mdi-account
                </v-icon>
                </v-text-field> 
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
                <v-btn color="info" class="mr-4" type="submit">enviar</v-btn>
                <v-btn color="warning" @click.prevent="clear">borrar</v-btn>
         </form>  
         </v-app>
        </b-col>
    </b-row>

</div>
</template>

<<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
   head:{
    title:"Crear cuenta"
  },  
 
    data(){
        return{
                form:{
                email:"",
                password:"",
                name:""
                },
                errors: {}        
        }
    },    
     methods: {
         async  register(){
            try{

              //iniciar sesión después del registro
         
                await this.$axios.$post("/api/register",this.form);
              
                await this.$auth.loginWith("laravelSanctum",{
                data: {
                        email: this.form.email,
                        password: this.form.password
                }
                });
                this.$router.push('/');
            }
            catch(e){
               this.errors= e.response 
               console.log(this.errors);
               if(e.response.status === 422){
                this.errors= e.response.data.errors
               }else if (e.response.status === 401){
                    this.errors = { email: []}
                    this.errors.email[0]='El correo o la contraseña es incorrecto'
               }
                
            }
            
           },
           clear () {
            
            this.form.name = ''
            this.form.email = ''
            this.form.password = ''
            
      },
     },
     
}
</script>