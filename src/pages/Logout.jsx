import { redirect } from "react-router-dom";
import { removeFormStorage } from "../components/localStorage/storage";

export function action() {
  console.log("ee");
  removeFormStorage("currentAcc");

  return redirect("/");
}
