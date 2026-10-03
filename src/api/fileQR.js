import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const uploadFileQR = async (
  file,
  expiry = "never",
  allowDownload = true,
  onUploadProgress,
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("expiry", expiry);
  formData.append("allowDownload", allowDownload);

  const response = await axios.post(`${API_URL}/api/file-qr/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress,
  });

  return response.data;
};

export const getFileQR = async (fileId) => {
  const response = await axios.get(`${API_URL}/api/file-qr/${fileId}`);

  return response.data;
};

export const getFileQRImage = (fileId) => {
  return `${API_URL}/api/file-qr/${fileId}/qr`;
};

export const deleteFileQR = async (fileId) => {
  const response = await axios.delete(`${API_URL}/api/file-qr/${fileId}`);

  return response.data;
};
