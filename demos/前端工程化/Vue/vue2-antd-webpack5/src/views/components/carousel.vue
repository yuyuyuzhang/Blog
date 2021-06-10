<template>
  <a-carousel
    autoplay
    arrows
    dot-position="bottom">
    <!-- 自定义左右指示箭头 -->
    <template slot="prevArrow" slot-scope="props">
      <div class="custom-slick-arrow" style="left: 10px;">
        <a-icon type="left-circle"></a-icon>
      </div>
    </template>
    <template slot="nextArrow" slot-scope="props">
      <div class="custom-slick-arrow" style="right: 10px;">
        <a-icon type="right-circle"></a-icon>
      </div>
    </template>

    <!-- 自定义分页 -->
    <template slot="customPaging" slot-scope="props">
      <img :src="getImgUrl(props)" />
    </template>

    <!-- 自定义显示内容 -->
    <h3 v-for="item in shows" :key="item">
      {{ item }}
    </h3>
  </a-carousel>
</template>

<script>
export default {
  data(){
    return {
      shows: [1, 2, 3, 4],
      baseUrl: 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/',
    }
  },
  methods: {
    getImgUrl(props){
      return `${this.baseUrl}abstract0${props.i + 1}.jpg`
    },
  }
}
</script>

<style lang="scss" scoped>
.ant-carousel >>> .slick-slide {
  width: 500px;
  height: 160px;
  overflow: hidden;
  background: #364d79;
  text-align: center;
  line-height: 160px;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.ant-carousel >>> .slick-dots li img {
  width: 80px;
  height: 50px;
  cursor: pointer;
}
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  background-color: rgba(31, 45, 61, 0.11);
  font-size: 25px;
  color: #fff;
  opacity: 0.3;
  z-index: 999; // 重要，没有可能会不显示
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
</style>