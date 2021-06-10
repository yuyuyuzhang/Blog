<template>
  <a-list>
    <a-list-item 
      v-for="item in comments" 
      :key="item.author">
      <a-comment>
        <!-- 头像 -->
        <template slot="avatar">
          <a-avatar
            icon="user"
            shape="square"
            :size="60">
          </a-avatar>
        </template>

        <!-- 作者 -->
        <template slot="author">
          <span>{{ item.author }}</span>
        </template>

        <!-- 时间 -->
        <template slot="datetime">
          <span>{{ item.datetime }}</span>
        </template>

        <!-- 评论 -->
        <template slot="content">
          <span>{{ item.content }}</span>
        </template>

        <!-- 操作 -->
        <template slot="actions">
          <a-icon 
            type="like" 
            :theme="item.isLiked ? 'filled' : 'outlined'"
            @click="handleLike(item)">
          </a-icon>
          <span>{{ item.likes }}</span>

          <a-icon 
            type="dislike" 
            :theme="item.isDisliked ? 'filled' : 'outlined'"
            @click="handleDislike(item)">
          </a-icon>
          <span>{{ item.dislikes }}</span>
        </template>
      </a-comment>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  data(){
    return {
      comments: [
        { author: 'a', datetime: '2021.1.2', content: 'hahahahha', likes: 0, dislikes: 2 },
        { author: 'b', datetime: '2021.1.2', content: 'hahahahha', likes: 0, dislikes: 2 },
        { author: 'c', datetime: '2021.1.2', content: 'hahahahha', likes: 0, dislikes: 2 }
      ]
    }
  },
  methods: {
    handleLike(item){
      if(item.hasOwnProperty('isLiked') && item.isLiked){
        // 取消点击
        item.isLiked = false
        item.likes -= 1
      } else{
        // 第一次点击、取消点击后再次点击
        item.isLiked = true
        item.likes += 1
      }
    },
    handleDislike(item){
      if(item.hasOwnProperty('isDisliked') && item.isDisliked){
        // 取消点击
        item.isDisliked = false
        item.dislikes -= 1
      } else{
        // 第一次点击、取消点击后再次点击
        item.isDisliked = true
        item.dislikes += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>