import React, { useEffect } from "react";
import { api } from "../axios-interceptor/axios";
import { setUser } from "../reduxconfig/reducers/userSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../reduxconfig/reducers/LoadingSlice";

const GetLoginUser = () => {
  const dispatch = useDispatch();

  const refreshToken = async () => {
    setLoading(true);
    try {
      const res = await api.post("refreshtoken");
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.log("Error accured to refresh please login again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getuser() {
      dispatch(setLoading(true));
      try {
        const res = await api.get("/getuser");
        console.log(res);
        dispatch(
          setUser({
            name: res.data.user.userName,
            email: res.data.user.email,
            role: res.data.user.role,
          })
        );
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Access token is expired, refresh it
          console.log("Access token expired. Trying to refresh...");
          refreshToken();
        } else {
          console.log(error);
        }
        dispatch(setUser({})); // Reset user if error occurs
      } finally {
        dispatch(setLoading(false));
      }
    }
    getuser();
  }, []);

  return null;
};

export default GetLoginUser;
