import axios from "axios";
import { NOTES_API_URL } from "../constants/api";

const getNotes = async () => {
  try {
    const response = await axios.get(NOTES_API_URL);
    return response.data.notes;
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (newNote) => {
  try {
    const response = await axios.post(NOTES_API_URL, newNote);
    return response.data.note;
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (noteToUpdate) => {
  try {
    const url = `${NOTES_API_URL}/${noteToUpdate._id}`;
    const response = await axios.put(url, noteToUpdate);
    return response.data.note;
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (noteId) => {
  try {
    const url = `${NOTES_API_URL}/${noteId}`;
    const response = await axios.delete(url);
    return response.data.reply;
  } catch (error) {
    console.log(error);
  }
};

export { getNotes, createNote, updateNote, deleteNote };
