<template>
  <div></div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

onMounted(() => {});
</script>

<style scoped lang="scss">
:deep(.p-datatable-wrapper) {
  thead {
    height: 60px;
    border-bottom: 1px solid gray;
    th {
      white-space: nowrap;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
  tbody {
    td {
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 16px;
      padding-bottom: 16px;
      border-bottom: 0.5px solid gray;
    }
  }
}
:deep(.p-paginator) {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
  padding-bottom: 8px;

  .p-paginator-element {
    padding: 8px 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .p-paginator-pages {
    display: flex;
    flex-wrap: nowrap;
  }
  .p-highlight {
    background-color: #4baaf5;
    color: white;
  }
  .p-disabled {
    background-color: unset;
    color: white;
  }
}
</style>
