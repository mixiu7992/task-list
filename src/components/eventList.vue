<template>
  <div>
    <div v-for="event in dataSource">

    </div>
  </div>
</template>

<script>
  export default {
    name: "eventList",
    data () {
      return {
        dataSource: []
      }
    }
  }
</script>

<style scoped>

</style>
