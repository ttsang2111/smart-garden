"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchServerURL } from "./data";
import {  } from '@vercel/edge-config';

const vercel_token = process.env.VERCEL_TOKEN;
const edge_config_id = process.env.EDGE_CONFIG_ID;

const URLSchema = z.object({
  url: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).url(),
});


export async function updateServerURL(formData: FormData) {
    if (!vercel_token || ! edge_config_id) {
        return;
    }
    try {
        const { url } = URLSchema.parse({
          url: formData.get('url')
        })
        const updateEdgeConfig = await fetch(
          `https://api.vercel.com/v1/edge-config/${edge_config_id}/items`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${vercel_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [{
                operation: 'update',
                key: 'server_url',
                value: url,
              },]
            }),
          },
        );
        const result = await updateEdgeConfig.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
}

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

const CreateRecord = FormSchema.omit({date: true});

export async function sendActionToServer(formData: FormData) {
    try {
        const { action } =  CreateRecord.parse({
            action: formData.get("action"),
        });
        const server_url = await fetchServerURL('actions');
        const response = await fetch(`${server_url}/${action}`);
        
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