import React, { useState } from 'react';
import { Box, Button, Textarea, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Diff } from 'diff';

const EditCodePage = () => {
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [editedCode, setEditedCode] = useState('');
  const [diff, setDiff] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/edit', { code, prompt });
      setEditedCode(response.data.editedCode);
      const diffInstance = new Diff();
      const diffResult = diffInstance.diffMain(code, response.data.editedCode);
      setDiff(diffInstance.diffPrettyHtml(diffResult));
    } catch (error) {
      console.error('Error editing code:', error);
    }
  };

  return (
    <Box p={5}>
      <Flex direction="column" gap={4}>
        <Textarea placeholder="Enter your code here" value={code} onChange={handleCodeChange} />
        <Textarea placeholder="Enter your prompt for editing" value={prompt} onChange={handlePromptChange} />
        <Button onClick={handleSubmit} colorScheme="blue">Submit</Button>
        <Text mt={4}>Original Code:</Text>
        <Textarea isReadOnly value={code} />
        <Text mt={4}>Edited Code:</Text>
        <Textarea isReadOnly value={editedCode} />
        <Text mt={4}>Diff:</Text>
        <div dangerouslySetInnerHTML={{ __html: diff }} />
      </Flex>
    </Box>
  );
};

export default EditCodePage;