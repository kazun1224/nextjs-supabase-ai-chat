import { createClient } from "@/utils/supabase-server"
import { notFound } from "next/navigation"
import { PostItem } from "@/components"

export const PostList =async () => {
  const supabase = createClient()

const {data: postData} =await supabase.from("posts").select().order("created_at",{ascending: true})
// const {data: postData} = await supabase.from("posts").select().order('create_at', {ascending: true})

if(!postData) return notFound()
  return (
    <div className="mb-40">{
      postData.map((post) => {return <PostItem key={post.id} {...post} />})}</div>
  )
}

