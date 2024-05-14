import { useState } from "react";
import { Container, VStack, HStack, Input, Textarea, Button, IconButton, Box, Text, Heading } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddNote = () => {
    if (currentNote.title && currentNote.content) {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
      setCurrentNote({ title: "", content: "" });
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
    setIsEditing(true);
  };

  const handleUpdateNote = () => {
    setNotes(notes.map((note) => (note.id === currentNote.id ? currentNote : note)));
    setCurrentNote({ title: "", content: "" });
    setIsEditing(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={4}>
          Note Taking App
        </Heading>
        <Input placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Box width="100%" p={4} borderWidth={1} borderRadius="md">
          <VStack spacing={4}>
            <Input placeholder="Title" value={currentNote.title} onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })} />
            <Textarea placeholder="Content" value={currentNote.content} onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })} />
            <Button onClick={isEditing ? handleUpdateNote : handleAddNote} colorScheme="blue" leftIcon={isEditing ? <FaEdit /> : <FaPlus />}>
              {isEditing ? "Update Note" : "Add Note"}
            </Button>
          </VStack>
        </Box>
        <VStack spacing={4} width="100%">
          {filteredNotes.map((note) => (
            <Box key={note.id} width="100%" p={4} borderWidth={1} borderRadius="md">
              <HStack justifyContent="space-between">
                <VStack align="start">
                  <Text fontWeight="bold">{note.title}</Text>
                  <Text>{note.content}</Text>
                </VStack>
                <HStack>
                  <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditNote(note.id)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteNote(note.id)} />
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
