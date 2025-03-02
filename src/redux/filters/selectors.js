import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/slice";

export const selectNameFilter = (state) => state.filter;

