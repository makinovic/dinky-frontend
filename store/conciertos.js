export const state=()=>({
    conciertos:[],    
    currentPage:1,   
    isFetchingConciertos: false  
  });
  
  export const mutations = {
      SET_CONCIERTOS(state, conciertos){
      state.conciertos= conciertos; 
      },
      SET_CURRENT_PAGE(state, currentPage){
        state.currentPage= currentPage; 
        },
         
      SET_IS_FETCHING_CONCIERTOS(state, value){  
        state.isFetchingConciertos= value;
      },
  };
  
  export const getters = {
  
     conciertos(state) {
  
      return state.conciertos;
     },   
     currentPage(state){

        return state.currentPage;
     },  
     
     isFetchingConciertos(state) {
  
      return state.isFetchingConciertos;
     }
  
  };
  
  export const actions={
    async getConciertos({commit},currentPage=3){
     
      commit('SET_IS_FETCHING_CONCIERTOS',true);
      const TOKEN="oXrtAeP8EHersDTXR1zepu13C5M3nHBB";     
      const response = await this.$axios.$get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${TOKEN}&locale=*&city=Madrid&size=20&page=${currentPage}` );
     
   
      commit('SET_CONCIERTOS',response._embedded.events);
      commit('SET_CURRENT_PAGE',response.page.number);   
      commit('SET_IS_FETCHING_CONCIERTOS',false);
    }, 
  };