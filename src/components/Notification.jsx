import { toast } from "react-hot-toast";

const Notification = {
  success: (message, options = {}) => {
    toast.success(message, options);
  },
  error: (message, options = {}) => {
    toast.error(message, options);
  },
  loading: (message, options = {}) => {
    return toast.loading(message, options);
  },
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};

export default Notification;
