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
            template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink " 
            @page="onPage($event)"
        />
        <div v-for="(store, index) in currentPageStore" :key="index" class="store">
            <h3 class="title">{{ store?.name }}</h3>
            <!-- v-if="store?.address && moreOptionMap.has(store?.name)" -->
            <h4 class="address"  > 
                {{ store?.address }}             
            </h4>
            <h4 class="text-[#E09A30] text-left font-bold py-2 " v-if="store?.feature">{{ store?.feature }}</h4>        
                  
            <ul class="tag-wraaper mt-[12px]">
                <li v-for="purples in store?.purple.split('、')" v-if="store?.purple">
                    <div class="tag bg-[#FFDA7B]" >{{ purples }}</div>
                </li>       
                <li v-for="addressTags in store?.addressTag" v-if="store?.addressTag">
                    <div class="tag bg-secondBlue" >{{ addressTags }}</div>
                </li>          
            </ul>            
            <li class="tag-wraaper mt-2">
                <ul v-for="cates in store?.category.split('、')" v-if="store?.category" >
                    <li class="tag bg-[#d6d6d6]">{{ cates }}</li>
                </ul>
            </li>  
            <ul v-if="moreOptionMap.has(store?.name)" class="mt-3" style="border-top: 0.5px solid gray;">
               <div class="text-left my-1">備註：</div> 
               <textarea name="" id="" cols="5" rows="5"  /> 
            </ul>
            <ul class="flex justify-end">
                <button class="h-8 w-[72px] text-left bg-inherit text-blue  hover:bg-[#4baaf5] hover:text-white" @click="toggleShowMoreOption(store?.name)">                        
                        <div v-if="moreOptionMap.has(store?.name)">close</div>
                        <div v-else>more...</div>    
                    </button>
            </ul>
            
        </div>
        <Paginator 
            :totalRecords="total" 
            :first="0" 
            :rows="rows" 
            :pageLinkSize="3"
            template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink " 
            @page="onPage($event)"
        />
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
const moreOptionMap = ref(new Map())
const buttonText = ref("more...")

console.log("所有店家", storeList.value)

function onPage(e) {
    console.log("更換頁面", e)
    currentPageStore.value = storeList.value.slice(e.first, e.first + e.rows)
}

//切換那些店家要顯示更多資訊
function toggleShowMoreOption(name){
    if(moreOptionMap.value.has(name)){
        moreOptionMap.value.delete(name)
    }else{
        moreOptionMap.value.set(name)
    }
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
    padding: 12px 20px;
    border-bottom: 0.5px solid black;
    position: relative;
    h3{
        border-bottom: 0.5px solid #929292;
    }
    h4{
        border-bottom: 0.5px solid #929292;
    }
    .title{
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight: 900;
        padding-bottom: 8px;
    }    
    .address{
        padding-top: 8px;
        padding-bottom: 8px;
        border-bottom: 0.5px solid #929292;
        text-align: left;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        padding-bottom: 8px;
    }
    .tag-wraaper{
        display: flex;
        flex-wrap: wrap;
        column-gap:8px;
        row-gap:8px;
    }
    .tag{
        padding: 4px 12px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
    }
    textarea{
        width: 100%;
        padding: 8px;
        height: 56px;
    }
    
}
:deep(.p-paginator){
    background-color: black;
    color: white;
    .p-paginator-element{
        padding: 8px 12px;
    }
    .p-paginator-pages{
        display: flex;
        flex-wrap: nowrap;
    }
}
</style>