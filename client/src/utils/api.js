import React from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:4010/api",
  headers: { Authorization: token && `Bearer ${token}` },
});

export default api;
