<template>
  <div>
    <DialogModal :finish-fn="finishFn" :is-finish="isFinish">
      <template #modal-btn>
        <div @click="() => (isFinish = false)">
          <slot name="btn-content">按鈕</slot>
        </div>
      </template>
      <template #modal-header>
        <h3 class="text-xl font-self">
          {{ currentCourse.course ? currentCourse.course.title : '新增文章' }}
        </h3>
      </template>
      <template #modal-body>
        <div class="flex flex-col-reverse lg:flex-row gap-3">
          <div
            class="flex flex-col gap-3 lg:w-96 lg:h-full h-[75vh] overflow-x-hidden px-3"
          >
            <div class="font-semibold">
              * 封面
              <div class="float-right text-gray-02 font-normal">
                <button
                  type="button"
                  class="mr-2 hover:underline hover:text-gray-01"
                  :class="{
                    'underline text-gray-01': imageStyle === '本地圖片'
                  }"
                  @click="
                    () => {
                      imageStyle = '本地圖片'
                    }
                  "
                >
                  本地圖片
                </button>
                <button
                  type="button"
                  class="hover:underline hover:text-gray-01"
                  :class="{
                    'underline text-gray-01': imageStyle === '雲端圖片'
                  }"
                  @click="() => (imageStyle = '雲端圖片')"
                >
                  雲端圖片
                </button>
              </div>
            </div>
            <img
              v-if="imageStyle === '本地圖片' && imgUrl"
              :src="imgUrl"
              :alt="editorData.title"
              class="w-full object-cover"
            />
            <img
              v-else-if="imageStyle === '雲端圖片'"
              :src="editorData.coverUrl"
              :alt="editorData.title"
              class="w-full object-cover"
            />
            <label for="imgUrl" v-if="imageStyle === '雲端圖片'"
              >網址<input
                type="text"
                name="imgUrl"
                id="imgUrl"
                v-model.trim="editorData.coverUrl"
                class="border border-gray-01 p-2 w-full"
                placeholder="請輸入圖片網址..."
                aria-label="雲端圖片輸入框"
            /></label>
            <div class="flex flex-col gap-3" v-else>
              <label
                v-if="isImgurLogin"
                for="updateImg"
                class="btn-primary cursor-pointer relative"
                >上傳圖片
                <input
                  type="file"
                  name="updateImg"
                  accept=".png"
                  id="updateImg"
                  class="absolute opacity-0"
                  @change="($event) => postFinal($event)"
                />
              </label>
              <p v-else class="text-center text-red-500 text-xl">
                還未取得驗證
              </p>
            </div>
          </div>
          <div class="flex-grow lg:border-l-2 flex flex-col gap-3 lg:px-3">
            <div class="grid lg:grid-cols-2 gap-3">
              <label for="courseTitle"
                >* 課程
                <select
                  name="courseTitle"
                  id="courseTitle"
                  class="border border-gray-01 p-2 w-full"
                  v-model="editorData.title"
                >
                  <option value="" selected disabled>請選擇課程</option>
                  <option
                    :value="title"
                    v-for="(course, title) in coursesOptions"
                    :key="title + course"
                  >
                    {{ title }}
                  </option>
                </select>
              </label>
              <div>
                <label for="addNewCourse">新增課程</label>
                <div class="flex gap-3">
                  <input
                    type="text"
                    name="addNewCourse"
                    id="addNewCourse"
                    class="border border-gray-01 p-2 w-full"
                    placeholder="請輸入課程名稱..."
                    v-model.trim="newCourseTitle"
                  />
                  <button
                    type="button"
                    class="btn-outline p-1 px-2 flex-shrink-0"
                    @click="() => addNewCourse()"
                  >
                    確認
                  </button>
                </div>
              </div>
            </div>
            <div class="grid lg:grid-cols-2 gap-3">
              <div>
                <p>* 時段選擇</p>
                <v-date-picker
                  class="inline-block w-full"
                  v-model="editorData.start"
                  color="teal"
                >
                  <template v-slot="{ inputValue, togglePopover }">
                    <div class="flex items-center">
                      <button
                        type="button"
                        class="p-2 bg-brand-01 bg-opacity-10 border border-brand-01 hover:bg-opacity-30 rounded-l focus:bg-brand-02 focus:border-brand-02 focus:outline-none group"
                        @click="() => togglePopover()"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          class="w-4 h-4 fill-brand-01 group-focus:fill-white"
                        >
                          <path
                            d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                          ></path>
                        </svg>
                      </button>
                      <input
                        :value="inputValue"
                        class="bg-white text-gray-01 w-full py-1 px-2 appearance-none border border-brand-03 rounded-r focus:outline-none focus:border-brand-02"
                        readonly
                      />
                    </div>
                  </template>
                </v-date-picker>
              </div>
              <div class="bg-gray-03 bg-opacity-20 flex flex-col p-2 gap-2">
                <div class="flex gap-3 items-center">
                  <span class="flex-shrink-0">開始:</span>
                  <label for="startHour" class="flex flex-grow">
                    <select
                      name="startHour"
                      id="startHour"
                      class="flex-grow"
                      v-model="editorData.startHour"
                      @change="() => changeTimer()"
                    >
                      <option :value="i + 12" v-for="i in 10" :key="i">
                        {{ i + 12 }}
                      </option></select
                    >時</label
                  >
                  <label for="startMinute" class="flex flex-grow">
                    <select
                      name="startMinute"
                      id="startMinute"
                      class="flex-grow"
                      v-model="editorData.startMinute"
                      @change="() => changeTimer()"
                    >
                      <option
                        :value="i"
                        v-for="i in ['00', '15', '30', '45']"
                        :key="i"
                      >
                        {{ i }}
                      </option></select
                    >分</label
                  >
                </div>
                <div class="flex gap-3 items-center">
                  <span class="flex-shrink-0">結束:</span>
                  <label for="endHour" class="flex flex-grow">
                    <select
                      name="endHour"
                      id="endHour"
                      class="flex-grow"
                      v-model="editorData.endHour"
                      @change="() => changeTimer()"
                    >
                      <option :value="i + 12" v-for="i in 10" :key="i">
                        {{ i + 12 }}
                      </option></select
                    >時</label
                  >
                  <label for="endMinute" class="flex flex-grow">
                    <select
                      name="endMinute"
                      id="endMinute"
                      class="flex-grow"
                      v-model="editorData.endMinute"
                      @change="() => changeTimer()"
                    >
                      <option
                        :value="i"
                        v-for="i in ['00', '15', '30', '45']"
                        :key="i"
                      >
                        {{ i }}
                      </option></select
                    >分</label
                  >
                </div>
              </div>
            </div>
            <div class="grid lg:grid-cols-2 gap-3">
              <label for="coursePrice" class="grid"
                >* 價格<input
                  type="number"
                  name="coursePrice"
                  id="coursePrice"
                  class="border border-gray-01 p-2 w-full"
                  placeholder="請輸入價格..."
                  min="0"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                  v-model.number="editorData.price"
              /></label>
              <label for="courseTotal" class="grid"
                >開課人數<input
                  type="number"
                  name="courseTotal"
                  id="courseTotal"
                  class="border border-gray-01 p-2 w-full"
                  placeholder="請輸入人數..."
                  min="0"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                  v-model.number="editorData.total"
              /></label>
            </div>
            <div>
              <p class="mb-3">
                * 課程簡介
                <button
                  type="button"
                  class="text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100"
                  @click="() => editorData.contents.push('')"
                  v-if="
                    editorData.contents &&
                    editorData.contents[editorData.contents.length - 1]
                  "
                >
                  +
                </button>
                <button
                  type="button"
                  class="text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100"
                  v-else
                  @click="() => editorData.contents.pop()"
                >
                  -
                </button>
              </p>
              <ul class="grid gap-5">
                <li
                  v-for="(content, index) in editorData.contents"
                  :key="content + index"
                >
                  <label :for="`第${index}段`">{{ index + 1 }}. </label>
                  <input
                    type="text"
                    :name="`第${index}段`"
                    :id="`第${index}段`"
                    class="border-b border-gray-01 w-[95%]"
                    placeholder="例:認識主流茶葉的特性與風味 / 學習基本茶桌禮儀 ..."
                    :value="editorData.contents[index]"
                    @change="($event) => contentPush(index, $event)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer></template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from '../components/DialogModal.vue'
