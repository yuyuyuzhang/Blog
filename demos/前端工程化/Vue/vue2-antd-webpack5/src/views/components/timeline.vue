<template>
  <a-timeline style="padding: 10px;">
    <a-timeline-item 
      v-for="item in times"
      :key="item.name"
      :color="item.color">
      <template slot="dot">
        <a-icon :type="item.type"></a-icon>
      </template>
      {{ item.title }}
    </a-timeline-item>
  </a-timeline>
</template>

<script>
export default {
  data(){
    return {
      times: [
        { title: '哈哈', color: 'green', type: 'number', time: '2020-1-2' },
        { title: '呵呵', color: 'blue', type: 'smile', time: '2020-1-3' },
        { title: '赫赫', color: 'red', type: 'search', time: '2020-1-4' },
        { title: '嘿嘿', color: 'gray', type: 'user', time: '2020-1-5' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>