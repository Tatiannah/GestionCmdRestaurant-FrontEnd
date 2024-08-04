<template>
    <div>
        <form>
            <label>Nom du Plat</label>
            <input type="text" v-model="nomPlat" class="form-control form-control-lg">
            <select v-model="selectedCategorie" class="form-select form-select-lg mb-3" aria-label="Large select example">
                <option value="">Sélectionnez un élément</option>
                <option v-for="item in items" :key="item.nom" :value="item.id">{{ item.nom }}</option>
            </select>
            <label>Prix du Plat</label>
            <input type="number" v-model="prixPlat" class="form-control form-control-lg">
            <button type="button" class="btn btn-primary" @click="AjouterPlat" >Ajouter Plat</button>
        </form>
    </div>
</template>

<script>

export default{
data(){
    return{
        item : [],
        nomPlat : '',
        selectedCategorie : '',
        prixPlatV : 0
    }
},

props : {
    itemV : {type : Array},
    nomPlatV : {type : String},
    selectedCategorieV : {type : String} , 
    prixPlatV : {type : Integer},
    addPlat : { type : Function , required : true}
},
created: {

    affectation(){

        this.prixPlatV = prixPlat;
        this.nomPlatV = nomPlat;
        this.selectedCategorieV = selectedCategorie;
        this.itemV= item
        
    }

},
methods:{

    AjouterPlat(){
        this.addPlat()
    }
}



}

</script>
<style>
</style>