import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Box p={5}>
      <Heading mb={4}>Code Editing App</Heading>
      <Text fontSize="lg" mb={6}>Welcome to the Code Editing App. You can input your code and a prompt, and our app will edit the code for you.</Text>
      <Button as={Link} to="/edit" colorScheme="teal">Start Editing</Button>
    </Box>
  );
};

export default Index;