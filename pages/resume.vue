<script setup>
const isPresent = ref(false)
const formData = {
  info: {
    job: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    other: '',
  },
  socials: [
    { name: '', url: '' },
    { name: '', url: '' },
  ],
  skills: [
    { name: '', url: '' },
    { name: '', url: '' },
  ],
  works: [{ company: '', url: '', job: '', startDate: 0, endDate: 0, description: '' }],
  educations: [{ company: '', url: '', job: '', startDate: 0, endDate: 0, description: '' }],
}
</script>

<template>
  <main class="flex w-full text-white">
    <div class="w-1/2">
      <NSpace vertical class="p-4">
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
            <div class="mb-2 flex items-center gap-4" v-for="(social, index) in formData.socials" :key="index" align="center">
              <NInput v-model:value="formData.socials[index].name" placeholder="Github" />
              <NInput v-model:value="formData.socials[index].url" placeholder="https://example.com" />
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
              <NInput v-model:value="formData.skills[index].name" placeholder="技能名稱" />
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
                    <NInput
                      type="textarea"
                      v-model:value="formData.info.other"
                      placeholder="請輸入您的個人簡介"
                      :autosize="{ minRows: 3 }"
                    />
                  </NFormItem>
                </NGridItem>
              </NGrid>
            </div>
          </NSpace>
        </NCard>

        <!-- 學歷區塊 -->
        <NCard title="學歷" class="mb-4">
          <NSpace vertical>
            <div v-for="(edu, index) in formData.educations" :key="index" align="center">
              <NGrid cols="2" x-gap="12">
                <NGridItem>
                  <NFormItem label="學歷">
                    <NInput v-model:value="edu.name" placeholder="學校名稱與學位" />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem label="學校">
                    <NInput v-model:value="edu.name" placeholder="學校名稱與學位" />
                  </NFormItem>
                </NGridItem>
                <NGridItem span="2">
                  <NFormItem label="科系">
                    <NInput v-model:value="edu.name" placeholder="學校名稱與學位" />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem label="開始日期">
                    <NDatePicker v-model:value="edu.startDate" type="date" placeholder="開始日期" clearable style="width: 100%" />
                  </NFormItem>
                </NGridItem>
                <NGridItem class="relative">
                  <NFormItem label="結束日期">
                    <NDatePicker :disabled="isPresent" v-model:value="edu.endDate" type="date" placeholder="開始日期" clearable style="width: 100%" />
                  </NFormItem>
                  <div class="absolute flex top-0 right-0 gap-2">
                    <NSwitch size="small" v-model:value="isPresent" />
                    <p class="leading-tight">仍在職</p>
                  </div>
                </NGridItem>
              </NGrid>
            </div>
          </NSpace>
        </NCard>
      </NSpace>
    </div>
    <!-- <div class="flex w-1/2 flex-col gap-8 px-8 py-5"> -->
    <!-- <AtomBlockArea>
        <div class="text-xl font-bold">Information</div>
        <div class="grid grid-cols-2 gap-4">
          <AtomFormContainer label="name" name="職稱">
            <div class="relative w-full">
              <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="職稱" />
            </div>
          </AtomFormContainer>
          <AtomFormContainer label="name" name="名字">
            <div class="relative w-full">
              <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="名字" />
            </div>
          </AtomFormContainer>
          <AtomFormContainer label="name" name="信箱">
            <div class="relative w-full">
              <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="信箱" />
            </div>
          </AtomFormContainer>
          <AtomFormContainer label="name" name="電話">
            <div class="relative w-full">
              <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="電話" />
            </div>
          </AtomFormContainer>
          <AtomFormContainer label="name" name="居住地">
            <div class="relative w-full">
              <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="居住地" />
            </div>
          </AtomFormContainer>
        </div>
      </AtomBlockArea> -->
    <!-- <AtomBlockArea>
        <div class="text-xl font-bold">個人簡介</div>
        <div class="w-full">
          <AtomFormContainer label="name" name="">
            <div class="relative w-full">
              <AtomFormTextArea @update:word="(value) => updateFormField('other', value)" id="other" placeholder="其他" />
            </div>
          </AtomFormContainer>
        </div>
      </AtomBlockArea> -->
    <!-- <AtomBlockArea>
        <div class="text-xl font-bold">社交連結</div>
        <div class="flex w-full flex-col gap-4">
          <div class="flex items-center gap-4">
            <AtomFormInput class="w-[45%]" @update:word="(value) => updateFormField('name', value)" id="name" placeholder="名稱" />
            <AtomFormInput
              class="w-[45%]"
              @update:word="(value) => updateFormField('name', value)"
              id="name"
              placeholder="https://example.com"
            />
            <AtomIcon name="delete" class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light" />
          </div>
          <div
            class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
          >
            <AtomIcon name="plus" :size="14" />
          </div>
        </div>
      </AtomBlockArea> -->
    <!-- <AtomBlockArea>
        <div class="text-xl font-bold">技能</div>
        <div class="flex w-full flex-col gap-4">
          <div class="flex items-center gap-4">
            <AtomFormInput class="w-[90%]" @update:word="(value) => updateFormField('name', value)" id="name" placeholder="名稱" />
            <AtomIcon name="delete" class="cursor-pointer text-white duration-300 hover:text-pr-light" />
          </div>
          <div
            class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
          >
            <AtomIcon name="plus" :size="14" />
          </div>
        </div>
      </AtomBlockArea> -->
    <!-- <AtomBlockArea>
        <div class="text-xl font-bold">工作經歷</div>
        <div class="flex w-full flex-col gap-4">
          <div class="flex flex-col gap-4 border-b border-white/50 pb-4">
            <div class="grid grid-cols-2 gap-4">
              <AtomFormContainer label="name" name="公司名稱">
                <div class="relative w-full">
                  <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="職稱" />
                </div>
              </AtomFormContainer>
              <AtomFormContainer label="name" name="職稱">
                <div class="relative w-full">
                  <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="職稱" />
                </div>
              </AtomFormContainer>
              <AtomFormContainer class="col-span-2" label="name" name="任職期間">
                <div class="grid grid-cols-2 gap-4">
                  <AtomFormInput type="date" @update:word="(value) => updateFormField('name', value)" id="name" placeholder="職稱" />
                  <AtomFormInput type="date" @update:word="(value) => updateFormField('name', value)" id="name" placeholder="職稱" />
                </div>
              </AtomFormContainer>
              <AtomFormContainer class="col-span-2" label="name" name="工作描述">
                <div class="relative w-full">
                  <AtomFormTextArea @update:word="(value) => updateFormField('other', value)" id="other" placeholder="其他" />
                </div>
              </AtomFormContainer>
            </div>
            <AtomIcon name="delete" class="cursor-pointer text-white duration-300 hover:text-pr-light" />
          </div>
          <div
            class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
          >
            <AtomIcon name="plus" :size="14" />
          </div>
        </div>
      </AtomBlockArea> -->
    <!-- <AtomBlockArea>
        <div class="text-xl font-bold">學歷</div>
        <div class="flex w-full flex-col gap-4">
          <div class="flex items-center gap-4">
            <AtomFormInput class="w-[90%]" @update:word="(value) => updateFormField('name', value)" id="name" placeholder="名稱" />
            <AtomIcon name="delete" class="cursor-pointer text-white duration-300 hover:text-pr-light" />
          </div>
          <div
            class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
          >
            <AtomIcon name="plus" :size="14" />
          </div>
        </div>
      </AtomBlockArea> -->
    <!-- </div> -->
    <!-- <div class="w-1/2">222</div> -->
  </main>
</template>

<style scoped>
.custom-datepicker {
  --dp-background-color: #24292f; /* 修改主色調 */
  --dp-text-color: #fff;
  --dp-border-radius: 6px; /* 設定圓角 */
  --dp-border-color: rgb(224 224 224 / 0.5);
  --dp-border-color-hover: #5d5d9d;
}
</style>
