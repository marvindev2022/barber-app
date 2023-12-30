import { toast } from "react-toastify";

export const notifySucess = (message:string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false,
  });
};

export const notifyError = (message:string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyInfo = (message:string) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyWarning = (message:string) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};


export const promiseToast = async(
  promise: Promise<any>,
  pendingMessage: string,
  successMessage: string,
) => {
  return await toast.promise(promise, {
    pending: pendingMessage,
    success: successMessage,
    error: {
      render: ({ data }:any) => {
        return `Erro: ${data.response.data.message}`;
      },
    },
  }, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "light",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};