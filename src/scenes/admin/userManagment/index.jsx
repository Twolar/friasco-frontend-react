import { Box } from "@mui/material";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiUrlEnum, SceneRoutePathEnum } from "../../../helpers/enums";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(ApiUrlEnum.Users, {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate(SceneRoutePathEnum.Login, {
          state: { from: location },
          replace: true,
        });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USER MANAGEMENT" subtitle=""></Header>
      </Box>

      <Box display="flex">
        <article>
          <h2>List</h2>
          {users?.length ? (
            <ul>
              {users.map((user, i) => (
                <li key={i}>{user?.username}</li>
              ))}
            </ul>
          ) : (
            <p>No users to display</p>
          )}
        </article>
      </Box>
    </Box>
  );
};

export default Users;
