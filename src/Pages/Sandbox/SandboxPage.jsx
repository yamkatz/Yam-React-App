import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SandboxComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <div>
      <h1>User List</h1>
      <Table>
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
                  onChange={() => changeUserStatus(user._id, !user.isBusiness)}
                />
                {user.isBusiness ? "Business" : "Non-Business"}
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default SandboxComponent;
