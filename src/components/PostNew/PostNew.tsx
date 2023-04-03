"use client";

import { useSupabase } from "@/components/supabase-provider";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useCallback, useState } from "react";

export const PostNew = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const onSubmit = useCallback(async () => {
    if (prompt) {
      try {
        // Postテーブルへの追加
        const { data: insertData, error: insertError } = await supabase
          .from("posts")
          .insert({ prompt })
          .select();

        if (insertError) {
          alert(insertError.message);
        }

        // フォームクリア
        setPrompt("");

        // キャッシュクリア
        router.refresh();

        // GPTローディング開始
        setLoading(true);

        // テキストプロンプトをAPIに送信
        const body = JSON.stringify( prompt );
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const response_data = await response.json();

        if (insertData) {
          // Postテーブルの更新
          const { error: updateError } = await supabase
            .from("posts")
            .update({
              content: response_data.text,
            })
            .eq("id", insertData[0].id);

          if (updateError) {
            alert(updateError.message);
            setLoading(false);
            return;
          }
        }

        // キャッシュクリアで画面に表示
        router.refresh();
      } catch (insertError) {
        if (insertError instanceof Error) {
          alert(insertError.message);
        }
        return;
      }

      setLoading(false);
    }
  }, [prompt, router, supabase]);

  // 入力フォームでEnterがおされたら送信、Shift+Enterは改行
  const enterPress = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if(e.key == "Enter" && e.shiftKey == false) {
        e.preventDefault();
        onSubmit();

      }
    },
    [onSubmit]
  );
  return (
    <div className="fixed bottom-0 left-2 right-2 h-40 flex flex-col justify-end items-center bg-[#7494C0] pb-5">
      {loading && (
        <div className="flex items-center justify-center space-x-3 my-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent"></div>
          <div className="text-white font-bold">GTP is thinking</div>
        </div>
      )}

      <textarea
        name="prompt"
        id="prompt"
        placeholder="How are you?"
        className="w-[752px] bg-gray-50 rounded-md p-3 outline-none focus:bg-white"
        onKeyDown={(e) => enterPress(e)}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        rows={2}
        required
      />
      <div className="text-white text-sm mt-2">
        {" "}
        Shift+Enter : 改行, Enter : 送信{" "}
      </div>
    </div>
  );
};
