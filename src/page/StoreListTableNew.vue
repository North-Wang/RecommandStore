<template>
    <main class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] h-full overflow-y-auto">
        <section>
            <h3 class="py-[20px]">
                店家列表
            </h3>
            <div class="flex justify-between px-2 pb-2">
                <input type="text" placeholder="請輸入店家名稱">
                <span>共{{storeList.length?.toLocaleString()}}筆資料</span>
            </div>
        </section>
        <Paginator 
            :totalRecords="total" 
            :first="0" 
            :rows="rows" 
            :pageLinkSize="3"
            template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport" 
            @page="onPage($event)"
        />
        <div v-for="(store, index) in currentPageStore" :key="index" class="p-5 store">
            <h3 class="title">{{ store?.name }}</h3>
        </div>
    </main>
</template>

<script setup>
import {ref, computed,watch, onMounted} from "vue"
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import Paginator from 'primevue/paginator';

const storeInfo = useStoreInfo();
const { storeList, titleList, allTypeOption, allPurpleOption, allAddressTag } =
  storeToRefs(storeInfo);
const total = computed(()=>{
    return storeList.value.length
})
const rows = ref(10) //一頁顯示幾筆資料
const currentPageStore = ref([]) //篩選完的店家資料

console.log("所有店家", storeList.value)

function onPage(e) {
    console.log("更換頁面", e)
    currentPageStore.value = storeList.value.slice(e.first, e.first + e.rows)
}

onMounted(()=>{
    currentPageStore.value = storeList.value.slice(0, rows.value - 1)
})
</script>

<style scoped lang="scss">
section{
    background-color: black;
    color: white;
}
.store{
    .title{
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    
}
</style>