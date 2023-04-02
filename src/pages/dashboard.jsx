import Header from "@/components/header";
import { ContactContext } from "@/contexts/contatactsContext";
import {
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Spinner,
  Box
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import ModalAddItem from "../components/modalAddItem";
import ModalUpdateItem from "../components/modalUpdateItem";

const Dashboard = () => {
  const { userName, contactsByUser, contactsRemove } = useContext(ContactContext);
  const arrayContacts = contactsByUser
  if (!arrayContacts) {
    return (
      <Center mt="20%">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"
        />
      </Center>
    );
  }
  const handleDeleteContact =(id)=>{
    contactsRemove(id)
  }

  return (
    <>
      <Header name={userName} isLogged />
      <Center>
        <TableContainer>
          <Center mt="5%">
            <ModalAddItem />
          </Center>
          <Box>
            <Table variant="striped" colorScheme="teal" mt="5%">
              <TableCaption>Lista de contatos do Usuário</TableCaption>
              <Thead>
                <Tr>
                  <Th>Usuário</Th>
                  <Th>Contato</Th>
                  <Th>Email</Th>
                  <Th>Telefone</Th>
                  <Th>Deletar</Th>
                  <Th>Atualizar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {arrayContacts.map((elem, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{userName}</Td>
                      <Td>{elem.contactName}</Td>
                      <Td>{elem.contactEmail}</Td>
                      <Td>{elem.contactPhone}</Td>
                      <Td>
                        <Button id={elem.id} onClick={()=>handleDeleteContact(elem.id)}>
                          <DeleteIcon />
                        </Button>
                      </Td>
                      <Td>
                        <ModalUpdateItem id={elem.id} values={elem} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Usuário</Th>
                  <Th>Contato</Th>
                  <Th>Email</Th>
                  <Th>Telefone</Th>
                  <Th>Deletar</Th>
                  <Th>Atualizar</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </TableContainer>
      </Center>
    </>
  );
};

export default Dashboard;

