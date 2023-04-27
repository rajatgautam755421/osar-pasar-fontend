import React, { useEffect, useState } from "react";
import { profileFields } from "../../helpers/constants";
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import SectionHeader from "../../Common/SectionHeader";
import { makeApiRequests } from "../../helpers/apiHelper";
import { toast } from "react-hot-toast";

const passwordFields = [
  {
    label: "Old Password",
    key: "oldPassword",
  },

  {
    label: "New Password",
    key: "password",
  },
];

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profileData, setProfileData] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onProfileChangeInfo = (key, e) => {
    profileData[key] = e;
    setProfileData({ ...profileData });
  };

  const handleUpdate = async () => {
    setLoading(true);

    const response = await makeApiRequests({
      endpoint: `/users/update/${user?._id}`,
      requestBody:
        value === "one"
          ? { ...profileData }
          : {
              password: profileData?.password,
              oldPassword: profileData?.oldPassword,
            },
      method: "PUT",
    });

    if (response) {
      toast.success(`Successfully Updated`);
      if (value === "one") {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: user?.token, ...response })
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (value === "one") {
      setProfileData({ ...user });
    } else {
      setProfileData({});
    }
  }, [value]);

  return (
    <>
      <SectionHeader title="My Profile" />

      <Tabs
        sx={{ marginBottom: "10px" }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Update General Info" />
        <Tab value="two" label="Update Password" />
      </Tabs>
      {value === "one" ? (
        <>
          {profileFields.map(({ key, label }) => {
            return (
              <>
                <TextField
                  label={label}
                  variant="outlined"
                  size="small"
                  style={{ margin: "10px 0", width: "90%" }}
                  type="text"
                  value={profileData?.[key]}
                  onChange={(e) => onProfileChangeInfo(key, e.target.value)}
                />
              </>
            );
          })}
        </>
      ) : (
        <>
          {passwordFields.map(({ label, key }) => {
            return (
              <TextField
                label={label}
                variant="outlined"
                size="small"
                style={{ margin: "10px 0", width: "90%" }}
                type="password"
                value={profileData?.[key]}
                onChange={(e) => onProfileChangeInfo(key, e.target.value)}
              />
            );
          })}
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </Box>
    </>
  );
};

export default Profile;
