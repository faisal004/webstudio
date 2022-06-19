import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { Button, Card, Flex, Heading, TextField } from "~/shared/design-system";
import interStyles from "~/shared/font-faces/inter.css";

import { GoogleIcon, GithubIcon, CommitIcon } from "~/shared/icons";
import loginStyles from "./login.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: interStyles,
    },
    {
      rel: "stylesheet",
      href: loginStyles,
    },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "Webstudio Login" };
};

export const Login = () => {
  const [devLoginClicked, setDevLoginClicked] = useState(false);

  return (
    <Flex
      css={{ height: "100vh" }}
      direction="column"
      align="center"
      justify="center"
    >
      <Card css={{ width: "$10", padding: "$5", zoom: 1.4 }} variant="active">
        <Flex direction="column" gap="2" align="center">
          <Heading>Login</Heading>

          <Flex gap="2" direction="column" align="center">
            <Form action="/auth/github" method="post">
              <Button type="submit">
                <Flex gap="1">
                  <GithubIcon width="16" />
                  Login with GitHub
                </Flex>
              </Button>
            </Form>
            <Form action="/auth/google" method="post">
              <Button type="submit" disabled>
                <Flex gap="1">
                  <GoogleIcon width="16" />
                  Login with Google
                </Flex>
              </Button>
            </Form>
            {process.env.NODE_ENV === "development" && (
              <>
                {devLoginClicked ? (
                  <Form action="/auth/dev" method="post">
                    <TextField
                      css={{ width: "100%", flexGrow: 1 }}
                      name="secret"
                      type="text"
                      variant="ghost"
                      minLength={2}
                      required
                      autoFocus
                    />
                  </Form>
                ) : (
                  <Button
                    onClick={() => setDevLoginClicked(true)}
                    css={{ width: "100%" }}
                  >
                    <Flex gap="1" align="center">
                      <CommitIcon></CommitIcon>
                      Dev Login
                    </Flex>
                  </Button>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
