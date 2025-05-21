import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const checkBarcode = async (barcode) => {
  try {
    const response = await axios.post(`${API_URL}/check`, { barcode });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to check barcode',
    };
  }
};
