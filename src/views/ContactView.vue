<template>

    <div v-if="currentSlide === 1">
      <div class="slide">
        <button class="btn btn-success" style="margin-left: 84.59%;" @click="changeSlide">Ajouter un nouveau Commande</button>
      
        <!--Affichage des commandes regroupés par Nom commandeur - Ticket de Commande - Adresse de livraison-->
        <div>
          <h2 class="text-center" style="font-family: cursive;font-size: 350%;">Liste des commandes</h2>
          <br>
          <!-- Zone de recherche -->
          <div class="input-group" style="width: 50%;margin-left: 25%;">
            <input type="text" class="form-control" v-model="motRecherche" @input="effectuerRecherche" placeholder="Rechercher par ticket de commande , nom du commandeur ou nom de plat">
            <button class="btn btn-outline-secondary" type="button" @click="this.motRecherche = '';affichageCmd()">Effacer</button>
          </div>
          <br>
          <br>

          <!-- Affichage des commandes -->

          &nbsp; &nbsp; &nbsp;
          <div v-for="(group, index) in groupesCommandes" :key="index" style="display: inline-block;margin-left: 1%;margin-top: 2%;" >
            <div class="card">
              <div class="card-header" style=" background-color: rgb(102, 158, 190); color: white;">
                <h3>Ticket de commande : {{ group.ticketCmd }} </h3>
              </div>
              <em>Nom du commandeur : {{ group.nomCommandeur }} - Adresse de livraison : {{ group.adresseLivraison }}</em>
              <ul>
                <li v-for="(commande, idx) in group.commandes" :key="idx">
                  Plat : {{ commande.nomPlat }}, Prix : {{ commande.prixPlat }}, Quantité : {{ commande.quantite }}
                </li>
              </ul>
              <div class="text-center">
                <button class="btn btn-warning" @click="AfficherCmdAncien(group.ticketCmd,group.nomCommandeur,group.adresseLivraison)">Modifier</button>&nbsp;
                <button class="btn btn-success" @click="traiterCmd(group.ticketCmd,group.nomCommandeur,group.adresseLivraison,group.commandes)">Traité</button>&nbsp;
                <button class="btn btn-danger"  @click="AnnulerCmd(group.ticketCmd,group.nomCommandeur,group.adresseLivraison,group.commandes)">Annulé</button>
                <br>
                <br>
              </div>
            </div>
          </div>
        </div>
          <br>
        
      </div>
    </div>
    <div v-else>
      <div class="slide">
        <div class="card text-center">
          <div class="card-header" >
            <h2>Ajout de commande</h2>
          </div>
          <div class="card-body">
                  <div>
                    <form>
              
                      <div class="col-4 justify-content-center align-items-center" style="margin-left: 30%;">
                      <label class="form-label">Ticket de Commande</label>
                      <input  class="form-control form-control-xs" v-model="ticketCmd" typePlat="text"/>
                      <br>
                      <label class="form-label">Nom de Commandeur</label>
                      <input class="form-control form-control-xs" v-model="nomCommandeur" typePlat="text"/>
                      <br>
                      <label class="form-label" >Lieu de Livraison</label>
                      <input class="form-control form-control-xs" v-model="LieuLivraison" typePlat="text"/>
                      </div>
                      <br>
                      
                    </form>


                      <div v-for="(platsParCategorie, typePlat) in platsGroupes" :key="typePlat" style="display: inline-block; margin-left:2%;margin-bottom: 20px;overflow-y: unset;">
                    
                    
                          <div class="card">
                            <div class="card-header" style=" background-color: rgb(102, 158, 190); color: white;">
                              <h3>{{ typePlat }}</h3>
                            </div>
                                <div v-for="(plat, index) in platsParCategorie" :key="index">
                                <div class="card-body">
                                  <div style="display: inline-flex;">
                                    <h5 class="card-title">{{ plat.nomPlat }} </h5> &nbsp;&nbsp;
                                    <p class="card-text"><p>Prix : {{ plat.prixPlat }}  $</p></p>
                                  </div>
                                 <br>
                                  <input typePlat="number" v-model="plat.quantite" placeholder="Quantité">&nbsp;
                                  <input type="checkbox" v-model="plat.platSelectionne">

                            </div>       
                            </div>    
                      </div>     
                      </div>
                  
                  <br>
              
                  <button class="btn btn-primary" @click="ChangerBtn">{{ nom_btn }}</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button class="btn btn-dark" @click="changeSlide">Revenir vers la liste des commandes</button>
                </div>
            </div>
          </div>
        </div>
     
    </div>
    
  



  
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios';

