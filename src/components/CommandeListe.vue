<template>
    <div>
      <h1>Liste des commandes</h1>
      <ul>
        <li v-for="commande in commandes" :key="commande.numCmd">
          <div>
            <h3>{{ commande.numCmd }} - {{ commande.nomCommandeur }}</h3>
            <p>Type de commande : {{ commande.typeCommande }}</p>
            <p v-if="commande.typeCommande === 'à livrer'">Lieu de livraison : {{ commande.lieuLivraison }}</p>
            <h4>Plats :</h4>
            <ul>
              <li v-for="(plat, index) in commande.plats" :key="index">
                {{ plat.nom }} - {{ plat.prix }}$ - Quantité: {{ plat.quantite }}
              </li>
            </ul>
            <p>Addition : {{ commande.prixTotal }}$</p>
            <button @click="modifierCommande(commande)">Modifier</button>
            <button @click="annulerCommande(commande)">Annuler</button>
            <button @click="traiterCommande(commande)">Traiter</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        commandes: [],
      };
    },
    mounted() {
      this.afficherToutesCommandes();
    },
    methods: {
      async afficherToutesCommandes() {
        try {
          const response = await axios.get('http://localhost:3000/api/commandes');
          this.commandes = response.data;
        } catch (error) {
          console.error('Erreur lors du chargement des commandes :', error);
        }
      },
      async modifierCommande(commande) {
        // Rediriger l'utilisateur vers le formulaire de modification avec l'ID de la commande
        this.$router.push({ name: 'ModifierCommande', params: { id: commande.id } });
      },
      async annulerCommande(commande) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/commandes/${commande.id}`);
          console.log('Commande annulée avec succès :', response.data);
          // Mettre à jour la liste des commandes après l'annulation
          this.afficherToutesCommandes();
        } catch (error) {
          console.error('Erreur lors de l\'annulation de la commande :', error);
        }
      },
      async traiterCommande(commande) {
        // Logique pour marquer la commande comme traitée dans le backend
      },
    },
  };
  </script>
  