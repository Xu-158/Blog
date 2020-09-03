export default {
  computed: {
    uploadUrl() {
      return process.env.VUE_APP_BASE_API + '/uploads/images'
    },
    // 文件上传时的请求头
    uploadHeaders() {
      return { 'Authorization': localStorage.getItem('token') || '' }
    }
  },
}