import {headers, cookies} from 'next/headers'
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";


export const createClient = () => createBrowserSupabaseClient<Database>()
