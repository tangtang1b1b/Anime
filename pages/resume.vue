<script setup>
const container = ref(null)
const isOpen = ref(true)
const isPresent = ref(false)
const formData = ref({
  info: {
    job: '前端工程師',
    name: '神人',
    email: 'god@gmail.com',
    phone: '0912345678',
    location: '桃園市',
    other: '我是一個神人',
  },
  socials: [
    { name: 'Github', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],
  skills: [
    { name: 'JavaScript' },
    { name: 'Nuxt3' },
  ],
  works: [
    { company: '版塊設計', job: '前端工程師', startDate: 0, endDate: 0, description: '動態網頁製作' },
    { company: '大樹醫藥', job: '前端工程師', startDate: 0, endDate: 0, description: '官網製作、App開發維護' },
  ],
  educations: [
    { name:'大學', school: '靜宜大學', major: '資訊傳播工程學系', startDate: 0, endDate: 0 },
  ],
})

onMounted(() => {

})
</script>

<template>
  <main class="relative flex size-full text-white">
    <div :class="[isOpen?'':'opacity-0']" class="absolute size-full pointer-events-none bg-black/50 duration-300 backdrop-blur"></div>
    <div :class="[{ '-translate-x-1': !isOpen }, isOpen ? 'left-0' : '-left-1/2 shadow-inner']" class="menu | absolute bg-black h-full z-2 w-1/2 duration-300">
      <div
        :class="[isOpen ? 'translate-x-[calc(100%-18px)]' : 'hover:translate-x-[calc(100%-6px)] translate-x-[calc(100%-18px)]']"
        class="absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 z-1 flex items-center justify-center rounded-full bg-white duration-300"
        @click="isOpen = !isOpen"
      >
        <AtomIcon name="open" :class="[isOpen ? 'rotate-0' : 'rotate-180']" class="text-black duration-300" :size="36" />
      </div>
      <NSpace vertical class="p-4 overflow-y-scroll h-full">
        <!-- 個人資訊區塊 -->
        <NCard title="個人資訊" class="mb-4">
          <NGrid cols="2" x-gap="12">
            <NGridItem>
              <NFormItem label="職稱">
                <NInput v-model:value="formData.info.job" placeholder="職稱" />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem label="名字">
                <NInput v-model:value="formData.info.name" placeholder="名字" />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem label="信箱">
                <NInput v-model:value="formData.info.email" placeholder="信箱" />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem label="電話">
                <NInput v-model:value="formData.info.phone" placeholder="電話" />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem label="居住地">
                <NInput v-model:value="formData.info.location" placeholder="居住地" />
              </NFormItem>
            </NGridItem>
          </NGrid>
        </NCard>

        <!-- 個人簡介區塊 -->
        <NCard title="個人簡介" class="mb-4">
          <NInput type="textarea" v-model:value="formData.info.other" placeholder="請輸入您的個人簡介" :autosize="{ minRows: 3 }" />
        </NCard>

        <!-- 社交連結區塊 -->
        <NCard title="社交連結" class="mb-4">
          <NSpace vertical>
            <div class="mb-2 flex items-center gap-4" v-for="(social, index) in formData.socials" :key="index">
              <NInput v-model:value="social.name" placeholder="Github" />
              <NInput v-model:value="social.url" placeholder="https://example.com" />
              <AtomIcon name="delete" class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light" />
            </div>
            <NDivider />
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
            >
              <AtomIcon name="plus" :size="14" />
            </div>
          </NSpace>
        </NCard>

        <!-- 技能區塊 -->
        <NCard title="技能" class="mb-4">
          <NSpace vertical>
            <div class="mb-2 flex items-center gap-4" v-for="(skill, index) in formData.skills" :key="index">
              <NInput v-model:value="skill.name" placeholder="技能名稱" />
              <AtomIcon name="delete" class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light" />
            </div>
            <NDivider />
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
            >
              <AtomIcon name="plus" :size="14" />
            </div>
          </NSpace>
        </NCard>

        <!-- 工作經歷區塊 -->
        <NCard title="工作經歷" class="mb-4">
          <NSpace vertical>
            <div v-for="(work, index) in formData.works" :key="index">
              <NGrid cols="2" x-gap="12">
                <NGridItem>
                  <NFormItem label="公司名稱">
                    <NInput v-model:value="work.company" placeholder="公司名稱" />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem label="職稱">
                    <NInput v-model:value="work.job" placeholder="職稱" />
                  </NFormItem>
                </NGridItem>
                <NGridItem span="2">
                  <NFormItem label="任職期間">
                    <NGrid cols="2" x-gap="12">
                      <NGridItem>
                        <NDatePicker v-model:value="work.startDate" type="date" placeholder="開始日期" clearable style="width: 100%" />
                      </NGridItem>
                      <NGridItem>
                        <NDatePicker v-model:value="work.endDate" type="date" placeholder="結束日期" clearable style="width: 100%" />
                      </NGridItem>
                    </NGrid>
                  </NFormItem>
                </NGridItem>
                <NGridItem span="2">
                  <NFormItem label="工作描述">
                    <NInput type="textarea" v-model:value="work.description" placeholder="請輸入您的個人簡介" :autosize="{ minRows: 3 }" />
                  </NFormItem>
                </NGridItem>
              </NGrid>
              <AtomIcon name="delete" class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light" />
              <NDivider />
            </div>
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
            >
              <AtomIcon name="plus" :size="14" />
            </div>
          </NSpace>
        </NCard>

        <!-- 學歷區塊 -->
        <NCard title="學歷" class="mb-4">
          <NSpace vertical>
            <div v-for="(edu, index) in formData.educations" :key="index">
              <NGrid cols="2" x-gap="12">
                <NGridItem>
                  <NFormItem label="學校">
                    <NInput v-model:value="edu.school" placeholder="學校名稱與學位" />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem label="學歷">
                    <NInput v-model:value="edu.name" placeholder="學校名稱與學位" />
                  </NFormItem>
                </NGridItem>
                <NGridItem span="2">
                  <NFormItem label="科系">
                    <NInput v-model:value="edu.major" placeholder="學校名稱與學位" />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem label="開始日期">
                    <NDatePicker v-model:value="edu.startDate" type="date" placeholder="開始日期" clearable style="width: 100%" />
                  </NFormItem>
                </NGridItem>
                <NGridItem class="relative">
                  <NFormItem label="結束日期">
                    <NDatePicker
                      :disabled="isPresent"
                      v-model:value="edu.endDate"
                      type="date"
                      placeholder="開始日期"
                      clearable
                      style="width: 100%"
                    />
                  </NFormItem>
                  <div class="absolute right-0 top-0 flex gap-2">
                    <NSwitch size="small" v-model:value="isPresent" />
                    <p class="leading-tight">仍在職</p>
                  </div>
                </NGridItem>
              </NGrid>
              <AtomIcon name="delete" class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light" />
              <NDivider />
            </div>
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
            >
              <AtomIcon name="plus" :size="14" />
            </div>
          </NSpace>
        </NCard>
      </NSpace>
    </div>
    <div class="w-full p-15 flex dev-blue">
      <div class="flex aspect-[70/99] w-full dev-red">
        <div class="w-1/3 bg-[#666]">
        </div>
        <div class="w-2/3 bg-white"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.custom-datepicker {
  --dp-background-color: #24292f; /* 修改主色調 */
  --dp-text-color: #fff;
  --dp-border-radius: 6px; /* 設定圓角 */
  --dp-border-color: rgba(0, 0, 0, 0.5);
  --dp-border-color-hover: #5d5d9d;
}
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
</style>
