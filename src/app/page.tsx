import { PostNew, PostList } from "@/components";
import { Suspense } from "react";
import Loading from "./loading";

const Home =()=> {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {/*@ts-ignore */}
        <PostList />
      </Suspense>
      <PostNew />
    </div>
  );
}


export default Home;
