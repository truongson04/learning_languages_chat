import { useEffect, useState } from "react";
import {
  useOutGoingRequest,
  useRecommendedFriends,
  useSendRequest,
  useCancelRequest,
} from "../hooks/useFriends";

import { Link } from "react-router-dom";
import {
  MapPinIcon,
  CheckCircleIcon,
  UserPlusIcon,
  XCircleIcon,
} from "lucide-react";

import capitalize from "../helper/capitalize";
import GetFlag from "../helper/GetFlag";

export default function HomePage() {
  const [outgoingRequestMap, setOutgoingRequestMap] = useState({});
  const { loadingUsers, recommendedUsers } = useRecommendedFriends();
  const { outGoingFriendReqs } = useOutGoingRequest();
  const { sendRequestMutation, isPending } = useSendRequest();
  const { cancelRequestMutation, isCancelPending } = useCancelRequest();

  useEffect(() => {
    const map = {};

    if (outGoingFriendReqs && outGoingFriendReqs.sentRequest.length > 0) {
      outGoingFriendReqs.sentRequest.forEach((request) => {
        map[request.recipient._id] = request._id;
      });
    }
    setOutgoingRequestMap(map);
  }, [outGoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 ">
      <div className="container mx-auto space-y-10 ">

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Meet new learners{" "}
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on profile
                </p>
              </div>
            </div>
          </div>
          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : recommendedUsers?.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendation </h3>
              <p className="text-base-content opacity-70">
                Check later for new user recommendation
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {recommendedUsers?.map((user) => {
                const checkRequestSent = !!outgoingRequestMap[user._id];

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="avatar size-16 rounded-full"
                        />

                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          <GetFlag language={user.nativeLanguage} />
                          Native: {capitalize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          <GetFlag language={user.learningLanguage} />
                          Learning: {capitalize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}
                      {checkRequestSent ? (
                        <button
                          className="btn btn-outline btn-error w-full mt-2"
                          onClick={() => cancelRequestMutation(outgoingRequestMap[user._id])}
                          disabled={isCancelPending}
                        >
                          <XCircleIcon className="size-4 mr-2" />
                          Cancel Request
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-full mt-2"
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={isPending}
                        >
                          <UserPlusIcon className="size-4 mr-2" />
                          Send Friend Request
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
