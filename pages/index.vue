<script setup>
import { useAllStore } from '@/store/all'
const { windowWidth } = toRefs(useAllStore())
import { jsPDF } from 'jspdf/dist/jspdf.umd.min.js'
import html2canvas from 'html2canvas'
const isOpen = ref(false)

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
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    let imgHeight = (canvas.height * pdfWidth) / canvas.width
    let position = 0

    while (imgHeight > 0) {
      pdf.addImage(
        imgData,
        'PNG',
        0,
        position,
        pdfWidth,
        Math.min(imgHeight, pdfHeight)
      )
      imgHeight -= pdfHeight
      position -= pdfHeight

      if (imgHeight > 0) {
        pdf.addPage()
      }
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

const checkDate = (date, isPresent) => {
  return isPresent ? '現今' : date
}

onMounted(() => {})
</script>

<template>
  <main class="relative flex size-full text-white">
    <!-- <div class="group absolute bottom-0 right-0 z-3 size-10 flex justify-center items-center origin-center cursor-pointer rounded-full" @click="downloadPDF">
      <AtomIcon name="download" class="text-white duration-300 group-hover:scale-125" />
    </div> -->
    <div
      :class="[isOpen ? '' : 'pointer-events-none opacity-0']"
      @click="isOpen = false"
      class="absolute size-full bg-black/50 backdrop-blur duration-300 xl:hidden"
    ></div>
    <div
      :class="[{ '-translate-x-1': !isOpen }, isOpen ? 'left-0' : 'left-[-85%] lg:-left-1/2']"
      class="menu | absolute z-2 h-full w-[85%] lg:w-1/2 bg-black duration-300 xl:static"
    >
      <div
        :class="[isOpen ? 'translate-x-[calc(100%-10px)] xl:translate-x-[calc(100%-18px)]' : 'translate-x-[calc(100%+9px)]']"
        class="absolute right-0 top-1/2 z-1 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white duration-300 xl:hidden"
        @click="isOpen = !isOpen"
      >
        <AtomIcon name="open" :class="[isOpen ? 'rotate-0' : 'rotate-180']" class="text-black duration-300 hidden xl:block" :size="36" />
        <AtomIcon name="open" :class="[isOpen ? 'rotate-0' : 'rotate-180']" class="text-black duration-300 xl:hidden" :size="20" />
      </div>
      <div
        class="group absolute bottom-0 right-0 z-3 flex size-10 origin-center translate-x-[calc(100%+5px)] cursor-pointer items-center justify-center rounded-full"
        @click="downloadPDF"
      >
        <AtomIcon name="download" class="text-white duration-300 group-hover:scale-125" />
      </div>
      <NSpace vertical class="h-full overflow-y-scroll p-4">
        <!-- 個人資訊區塊 -->
        <NCard title="個人資訊" class="mb-4">
          <NGrid :cols="windowWidth < 768 ? '1':'2'" x-gap="12">
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
              <NGrid :cols="windowWidth < 768 ? '1':'2'" x-gap="12">
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
                      placeholder="結束日期"
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
              <NGrid :cols="windowWidth < 768 ? '1':'2'" x-gap="12">
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
                      placeholder="結束日期"
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
    <div class="flex w-full justify-center px-7 py-7 xl:px-15 xl:py-5 xl:w-1/2">
      <div id="pdf-container" class="flex aspect-[70/99] h-fit w-full sm:h-full sm:w-auto">
        <div class="flex w-2/5 overflow-y-scroll flex-col gap-3 bg-[#666] px-3 py-4">
          <img v-if="profileImage" class="aspect-square rounded-md object-cover" :src="profileImage" alt="Profile Image" />
          <div class="text-responsive_content">
            <div class="mb-2 font-bold">MY CONTACT</div>
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
          <div class="text-responsive_content">
            <div class="mb-2 font-bold">LINKS</div>
            <div v-for="(social, index) in formData.socials" :key="`${social.name}${index}`">
              <nuxt-link :to="social.url" class="">{{ social.name }}</nuxt-link>
            </div>
          </div>
          <div class="text-responsive_content">
            <div class="mb-2 font-bold">SKILLS</div>
            <div v-for="(skill, index) in formData.skills" :key="`${skill.name}${index}`">
              <p class="">{{ skill.name }}</p>
            </div>
          </div>
        </div>
        <div class="flex w-3/5 overflow-y-scroll flex-col gap-1 xl:gap-3 bg-white px-2 text-black">
          <div class="flex flex-col pt-6 xl:pb-5 xl:pt-10">
            <div class="text-responsive_title font-bold leading-none">{{ formData.info.name }}</div>
            <div class="text-responsive_title font-bold text-[#666]">{{ formData.info.job }}</div>
          </div>
          <div>
            <div class="mb-1 font-bold text-responsive_title">Profile</div>
            <div class="text-responsive_content">{{ formData.info.other }}</div>
          </div>
          <div>
            <div class="mb-1 text-responsive_title font-bold">Experience</div>
            <div v-for="(work, index) in formData.works" :key="`${work.company}${index}`" class="mb-2 flex flex-col">
              <div class="text-sm text-responsive_title font-bold">{{ work.company }}</div>
              <div class="text-xs text-responsive_title font-bold text-[#666]">{{ work.job }}</div>
              <div class="text-responsive_content text-[#666]">
                {{ new Date(work.startDate).toLocaleDateString() }} -
                {{ work.isPresent ? '現今': new Date(work.endDate).toLocaleDateString() }}
              </div>
              <p class="text-responsive_content">{{ work.description }}</p>
            </div>
          </div>
          <div>
            <div class="mb-1 text-responsive_title font-bold">Education</div>
            <div v-for="(edu, index) in formData.educations" :key="`${edu.company}${index}`" class="mb-2 flex flex-col">
              <div class="text-responsive_content font-bold">
                {{ edu.school }}<span class="mx-3 text-responsive_content">{{ edu.name }}</span>
              </div>
              <div class="text-responsive_content  font-bold text-[#666]">{{ edu.major }}</div>
              <div class="text-responsive_content text-[#666]">
                {{ new Date(edu.startDate).toLocaleDateString() }} - {{ edu.isPresent ? '現今': new Date(edu.endDate).toLocaleDateString() }}
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
.text-responsive_content {
  font-size: clamp(0rem, 2vw, 0.875rem); /* 最小值 1rem，最大值 2.5rem，根據視窗寬度調整 */
}
.text-responsive_title {
  font-size: clamp(0rem, 4vw, 1.25rem); /* 最小值 1rem，最大值 2.5rem，根據視窗寬度調整 */
}
</style>
