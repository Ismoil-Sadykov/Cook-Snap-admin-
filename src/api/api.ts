import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosRequest from "../utils/axios";

export const GetCategory = createAsyncThunk(
  "counter/GetCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/recipes/categories/");
      return data;
    } catch (error) {
      toast.error("Ошибка загрузки данных");
      return rejectWithValue(error);
    }
  },
);

export const GetCountry = createAsyncThunk(
  "counter/GetCountry",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/recipes/countries/");
      return data;
    } catch (error) {
      toast.error("Ошибка загрузки данных");
      return rejectWithValue(error);
    }
  },
);

export const GetUsers = createAsyncThunk(
  "counter/GetUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/users/all-users/");
      return data;
    } catch (error) {
      toast.error("Ошибка загрузки данных");
      return rejectWithValue(error);
    }
  },
);

export const DeleteCategory = createAsyncThunk(
  "counter/DeleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosRequest.delete(`/api/recipes/categories/${id}/`);
      toast.success("Категория удалена ✅");
      return id;
    } catch (error) {
      toast.error("Ошибка удаления категории ❌");
      return rejectWithValue(error);
    }
  },
);

export const CreateCategory = createAsyncThunk(
  "counter/CreateCategory",
  async (name: string, { rejectWithValue }) => {
    try {
      const payload = {
        id: Date.now(),
        name,
      };
      const { data } = await axiosRequest.post(
        "/api/recipes/categories/",
        payload,
      );
      toast.success("Category created ✅");
      return data;
    } catch (error) {
      toast.error("Ошибка создания категории ❌");
      return rejectWithValue(error);
    }
  },
);

export const UpdateCategory = createAsyncThunk(
  "counter/UpdateCategory",
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.put(
        `/api/recipes/categories/${id}/`,
        { name },
      );

      toast.success("Category updated ✅");
      return data;
    } catch (error) {
      toast.error("Ошибка обновления категории ❌");
      return rejectWithValue(error);
    }
  },
);

export const CreateCountry = createAsyncThunk(
  "counter/CreateCountry",
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post("/api/recipes/countries/", {
        name,
      });
      return data;
    } catch (error) {
      toast.error("Ошибка создания страны");
      return rejectWithValue(error);
    }
  },
);

export const UpdateCountry = createAsyncThunk(
  "counter/UpdateCountry",
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.put(`/api/recipes/countries/${id}/`, {
        name,
      });
      return data;
    } catch (error) {
      toast.error("Ошибка обновления страны");
      return rejectWithValue(error);
    }
  },
);

export const DeleteCountry = createAsyncThunk(
  "counter/DeleteCountry",
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosRequest.delete(`/api/recipes/countries/${id}/`);
      return id;
    } catch (error) {
      toast.error("Ошибка удаления страны");
      return rejectWithValue(error);
    }
  },
);

export const GetProfile = createAsyncThunk(
  "counter/GetProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/api/users/profile/");
      return data;
    } catch (error) {
      toast.error("Ошибка удаления страны");
      return rejectWithValue(error);
    }
  },
);

export const DeleteUser = createAsyncThunk(
  "counter/DeleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosRequest.delete(`/api/users/users/${id}/`);
      toast.success("User deleted ✅");
      return id;
    } catch (error) {
      toast.error("Ошибка удаления пользователя ❌");
      return rejectWithValue(error);
    }
  },
);
