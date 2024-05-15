<template>
  <div>
    <Paginator 
    :rows="rows" 
    :totalRecords="dataList.length" 
	  :pageLinkSize="3"
	  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    @page="onPage($event)"
  />
  <ul class="overflow-y-auto" style="height: calc(100vh - 269px)" >
      <h4
        class="font-semibold h-full flex items-center justify-center text-black dark:text-black"
        v-if="!dataList.length"
      >
        沒有店家資料
      </h4>
      <ul v-else>
        <li
          v-for="(store, index) in currentPage"
          :key="index"
          class="store bg-white"
        >
          <h3 class="title">{{ store?.name }}</h3>
          <h4
            class="address"
            v-if="moreOptionMap.has(store?.name) && store?.address"
          >
            {{ store?.address }}
          </h4>
          <h4
            class="text-[#E09A30] text-left font-bold py-2"
            v-if="store?.feature"
          >
            {{ store?.feature }}
          </h4>

          <ul class="wrapper-tag mt-[12px]">
            <li
              v-for="purples in store?.purple?.split('、')"
              v-if="store?.purple"
            >
              <div class="tag bg-yellow">{{ purples }}</div>
            </li>
            <li
              v-for="addressTags in store?.addressTag"
              v-if="store?.addressTag"
            >
              <div class="tag bg-blue">{{ addressTags }}</div>
            </li>
          </ul>
          <li class="wrapper-tag mt-2">
            <ul
              v-for="cates in store?.category?.split('、')"
              v-if="store?.category"
            >
              <li class="tag bg-[#d6d6d6]">{{ cates }}</li>
            </ul>
          </li>
          <ul
            v-if="moreOptionMap.has(store?.name) && store?.note"
            class="mt-3"
            style="border-top: 0.5px solid gray"
          >
            <div class="text-left my-1">備註：</div>
            <textarea name="" id="" cols="30" rows="10" class="dark:bg-lightGray text-gray-500 dark:text-gray-500">{{
              store?.note
            }}</textarea>
          </ul>

          <ul class="flex justify-end items-center h-8 mt-2">
            <li class="flex gap-x-2 items-center">
              <!-- <img :src="editIcon" alt="editIcon" class="h-6 ursor-not-allowed" /> -->

              <button
                class="w-[72px] text-left bg-inherit text-blue hover:bg-[#4baaf5] hover:text-white"
                @click="toggleShowMoreOption(store?.name)"
              >
                <div v-if="moreOptionMap.has(store?.name)">close</div>
                <div v-else>more...</div>
              </button>
            </li>
          </ul>
        </li>
      </ul> 
    </ul>
  </div>
  
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import { useStoreInfo } from "../../store/useStoreInfo";
import Paginator from "primevue/paginator";
import "primeicons/primeicons.css";

//picture
import editIcon from "../../assets/editIcon.svg";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Number,
    default: 10,
  },
});

const moreOptionMap = ref(new Map());
const currentPage = ref([])

function setCurrentPage() {
  currentPage.value = props.dataList.slice(0, props.rows)
}

//切換那些店家要顯示更多資訊
function toggleShowMoreOption(name) {
  if (moreOptionMap.value.has(name)) {
    moreOptionMap.value.delete(name);
  } else {
    moreOptionMap.value.set(name);
  }
}

function onPage(e) {
  currentPage.value = props.dataList.slice(e.first, e.first + e.rows)
}

watch(()=>props.dataList, (data)=>{
  setCurrentPage()
})

onMounted(()=>{
  setCurrentPage()
})
</script>

<style scoped lang="scss">
section {
  background-color: black;
  color: white;
}
input[type="search"] {
  border-radius: 5px;
  height: 40px;
  padding-left: 32px;
  padding-right: 8px;
}
.store {
  padding: 12px 20px;
  border-bottom: 0.5px solid black;
  position: relative;
  color: black;
  h3 {
    border-bottom: 0.5px solid #929292;
  }
  h4 {
    border-bottom: 0.5px solid #929292;
  }
  .title {
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 900;
    padding-bottom: 8px;
  }
  .address {
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 0.5px solid #929292;
    text-align: left;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding-bottom: 8px;
  }
  textarea {
    width: 100%;
    padding: 4px 8px;
    overflow-y: auto;
    height: 80px;
    border-radius: 5px;
    border: 1px solid gray;
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