import { mapState, mapActions } from 'pinia'
import { coursesStore, updatedImgStore } from '../stores/index'
const { VITE_BASEURL } = import.meta.env

export default {
  props: {
    isNew: {
      typeof: Boolean,
      required: true
    },
    dateId: {
      typeof: Number
    }
  },
  data() {
    return {
      newCourseTitle: '',
      coursesOptions: {},
      editorData: {},
      imageStyle: '雲端圖片',
      isImgurLogin: sessionStorage.getItem('first_token') !== 'null',
      isFinish: false
    }
  },
  computed: {
    ...mapState(coursesStore, ['courses', 'currentCourse']),
    ...mapState(updatedImgStore, ['imgUrl'])
  },
  components: {
    DialogModal
  },
  methods: {
    ...mapActions(updatedImgStore, [
      'postFinal',
      'getFirstToken',
      'clearImgUrl'
    ]),
    ...mapActions(coursesStore, ['getCoursesData', 'getCurrent']),
    finishFn() {
      const {
        contents,
        price,
        title,
        total,
        courseId,
        start,
        startHour,
        startMinute,
        endHour,
        endMinute
      } = this.editorData
      const day = new Date(this.$date(start).format('YYYY,MM,DD')).getTime()
      const startTime = startHour * 60 * 60 * 1000 + startMinute * 60 * 1000
      const endTime = endHour * 60 * 60 * 1000 + endMinute * 60 * 1000
      if (this.imageStyle === '本地圖片') {
        this.editorData.coverUrl = this.imgUrl
      }
      if (this.imageStyle === '本地圖片' && !this.imgUrl) {
        this.$swal.fire({
          icon: 'error',
          title: '還未上傳本地圖片',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      // 基本驗證
      if (new Date(this.editorData.start).getTime() < Date.now()) {
        this.$swal.fire({
          icon: 'error',
          title: '開課時段錯誤',
          text: '不可小於今日',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (title === '') {
        this.$swal.fire({
          icon: 'error',
          title: '請選擇課程',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (this.editorData.coverUrl === '') {
        this.$swal.fire({
          icon: 'error',
          title: '請選擇課程封面',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (this.editorData.price <= 0) {
        this.$swal.fire({
          icon: 'error',
          title: '課程售價不得為 0',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (this.isNew) {
        // 新增
        const coursesData = {
          contents,
          coverUrl: this.editorData.coverUrl,
          price,
          title,
          scores: [],
          userId: +sessionStorage.getItem('userId')
        }
        const courseDatesData = {
          end: new Date(day + endTime).getTime(),
          start: new Date(day + startTime).getTime(),
          total,
          userId: +sessionStorage.getItem('userId'),
          savedUsersId: [],
          isDiscount: false,
          created: new Date().getTime()
        }
        if (courseId) {
          this.$http
            .patch(`${VITE_BASEURL}/courses/${courseId}`, coursesData)
            .then((res) => {
              return this.$http
                .post(`${VITE_BASEURL}/courseDates`, {
                  ...courseDatesData,
                  courseId: res.data.id
                })
                .then((res) => {
                  this.$swal.fire({
                    icon: 'success',
                    title: '課程新增成功',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.getCoursesData()
                })
            })
        } else {
          this.$http
            .post(`${VITE_BASEURL}/courses`, coursesData)
            .then((res) => {
              return this.$http
                .post(`${VITE_BASEURL}/courseDates`, {
                  ...courseDatesData,
                  courseId: res.data.id
                })
                .then(() => {
                  this.$swal.fire({
                    icon: 'success',
                    title: '課程新增成功',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.getCoursesData()
                })
            })
        }
      } else {
        // 編輯
        const { id } = this.editorData
        const coursesData = {
          contents,
          coverUrl: this.editorData.coverUrl,
          price,
          title
        }
        const courseDatesData = {
          end: new Date(day + endTime).getTime(),
          start: new Date(day + startTime).getTime(),
          total,
          courseId
        }
        this.$http
          .patch(`${VITE_BASEURL}/courseDates/${id}`, courseDatesData)
          .then(() => {
            return this.$http.patch(
              `${VITE_BASEURL}/courses/${courseId}`,
              coursesData
            )
          })
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              title: '課程修改成功',
              showConfirmButton: false,
              timer: 1500
            })
            this.getCoursesData()
          })
      }
      this.clearImgUrl()
      this.$emit('update:date-id', 0)
      this.isFinish = true
    },
    addNewCourse() {
      this.coursesOptions[this.newCourseTitle]
        ? this.coursesOptions[this.newCourseTitle]++
        : (this.coursesOptions[this.newCourseTitle] = 1)
      this.editorData.title = this.newCourseTitle
      this.newCourseTitle = ''
      this.editorData.startHour = '13'
      this.editorData.startMinute = '00'
      this.editorData.endHour = '13'
      this.editorData.endMinute = '00'
      this.editorData.start = new Date()
    },
    options() {
      const obj = this.courses.reduce((obj, course) => {
        obj[course.title] ? obj[course.title]++ : (obj[course.title] = 1)
        return obj
      }, {})
      this.coursesOptions = obj
    },
    contentPush(contentsIndex, e) {
      this.editorData.contents[contentsIndex] = e.target.value
    },
    changeTimer() {
      const { startHour, startMinute, endHour, endMinute } = this.editorData
      if (startHour > endHour) {
        this.editorData.endHour = this.editorData.startHour
        this.editorData.endMinute = this.editorData.startMinute
      }
      if (startHour === endHour && startMinute > endMinute) {
        this.editorData.endMinute = this.editorData.startMinute
      }
    }
  },
  watch: {
    dateId(id) {
      this.getCurrent(id)
    },
    currentCourse() {
      if (!this.currentCourse.id) {
        this.editorData = this.currentCourse
      } else {
        const { id, courseId, userId, start, end, total, course } =
          this.currentCourse
        const obj = {
          id,
          courseId,
          title: course.title,
          coverUrl: course.coverUrl,
          contents: course.contents,
          userId,
          price: course.price,
          start,
          startHour: this.$date(start).format('HH'),
          startMinute: this.$date(start).format('mm'),
          end,
          endHour: this.$date(end).format('HH'),
          endMinute: this.$date(end).format('mm'),
          total
        }
        this.editorData = obj
      }
      this.options()
    },
    'editorData.title'() {
      const index = this.courses.findIndex(
        (item) => item.title === this.editorData.title
      )
      if (index !== -1) {
        const { id, coverUrl, contents, price } = this.courses[index]
        this.editorData.courseId = id
        this.editorData.coverUrl = coverUrl
        this.editorData.contents = contents
        this.editorData.price = price
      } else if (!this.editorData.courseId || index === -1) {
        this.editorData.courseId = 0
        this.editorData.coverUrl = ''
        this.editorData.contents = ['']
        this.editorData.price = 0
        this.editorData.total = 0
      }
    }
  }
}
</script>
