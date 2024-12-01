import { Box, CardRoot, Center, Flex, Grid, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { Field } from "@/components/ui/field";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form } from "@/components/form/Form";
import { InputField } from "@/components/form/InputField";
import { InAppLink } from "@/components/InAppLink";

type LoginForm = typeof LoginFormDefaultValues;

const LoginFormDefaultValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const { user } = useContext(AuthContext);

  const form = useForm<LoginForm>({ defaultValues: LoginFormDefaultValues });

  if (user) return <Navigate to="/" />;

  return (
    <Flex h="100dvh" flexDir="column">
      <Center
        flex="1"
        position="relative"
        backgroundColor="#fbfbfb"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <CardRoot w="26rem" p="2.5rem" borderRadius="1rem">
          <Center fontSize="xl" fontWeight="semibold">
            <Box pl="2">Shift Scheduler</Box>
          </Center>
          <Form
            {...form}
            onSubmit={async ({ email, password }) => {
              const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
            }}
          >
            <Grid gap="1rem" mt="1rem">
              <InputField<LoginForm>
                label="Email"
                name="email"
                rules={{ required: true }}
              />

              <InputField<LoginForm>
                label="Password"
                name="password"
                type="password"
                rules={{ required: true }}
              />
            </Grid>
            <Button
              w="full"
              mt="2rem"
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
            >
              Log In
            </Button>
          </Form>
        </CardRoot>
      </Center>
    </Flex>
  );
};

export const Route = createFileRoute("/login")({
  component: Login,
});
