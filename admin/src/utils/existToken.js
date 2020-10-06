import { auth } from "@/api/login";

export async function existToken() {
  let token = false;
  if (sessionStorage.getItem("token")) {
    const res = await auth();
    if (res.status === 0) token = true;
  }
  return token;
}
