import React from "react";
import { useToast as useToastGS, Toast } from "@/components/gluestack/toast";
import Text from "@/components/Text";

const useToast = () => {
  const toast = useToastGS();
  const [toastId, setToastId] = React.useState("0");
  const handleToast = (
    title: string,
    description: string,
    onCloseCompleteCallback?: () => void
  ) => {
    if (!toast.isActive(toastId)) {
      showNewToast(title, description, onCloseCompleteCallback);
    }
  };

  const showNewToast = (
    title: string,
    description: string,
    onCloseCompleteCallback?: () => void
  ) => {
    const newId = Math.random().toString();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "top",
      duration: 5000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            nativeID={uniqueToastId}
            variant="solid"
            className="p-4 rounded-[10px] max-w-[450px]"
            style={{
              backgroundColor: "#121212",
            }}>
            <Text
              weight="semi-bold"
              className="text-white">
              {title}
            </Text>
            <Text className="text-white">{description}</Text>
          </Toast>
        );
      },
      onCloseComplete: () => {
        if (onCloseCompleteCallback) {
          onCloseCompleteCallback();
        }
      },
    });
  };

  return { handleToast };
};

export default useToast;
