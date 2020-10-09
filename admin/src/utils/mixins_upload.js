const isProduction = process.env.NODE_ENV === "production";
export default {
  computed: {
    uploadUrl() {
      return isProduction ? '/api/admin/uploads/images':process.env.VUE_APP_BASE_API + '/uploads/images'
    },
    // 文件上传时的请求头
    uploadHeaders() {
      return { 'Authorization': sessionStorage.getItem('token') || '' }
    }
  },
}