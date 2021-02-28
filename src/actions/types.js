import { makeApiTypes } from "@36node/redux";

export const STORE_LIST_PETS = makeApiTypes("STORE_LIST_PETS");
export const STORE_GET_PET = makeApiTypes("STORE_GET_PET");
export const STORE_CREATE_PET = makeApiTypes("STORE_CREATE_PET");
export const STORE_UPDATE_PET = makeApiTypes("STORE_UPDATE_PET");
export const STORE_DELETE_PET = makeApiTypes("STORE_DELETE_PET");

export const GITHUB_LIST_REPOS = makeApiTypes("GITHUB_LIST_REPOS");

export const LOGIN = makeApiTypes("LOGIN");
export const LOGOUT = makeApiTypes("LOGOUT");
export const REFRESH = makeApiTypes("REFRESH");
export const UN_AUTH = makeApiTypes("UN_AUTH");

export const TODOS_LIST = makeApiTypes("TODOS_LIST");
export const TODOS_GET = makeApiTypes("TODOS_GET");
export const TODOS_CREATE = makeApiTypes("TODOS_CREATE");
export const TODOS_UPDATE = makeApiTypes("TODOS_UPDATE");
export const TODOS_DELETE = makeApiTypes("TODOS_DELETE");
