import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useEditBlogHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
    const editBlog = async (blogId, values) => {
      try {
        await axiosInstance.put( `${i18n.language}/admin/blogs/update?blogId=${blogId}`, values );
        queryClient.invalidateQueries("blogs");
      } catch (error) {
        console.error(
          "Error editing blog:",
          error.response ? error.response.data : error.message
        );
      }
    };
  
    return { editBlog };
}