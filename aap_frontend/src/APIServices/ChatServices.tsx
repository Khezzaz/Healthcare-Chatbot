// src/APIServices/ChatServices.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000/llm';

// Envoi d'un message texte seul
export const sendTextChat = (message) => {
  return axios.post(`${API_BASE}/text_chat`, {
    message,
  });
};

// Envoi d'un fichier PDF seul
export const sendPdfChat = (pdfFile) => {
  const formData = new FormData();
  formData.append('pdf_file', pdfFile);
  return axios.post(`${API_BASE}/pdf_text_chat`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Envoi d'un fichier PDF + un message
export const sendPdfTextChat = (pdfFile, message) => {
  const formData = new FormData();
  formData.append('pdf_file', pdfFile);
  formData.append('question', message);
  return axios.post(`${API_BASE}/pdf_text_chat`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
