"use server";

import { Record } from "./definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createRecord({action, status}: Record) {
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO records (action, status, date)
        VALUES (${action}, ${status}, ${date})
        `
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Record.",
        }
    }
    revalidatePath('/dashboard/actions');
    redirect('/dashboard/actions');
}