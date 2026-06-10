import { useState } from "react";
import logoHanu from "/logo hanu.png";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup } from "../config/api.js";

export default function SignUpPage() {
  const [signupData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const handleSignUp = (e) => {
    e.preventDefault();
    mutate(signupData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-red-600/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/*Sign up form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/*logo */}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <img src={logoHanu} className="w-9 h-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-red-700 to-red-500 tracking-wider ">
              {" "}
              Hanu
            </span>
          </div>
          {/* Error */}
          {error && (
            <div className="alert alert-error mb-4 ">
              {error.response.data.message}
            </div>
          )}
          <div className="w-full ">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4 ">
                <div>
                  <h2 className="text-xl font-semibold">Create an account</h2>
                  <p className="text-sm opacity-70">
                    {" "}
                    Join our community and start your learning journey !
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text"> Full Name: </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name ..."
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) => {
                        setSignUpData({
                          ...signupData,
                          fullName: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text"> Email: </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your email ..."
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignUpData({
                          ...signupData,
                          email: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text"> Password: </span>
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignUpData({
                          ...signupData,
                          password: e.target.value,
                        });
                      }}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password need to be at least 6 characters
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    {" "}
                    Already have an account ?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in{" "}
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* right side */}
        <div className=" lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                className="w-ful h-full object-contain "
                src="https://pictures.tribuna.com/image/d4b4d078-3a54-46c5-9c21-6886e119718d?width=1920&quality=70"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with partners </h2>
              <p className="opacity-70">Practice conversation, make friends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
