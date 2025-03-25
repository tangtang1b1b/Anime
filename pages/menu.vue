<script setup>
const { data: peopleData, refresh } = await useFetch('/api/data')

const people = ref({
  name: '',
  email: '',
  age: '',
})

const popup = ref(false)
const itemToDelete = ref(null);
const todoArr = ref([])

const resetData = () => {
  people.value.name = ''
  people.value.email = ''
  people.value.age = ''
}

const getNewData = () => {
  todoArr.value = peopleData.value.map((item) => {
    return {
      ...item,
      isEdit: false
    }
  })
}

const setData = async () => {
  const dataRef = ref({
    name: people.value.name,
    email: people.value.email,
    age: people.value.age,
  })
  await $fetch('/api/data/create', {
    method: 'POST',
    body: JSON.stringify(dataRef.value),
  })
  await refresh()
  getNewData();
  resetData()
}

const toggleEdit = (item) => {
  item.isEdit = !item.isEdit
  if(!item.isEdit) {
    updateData(item)
  }
}

const updateData = async (item) => {
  await $fetch(`/api/data/update`, {
    method: 'PUT',
    body: JSON.stringify(item),
  })
  await refresh()
  getNewData();
}

const removeData = async () => {
  await $fetch(`/api/data/remove`, {
      method: 'DELETE',
      body: JSON.stringify(itemToDelete.value),
    })
    await refresh()
    getNewData();
}

const toggleAlert = (item) => {
  itemToDelete.value = item;
  popup.value = !popup.value
}

onMounted(() => {
  getNewData()
})
</script>

<template>
  <div class="mx-auto flex max-w-screen-xl flex-col items-center gap-5 p-5">
    <ModalPopupBasic @update:confirm="removeData" isOpen v-model="popup" />
    <div class="flex gap-5">
      <input type="text" v-model="people.name" placeholder="請輸入姓名" class="border border-black" />
      <input type="text" v-model="people.email" placeholder="請輸入信箱" class="border border-black" />
      <input type="text" v-model="people.age" placeholder="請輸入年齡" class="border border-black" />
    </div>
    <div class="cursor-pointer rounded-xl border border-black px-5 hover:bg-black hover:text-white" @click="setData">送出</div>
    <div class="flex flex-col gap-3">
      <div class="flex gap-4" v-for="item in todoArr" :key="item._id">
        <p v-if="!item.isEdit" class="w-[100px] border border-black text-center line-clamp-1">{{ item.name }}</p>
        <input v-else class="rounded-lg w-[100px] border border-black text-center line-clamp-1" v-model="item.name"></input>
        <div class="border border-black px-2 cursor-pointer" @click="toggleEdit(item)">{{ !item.isEdit ? '編輯' : '確認' }}</div>
        <div class="border border-black px-2 cursor-pointer" @click="toggleAlert(item)">刪除</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
