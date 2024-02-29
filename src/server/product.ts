"use server";

import { db } from "~/lib/db";

export async function getAll() {
  return await db.query.products.findMany();
}
