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
    Link,
    FormErrorMessage
  } from "@chakra-ui/react";
  import * as yup from 'yup';
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useForm } from "react-hook-form";
  import { useContext, useState } from "react";
  import { ContactContext } from "@/contexts/contatactsContext";
  import { ToastContainer } from "react-toastify";
  
  const AddItemSchema = yup.object({
    name: yup.string(),
    email: yup
        .string()
        .email("Deve ser um e-mail válido"),
    phone: yup
        .string()
        .matches(/^\(?\d{2}\)?[- ]?\d{4,5}[- ]?\d{4}$/, "Número de telefone inválido")
  })
  
  const ModalUpdatePerfil = (values) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(AddItemSchema)})
    const {userUpdate, userLogged} = useContext(ContactContext)
    const [valueData, setValueData] = useState(userLogged)

    const handleInputChange = (event) =>{
      const {name, value} = event.target;
      setValueData({...valueData, [name]:value})
    }

    const onFormSubmit = (FormData) => {
    const keyPerfil = Object.keys(FormData).filter(key => {const value = FormData[key]; return value !== ''})
    const valuePerfil = Object.values(FormData).filter(elem => elem != '')
    const result = {}
    for (let i = 0; i < keyPerfil.length; i++) {
      result[keyPerfil[i]]=valuePerfil[i]
      }
      userUpdate(result)
    };
    return (
      <>
        <Link variant="default" onClick={onOpen}>Editar Perfil</Link>
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edite seu perfil</ModalHeader>
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Nome do Usuário</FormLabel>
                      <Input required type="text" {...register('name')}  placeholder={userLogged.name} onChange={handleInputChange}/>
                      {errors.name && (<FormErrorMessage variant="default" >{errors.name.message}</FormErrorMessage>)}
                      <FormHelperText>{errors.name?.message}</FormHelperText>
  
                      <FormLabel>Email do Usuário</FormLabel>
                      <Input required type="email" {...register('email')} placeholder={userLogged.email} />
                      {errors.email && (<FormErrorMessage variant="default" >{errors.email.message}</FormErrorMessage>)}
                      <FormHelperText>{errors.email?.message}</FormHelperText>
  
                      <FormLabel>Telefone</FormLabel>
                      <Input required type="text" {...register('phone')} placeholder={userLogged.phone} />
                      {errors.phone && (<FormErrorMessage variant="default" >{errors.phone.message}</FormErrorMessage>)}
                      <FormHelperText>{errors.phone?.message}</FormHelperText>
  
                      <Button mt="7" onClick={handleSubmit(onFormSubmit)}>Editar</Button>
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
  
  export default ModalUpdatePerfil;
  