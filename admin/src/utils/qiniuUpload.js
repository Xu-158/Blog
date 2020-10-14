import { qiniuUploadToken, uploads } from "@/api/qiniu";
import httpUtil from "@/utils/httpUtil";

async function uploadToQiniu(req) {
  // 获取七牛云 Token
  const { data, status } = await qiniuUploadToken()
  if (status === 1) return

  const uploadUrl = "http://upload-z2.qiniup.com";

  alert(req.file.type)
  let fileType = req.file.type.split('/').pop();

  let mimetype = {
    "image/png": "images",
    "image/jpeg": "images",
    "image/gif": "images",
    "audio/mp3": "mp3",
    "audio/mpeg": "mp3"
  }

  const keyName = `${mimetype[req.file.type]}/${new Date().getTime()}${Math.random()
    .toString(36)
    .slice(2)}.${fileType}`;

  const formData = new FormData();
  formData.append("file", req.file);
  formData.append("token", data);
  formData.append("key", keyName);

  const result = await httpUtil.post(
    uploadUrl,
    formData, {
    // onUploadProgress: progressEvent => {
    //   this.progress = parseInt(
    //     ((progressEvent.loaded / progressEvent.total) * 100).toFixed(
    //       0
    //     )
    //   )
    // }
  }
  );
  return result
}

export default uploadToQiniu