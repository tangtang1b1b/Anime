<script setup>
const { data: peopleData, refresh } = await useFetch('/api/data')

const people = ref({
  name: '',
  email: '',
  age: '',
})

const resetData = () => {
  people.value.name = ''
  people.value.email = ''
  people.value.age = ''
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
  resetData()
}
</script>

<template>
  <div class="dev-red mx-auto flex max-w-screen-xl flex-col items-center gap-5 p-5">
    <div class="dev-blue flex gap-5">
      <input type="text" v-model="people.name" placeholder="請輸入姓名" class="border border-black" />
      <input type="text" v-model="people.email" placeholder="請輸入信箱" class="border border-black" />
      <input type="text" v-model="people.age" placeholder="請輸入年齡" class="border border-black" />
    </div>
    <div class="cursor-pointer rounded-xl border border-black px-5 hover:bg-black hover:text-white" @click="setData">送出</div>
    <div class="dev-blue flex flex-col gap-3">
      <div class="flex" v-for="item in peopleData" :key="item._id">
        <p>{{ item.name }}</p>
        <p>{{ item.email }}</p>
        <p>{{ item.age }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
