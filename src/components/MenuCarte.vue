<template>
    <div class="menu-carte">
      <div v-for="(plat, index) in plats" :key="index" class="plat">
        <label>
          {{ plat.nomPlat }} - {{ plat.prixPlat }} €
          <input type="checkbox" v-model="plat.choisi">
        </label>
        <input type="number" v-model="quantite[index]" min="0" @input="updateQuantite(index)">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      plats: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        quantite: Array(this.plats.length).fill(0)
      };
    },
    methods: {
      updateQuantite(index) {
        this.$emit('update-quantite', index, this.quantite[index]);
      }
    }
  };
  </script>
  
  <style scoped>
  .menu-carte {
    display: flex;
    flex-direction: column;
  }
  
  .plat {
    margin-bottom: 10px;
  }
  </style>
  