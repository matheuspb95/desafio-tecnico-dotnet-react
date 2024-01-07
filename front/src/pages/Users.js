import React, { useState, useEffect } from "react";
import {
  Box,
  DataTable,
  Text,
  Avatar,
  Button,
  Pagination,
  Footer,
  TextInput,
} from "grommet";
import { Edit, Folder, Search, UserManager } from "grommet-icons";
import AlertModal from "../components/AlertModal";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";

const Users = (props) => {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useNavigate();
  let location = useLocation();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/api/user", {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setListData(
          data.map((d, i) => {
            return { ...d, key: i };
          })
        );
      } catch (e) {
        setErrors(["Error on token validation, do login"]);
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }
    })();
  }, [history, location.state]);

  const headerProps = {
    color: "black",
    size: "14px",
    alignSelf: "center",
  };

  return (
    <Box direction="row">
      <Box fill>
        <Box pad="small" fill background="light-3">
          <Box background="light-1">
            <Box margin="small">
              <Text margin={{ vertical: "xsmall" }} size="16px">
                Users
              </Text>
              <TextInput
                onChange={(evt) => {
                  setPage(1);
                  setSearch(evt.target.value);
                }}
                placeholder="type user name here"
                reverse
                icon={<Search />}
              />
            </Box>
            <Box>
              {listData.length > 0 ? (
                <DataTable
                  margin={{ top: "small" }}
                  background={{
                    header: { color: "light-1", opacity: "strong" },
                    body: ["light-1", "light-3"],
                    footer: { color: "dark-3", opacity: "strong" },
                  }}
                  columns={[
                    {
                      property: "#",
                      header: <Text>#</Text>,
                      render: () => <Text size="14px">#</Text>,
                    },
                    {
                      property: "name",
                      header: <Text {...headerProps}>Name</Text>,
                      render: (pract) => {
                        return (
                          <Text size="12px">{pract.name}</Text>
                        );
                      },
                    },
                    {
                      property: "sur_name",
                      header: <Text {...headerProps}>Sur Name</Text>,
                      render: (pract) => {
                        return (
                          <Text size="12px">{pract.surName}</Text>
                        );
                      },
                    },
                    {
                      property: "email",
                      header: <Text {...headerProps}>Email</Text>,
                      render: (pract) => {
                        return (
                          <Text size="12px">{pract.email}</Text>
                        );
                      },
                    },
                    {
                      property: "acces_type",
                      header: <Text {...headerProps}>Access Type</Text>,
                      render: (pract) => {
                        return (
                          <Text size="12px">{pract.accesType ? "Normal":"Admin"}</Text>
                        );
                      },
                    },
                  ]}
                  border={{
                    color: "light-4",
                    side: "horizontal",
                    size: "xsmall",
                  }}
                  data={listData
                    .filter((d) =>
                      d.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .slice((page - 1) * 5, page * 5)}
                />
              ) : (
                <Box align="center">
                  <Text>No Users found</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Footer justify="center">
          <Pagination
            numberMiddlePages={6}
            margin="small"
            onChange={({ page }) => setPage(page)}
            size="small"
            step={5}
            numberItems={
              listData.filter((d) =>
                d.name.toLowerCase().includes(search.toLowerCase())
              ).length
            }
          />
        </Footer>
      </Box>
      <AlertModal errors={errors} setErrors={setErrors} />
    </Box>
  );
};

export default Users;