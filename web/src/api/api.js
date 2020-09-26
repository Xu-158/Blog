import httpUtil from "../utils/httpUtil";

export function getArticleList() {
  return httpUtil({
    method: "get",
    url: "/getArticleList"
  });
}

export function getArticleInfo(params) {
  return httpUtil({
    method: "get",
    url: "/getArticleInfo",
    params
  });
}
