import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [error, setError] = useState("");
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords Do Not Match!");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const createUserDoc = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDoc(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        fontSize="10pt"
        name="email"
        placeholder="E-Mail"
        _placeholder={{
          color: "gray.500"
        }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        bg="gray.50"
        type="email"
        mb={2}
        onChange={onChange}
      />
      <Input
        required
        fontSize="10pt"
        name="password"
        placeholder="Password"
        _placeholder={{
          color: "gray.500"
        }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        bg="gray.50"
        type="password"
        mb={2}
        onChange={onChange}
      />
      <Input
        required
        fontSize="10pt"
        name="confirmPassword"
        placeholder="Re-Type Password"
        _placeholder={{
          color: "gray.500"
        }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        bg="gray.50"
        type="password"
        mb={2}
        onChange={onChange}
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a Redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={600}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login"
            }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
