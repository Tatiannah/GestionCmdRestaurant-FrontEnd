<template>
   
  
   <div class="text-center">
     <button type="button" @click="openModal" class="btn btn-success" style="margin-left: 86%; /* background-color: rgb(102, 158, 190); color: white;*/">Ajouter un nouveau plat</button>
   </div>
   <br>
   <h2 class="text-center" style="font-family: cursive;font-size: 350%;">Liste des plats par Catégorie</h2><br>
  
   <div v-for="(platsParCategorie, type) in platsGroupes" :key="typePlat" style="display: inline-block; margin-left:5.5%;margin-bottom: 20px;overflow-y: unset;" class="text-center">
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="card">
              <div class="card-header" style=" background-color: rgb(102, 158, 190); color: white;">
                <h3>{{ type }}</h3>
              </div>
                  <div v-for="(plat, index) in platsParCategorie" :key="index">
                  <div class="card-body">
                    <h5 class="card-title">{{ plat.nomPlat }} - Prix: {{ plat.prixPlat }}$</h5>

              </div>       
              </div>    
        </div>     
    </div>

    <br>
    <br>
    <br>
 

    

    <div class="col-6"  name="modal-fade">

     
      <div class="modal" v-if="showModal">
        <!-- Contenu de la modale -->
        <div class="modal-content">
        
          
                <div class="card text-center">
                      <br>
                      <h1 class="text-center">Ajout de commande</h1>
                      <hr>
                  <div class="card-body">
                    <form>
                        <label>Nom du Plat</label>

                        <div class="input-group mb-3">
                          <input type="text" v-model="nomPlat" class="form-control form-control-lg"><br>
                          <span class="input-group-text" id="basic-addon2"></span>
                        </div>
                        <br>
                        <select v-model="selectedCategorie" class="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option value="">Sélectionnez le type de Plat</option>
                            <option v-for="items in item">{{ items }}</option>
                        </select>
                        <label>Prix du Plat</label>
                        <div class="input-group mb-3">
                          <input type="number" v-model="prixPlat" class="form-control form-control-lg" placeholder="0$"><br>
                          <span class="input-group-text" id="basic-addon2"><img src="../assets/cash-register-solid.svg" alt="helo" width="47"/></span>
                        </div>
                        <br>
                    
                        <button type="button" class="btn btn-primary" @click="AjouterPlat" >Ajouter</button>
                        <button @click="closeModal" style="max-width: 10%;margin-left: 45%;" class="btn btn-danger">Fermer<br></button>
                    </form>
                  <br>
                  </div>
                  
                </div>
            </div>

        </div>
     <br>
    </div>


   
</template>
<script>
import axios from 'axios';
import $ from 'jquery';


export default{
data(){
    return{
      showModal: false,
        item : ['Dessert','Plat de résistance','Boisson','Apéritif','Fast-Food'],
        nomPlat  :'',
        prixPlat : 0,
        selectedCategorie : '',
        motRecherche : '',
        plats : [],
        
    }
    
},
methods:{ 
  openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    

    AjouterPlat(){
        
        axios.post('http://localhost:3000/api/plats', {"nomPlat":this.nomPlat , "typePlat":this.selectedCategorie , "prixPlat": this.prixPlat})
        .then(response => {
        // Traitement des données reçues dans la réponse
            console.log(response.data);

        })
        .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des données:', error);
        });

       

       
        location.reload()
        
        this.showModal = false;


    } , 

    afficherPlats(){
      axios.get('http://localhost:3000/api/plats')
          .then(response => {
            // Mettre à jour la liste des commandes avec les données de la réponse
        
           response.data.forEach((item) => {
            this.plats.push(item)
           })
  
            console.table(this.plats)
            
         
           //this.plat = response.data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
          });
    }

},
computed:{
  
    effectuerRecherche() {
    
      // Si le mot de recherche est vide, appeler l'API sans paramètre de recherche
      axios.get('http://localhost:3000/api/plats')
        .then(response => {
          // Mettre à jour la liste des commandes avec les données de la réponse
      
         response.data.forEach((item) => {
          this.plats.push(item)
         })

          console.table(this.plats)
          
       
         // this.plat = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    } ,

 platsGroupes() {
  const platsParCategorie = {};
  // Utilisez Object.keys() pour obtenir les clés de l'objet plats
  Object.keys(this.plats).forEach(key => {
    const plat = this.plats[key];
    if (!platsParCategorie[plat.typePlat]) {
      // Si la catégorie n'existe pas encore, initialisez-la comme un tableau vide
      platsParCategorie[plat.typePlat] = [];
    }
    // Ajoutez le plat à la catégorie correspondante
    platsParCategorie[plat.typePlat].push(plat);
  });
  return platsParCategorie;
} , 



},
beforeMount(){
 
  this.afficherPlats();

}

}


</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  max-width: 50%; /* ou une autre valeur appropriée */
  margin: 0 auto; /* pour centrer horizontalement */
}

/* Animation */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.5s;
}
.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>