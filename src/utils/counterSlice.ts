import { createSlice } from "@reduxjs/toolkit";
import {
  CreateCategory,
  CreateCountry,
  DeleteCategory,
  DeleteCountry,
  DeleteUser,
  GetCategory,
  GetCountry,
  GetProfile,
  GetUsers,
  UpdateCategory,
  UpdateCountry,
} from "../api/api";

type Profile = {
  username: string;
  fullname: string;
};
export interface CounterState {
  categories: any[];
  countries: any[];
  loading: boolean;
  profile: Profile | null;
  users: any[];
}

const initialState: CounterState = {
  categories: [],
  countries: [],
  loading: false,
  profile: null,
  users: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get Category
    builder
      .addCase(GetCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.results;
      })
      .addCase(GetCategory.rejected, (state) => {
        state.loading = false;
      });

    //Get Country
    builder
      .addCase(GetCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload.results;
      })
      .addCase(GetCountry.rejected, (state) => {
        state.loading = false;
      });

    //Delete Category
    builder
      .addCase(DeleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (item: any) => item.id !== action.payload,
        );
      })
      .addCase(DeleteCategory.rejected, (state) => {
        state.loading = false;
      });

    //Add Category
    builder
      .addCase(CreateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
      })
      .addCase(CreateCategory.rejected, (state) => {
        state.loading = false;
      });

    //Edit Category

    builder
      .addCase(UpdateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (item: any) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(UpdateCategory.rejected, (state) => {
        state.loading = false;
      });

    //Delete Country
    builder
      .addCase(DeleteCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = state.countries.filter(
          (item: any) => item.id !== action.payload,
        );
      })
      .addCase(DeleteCountry.rejected, (state) => {
        state.loading = false;
      });

    //Add Country
    builder
      .addCase(CreateCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries.unshift(action.payload);
      })
      .addCase(CreateCountry.rejected, (state) => {
        state.loading = false;
      });

    //Edit Country
    builder
      .addCase(UpdateCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCountry.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.countries.findIndex(
          (item: any) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.countries[index] = action.payload;
        }
      })
      .addCase(UpdateCountry.rejected, (state) => {
        state.loading = false;
      });

    //Get Profile
    builder
      .addCase(GetProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(GetProfile.rejected, (state) => {
        state.loading = false;
      });

    //Get Users
    builder
      .addCase(GetUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.results;
      })
      .addCase(GetUsers.rejected, (state) => {
        state.loading = false;
      });

    // Delete User
    builder
      .addCase(DeleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u: any) => u.id !== action.payload);
      })
      .addCase(DeleteUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default counterSlice.reducer;
