import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../config/api";

const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return { logoutMutate: mutate, error };
};
export default useLogout;
