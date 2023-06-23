import axios from "axios";

const api = axios.create({
  baseURL: "https://api-deslocamento.herokuapp.com",
  headers: {
  "Content-Type": "application/json",
  }
});

export const fetchData = async (url: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return await data.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createData = async (url: string, data: any) => {
  try {
    console.error('data:', JSON.stringify(data));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.json();
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};

export const updateData = async (url: string, data: any) => {
  try {
    console.log('Updating data',JSON.stringify(data));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (url: string, data: any) => {
  try {
    console.log('Data', JSON.stringify(data));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
