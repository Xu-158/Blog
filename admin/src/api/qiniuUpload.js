import { qiniuUploadToken, uploads } from "@/api/qiniu";
import httpUtil from "@/utils/httpUtil";
import { Message } from "element-ui";

async function uploadToQiniu(file) {
  // 获取七牛云 Token
  const { data, status } = await qiniuUploadToken()
  if (status === 1) return

  const uploadUrl = "http://upload-z2.qiniup.com";

  let doc = file.type.split('/').shift();

  let mimetype = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "audio/mp3": "mp3",
    "audio/mpeg": "mp3"
  }

  let keyName;

  if (!mimetype[file.type]) {
    Message.error(`暂不支持上传${file.type}格式`);
    return
  }

  if (mimetype[file.type] == 'mp3') {
    keyName = `${doc}/${file.name}${Math.random()
      .toString(36)
      .slice(2)}.${mimetype[file.type]}`;
  } else {
    keyName = `${doc}/${new Date().getTime()}${Math.random()
      .toString(36)
      .slice(2)}.${mimetype[file.type]}`;
  }


  const formData = new FormData();
  formData.append("file", file);
  formData.append("token", data);
  formData.append("key", keyName);

  const result = await httpUtil.post(
    uploadUrl,
    formData, {
    onUploadProgress: progressEvent => {
      let value = parseInt(
        ((progressEvent.loaded / progressEvent.total) * 100).toFixed(
          0
        )
      )
      if (value % 25 == 0) {
        Message({
          showClose: true,
          message: `正在上传${value}%`,
          type: 'success',
          duration: 0
        })
      }
    }
  }
  );
  return result
}

export default uploadToQiniu