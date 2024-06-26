"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SERVER_URL } from "@/config";


export async function createRecord(action: string, status: string) {
  try {
    await sql`
        INSERT INTO records (action, status, date)
        VALUES (${action}, ${status}, NOW())
        `
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Record.",
    }
  }
}

const FormSchema = z.object({
  action: z.enum(['lighting', 'heating', 'watering']),
  date: z.string(),
});

const CreateRecord = FormSchema.omit({ date: true });

export async function sendActionToServer(formData: FormData) {
  try {
    const { action } = CreateRecord.parse({
      action: formData.get("action"),
    });
    const response = await fetch(`${SERVER_URL}/${action}`);

    if (response.status == 200) {
      await createRecord(action, 'success');
    } else {
      await createRecord(action, 'failure');
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send action to server!");
  }
  revalidatePath('/dashboard/actions');
  redirect('/dashboard/actions');
}