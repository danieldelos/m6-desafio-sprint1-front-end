import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import nookies from "nookies";
import api from "@/services/api";
import { useRouter } from "next/router";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const router = useRouter();
  const [contactsByUser, setContactsByUser] = useState([]);
  const [userName, setUserName] = useState([]);
  useEffect(() => {
    const cookie = nookies.get();
    const token = cookie["kenzie.token"];
    if (token) {
      const decodedToken = jwtDecode(token);
      const allContacts = async () => {
        try {
          const response = await api.get(
            `/contacts/users/${decodedToken.sub}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserName(response.data.name);
          setContactsByUser(response.data.contacts);
        } catch (error) {
          console.log(error);
        }
      };
      allContacts();
    }
  }, []);

  const contactsCreate = async (formData) => {
    try {
      const cookie = nookies.get();
      const token = cookie["kenzie.token"];
      const response = await api.post("/contacts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Contato criado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setContactsByUser([...contactsByUser, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const userCreate = async (formData) => {
    try {
      const response = await api.post("/users", formData);
      toast.success("Usuário criado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao criar o usuário.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const contactsRemove = async (contactId) => {
    try {
      const cookie = nookies.get();
      const token = cookie["kenzie.token"];
      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newContacts = contactsByUser.filter(
        (elem) => elem.id !== contactId
      );
      setContactsByUser(newContacts);
    } catch (error) {
      console.log(error);
    }
  };

  const contactUpdate = async (formData, contactId) => {
    try {
      const cookie = nookies.get();
      const token = cookie["kenzie.token"];
      const response = await api.patch(`/contacts/${contactId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updateContact = contactsByUser.map((elem) => {
        if (contactId === elem.id) {
          return { ...elem, ...formData };
        } else {
          return elem;
        }
      });
     
      setContactsByUser(updateContact);
      toast.success("Contato atualizado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao criar o Contato.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <ContactContext.Provider
      value={{
        userName,
        contactsByUser,
        contactsCreate,
        contactsRemove,
        userCreate,
        contactUpdate
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
