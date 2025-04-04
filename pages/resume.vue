<script setup>
import { jsPDF } from 'jspdf/dist/jspdf.umd.min.js'
import html2canvas from 'html2canvas'
const isOpen = ref(true)

const profileImage = ref(null) // 用來存放圖片的 URL

const formData = ref({
  info: {
    job: 'Frontend Engineer',
    name: 'Eric Kao',
    email: 'god@gmail.com',
    phone: '0912345678',
    location: '桃園市',
    other: '我是一個神人',
  },
  socials: [
    { name: 'Github', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],
  skills: [{ name: 'JavaScript' }, { name: 'Nuxt3' }],
  works: [
    { company: '版塊設計', job: '前端工程師', startDate: 0, endDate: 0, description: '動態網頁製作' },
    { company: '大樹醫藥', job: '前端工程師', startDate: 0, endDate: 0, description: '官網製作、App開發維護', isPresent: false },
  ],
  educations: [{ name: '大學', school: '靜宜大學', major: '資訊傳播工程學系', startDate: 0, endDate: 0, isPresent: false }],
})

// 處理圖片上傳
const handleImageUpload = (info) => {
  const file = info.file.file
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      profileImage.value = reader.result // 將 Base64 字串存入 profileImage
    }
    reader.readAsDataURL(file) // 將圖片轉換為 Base64
  }
}
const iimg = ref(null)
const downloadPDF = async () => {
  const element = document.querySelector('#pdf-container')
  if (!element) {
    console.error('PDF container not found')
    return
  }

  try {
    const images = document.querySelectorAll('#pdf-container img')
    await Promise.all(
      Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve()
          } else {
            img.onload = resolve
            img.onerror = resolve
          }
        })
      }),
    )

    const canvas = await html2canvas(element, {
      scale: 1.5, // 提高渲染質量
      useCORS: true,
      width: element.offsetWidth,
      height: element.offsetHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    iimg.value = imgData
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // 計算圖片的寬高比例
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // 如果圖片高度超出 PDF 頁面高度，則縮放圖片
    if (imgHeight > pdfHeight) {
      const scaleFactor = pdfHeight / imgHeight
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scaleFactor, pdfHeight)
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    }

    pdf.save('resume.pdf')
  } catch (error) {
    console.error('PDF generation failed:', error)
  }
}

const addSocial = () => {
  formData.value.socials.push({ name: '', url: '' })
}
const removeSocial = (index) => {
  formData.value.socials.splice(index, 1)
}

const addSkill = () => {
  formData.value.skills.push({ name: '' })
}
const removeSkill = (index) => {
  formData.value.skills.splice(index, 1)
}

const addWork = () => {
  formData.value.works.map((work) => {
    delete work.isPresent
  })
  formData.value.works.push({ company: '', job: '', startDate: 0, endDate: 0, description: '', isPresent: false })
}
const removeWork = (index) => {
  formData.value.works.splice(index, 1)
  formData.value.works.map((work) => {
    delete work.isPresent
  })
  formData.value.works[formData.value.works.length - 1].isPresent = false
}

const addEducation = () => {
  formData.value.educations.forEach((edu) => {
    delete edu.isPresent
  })
  formData.value.educations.push({ name: '', school: '', major: '', startDate: 0, endDate: 0, isPresent: false })
}
const removeEducation = (index) => {
  formData.value.educations.splice(index, 1)
  formData.value.educations.forEach((edu) => {
    delete edu.isPresent
  })
  formData.value.educations[formData.value.educations.length - 1].isPresent = false
}

onMounted(() => {})
</script>

