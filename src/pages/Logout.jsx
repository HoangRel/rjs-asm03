import { redirect } from "react-router-dom";
import { removeFormStorage } from "../components/localStorage/storage";

export function action() {
  removeFormStorage("currentAcc");

  return redirect("/");
}
