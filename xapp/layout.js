"use client";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import "sf-font";
import Link from "next/link";
import Image from "next/image";

import {
  Spacer,
  Button,
  Col,
  Row,
  Container,
  Dropdown,
} from "@nextui-org/react";

import React from "react";

const theme = createTheme({
  type: "dark",
  theme: {
    fontFamily: "SF Pro Display",
    colors: {
      primaryLight: "$blue200",
      primaryLightHover: "$blue300",
      primaryLightActive: "$blue400",
      primaryLightContrast: "$blue600",
      primary: "$purple500",
      primaryBorder: "$blue500",
      primaryBorderHover: "$blue600",
      primarySolidHover: "$blue700",
      primarySolidContrast: "$white",
      primaryShadow: "$white500",
      transparent: "#00000000",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, -$pink500 -10%, $purple300 90%)",
      link: "#5E1DAD",
    },
    space: {},
    fonts: {},
  },
});

export const metadata = {
  title: "MoonApeLab",
  description: "Moon Ape Labratorium",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Container lg css={{ marginTop: "$5" }}>
          <Row justify='center'>
            <Col css={{ marginTop: "$8" }}>
              <Image
                width='225'
                height='225'
                src='MAL_LOGO.svg'
                alt='MoonApeLab'
              />
            </Col>
            <Col css={{ marginTop: "$8" }}>
              <Link rel='stylesheet' href=''>
                <Button
                  size='sm'
                  style={{
                    background: "#00000070",
                    boxShadow: '0px 0px 4px "ffffff',
                  }}
                >
                  <a
                    style={{
                      fontFamily: "SF Pro Display",
                      fontWeight: "500",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    Markedplace
                  </a>
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        {children}
      </body>
    </html>
  );
}
