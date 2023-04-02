import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
  Center
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Modalform from './modalform';
import { destroyCookie } from 'nookies';
import { useAuth } from '@/contexts/authContext';
import ModalRegister from "../components/modalRegister";

interface IHeaderProps {
  name?: string;
  isLogged?: boolean;
}

const Header = ({ name, isLogged = false }: IHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const logout = () => {
    destroyCookie(null, 'kenzie.token');
    destroyCookie(null, 'kenzie.user');
    router.push('/');
  };

  return (
    <>
      <Box bg={'blue.600'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* <IconButton
            size={'md'}
            icon={<HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack alignItems={'center'}>
            <Link href='/'>
              <Text fontWeight={'bold'} fontSize={15} color={'white'}>
                Home
              </Text>
            </Link>
            <ModalRegister/>
          </HStack>
          <Center>
            <Text fontWeight={'bold'} fontSize={15} color={'white'}  zIndex={10}>
            Portal de contatos
          </Text>
          </Center>
          <Flex alignItems={'center'}>
            {isLogged ? (
              <>
                <Text color={'white'} paddingRight={2}>
                  {name}
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar size={'sm'} />
                  </MenuButton>
                  <MenuList bg={'blue.600'}>
                    <MenuItem
                      bg={'blue.600'}
                      color={'white'}
                      onClick={() => logout()}>
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Modalform />
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={6} color={'white'}>
              <Link href='/'>
                <Text fontWeight={'bold'} fontSize={15}>
                  Home
                </Text>
              </Link>
              <ModalRegister/>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;