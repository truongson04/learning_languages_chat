import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../config/api.js";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return { isPending, error, signUpMutate: mutate };
}
