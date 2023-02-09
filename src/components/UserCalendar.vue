<template>
  <!-- {{ todos }} -->
  <v-date-picker
    v-model="date"
    :model-config="modelConfig"
    color="teal"
    :attributes="attributes"
    is-expanded
    trim-weeks
  />
</template>
<script>
export default {
  props: ["todos"],
  data() {
    // const todos = [
    //   {
    //     dates: {
    //       weekdays: 6,
    //       start: "2023-01-01",
    //       end: "2023-02-04",
    //     }, // 每周五
    //     description: "彈跳視窗說明文字",
    //   },
    //   {
    //     dates: 1675002323970, // 每周五
    //     description: "茶葉的風味鑑賞學 15:00~16:30",
    //   },
    //   {
    //     dates: 1675002322170, // 每周五
    //     description: "茶葉的風味 13:00~15:30",
    //   },
    // ];
    return {
      // todos,
      date: new Date(), // 選擇日曆的某一天
      modelConfig: {
        type: "number",
      },
    };
  },
  computed: {
    attributes() {
      return [
        ...this.todos.map((todo) => {
          return {
            dates: todo.dates,
            dot: {
              color: "red",
            },
            popover: {
              // 彈跳視窗配置
              label: todo.description,
              visibility: "hover", // 顯示彈出窗口方式 點擊顯示:focus/click 默認:hover
              hideIndicator: false, // 是否隱藏彈跳視窗前方圖標
              customData: todo, // 自定義數據
            },
          };
        }),
      ];
    },
  },
};
</script>
<style scoped></style>
