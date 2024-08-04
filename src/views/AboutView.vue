<template>
  <br>
  
  <div class="row">
    <div class="col-3" style="margin-left: 2%; ">
        <Cards :header="this.headerOne" :content="this.bénéficeTotal"></Cards>
    </div>
    <div class="col-3">
        <Cards :header="this.headerOne" :content="this.bénéficeTotal"></Cards>
    </div>
    
  </div>
  <br>
  <div class="row">
    <Chart :datasets="datasets" :labels="labels" :chart-type="chartType" />
  </div>
</template>

<script>
import Chart from '@/components/Charts.vue';
import axios from 'axios';
import Cards from '@/components/Cards.vue';


export default {
  components: {
  Chart,
  Cards
},
  
 created(){

 
    this.recupRecette()
 
 
  },
 
  methods : {             
      recupRecette(){

        axios.get('http://localhost:3000/api/recettes')
          .then(response => {
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
                  this.bénéficeTotal += element
              });              
              

              console.log(this.bénéficeTotal)

              


              const newData = bénéfices; // Remplacez ceci par les données que vous souhaitez insérer

              // Insérer les nouvelles données dans le tableau data du premier datasets
              this.datasets[0].data = newData;

             

              console.log('Nouvelles données insérées:', this.datasets[0].data);
              console.table(this.datasets)

              
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des données:', error);
          });
          
         
      },  



  },
  data() {
    return {
      bénéficeTotal : 0,
      headerOne : 'Bénéfice Total',
      date: '',
      datasets: [
        {
          label: 'Bénéfices mensuelles',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: []
        }
      ],
      labels: [],
      chartType: 'bar'
    };
  },
};
</script>
