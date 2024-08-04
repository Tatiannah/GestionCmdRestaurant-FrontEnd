<template >
  <br>
  <div class="home">
  <div class="row home" style="margin-left: 20%;opacity: 90%;">
    <div class="col-3">
      <Cards :header="'Commande en cours'" :content="nbCmdPerTicket+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'" :source="'arrow-rotate-right-solid.svg'"></Cards>
    </div>
    <div class="col-3">
    <Cards :header="'Bénéfice Totale'" :content="TotalProfit+'$'" :source="'circle-dollar-to-slot-solid.svg'"></Cards>
    </div>
    <div class="col-3">
      <Cards :header="'Commande déjà traité'" :content="nbCmdTraiter +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'" :source="'hand-holding-dollar-solid.svg'"></Cards>
    </div>
  </div>
  <br>
  <br>
  <div class="row" style="opacity: 120%;margin-left:25%">
    <div class="col-6" style="width: 32%;">
      <Charts 
        :data="recettes" 
        labels-field="date" 
        values-field="total" 
        canvas-id="myChartCanvas" 
        chart-type="bar" 
        :chart-options="chartOptions"
        
      />
    </div>

  
      
    <div class="col-6" style="display: flex;justify-content: center;margin-left: 5%;">
      <Charts 
        :data="cmdStat" 
        labels-field="label" 
        values-field="data" 
        canvas-id="CmdStatLine" 
        chart-type="doughnut" 
        :chart-options="chartOptions"
      />
    </div>
  </div>
  <div class="row">
    <p><br></p>
  </div>
  <div class="row"  style="margin-left: 20%; opacity: 90%">&nbsp;&nbsp;&nbsp;&nbsp;
    <div class="col-4" >
      <div class="card">
        <div class="card-header text-center bg-blue" style=" background-color: rgb(102, 158, 190); color: white;">
        <h1 style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: 400;">Clients fidèles</h1>
        </div>
        <div class="card-body">
          <DataTable apiUrl="http://localhost:3000/api/journals/NbCmdPerPerson" />
        </div>
      </div>
    </div>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <div class="col-4" >
      <div class="card">
        <div class="card-header text-center" style=" background-color: rgb(102, 158, 190); color: white;">
        <h1  style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: 400;">Plats favoris</h1>
        </div>
        <div class="card-body">
          <DataTable apiUrl="http://localhost:3000/api/journals/StatPlatCmd" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import Charts from '@/components/Charts.vue';
import axios from 'axios';
import DataTable from '@/components/DataTable.vue';
import Cards from '@/components/Cards.vue';

export default {
  components: {
    Charts,
    DataTable,
    Cards
},
  data() {
    return {
      searchTerm : '',
      nbCmdPerTicket : '',
      TotalProfit : 0,
      tableItems: [],
      nbCmdTraiter : '',
      tableColumns: [],
      cmdStat : [],
      recettes: [],
      chartOptions: {}
    };
  },
 
  mounted() {
    this.fetchDataRecette();
    this.fetchDataJournalsStat();
    this.fetchDataJournalTraiter() 
   this.fetchDataCmd(); 

  },
  
  methods: {
    updateSearchText(value) {
      this.searchText = value;
    },
    fetchDataRecette() {
      
        axios.get("http://localhost:3000/api/recettes")
          .then(response => {
            // Assurez-vous que response.data contient les données
            const commandes = response.data.map(item => ({
                numCmd: item.numCmd,
                nomCommandeur: item.nomCommandeur,
                addition: item.addition,
                bénéfice: item.bénéfice,
                createdAt: item.createdAt
                }));

                const sommeDesBénéfices = commandes.reduce((totalBénéfice, commande) => {
                    // Ajoutez le bénéfice de chaque commande au total
                    return totalBénéfice + commande.bénéfice;
                }, 0); // 0 est la valeur initiale du totalBénéfice

                // Affichez le résultat
                console.log("eto le Total Profit")
                console.log(sommeDesBénéfices);

                this.TotalProfit = sommeDesBénéfices

              
                const bénéfices = response.data.map(item => item.bénéfice);
                const createdAts = response.data.map(item => item.createdAt);
          

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
              

                
                // Après la création de l'objet bénéficeTotalParJournée
                const recettes = bénéficeTotalParJournée.map(obj => ({ date: obj.date, total: obj.total }));
                this.recettes = recettes;

               
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    fetchDataJournalsStat() {


    axios.get("http://localhost:3000/api/journals/statCmd")
        .then(response => {
            console.table(response.data);
            
            console.table(response.data);
            
            const cmdStat = response.data; 
            
            // Transformation des données
            const cmdStatData = [
                { label: 'Commandes Traitées', data: cmdStat.commandesTraitées },
                { label: 'Commandes Annulées', data: cmdStat.commandesAnnulées }
            ];

            this.cmdStat = cmdStatData;


        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      
  },
    fetchDataJournalTraiter() {


    axios.get("http://localhost:3000/api/jounals/NbCmdTraiter")
        .then(response => {
            console.log("eto le nb stat déja Traiter");
            
            console.log(response.data);

              response.data.forEach((item) => {
                this.nbCmdTraiter = item.nbCmdTraiter
              })
            


        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      
  },
  fetchDataCmd(){
    axios.get("http://localhost:3000/api/commandes")
        .then(response => {
          
          const dataX = response.data;
          var ticketsUniques = new Set();

          // Parcourez les données data
          dataX.forEach(function(commande) {
            // Ajoutez le ticketCmd à l'ensemble
            ticketsUniques.add(commande.ticketCmd);
          });

          // Obtenez le nombre de tickets uniques
          var nombreDeTicketsUniques = ticketsUniques.size;

          // Affichez le résultat
          console.log(nombreDeTicketsUniques);

          this.nbCmdPerTicket = nombreDeTicketsUniques
          
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      
  },
  
      
  

  }
};
</script>
<style scoped>
/*.home{
  background-image: url("../assets/logo.svg");
  background-repeat: no-repeat;
  background-position: 50%;

}*/

</style>