<template>
  <main class="relative flex size-full text-white">
    <div class="group absolute bottom-10 right-10 z-3 size-10 origin-center cursor-pointer rounded-full" @click="downloadPDF">
      <AtomIcon name="download" class="text-white duration-300 group-hover:scale-125" />
    </div>
    <div
      :class="[isOpen ? '' : 'pointer-events-none opacity-0']"
      @click="isOpen = false"
      class="absolute size-full bg-black/50 backdrop-blur duration-300"
    ></div>
    <div
      :class="[{ '-translate-x-1': !isOpen }, isOpen ? 'left-0' : '-left-1/2 shadow-inner']"
      class="menu | absolute z-2 h-full w-1/2 bg-black duration-300"
    >
      <div
        :class="[isOpen ? 'translate-x-[calc(100%-18px)]' : 'translate-x-[calc(100%-18px)] hover:translate-x-[calc(100%-6px)]']"
        class="absolute right-0 top-1/2 z-1 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white duration-300"
        @click="isOpen = !isOpen"
      >
        <AtomIcon name="open" :class="[isOpen ? 'rotate-0' : 'rotate-180']" class="text-black duration-300" :size="36" />
      </div>
      <NSpace vertical class="h-full overflow-y-scroll p-4">
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
            <NGridItem span="2">
              <NFormItem label="個人照片">
                <NUpload @change="handleImageUpload">
                  <n-button>上傳</n-button>
                </NUpload>
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
              <AtomIcon
                name="delete"
                class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light"
                @click="removeSocial(index)"
              />
            </div>
            <NDivider />
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
              @click="addSocial"
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
              <AtomIcon
                name="delete"
                class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light"
                @click="removeSkill(index)"
              />
            </div>
            <NDivider />
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
              @click="addSkill"
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
                <NGridItem>
                  <NFormItem label="開始日期">
                    <NDatePicker v-model:value="work.startDate" type="date" placeholder="開始日期" clearable style="width: 100%" />
                  </NFormItem>
                </NGridItem>
                <NGridItem class="relative">
                  <NFormItem label="結束日期">
                    <NDatePicker
                      :disabled="work.isPresent"
                      v-model:value="work.endDate"
                      type="date"
                      placeholder="開始日期"
                      clearable
                      style="width: 100%"
                    />
                  </NFormItem>
                  <div v-if="work.hasOwnProperty('isPresent')" class="absolute right-0 top-0 flex gap-2">
                    <NSwitch size="small" v-model:value="work.isPresent" />
                    <p class="leading-tight">仍在職</p>
                  </div>
                </NGridItem>
                <NGridItem span="2">
                  <NFormItem label="工作描述">
                    <NInput type="textarea" v-model:value="work.description" placeholder="請輸入您的個人簡介" :autosize="{ minRows: 3 }" />
                  </NFormItem>
                </NGridItem>
              </NGrid>
              <AtomIcon
                name="delete"
                class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light"
                @click="removeWork(index)"
              />
              <NDivider />
            </div>
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
              @click="addWork"
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
                      :disabled="edu.isPresent"
                      v-model:value="edu.endDate"
                      type="date"
                      placeholder="開始日期"
                      clearable
                      style="width: 100%"
                    />
                  </NFormItem>
                  <div v-if="edu.hasOwnProperty('isPresent')" class="absolute right-0 top-0 flex gap-2">
                    <NSwitch size="small" v-model:value="edu.isPresent" />
                    <p class="leading-tight">仍在學</p>
                  </div>
                </NGridItem>
              </NGrid>
              <AtomIcon
                name="delete"
                class="shrink-0 cursor-pointer text-white duration-300 hover:text-pr-light"
                @click="removeEducation(index)"
              />
              <NDivider />
            </div>
            <div
              class="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-white/50 bg-black p-2 duration-300 hover:bg-[#000]"
              @click="addEducation"
            >
              <AtomIcon name="plus" :size="14" />
            </div>
          </NSpace>
        </NCard>
      </NSpace>
    </div>
    <div class="flex w-full justify-center px-15 py-5">
      <div id="pdf-container" class="flex aspect-[70/99] h-full">
        <div class="flex w-2/5 flex-col gap-3 bg-[#666] px-3 py-4">
          <img v-if="profileImage" class="aspect-square rounded-md object-cover" :src="profileImage" alt="Profile Image" />
          <div class="text-xs">
            <div class="mb-2 text-sm font-bold">MY CONTACT</div>
            <div>
              <p class="font-bold">Phone</p>
              <p>{{ formData.info.phone }}</p>
            </div>
            <div>
              <p class="font-bold">Email</p>
              <a class="" :href="`mailto:${formData.info.email}`">{{ formData.info.email }}</a>
            </div>
            <div>
              <p class="font-bold">Location</p>
              <p>{{ formData.info.location }}</p>
            </div>
          </div>
          <div class="text-xs">
            <div class="mb-2 text-sm font-bold">LINKS</div>
            <div v-for="(social, index) in formData.socials" :key="`${social.name}${index}`">
              <nuxt-link :to="social.url" class="text-xs">{{ social.name }}</nuxt-link>
            </div>
          </div>
          <div class="text-xs">
            <div class="mb-2 text-sm font-bold">SKILLS</div>
            <div v-for="(skill, index) in formData.skills" :key="`${skill.name}${index}`">
              <p class="text-xs">{{ skill.name }}</p>
            </div>
          </div>
        </div>
        <div class="flex w-3/5 flex-col gap-3 bg-white px-2 text-black">
          <div class="flex flex-col pb-5 pt-10">
            <div class="text-3xl font-bold leading-none">{{ formData.info.name }}</div>
            <div class="text-sm font-bold text-[#666]">{{ formData.info.job }}</div>
          </div>
          <div>
            <div class="mb-1 font-bold">Profile</div>
            <div class="text-[10px]">{{ formData.info.other }}</div>
          </div>
          <div>
            <div class="mb-1 font-bold">Experience</div>
            <div v-for="(work, index) in formData.works" :key="`${work.company}${index}`" class="mb-2 flex flex-col">
              <div class="text-sm font-bold">{{ work.company }}</div>
              <div class="text-xs font-bold text-[#666]">{{ work.job }}</div>
              <div class="text-[10px] text-[#666]">
                {{ new Date(work.startDate).toLocaleDateString() }} - {{ new Date(work.endDate).toLocaleDateString() }}
              </div>
              <p class="text-xs">{{ work.description }}</p>
            </div>
          </div>
          <div>
            <div class="mb-1 font-bold">Education</div>
            <div v-for="(edu, index) in formData.educations" :key="`${edu.company}${index}`" class="mb-2 flex flex-col">
              <div class="text-sm font-bold">
                {{ edu.school }}<span class="mx-3 text-xs">{{ edu.name }}</span>
              </div>
              <div class="text-xs font-bold text-[#666]">{{ edu.major }}</div>
              <div class="text-[10px] text-[#666]">
                {{ new Date(edu.startDate).toLocaleDateString() }} - {{ new Date(edu.endDate).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
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
