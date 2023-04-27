import { Button, Grid, TextareaAutosize, TextField } from "@mui/material";
import React, { useState } from "react";
import SectionBreaker from "../../Common/SectionBreaker";
import { CONTACT_FORM_FIELDS } from "../../helpers/constants";
import { toast } from "react-hot-toast";
import { makeApiRequests } from "../../helpers/apiHelper";

const ContactUs = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: user?.name,
    phone: user?.phone,
  });

  const handleContactSubmission = async () => {
    setLoading(true);
    if (!contactInfo?.name || !contactInfo?.phone || !contactInfo?.message) {
      setLoading(false);
      return toast.error("Fields Shouldnot Be Empty");
    }

    const response = await makeApiRequests({
      endpoint: "/contact",
      requestBody: { ...contactInfo },
    });
    if (response) {
      toast.success("Successfully Submitted");
      setContactInfo({});
      window.scrollTo(0, 0);
    }
    setLoading(false);
  };
  return (
    <>
      <SectionBreaker text="Contact Us" id="contact-us" />
      <Grid container>
        <Grid md={6} xs={12} sx={{ p: 1 }}>
          {CONTACT_FORM_FIELDS.map(({ key, label, type }) => {
            return (
              <>
                {type !== "textArea" ? (
                  <TextField
                    label={label}
                    variant="outlined"
                    size="small"
                    style={{ margin: "10px 0", width: "90%" }}
                    type={type}
                    value={contactInfo?.[key]}
                    onChange={(e) => {
                      contactInfo[key] = e.target.value;
                      setContactInfo({ ...contactInfo });
                    }}
                  />
                ) : (
                  <TextareaAutosize
                    minRows={3}
                    value={contactInfo?.[key]}
                    onChange={(e) => {
                      contactInfo[key] = e.target.value;
                      setContactInfo({ ...contactInfo });
                    }}
                    style={{
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      margin: "10px 0",
                      width: "89%",
                    }}
                  />
                )}
              </>
            );
          })}
          <Button
            variant="contained"
            onClick={handleContactSubmission}
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </Button>
        </Grid>
        <Grid md={6} xs={12} sx={{ mt: 1, P: 1 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7131.577538727372!2d88.11744329001627!3d26.655244795838527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5b3a58c62771d%3A0x960ba2df9c13c28a!2sItabhatta%20Chowk%2C%20Mechinagar%2057200!5e0!3m2!1sen!2snp!4v1682396368197!5m2!1sen!2snp"
            width="600"
            height="300"
            // style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactUs;
