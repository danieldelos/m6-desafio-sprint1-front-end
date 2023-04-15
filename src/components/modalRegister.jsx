import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Center,
    FormErrorMessage
} from "@chakra-ui/react";
  import * as yup from 'yup';
  import { useForm } from "react-hook-form";
  import { useContext, useState } from "react";
  import { ContactContext } from "@/contexts/contatactsContext";
  import { ToastContainer } from "react-toastify";
  import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object({
    name: yup.string().required("O nome é obrigatório!"),
    email: yup
        .string()
        .email("Deve ser um e-mail válido")
        .required("O E-mail é obrigatório!"),
    password: yup
        .string()
        .required("A senha é obrigatória!")
        .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
        .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula")
        .matches(/(\d)/, "Deve conter ao menos um número")
        .matches(/(\W)|_/, "Deve conter um caractere especial")
        .matches(/.{10,}/, "Deve conter no mínimo 10 digitos"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Confimação de senha deve ser igual a senha"),
      phone: yup
        .string().required("O contato é obrigatório!")
        .matches(/^\(?\d{2}\)?[- ]?\d{4,5}[- ]?\d{4}$/, "Número de telefone inválido")
})

  const ModalRegister = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(registerSchema)})
    const {userCreate} = useContext(ContactContext)
    const onFormSubmit = (FormData) => {
        userCreate(FormData)
    };
    return (
      <>
        <Button variant="default" onClick={onOpen}>Register</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Faça o seu Cadastro</ModalHeader>  
            <ModalBody>
                <Center>
                <FormControl>
                    <FormLabel>Nome do Usuário</FormLabel>
                    <Input required type="text" {...register('name')} placeholder='Nome do usuário' errorBorderColor="red.500"/>
                    {errors.name && (<FormErrorMessage variant="default" >{errors.name.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.name?.message}</FormHelperText>

                    <FormLabel>Email do Usuário</FormLabel>
                    <Input required type="email" {...register('email')} placeholder='Email do usuário'/>
                    {errors.email && (<FormErrorMessage variant="default" >{errors.email.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.email?.message}</FormHelperText>

                    <FormLabel>Password</FormLabel>
                    <Input required type="password" {...register('password')} placeholder='Senha do usuário'/>
                    {errors.password && (<FormErrorMessage variant="default" >{errors.password.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.password?.message}</FormHelperText>

                    <FormLabel>Confirme Password</FormLabel>
                    <Input required type="password" {...register('confirmPassword')} placeholder='Senha do usuário'/>
                    {errors.confirmPassword && (<FormErrorMessage variant="default" >{errors.confirmPassword.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>

                    <FormLabel>Telefone</FormLabel>
                    <Input required type="text" {...register('phone')} placeholder='(00) 00000-0000'/>
                    {errors.phone && (<FormErrorMessage variant="default" >{errors.phone.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.phone?.message}</FormHelperText>

                    <Button mt='7' onClick={handleSubmit(onFormSubmit)}>Submit</Button>
                    <ToastContainer theme="colored"/>
                </FormControl>
            </Center>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Fechar
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalRegister;
  