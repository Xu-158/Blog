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
    keyName = `${doc}${new Date().getTime()}/${file.name}${Math.random()
      .toString(36)
      .slice(2)}.${mimetype[file.type]}`;
  } else {
    keyName = `${doc}/${new Date().getTime()}${Math.random()
      .toString(36)
      .slice(2)}.${mimetype[file.type]}`;
  }

  // 图片压缩
  if (file.size > (1024 * 1024) && ['image/png', 'image/jpeg', 'image/jpg'].indexOf(file.type) >= 0) {
    await canvasDataURL(file).then((blob) => {
      Message({
        showClose: true,
        message:
          `图片大于1M!,
        压缩前：${(file.size / 1024 / 1024).toFixed(2)}"M"
        压缩后：${(blob.size / 1024 / 1024).toFixed(2)}"M"
        `,
        type: 'success',
        duration: 0
      })
      file = new File([blob], file.name, {
        type: file.type
      })
    })
  }

  console.log('file:后 ', file);

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

/**
 * 
 */
function canvasDataURL(file) {
  return new Promise(function (resolve, reject) {
    console.log('canvasDataURL: ');
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      console.log('reader.onload: ');
      const img = new Image();
      const quality = 0.7;
      const canvas = document.createElement('canvas');
      const drawer = canvas.getContext('2d');
      img.src = this.result;
      // console.log('this.result: ', this.result);Base64
      img.onload = function () {
        console.log('img.onload: ');
        canvas.height = img.height;
        canvas.width = img.width;
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        convertBase64UrlToBlob(canvas.toDataURL(file.type, quality), resolve)
      }
    }
  });
}

function convertBase64UrlToBlob(urlData, resolve) {
  console.log('convertBase64UrlToBlob: ');
  // console.log('urlData: ', urlData);
  const arr = urlData.split(',');
  const mine = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  resolve(new Blob([u8arr], {
    type: mine
  }))
}

export default uploadToQiniu