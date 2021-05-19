<template>
  <!-- <a-upload
    accept=""
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    method="post"
    :directory="false"
    :headers="headers"
    :multiple="true"
    :show-upload-list="true"
    :file-list="fileList"
    :before-upload="handleBeforeLoad"
    :remove="handleRemove"
    @reject="handleReject"
    @change="handleChange"
    @preview="handlePreview"
    @download="handleDownload">
    <a-button type="primary">
      <a-icon type="upload"></a-icon>
      上传
    </a-button>
  </a-upload> -->

  <a-upload
    name="file"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :multiple="true"
    :show-upload-list="true"
    :file-list="fileList"
    @change="handleChange">
    <a-button 
      :loading="isLoading" 
      type="primary">
      上传
    </a-button>
  </a-upload>
</template>

<script>
export default {
  data(){
    return {
      headers: {
        authorization: 'authorization-text',
      },
      isLoading: false,
      fileList: [],
    }
  },
  methods: {
    handleReject(fileList){
      // console.log(fileList)
    },
    /**
     * @deprecated 上传文件之前的回调
     * @return boolean / Promise
     */
    handleBeforeLoad(file, fileList){
      // console.log(file)
      // console.log(fileList)
      return true
    },
    /**
     * @description 上传文件状态改变回调
     * @param file 当前文件
     * @param fileList 文件列表
     * @param event 上传中的服务器响应内容，高级浏览器支持
     */
    handleChange({ file, fileList, event }){
      console.log(file.status)
      // console.log(fileList)
      // console.log(event)

      switch(file.status){
        case 'uploading':
          this.isLoading = true
          break;
        case 'done':
          this.isLoading = false
          break;
        case 'error':
          this.isLoading = false
          this.$message.error({
            content: '上传失败',
            duration: 1,
          })
          break;
        case 'removed':
          break;
      }
    },
    handleRemove(file){
      // console.log(file)
    },
    handlePreview(file){
      // console.log(file)
    },
    handleDownload(file){
      // console.log(file)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>