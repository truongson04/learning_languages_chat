import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { onboarding } from "../config/api";
import { CameraIcon, Loader, MapPinIcon, ShipWheelIcon } from "lucide-react";
import { LANGUAGES } from "../constants/constants.js";

export default function OnBoardingPage() {
  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: onboarding,
    onSuccess: () => {
      toast.success("Completed");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formState);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 w-full">
      <div className="card bg-base-200 max-w-3xl shadow-xl w-full">
        <div className="card-body p-6 sm:p-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 ">
            {authUser?.isOnboarded ? "Edit your profile" : "Complete your profile"}{" "}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6  box-border w-full"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name: </span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => {
                  setFormState({ ...formState, fullName: e.target.value });
                }}
                className="input input-bordered w-full"
                placeholder="Your full name ..."
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">BIO: </span>
              </label>
              <input
                type="text"
                name="bio"
                value={formState.bio}
                onChange={(e) => {
                  setFormState({ ...formState, bio: e.target.value });
                }}
                className="input input-bordered w-full"
                placeholder="Your bio ..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native language </span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    });
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => {
                    return (
                      <option
                        key={lang}
                        value={lang.toLowerCase()}
                        className=" box-border w-full"
                      >
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning language </span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    });
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((lang) => {
                    return (
                      <option
                        key={lang}
                        value={lang.toLowerCase()}
                        className=" box-border w-full"
                      >
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative mt-1">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            <button
              className="btn btn-primary w-full p-2"
              disabled={isPending}
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin size-5 mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <ShipWheelIcon className="size-5 mr-2" /> {authUser?.isOnboarded ? "Update" : "Complete"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
