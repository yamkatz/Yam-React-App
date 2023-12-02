import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

const SandboxComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  const regularModeStyles = {
    maxHeight: "350px",
    overflowY: "auto",
    overflowX: "hidden",
  };

  const responsiveModeStyles = {
    maxHeight: "250px",
    overflowY: "auto",
    overflowX: "auto",
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const changeUserStatus = async (userId, newStatus) => {
    try {
      await axios.patch(`/users/${userId}`, { isBusiness: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBusiness: newStatus } : user
        )
      );
      toast.success("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Error updating user status");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      fetchUsers();
      setSelectedUser(null);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isPortrait && (
          <Box
            style={{
              textAlign: "center",
              padding: "10px",
              background: "orange",
            }}
          >
            Please rotate your device for a better viewing experience.
          </Box>
        )}
        <Typography variant="h3" fontFamily="lucida" textAlign="center">
          Welcome To Your Admin Dashboard!
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{
            margin: 2,
            [theme.breakpoints.down("sm")]: {},
          }}
        >
          List of all users is presented to you. for your convenience,
          possibility of modify the users status, toggling between business and
          guest roles, and deleting any user to your consideration.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box style={isSmallScreen ? responsiveModeStyles : regularModeStyles}>
          <Table style={{ maxWidth: "800px", margin: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{`${user.name.first} ${user.name.last}`}</TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isBusiness}
                      onChange={() =>
                        changeUserStatus(user._id, !user.isBusiness)
                      }
                    />
                    {user.isBusiness ? "Business" : "Non-Business"}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ToastContainer />
      </Grid>
    </Grid>
  );
};

export default SandboxComponent;
