<template>

<div class="container mt-5">

<b-tabs content-class="mt-3">
    <b-tab title="Mi cuenta">
    <AppAccount></AppAccount>
    </b-tab>
    <b-tab title="Cambiar contraseña">
        <AppChangePassword/>
    </b-tab>
</b-tabs>

    

</div>
</template>

<script>
    import AppAccount from "@/components/videos/Dashboard/AppAccount";
    import AppChangePassword from "@/components/videos/Dashboard/AppChangePassword";
export default {
     head:{
    title:"Mi cuenta"
  },
    components:{
        AppAccount,
        AppChangePassword
    },
    middleware: 'auth'
}
</script>
