export default function (fileSize) {
  if (!fileSize) return "未知大小"
  let size = '';
  let value = 1024;

  if (fileSize < value) {
    size = fileSize.toFixed(2) + "B"
  } else if (fileSize < Math.pow(value, 2)) {
    size = (fileSize / value).toFixed(2) + "KB"
  }
  else if (fileSize < Math.pow(value, 3)) {
    size = (fileSize / Math.pow(value, 2)).toFixed(2) + "MB"
  }
  else if (fileSize < Math.pow(value, 4)) {
    size = (fileSize / Math.pow(value, 3)).toFixed(2) + "G"
  } else {
    size = fileSize + "未知单位"
  }

  return size.toString();
}