<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="navResto" >
    
      
      <img src="../src/assets/E-commande.png" width="150" height="50">

     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

          <router-link style="text-decoration: none;" :to="{ path: '/', query: { activeTab: 'home' } }" :class="{ 'nav-link-active': $route.query.activeTab === 'home' }"> &nbsp; Tableau de Bord &nbsp;<img src="../src/assets/house.svg" width="20"/>&nbsp; </router-link>
          <router-link style="text-decoration: none;margin: 5px;padding: 16.5px; margin-left: 1%;" :to="{ path: '/plat', query: { activeTab: 'about' } }" :class="{ 'nav-link-active': $route.query.activeTab === 'about' }">Plats &nbsp;<img src="../src/assets/bars.svg" width="20"/></router-link>
          <router-link style="text-decoration: none;margin: 5px;padding: 16.5px; margin-left: 1%;" :to="{ path: '/contact', query: { activeTab: 'careers' } }" :class="{ 'nav-link-active': $route.query.activeTab === 'careers' }">Commmandes  &nbsp;<img src="../src/assets/ustensils.svg" width="20"/></router-link>
          <router-link style="text-decoration: none;margin: 5px;" :to="{ path: '/graph', query: { activeTab: 'contact' } }" :class="{ 'nav-link-active': $route.query.activeTab === 'contact' }"> Historique &nbsp;<img src="../src/assets/newspaper.svg" width="20"/></router-link>
          
      
    </div>
  </header>
<br>
  <RouterView></RouterView>
</template>

<style>
.navResto {
  background-color: rgb(0, 0, 0);
 font-weight: bold;
}


.router-link-exact-active {
  text-decoration: none; /* Soulignement */
  padding-block: 16.5px;

}

.nav-link-active {
  text-decoration: none;
  animation: highlight 1s forwards; /* Applique l'animation */
  transition: background-color 0.5s ease, color 0.5s ease; /* Applique la transition */
  background-color: rgb(0, 52, 121);
 
 
}

@keyframes highlight {
  from {
    text-decoration: none;
    background-color: rgb(0, 52, 121);
    color: rgb(24, 141, 209); /* Couleur du texte */
    border-radius: 5%;
    
  }
  to {
    text-decoration: none;
    background-color: rgb(102, 158, 190);
   /* background-color: rgb(24, 141, 209); /* Changez initial à la couleur de fond d'origine */
    color: white;/* Couleur du texte */
    border-radius: 5%;
  }
}


</style>

