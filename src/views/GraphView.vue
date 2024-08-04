<template>
    <Datatable apiUrl="http://localhost:3000/api/Journals"/>
</template>
<script>
import Datatable from '../components/DataTable.vue';
export default{
    components : {
        Datatable
    }
}
</script>

