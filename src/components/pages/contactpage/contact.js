import { useState } from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MdEmail,
  MdLocationOn,
  MdOutlineEmail,
} from 'react-icons/md';
import {
  IoLogoLinkedin,
  IoLogoTwitter,
} from 'react-icons/io';
import { BsPerson } from 'react-icons/bs';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formspree submission code
    const response = await fetch('https://formspree.io/f/moqzneyo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      // Handle successful form submission
      setName('');
      setEmail('');
      setMessage('');
      onOpen();
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@oloid.ventures';
  };

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps?q=E1W+1UN', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/company/oloid-ventures', '_blank');
  };

  const handleTwitterClick = () => {
    window.open('https://twitter.com/oloidventures', '_blank');
  };

  return (
    <Container bg="#000" maxW="full" mt={0} centerContent overflow="hidden" minH="90vh">
      <Flex>
        <Box
          bg="#C0C0C0"
          color="#333"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact Us</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="#333" textAlign="center">
                    Fill out the form and a team member will get back to you
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack spacing={3} alignItems="center" justifyContent="center">
                      <Button
                        size="md"
                        height="48px"
                        width="fit-content"
                        variant="ghost"
                        color="#333"
                        _hover={{ border: '2px solid #333' }}
                        leftIcon={<MdEmail color="#333" size="20px" />}
                        onClick={handleEmailClick}
                      >
                        contact@oloid.ventures
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="fit-content"
                        variant="ghost"
                        color="#333"
                        _hover={{ border: '2px solid #333' }}
                        leftIcon={<MdLocationOn color="#333" size="20px" />}
                        onClick={handleLocationClick}
                      >
                        St Katherines, London
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="center"
                    justifyContent="center">
                    <IconButton
                      aria-label="linkedin"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ border: '2px solid #333' }}
                      icon={<IoLogoLinkedin size="28px" />}
                      onClick={handleLinkedInClick}
                    />
                    <IconButton
                      aria-label="twitter"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ border: '2px solid #333' }}
                      icon={<IoLogoTwitter size="28px" />}
                      onClick={handleTwitterClick}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#333">
                    <form onSubmit={handleSubmit} action="https://formspree.io/f/moqzneyo" method="POST">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#333">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BsPerson color="#333" />}
                            />
                            <Input
                              type="text"
                              size="md"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                          <InputGroup borderColor="#333">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdOutlineEmail color="#333" />}
                            />
                            <Input
                              type="email"
                              size="md"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="message">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="#333"
                            _hover={{
                              borderRadius: '#333',
                            }}
                            placeholder="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </FormControl>
                        <FormControl id="submit" float="right">
                          <Button
                            type="submit"
                            variant="solid"
                            bg="#333"
                            color="white"
                            _hover={{}}
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </form>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message Sent</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="success" variant="solid">
              <AlertIcon />
              Your message has been sent.
            </Alert>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}