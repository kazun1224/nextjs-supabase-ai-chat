'use client'

import type{ SupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/utils/database.types"
import { ReactNode, createContext, useContext, useState } from "react"
import { createClient } from "@/utils/supabase-browser"


type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext>(null!)

export const SupabaseProvider =({children}: {children :ReactNode}) => {
  const [supabase] = useState(() => createClient())

  return (
    <Context.Provider value={{supabase}}>
<>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
