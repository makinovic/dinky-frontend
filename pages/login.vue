<template>

<div class="container mt-5">
    <b-row>
        <b-col class="px-2" lg="4" offset-lg="4" md="6" offset-md="3" offset-sm="1">
        <h3>Inciciar sesión</h3></hr>

        <b-form @submit.prevent="login">
            <b-form-group label="Correo" label-for="email">
              <b-form-input 
                v-model="form.email"
                id="email"
                type="email"
                placeholder="e.g. test@test.com"
                :state="!errors.email && null"                
                >                
              </b-form-input>
              
              <b-form-invalid-feedback v-if="errors.email">{{errors.email[0]}}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Contraseña" label-for="password">
                <b-form-input 
                v-model="form.password"
                 id="password"
                 type="password"
                 :state="!errors.password && null" 
                
                 >
                </b-form-input>  
                <b-form-invalid-feedback v-if="errors.password">{{errors.password[0]}}</b-form-invalid-feedback>
              </b-form-group>
              <b-button type="submit" variant="primary">Inciciar sesión</b-button>
            </b-form>

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