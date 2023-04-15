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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ContactContext } from "@/contexts/contatactsContext";
import { ToastContainer } from "react-toastify";

const AddItemSchema = yup.object({
  contactName: yup.string().required("O nome é obrigatório!"),
  contactEmail: yup
      .string()
      .email("Deve ser um e-mail válido")
      .required("O E-mail é obrigatório!"),
  contactPhone: yup
      .string()
      .required("O Telefone é obrigatório!")
      .matches(/^\(?\d{2}\)?[- ]?\d{4,5}[- ]?\d{4}$/, "Número de telefone inválido")
})

const ModalAddItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(AddItemSchema)})
  const {contactsCreate} = useContext(ContactContext)
  const onFormSubmit = (FormData) => {
    contactsCreate(FormData)
  };
  return (
    <>
      <Button onClick={onOpen}>Adicione Contatos</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Adicione seu contato</ModalHeader>
                <ModalBody>
                  <FormControl>
                    <FormLabel>Nome do Contato</FormLabel>
                    <Input required type="text" {...register('contactName')} placeholder="Nome do Contato" />
                    {errors.contactName && (<FormErrorMessage variant="default" >{errors.contactName.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.contactName?.message}</FormHelperText>

                    <FormLabel>Email do Contato</FormLabel>
                    <Input required type="email" {...register('contactEmail')} placeholder="Email do Contato" />
                    {errors.contactEmail && (<FormErrorMessage variant="default" >{errors.contactEmail.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.contactEmail?.message}</FormHelperText>

                    <FormLabel>Telefone</FormLabel>
                    <Input required type="text" {...register('contactPhone')} placeholder="Telefone do Contato" />
                    {errors.contactPhone && (<FormErrorMessage variant="default" >{errors.contactPhone.message}</FormErrorMessage>)}
                    <FormHelperText>{errors.contactPhone?.message}</FormHelperText>

                    <Button mt="7" onClick={handleSubmit(onFormSubmit)}>Adicionar</Button>
                    <ToastContainer theme="colored"/>
                  </FormControl>
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

export default ModalAddItem;
