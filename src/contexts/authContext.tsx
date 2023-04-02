import api from "@/services/api";
import { IuserLogin, IProviderProps } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useContext } from "react";

interface AuthProviderData {
  login: (userData: IuserLogin) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IProviderProps) => {
    const toast = useToast()
    const router = useRouter()
    const login = (userData: IuserLogin) => {
        api.post("/login", userData)
        .then((response)=>{
            setCookie(null, "kenzie.token", response.data.token, {maxAge: 60 * 30, path: "/"})
            setCookie(null, "kenzie.user", userData.email, {maxAge: 60 * 30, path: "/"})
            toast({
                title:"sucess",
                variant: "solid",
                position: "top",
                isClosable: true,
                render: () => (
                    <Box color='gray.50' p={3} bg='green.600' fontWeight={"bol"} borderRadius={"md"}>
                      Login realizado com sucesso!
                    </Box>
                  )
            })
            router.push("/dashboard")
        })
        .catch((err)=>{toast({
            title:"error",
            variant: "solid",
            position: "top",
            isClosable: true,
            render: () => (
                <Box color='gray.50' p={3} bg='red.600' fontWeight={"bol"} borderRadius={"md"}>
                  Erro ao logar, verifique e-mail ou senha!
                </Box>
              )
            })
        })
    }

    return (
        <AuthContext.Provider value={{login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)