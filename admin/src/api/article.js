import httpUtil from "@/utils/httpUtil";

// 文章标签API
export function addTag(data) {
  return httpUtil({
    url: "/tag/edit",
    method: "post",
    data
  });
}

export function updateTag(data) {
  return httpUtil({
    url: "/tag/update",
    method: "put",
    data
  });
}

export function deleteTag(params) {
  return httpUtil({
    url: "/tag/delete",
    method: "delete",
    params
  });
}

export function getTagList(params) {
  return httpUtil({
    url: "/tag/list",
    method: "get",
    params
  });
}

// 文章API
export function addArticle(data) {
  return httpUtil({
    url: "/article/edit",
    method: "post",
    data
  });
}

export function updateArticle(data) {
  return httpUtil({
    url: "/article/update",
    method: "put",
    data
  });
}

export function deleteArticle(params) {
  return httpUtil({
    url: "/article/delete",
    method: "delete",
    params
  });
}

export function getArticleInfo(params) {
  return httpUtil({
    url: "/article/info",
    method: "get",
    params
  });
}

export function getArticleList(params) {
  return httpUtil({
    url: "/article/list",
    method: "get",
    params
  });
}

export function upload(data) {
  return httpUtil({
    url: "/uploads/images",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" }
  });
}
