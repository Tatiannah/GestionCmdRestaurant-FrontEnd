<template>
    <div>
      <canvas :id="canvasId"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto';
  import axios from 'axios';
  
  export default {
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      canvasId: {
        type: String,
        default: 'chartCanvas'
      }
    },
    data() {
      return {
        labels: [],
        data: []
      };
    },
    mounted() {
      this.fetchData();
     
    },
    methods: {
      fetchData() {
        axios.get(this.apiUrl)
          .then(response => {
            // Assurez-vous que response.data contient les données
            const commandes = response.data.map(item => ({
                numCmd: item.numCmd,
                nomCommandeur: item.nomCommandeur,
                addition: item.addition,
                bénéfice: item.bénéfice,
                createdAt: item.createdAt
                }));
  
                const numCmds = response.data.map(item => item.numCmd);
                const nomCommandeurs = response.data.map(item => item.nomCommandeur);
                const additions = response.data.map(item => item.addition);
                const bénéfices = response.data.map(item => item.bénéfice);
                const createdAts = response.data.map(item => item.createdAt);
  
                console.log('Commandes:', commandes);
                console.log('Numéros de commande:', numCmds);
                console.log('Noms des commandeurs:', nomCommandeurs);
                console.log('Additions:', additions);
                console.log('Bénéfices:', bénéfices);
                console.log('Dates de création:', createdAts);
  
                var bénéficeTotal = 0;
  
                bénéfices.forEach(element => {
                    bénéficeTotal += element
                });              
                
  
                console.log(bénéficeTotal)
  
                const datesObj = createdAts.map(dateStr => new Date(dateStr));
  
                  // Créer un tableau d'objets contenant la date et le bénéfice total pour chaque journée
                  const bénéficeTotalParJournée = [];
  
                  // Boucler sur les dates et bénéfices pour calculer le bénéfice total par journée
                  datesObj.forEach((date, index) => {
                    // Récupérer la date au format 'YYYY-MM-DD'
                    const dateStr = date.toISOString().split('T')[0];
  
                    // Vérifier si la journée existe déjà dans le tableau bénéficeTotalParJournée
                    const existingDayIndex = bénéficeTotalParJournée.findIndex(day => day.date === dateStr);
                    if (existingDayIndex !== -1) {
                      // Si la journée existe, ajouter le bénéfice actuel au total
                      bénéficeTotalParJournée[existingDayIndex].total += bénéfices[index];
                    } else {
                      // Si la journée n'existe pas, ajouter une nouvelle entrée dans le tableau
                      bénéficeTotalParJournée.push({ date: dateStr, total: bénéfices[index] });
                    }
                  });
  
                  // Afficher le tableau d'objets contenant la date et le bénéfice total pour chaque journée
                  console.log('Bénéfice total par journée :', bénéficeTotalParJournée);
  
  
                
                  bénéficeTotalParJournée.forEach(obj => {
                    this.labels.push(obj.date); // Ajoute la date à this.labels
                    this.data.push(obj.total);  // Ajoute le bénéfice total à this.data
                  });
  
  
                this.renderChart();
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      renderChart() {
        const ctx = document.getElementById(this.canvasId).getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [{
              label: 'Données',
              data: this.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            // Ajoutez des options supplémentaires au besoin
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez des styles CSS si nécessaire */
  </style>
  