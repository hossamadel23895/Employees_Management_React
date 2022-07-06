import React from "react";
import { AppBar, Toolbar, Typography, Grid, Link } from "@material-ui/core";
import { Security, Info } from "@material-ui/icons";

export default function Footer() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "212px", backgroundColor: "#141414" }}
      >
        <Grid container item sm={6} xs={11} justifyContent="space-between">
          <Grid item sm={5} xs={12}>
            <Security color="action" />
            <Typography paragraph>
              this is a placeholder for the footer text if needed
              <Link
                href="https://stripe.com/docs/security/stripe"
                target="_blank"
                alt="Stripe"
              >
                here
              </Link>
              .
            </Typography>
          </Grid>
          <Grid item sm={5} xs={11}>
            <Info color="action" />
            <Typography paragraph>
              This Web App is fully responsive. Made in ReactJS, using Material-UI
              and React Stripe. It's given free of use.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <AppBar
        position="static"
        elevation={0}
        component="footer"
        color="default"
      >
        <Toolbar style={{ justifyContent: "center", backgroundColor: "black" }}>
          <Typography variant="caption" style={{ color: "white" }}>
            ©2022
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
