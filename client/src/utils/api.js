import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:4010/api",
});

export default api;
