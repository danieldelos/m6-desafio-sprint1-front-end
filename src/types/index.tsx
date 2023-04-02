import { ReactNode } from "react";

interface IContacs {
  map(arg0: ({ contacts, index }: any) => JSX.Element): ReactNode;
  id: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

interface IuserLogin {
  email: string;
  password: string;
}


interface IProviderProps {
  children: ReactNode
}

interface IUserName{
  name:string
}


export type { IContacs, IuserLogin, IProviderProps, IUserName };
