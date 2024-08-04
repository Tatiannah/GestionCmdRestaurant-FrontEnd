<template>
  <div>
      <div v-if="dataLoaded">
        <div style="display: none;">
          <span>Colonne à chercher : </span>&nbsp;  
            <select v-model="searchField">
              <option v-for="header in headers" :key="header.value" :value="header.value">{{ header.text }}</option>
            </select>

            &nbsp;&nbsp;<span>Valeur recherché :  </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="text" v-model="searchValue" style="">
  

        </div>

        <div class="input-group" style="width: 50%;margin-left: 25%;">
            <input type="text" class="form-control" v-model="searchValue"  placeholder="Rechercher par ticket de commande , nom du commandeur ou nom de plat">
            <button class="btn btn-outline-secondary" type="button" @click="searchValue = ''">Effacer</button>
          </div>

   
    <br>
    <br>
    <EasyDataTable
      v-if="dataLoaded"
      :headers="headers"
      :items="items"
      :search-field="searchField"
      :search-value="searchValue"
      :rows-per-page="5"
      
    />
  </div>
  <div v-else>
    Loading...
  </div>
  </div>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import axios from "axios";

const props = defineProps({
  apiUrl: {
    type: String,
    required: true
  }
});

const searchField = ref("");
const searchValue = ref("");
const dataLoaded = ref(false);

const headers: Header[] = [];
const items: Item[] = [];

axios.get(props.apiUrl)
    .then(response => {
        const dataX = response.data;
  
        // Pour chaque objet, récupérez les noms des clés et ajoutez-les au tableau "headers"
        dataX.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (!headers.some(header => header.value === key)) {
                    headers.push({ text: key, value: key , sortable : true });
                }
            });
        });

        console.log("headers", headers);
  
        // Assigner les données à la variable "items"
        items.push(...dataX.map(item => ({ ...item })));

        console.log("items", items);
        
        dataLoaded.value = true;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
</script>

<style scoped>
</style>