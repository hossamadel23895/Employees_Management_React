import * as React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import * as Urls from "../../Routing/Urls";

export default function EditUser(props) {
  const { onClose, selectedValue, open, managedUserData } = props;
  const handleClose = () => {
    onClose(selectedValue);
    setEditUserFormValues({});
  };
  const [roles, setRoles] = React.useState([]);

  const [editUserFormValues, setEditUserFormValues] = React.useState({
    name: managedUserData.name,
    email: managedUserData.email,
  });
  const [selectedRole, SetSelectedRole] = React.useState();

  const [errMessagesArr, setErrMessagesArr] = React.useState("");
  let managedUserDataObj = {
    id: managedUserData.id,
    name: managedUserData.name,
    email: managedUserData.email,
    role: { id: managedUserData.role.id, name: managedUserData.role.name },
  };

  // Getting roles from api //
  React.useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("userData")).token;
    const axios = require("axios");
    async function makeRequest() {
      const config = {
        method: "get",
        url: `${Urls.mainUrl}/roles`,
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
    setEditUserFormValues({
      ...editUserFormValues,
      [name]: value,
    });
  };

  const handleRoleFieldChange = (e) => {
    SetSelectedRole(e.target.value);
    e.target.value = selectedRole;
  };

  const handleEditUserSubmit = (e) => {
    e.preventDefault();

    let userToken = JSON.parse(localStorage.getItem("userData")).token;
    let formData = JSON.parse(JSON.stringify(editUserFormValues));
    formData.role_id = selectedRole;

    const axios = require("axios");
    async function makeRequest() {
      const config = {
        method: "put",
        url: `${Urls.mainUrl}/users/${managedUserDataObj.id}`,
        headers: { Authorization: `Bearer ${userToken}` },
        data: formData,
      };

      let res = await axios(config)
        .then((res) => {
          window.location.replace(
            `http://${window.location.hostname}:3000/users`
          );
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
    createFormFields("Name", "name", "text", managedUserDataObj.name),
    createFormFields("Email", "email", "email", managedUserDataObj.email),
  ];
  // Creating form fields functions.

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleEditUserSubmit}>
        <DialogTitle>Edit User</DialogTitle>
        <List sx={{ pt: 0 }}>
          <DialogContent>
            {fields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                defaultValue={field.value}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
                variant="standard"
              />
            ))}
            <TextField
              label="Role"
              defaultValue={managedUserDataObj.role.id}
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
          <button type="submit" className="btn btn-warning me-3">
            Confirm Changes
          </button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
