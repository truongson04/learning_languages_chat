import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getFriends,
  getOutGoingRequests,
  getRecommendedFriends,
  sendFriendRequest,
  cancelFriendRequest,
} from "../config/api";

const useGetFriends = () => {
  const userFriends = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });
  return { loadingFriends: userFriends.isLoading, friends: userFriends.data };
};
const useRecommendedFriends = () => {
  const recommended = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedFriends,
  });
  return {
    loadingUsers: recommended.isLoading,
    recommendedUsers: recommended.data,
  };
};
const useOutGoingRequest = () => {
  const outGoingRequests = useQuery({
    queryKey: ["outgoing"],
    queryFn: getOutGoingRequests,
  });

  return { outGoingFriendReqs: outGoingRequests.data };
};

const useSendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoing"] });
    },
  });
  return { sendRequestMutation: mutate, isPending };
};

const useCancelRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: cancelFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoing"] });
    },
  });
  return { cancelRequestMutation: mutate, isCancelPending: isPending };
};

export {
  useGetFriends,
  useRecommendedFriends,
  useOutGoingRequest,
  useSendRequest,
  useCancelRequest,
};
