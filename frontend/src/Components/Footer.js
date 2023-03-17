import { Button, Link } from "@mui/material";
import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "black", height: "auto" }}>
      <Link href="https://github.com/cankoc95/cellvit" underline="hover"> {'Project Githib Link'} </Link>
      <p>Copyright ⓒ {year} by the CellViT project team</p>
    </footer>
  );
}

export default Footer;


