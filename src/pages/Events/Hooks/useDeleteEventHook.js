import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";

export const useDeleteEventHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/events/delete?eventId=${eventId}`
      );
      queryClient.invalidateQueries("Events");
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteEvent };
};
