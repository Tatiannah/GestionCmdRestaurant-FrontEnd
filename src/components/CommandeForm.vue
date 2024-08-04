<template>
    <form @submit.prevent="ajouterCommande">
      <label for="numCmd">Ticket de commande :</label>
      <input type="text" v-model="numCmd" placeholder="Ticket du Commande">
      
      <label for="nomCommandeur">Nom du commandeur :</label>
      <input type="text" v-model="nomCommandeur" placeholder="Nom du commandeur">
      
      <label for="typeCommande">Type de commande :</label>
      <select v-model="typeCommande">
        <option value="à emporter">À emporter</option>
        <option value="à livrer">À livrer</option>
      </select>
      
      <div v-if="typeCommande === 'à livrer'">
        <label for="lieuLivraison">Lieu de livraison :</label>
        <input type="text" v-model="lieuLivraison" placeholder="Numéro de table ou adresse">
      </div>
      
      <h2>Choix des plats</h2>
      <div>
        <div v-for="(plat, index) in plats" :key="index">
          <input type="checkbox" v-model="platsChoisis[index].checked" :value="plat.id"> {{ plat.nom }} - {{ plat.prix }}
          <input type="number" v-model="platsChoisis[index].quantite" min="0">
        </div>
      </div>
      
      <button type="submit">Ajouter la commande</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        numCmd: '',
        nomCommandeur: '',
        typeCommande: 'à emporter',
        lieuLivraison: '',
        plats: [], // Liste des plats à choisir
        platsChoisis: [], // Plats choisis avec quantité
      };
    },
    mounted() {
      // Charger la liste des plats depuis le backend
      this.chargerPlats();
    },
    methods: {
      async chargerPlats() {
        try {
          const response = await axios.get('http://localhost:3000/api/plats');
          this.plats = response.data;
          // Initialiser platsChoisis avec des objets par défaut
          this.platsChoisis = this.plats.map(plat => ({ id: plat.id, checked: false, quantite: 0 }));
        } catch (error) {
          console.error('Erreur lors du chargement des plats :', error);
        }
      },
      async ajouterCommande() {
        try {
          const platsSelectionnes = this.platsChoisis.filter(plat => plat.checked);
          const commande = {
            numCmd: this.numCmd,
            nomCommandeur: this.nomCommandeur,
            typeCommande: this.typeCommande,
            lieuLivraison: this.typeCommande === 'à livrer' ? this.lieuLivraison : '',
            plats: platsSelectionnes,
          };
          // Envoyer la commande au backend
          const response = await axios.post('http://localhost:3000/api/commandes', commande);
          console.log('Commande ajoutée avec succès :', response.data);
          // Réinitialiser les champs du formulaire après l'ajout de la commande
          this.numCmd = '';
          this.nomCommandeur = '';
          this.typeCommande = 'à emporter';
          this.lieuLivraison = '';
          this.platsChoisis.forEach(plat => {
            plat.checked = false;
            plat.quantite = 0;
          });
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la commande :', error);
        }
      },
    },
  };
  </script>
  