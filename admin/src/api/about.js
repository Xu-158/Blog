import httpUtil from "@/utils/httpUtil";

export function updateAbout(data) {
  return httpUtil({
    method: "put",
    url: "/about/update",
    data
  });
}

export function getAboutInfo() {
  return httpUtil({
    method: "get",
    url: "/about/info"
  });
}
