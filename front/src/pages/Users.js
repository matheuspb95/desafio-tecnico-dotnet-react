import React, { useState, useEffect } from "react";
import {
  Box,
  DataTable,
  Text,
  Heading,
  Button,
  Card,
  Layer,
  Pagination,
  Footer,
  TextInput,
} from "grommet";
import { Trash, Search } from "grommet-icons";
import AlertModal from "../components/AlertModal";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";

const Users = (props) => {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState([]);
  const [askDelete, setAskDelete] = useState(-1);
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
    <Box fill direction="row">
      <Box align="center" justify="center" fill background="light-3">
        <Card width="xxlarge" round="xsmall" background="light-1">
          <Box background="light-1">
            <Box margin="small">
              <Heading margin={{ vertical: "xsmall" }} size="16px">
                Users
              </Heading>
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
                      property: "name",
                      header: <Text {...headerProps}>Name</Text>,
                      render: (pract) => {
                        return <Text size="2vh">{pract.name}</Text>;
                      },
                    },
                    {
                      property: "sur_name",
                      header: <Text {...headerProps}>Sur Name</Text>,
                      render: (pract) => {
                        return <Text size="2vh">{pract.surName}</Text>;
                      },
                    },
                    {
                      property: "email",
                      header: <Text {...headerProps}>Email</Text>,
                      render: (pract) => {
                        return <Text size="2vh">{pract.email}</Text>;
                      },
                    },
                    {
                      property: "acces_type",
                      header: <Text {...headerProps}>Access Type</Text>,
                      render: (pract) => {
                        return (
                          <Text size="2vh">
                            {pract.accesType ? "Normal" : "Admin"}
                          </Text>
                        );
                      },
                    },
                    {
                      property: "buttons",
                      render: (user) => {
                        return (
                          <Box direction="row" gap="small">
                            {localStorage.getItem("role") === "Admin" && (
                              <Box direction="row" gap="small">
                                <Button
                                  size="small"
                                  style={{ borderRadius: "4px" }}
                                  primary
                                  color="status-critical"
                                  icon={<Trash size="14px" />}
                                  onClick={() => setAskDelete(user.id)}
                                />
                              </Box>
                            )}
                          </Box>
                        );
                      },
                    },
                  ]}
                  border={{
                    color: "light-4",
                    side: "all",
                    size: "xsmall",
                  }}
                  data={listData
                    .filter((d) =>
                      d.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .slice((page - 1) * 10, page * 10)}
                />
              ) : (
                <Box align="center">
                  <Text>No Users found</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
        <Footer justify="center">
          <Pagination
            numberMiddlePages={6}
            margin="small"
            onChange={({ page }) => setPage(page)}
            size="small"
            step={10}
            numberItems={
              listData.filter(
                (d) =>
                  d.name.toLowerCase().includes(search.toLowerCase()) &&
                  d.surName.toLowerCase().includes(search.toLowerCase()) &&
                  d.email.toLowerCase().includes(search.toLowerCase())
              ).length
            }
          />
        </Footer>
      </Box>
      <AlertModal errors={errors} setErrors={setErrors} />
      {askDelete >= 0 && (
        <Layer
          onEsc={() => setAskDelete(-1)}
          onClickOutside={() => setAskDelete(-1)}
        >
          <Box pad="medium">
            <Heading color="status-critical">DELETE</Heading>
            <Text>Confirm user delete</Text>
            <Box direction="row" gap="xsmall">
              <Button
                label="YES"
                color="status-ok"
                onClick={async () => {
                  try {
                    await api.delete(`/api/user/${askDelete}`, {
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    });
                    history("/home");
                  } catch (e) {
                    errors.push("Network Error", e);
                    setAskDelete(-1);
                  }
                }}
              />
              <Button
                label="NO"
                color="status-critical"
                onClick={() => setAskDelete(-1)}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Users;
