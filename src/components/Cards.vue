<template>
    <div class="card" >
      <div class="card-body">
        <h5 class="card-title" style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: rgb(42, 153, 218);">{{ header }}</h5>
        <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
        <div style="display: flex;">
          <h2 style="font-weight: 800; ">{{ content }}</h2>
          <img :src="'../src/assets/' + source" width="47" style="margin-left: 55%;"> 
        </div>
       
        
      </div>
    </div>
</template>
<script>
export default{
props : {
    header : { type : String , required : true},
  
    content : { type : Number , required : true},

    source : { type : String , required : true}
}

}
</script>