export default {
  data() {
    return {
      nom_btn : 'Ajouter la Commande',
      platCmd : [],
      currentSlide: 1,  
      nomCommandeur:'',
      ticketCmd:'',
      LieuLivraison: '',
      motRecherche:'',  
      plats: [],
      plat: [],
      prixTotal : 0,
      
      commandes: []
    };
  },
  created(){
   this.affichageCmd()

  }
  ,
  computed: {
    
    effectuerRecherche() {
    if (this.motRecherche.trim() === '') {
      // Si le mot de recherche est vide, appeler l'API sans paramètre de recherche
      axios.get('http://localhost:3000/api/commandes')
        .then(response => {
          // Mettre à jour la liste des commandes avec les données de la réponse
          this.commandes = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    } else {
      // Sinon, appeler l'API avec le mot de recherche
      axios.get(`http://localhost:3000/api/commandes/${this.motRecherche.trim()}`)
        .then(response => {
          // Mettre à jour la liste des commandes avec les données de la réponse
          this.commandes = response.data;

          if(this.commandes.length === 0 ){
            alert("commnde non-trouvé")
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    }
  },
    platsGroupes() {
      const platsParCategorie = {};
      (this.plats).forEach(plat => {
        if (!platsParCategorie[plat.typePlat]) {
          // Si la catégorie n'existe pas encore, initialisez-la comme un tableau vide
          platsParCategorie[plat.typePlat] = [];
        }
        // Ajoutez le plat à la catégorie correspondante
        platsParCategorie[plat.typePlat].push(plat);
      });
      return platsParCategorie;
    },
    groupesCommandes() {
      console.log(this.plats)
      const groupes = {};
      this.commandes.forEach(commande => {
        const key = `${commande.ticketCmd}-${commande.nomCommandeur}-${commande.LieuLivraison}`;
        if (!groupes[key]) {
          groupes[key] = { ticketCmd: commande.ticketCmd, nomCommandeur: commande.nomCommandeur, adresseLivraison: commande.LieuLivraison, commandes: [] };
        }
        groupes[key].commandes.push({ nomPlat: commande.nomPlat, prixPlat: commande.prixPlat, quantite: commande.quantite });
      });
      return Object.values(groupes);
    }
  
  },
  methods: {
    async affichageCmd(){
    
      try {
    // Récupération des commandes
    const responseCommandes = await axios.get('http://localhost:3000/api/commandes');
    this.commandes = responseCommandes.data;

    // Récupération des plats
    const responsePlats = await axios.get('http://localhost:3000/api/plats');
    this.plats = responsePlats.data;
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération des données:', error);
  }

    },

    changeSlide() {
      // Changer la slide actuelle
      this.currentSlide = this.currentSlide === 1 ? 2 : 1;
    },
    ajouterCommande() {
      this.nom_btn = 'Ajouter la Commande';
      const commande = (this.plats).filter(plat => plat.platSelectionne).map(({ nomPlat, prixPlat, quantite, platSelectionne , typePlat}) => 
      ({ nomPlat, prixPlat, quantite, platSelectionne,  typePlat: typePlat,ticketCmd: this.ticketCmd, 
        nomCommandeur: this.nomCommandeur,LieuLivraison:this.LieuLivraison , prixTotal : quantite*prixPlat,typeCommande:'emporter'}));

      commande.forEach((item) => {
        axios.post('http://localhost:3000/api/commandes',
         { "nomPlat":item.nomPlat, "prixPlat": item.prixPlat, "quantite": item.quantite,
          "prixTotal": item.prixTotal, "typePlat": item.typePlat, "typeCommande": item.typeCommande,
          "platSelectionne": item.platSelectionne, "LieuLivraison": item.LieuLivraison, "nomCommandeur": item.nomCommandeur,
          "ticketCmd": item.ticketCmd
        })
        .then(response => {
          this.nomCommandeur = "";
          this.ticketCmd = "";
          this.LieuLivraison = "";
          this.quantite= 0;

          (this.plats).forEach(plat => {
            plat.platSelectionne = false
            console.log(typeof(plat.platSelectionne))
          })

          Swal.fire({
            title: "Good job!",
            text: "Commande ajouté à la file d'attente avec succès",
            icon: "success"
          });
          
          this.affichageCmd()
          this.currentSlide = 1;

      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des données:', error);
      });

      })
      this.affichageCmd()
    },
    async AfficherCmdAncien(id,nomCommandeur,adresseLivraison) {
      this.nom_btn = 'Modifier la Commande';
      var nomsPlatsCmd = [
        { nom: 'Carbonara', prixPlat: 10, typePlat: 'Dessert', quantite: 10 },
        { nom: 'Glace', prixPlat: 10, typePlat: 'Entre', quantite: 10 }
      ];

      console.log(typeof (nomsPlatsCmd));

      try {
        const response = await axios.get(`http://localhost:3000/api/commandes/`+id);
        response.data.forEach((item) => {
          (this.platCmd).push(item);
        });
        console.table(this.platCmd)

        if ((this.platCmd).length > 0) {
          this.plats.forEach(plat => {
            const platCommande = (this.platCmd).find(platCommande => platCommande.nomPlat === plat.nomPlat);
            if (platCommande) {
              plat.platSelectionne = true;
              plat.prix = platCommande.prix;
              plat.quantite = platCommande.quantite;
              this.ticketCmd = id;
              this.nomCommandeur = nomCommandeur;
              this.LieuLivraison = adresseLivraison;
              this.currentSlide = 2;
            } else {
              plat.platSelectionne = false;
            }
          });
        } else {
          console.error('Aucune donnée de commande récupérée.');
        }



      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    async traiterCmd(ticketCmd,nomCommandeur,adresseLivraison,commandes){
      var chaine = ''
      var prixTotal = 0;

      commandes.forEach((item) => {
        prixTotal += item.prixPlat*item.quantite;
        chaine += 'Nom du plat : '+item.nomPlat + '-' + 'prix du plat : '+ item.prixPlat + '-'+ 'quantite : '+item.quantite  + '||'
      })


      console.log(prixTotal)

      await axios.post('http://localhost:3000/api/journals',
         { "numCmd":ticketCmd, "nomCommandeur": nomCommandeur, "Description": chaine , "Statut": 'Traité',
          "Addition": prixTotal 
        })
        .then(response => {
       
        console.log(response.data);
        

      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des données:', error);
      });

      await axios.delete('http://localhost:3000/api/commandes/'+ticketCmd)
        .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des données:', error);
      });

      await axios.post('http://localhost:3000/api/recettes',
         { "numCmd":ticketCmd, "nomCommandeur": nomCommandeur, "addition": prixTotal,
          "bénéfice": prixTotal*0.5
        })
        .then(response => {
       
        console.log(response.data);



      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des données:', error);
      });

      Swal.fire({
            title: "Good job!",
            text: "Commande traité avec succès",
            icon: "success"
          });
          
         

      this.affichageCmd();
      this.currentSlide = 1;
      
   

    },
    async modifier(){
      const commande = (this.plats).filter(plat => plat.platSelectionne).map(({ nomPlat, prixPlat, quantite, platSelectionne , typePlat}) => 
          ({ nomPlat, prixPlat, quantite, platSelectionne,  typePlat: typePlat,ticketCmd: this.ticketCmd, 
            nomCommandeur: this.nomCommandeur,LieuLivraison:this.LieuLivraison , prixTotal : quantite*prixPlat,typeCommande:'emporter'}))

            console.log("reto avy le commande vaovao");
            commande.forEach((item) => {
              console.log(item)
            })
            console.log("reto avy le commande vaovao");
           await axios.delete('http://localhost:3000/api/commandes/'+this.ticketCmd)
              .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              // Gestion des erreurs
              console.error('Erreur lors de l\'envoi des données:', error);
            })
            await commande.forEach((item) => {
                axios.post('http://localhost:3000/api/commandes',
                { "nomPlat":item.nomPlat, "prixPlat": item.prixPlat, "quantite": item.quantite,
                  "prixTotal": item.prixTotal, "typePlat": item.typePlat, "typeCommande": item.typeCommande,
                  "platSelectionne": item.platSelectionne, "LieuLivraison": this.LieuLivraison, "nomCommandeur": this.nomCommandeur,
                  "ticketCmd": this.ticketCmd
                })
                .then(response => {
              
                console.log(response.data)
              })
              .catch(error => {
                // Gestion des erreurs
                console.error('Erreur lors de l\'envoi des données:', error);
              })
              })
              this.nomCommandeur = "";
              this.ticketCmd = "";
              this.LieuLivraison = "";
              this.quantite= 0
              location.reload()
              this.affichageCmd();
              this.currentSlide = 1;
              this.nom_btn = 'Ajouter la Commande'

    },
    async AnnulerCmd(ticketCmd,nomCommandeur,adresseLivraison,commandes){

      Swal.fire({
        title: "Etes-vous sû de cett action ??",
        text: "L'action de supprimer sera irréversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui , supprimez "
      }).then((result) => {
        if (result.isConfirmed) {
          ContenuAnnuler()
          Swal.fire({
            title: "Supprimé!",
            text: "La commande a été supprimé avec succès",
            icon: "success"
          });
        }
      });

      async function ContenuAnnuler(){
       
      var chaine = ''
      var prixTotal = 0;

      commandes.forEach((item) => {
        prixTotal += item.prixPlat*item.quantite;
        chaine += 'Nom du plat : '+item.nomPlat + '-' + 'prix du plat : '+ item.prixPlat + '-'+ 'quantite : '+item.quantite  + '||';
      })

      console.log(prixTotal)

      await axios.post('http://localhost:3000/api/journals',
         { "numCmd":ticketCmd, "nomCommandeur": nomCommandeur, "Description": chaine , "Statut": 'Annulé',
          "Addition": prixTotal 
        })
        .then(response => {
       
        console.log(response.data);



      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des données:', error);
      });

      await axios.delete('http://localhost:3000/api/commandes/'+ticketCmd)
        .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des données:', error);
      });
      this.affichageCmd()
      
      this.currentSlide = 1;

      }

      
     
    },
    ChangerBtn(){
        if(this.nom_btn === 'Ajouter la Commande') { 
          this.ajouterCommande(); 
          
        
        }
        if(this.nom_btn === 'Modifier la Commande') {

          
          this.modifier(); 
          this.currentSlide = 1 ;  
          this.$forceUpdate(); 
          this.nom_btn = 'Ajouter la Commande'
        };


    }


    
    }


  };
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to {
  opacity: 15;
}
</style>
