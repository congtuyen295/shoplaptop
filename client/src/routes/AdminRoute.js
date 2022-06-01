import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { LOCAL_STORAGE } from "../constants/localstorage";
import DefaultAdminLayout from "../layout/admin";

const AdminRoute = (props) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  const { isAdmin } = useSelector((state) => state.auth); // chưa đúng
  return (
    <>
      {isAdmin && accessToken ? (
        <DefaultAdminLayout>
          <Route {...props} />
        </DefaultAdminLayout>
      ) : (
        <Route
          render={(props) => (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default AdminRoute;
