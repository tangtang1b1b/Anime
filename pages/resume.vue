<script setup>
const formData = {
  info: {
    name: '',
    email: '',
    age: '',
    date: '',
    other: '',
  },
}
</script>

<template>
  <main class="flex w-full text-white">
    <div class="w-1/2">
      
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
