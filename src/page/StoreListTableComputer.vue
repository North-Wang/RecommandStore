<template>
    
    <main  class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] h-full overflow-y-auto">
        <section>
            <h3 class="py-[20px]">
                店家列表
            </h3>
            <div class="flex justify-between px-2 pb-2 relative">
                <input type="text" placeholder="請輸入店家名稱">
                <span class="pi pi-search absolute"></span>
                <span>共{{storeList.length?.toLocaleString()}}筆資料</span>
                
            </div>
        </section>
    </main>
</template>

<script setup>
import {ref, computed,watch, onMounted} from "vue"
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import Paginator from 'primevue/paginator';
import 'primeicons/primeicons.css'
</script>

<style scoped></style>