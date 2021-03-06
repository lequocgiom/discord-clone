import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  LightMode,
  Spacer,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { getAccount, updateAccount } from "api/handler/account";
import { logout } from "api/handler/auth";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import userStore from "stores/userStore";
import { aKey } from "utils/querykeys";
import toErrorMap from "utils/toErrorMap";
import ChangePasswordModal from "components/modals/ChangePasswordModal";
import CropImageModal from "components/modals/CropImageModal";
import InputField from "components/shared/InputField";
import { UserSchema } from "validation/auth.schema";

export default function Account() {
  const { data: user } = useQuery(aKey, () =>
    getAccount().then(res => res.data)
  );
  const logoutUser = userStore(state => state.logout);
  const setUser = userStore(state => state.setUser);
  const cache = useQueryClient();

  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: cropperIsOpen,
    onOpen: cropperOnOpen,
    onClose: cropperOnClose
  } = useDisclosure();

  const inputFile = useRef(null);
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const [cropImage, setCropImage] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  async function handleLogout() {
    const { data } = await logout();
    if (data) {
      cache.clear();
      logoutUser();
      history.push("/");
    }
  }

  async function handleUpdateAccount(values, { setErrors }) {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("image", croppedImage ?? imageUrl);
      const { data } = await updateAccount(formData);
      if (data) {
        setUser(data);
        toast({
          title: "Account updated",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
    } catch (err) {
      setErrors(toErrorMap(err));
    }
  }

  function handleSelectImage(event) {
    if (!event.currentTarget.files) return;
    setCropImage(URL.createObjectURL(event.currentTarget.files[0]));
    cropperOnOpen();
  }

  function applyCrop(file) {
    setImageUrl(URL.createObjectURL(file));
    setCroppedImage(new File([file], "avatar"));
    cropperOnClose();
  }

  if (!user) return null;

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px">
        <Flex mb="4" justify="center">
          <Heading fontSize="24px">MY ACCOUNT</Heading>
        </Flex>
        <Box p={4} borderRadius={4} background="brandGray.light">
          <Box>
            <Formik
              initialValues={{
                email: user.email,
                username: user.username,
                image: null
              }}
              validationSchema={UserSchema}
              onSubmit={handleUpdateAccount}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Flex mb="4" justify="center">
                    <Tooltip label="Change Avatar" aria-label="Change Avatar">
                      <Avatar
                        size="xl"
                        name={user.username}
                        src={imageUrl || user.image}
                        _hover={{ cursor: "pointer", opacity: 0.5 }}
                        onClick={() => inputFile.current.click()}
                      />
                    </Tooltip>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      ref={inputFile}
                      hidden
                      onChange={handleSelectImage}
                    />
                  </Flex>
                  <Box my={4}>
                    <InputField
                      value={values.email}
                      type="email"
                      placeholder="Email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />

                    <InputField
                      value={values.username}
                      placeholder="Username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                    />

                    <Flex my={8} align={"end"}>
                      <Spacer />
                      <Button
                        mr={4}
                        colorScheme="white"
                        variant="outline"
                        onClick={history.goBack}
                        fontSize={"14px"}
                      >
                        Close
                      </Button>

                      <LightMode>
                        <Button
                          type="submit"
                          colorScheme="green"
                          isLoading={isSubmitting}
                          fontSize={"14px"}
                        >
                          Update
                        </Button>
                      </LightMode>
                    </Flex>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Divider my={"4"} />
          <Flex>
            <Heading fontSize="18px">PASSWORD AND AUTHENTICATION</Heading>
          </Flex>
          <Flex mt="4">
            <Button
              background="highlight.standard"
              color="white"
              type="submit"
              _hover={{ bg: "highlight.hover" }}
              _active={{ bg: "highlight.active" }}
              _focus={{ boxShadow: "none" }}
              onClick={onOpen}
              fontSize={"14px"}
            >
              Change Password
            </Button>

            <Spacer />
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              fontSize={"14px"}
            >
              Logout
            </Button>
          </Flex>
        </Box>
      </Box>
      {isOpen && <ChangePasswordModal isOpen={isOpen} onClose={onClose} />}
      {cropperIsOpen && (
        <CropImageModal
          isOpen={cropperIsOpen}
          onClose={cropperOnClose}
          initialImage={cropImage}
          applyCrop={applyCrop}
        />
      )}
    </Flex>
  );
}
