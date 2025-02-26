import { toast } from 'react-hot-toast';
import styles from './ToastNotifications.module.css';

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};
