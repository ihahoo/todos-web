import { schema } from "normalizr";

export const petSchema = new schema.Entity("pets");
export const repoSchema = new schema.Entity("repos");
export const todoSchema = new schema.Entity("todos");
