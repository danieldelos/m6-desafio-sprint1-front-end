import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IuserLogin } from "@/types";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/authContext";

const Modalform = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {login} = useAuth()
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("deve ser um e-mail valido")
      .required("e-mail obrigatório"),
    password: yup.string().required("Senha Obritgatória"),
  });

  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const emailError = inputEmail === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserLogin>({ resolver: yupResolver(formSchema) });

  const onFormSubmit = (FormData: IuserLogin) => {
    login(FormData);
  };

  return (
    <>
      <Button variant="default" onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faça o  seu login</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                type="email"
                {...register("email")}
                focusBorderColor="blue.300"
                onChange={(e)=> setinputEmail(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Digite seu e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>Password</FormLabel>
                <InputGroup>
              <Input
                required
                {...register("password")}
                type={showPassword ? "text" : "password"}
                focusBorderColor="blue.300"
                onChange={(e)=>setinputPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setshowPassword((showPassword) => !showPassword);
                  }}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
              </InputGroup>
              {!inputPassword ? (
                <FormHelperText>Digite sua senha</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size={"lg"}
              variant={"default"}
              onClick={handleSubmit(onFormSubmit)}
            >
              Entrar
            </Button>
            <Button size={"lg"} variant={"default"} onClick={onClose} marginLeft={2}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modalform;
