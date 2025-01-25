import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../axios-interceptor/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxconfig/reducers/userSlice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { username, email, password, profilePicture, role } = data;
    console.log(role);

    const formData = new FormData();

    // Append text fields
    formData.append("userName", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    // Append the file (profile picture)
    formData.append("image", profilePicture[0]); // Assuming profilePicture is a file input

    try {
      const res = await api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure it's set
        },
      });
      if (res.status === 200) {
        const res = await api.post("login", {
          email,
          password,
        });

        dispatch(
          setUser({
            name: res.data.user.userName,
            email: res.data.user.email,
            picture: res.data.user.profilePic.profilePic,
            role: res.data.user.role,
          })
        );

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-10 rounded-lg shadow-lg w-[90%] max-w-md p-8 mx-auto bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-100">
        Create Your Account
      </h2>
      <form
        className="max-w-md mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Username Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 30,
                message: "Username cannot exceed 30 characters",
              },
            })}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 30,
                message: "Password cannot exceed 30 characters",
              },
            })}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="confirm_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <label
            htmlFor="confirm_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="relative z-0 w-full mb-5 group">
          <select
            defaultValue=""
            id="role"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            {...register("role", { required: "Role is required" })}
          >
            <option value="" disabled selected>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label
            htmlFor="role"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Role
          </label>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* File Input Field */}
        <div className="relative z-0 w-full mb-5 group flex">
          <input
            type="file"
            id="profile_picture"
            accept=".jpeg, .jpg, .png"
            className="mt-4 pb-2 cursor-pointer block w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            {...register("profilePicture", {
              required: "Profile picture is required",
            })}
          />
          <label
            htmlFor="profile_picture"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mb-10 block"
          >
            Upload Profile Picture
          </label>
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isSubmitting ? "Signing up" : "Sign Up"}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default Signup;
