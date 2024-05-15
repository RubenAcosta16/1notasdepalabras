import { toast } from "react-toastify";

function toastComponent(text,isSuccess = true) {
  const values = { theme: "colored", autoClose: 1500 };

  if (isSuccess) {
    toast.success(text, values);
  } else {
    toast.error(text, values);
  }
}

export default toastComponent;
