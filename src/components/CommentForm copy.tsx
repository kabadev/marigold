"use client";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CommentForm = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  className = "",
  TextareaStyle,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: () => void;
  placeholder: string;
  className: string;
  TextareaStyle: string;
}) => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [commentData, setCommentData] = useState("");

  // useEffect(() => {
  //   const data: any = onSubmit();
  //   setCommentData(data.comment);
  // }, []);

  const submitComment = async () => {
    const data: any = onSubmit();
    const commentData = {
      userId: user?.id,
      comment: data.comment,
      parentId: data.parentId,
      postId: data.postId,
    };

    try {
      setIsLoading(true);
      await axios.post("/api/forum/comments", commentData);
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={`${className} flex bg-card border p-2 rounded-md`}>
      <Image
        src={user?.imageUrl || ""}
        alt="banner ads"
        className="w-[40px] h-[40px]  rounded-full object-cover"
        width={200}
        height={200}
      />
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className={`${TextareaStyle} w-full p-2 focus:border-0 focus-visible:ring-0 rounded dark:!border-none border-none shadow-none`}
      />
      <Button
        onClick={submitComment}
        className="mt-2 disabled:cursor-not-allowed"
        disabled={isLoading || value === ""}
      >
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <Send />
        )}
      </Button>
    </div>
  );
};

export default CommentForm;