import Header from "@/components/header";
import {
  Box,
  Container,
  Image
} from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Header />
      <Container
        maxW="1250px"
        height="90vh"
        bg="purple.600"
        bgColor={"white"}
        position="relative"
        overflow="hidden"
        color="red"
      >
        <Image
          src="https://img.freepik.com/vetores-premium/midias-sociais-na-mao-desenhada-doodles-padrao-sem-emenda_39663-246.jpg?w=2000"
          alt="descrição da imagem"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          minWidth="100%"
          minHeight="100%"
          position="absolute"
          opacity={0.5}
        />
      </Container>
    </>
  );
};

export default Home;
