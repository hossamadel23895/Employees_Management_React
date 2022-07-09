import * as React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";

export default function AddUser(props) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
    setAddUserFormValues({});
  };

  const [roles, setRoles] = React.useState([]);

  const [addUserFormValues, setAddUserFormValues] = React.useState({});
  const [selectedRole, SetSelectedRole] = React.useState("");

  const [errMessagesArr, setErrMessagesArr] = React.useState("");

  // Getting roles from api //
  React.useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("userData")).token;
    const axios = require("axios");
    async function makeRequest() {
      const config = {
        method: "get",
        url: `http://${window.location.hostname}:8000/api/roles`,
        headers: { Authorization: `Bearer ${userToken}` },
      };

      let res = await axios(config).catch((err) => {
        console.log(err.response.statusText);
      });
      let rolesArr = res.data.data;
      rolesArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
      setRoles([...rolesArr]);
      // Setting initial select value with the lowest importance role by default.
      SetSelectedRole(rolesArr.at(-1).id);
    }
    makeRequest();
  }, []);
  // Getting roles from api //

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUserFormValues({
      ...addUserFormValues,
      [name]: value,
    });
  };

  const handleRoleFieldChange = (e) => {
    SetSelectedRole(e.target.value);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();

    let userToken = JSON.parse(localStorage.getItem("userData")).token;
    let formData = JSON.parse(JSON.stringify(addUserFormValues));
    formData.role_id = selectedRole;

    const axios = require("axios");
    async function makeRequest() {
      const config = {
        method: "post",
        url: `http://${window.location.hostname}:8000/api/users`,
        headers: { Authorization: `Bearer ${userToken}` },
        data: formData,
      };

      let res = await axios(config)
        .then((res) => {
            window.location.replace(`http://${window.location.hostname}:3006/users`);
        })
        .catch((error) => {
          let errorsObject = error.response.data.errors;
          let errorsArr = [];
          for (const errorKey in errorsObject) {
            errorsArr.push(errorsObject[errorKey][0]);
          }
          setErrMessagesArr([...errorsArr]);
        });
    }
    makeRequest();
  };

  // Creating form fields functions.
  const createFormFields = (labelData, nameData, typeData, valueData) => {
    return {
      label: labelData,
      name: nameData,
      type: typeData,
      value: valueData,
    };
  };

  const fields = [
    createFormFields("Name", "name", "text", addUserFormValues.name),
    createFormFields("Email", "email", "email", addUserFormValues.email),
    createFormFields(
      "Password",
      "password",
      "password",
      addUserFormValues.password
    ),
    createFormFields(
      "Password Confirmation",
      "password_confirmation",
      "password",
      addUserFormValues.password_confirmation
    ),
  ];
  // Creating form fields functions.

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleAddUserSubmit}>
        <DialogTitle>Add User</DialogTitle>
        <List sx={{ pt: 0 }}>
          <DialogContent>
            {fields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={field.value}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
                variant="standard"
              />
            ))}
            <TextField
              label="Role"
              value={selectedRole}
              onChange={handleRoleFieldChange}
              select
              name="role_id"
              className="mt-4"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          {errMessagesArr &&
            errMessagesArr.map((errorMsg) => (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            ))}
        </List>
        <DialogActions className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success me-3">
            Create User
          </button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
