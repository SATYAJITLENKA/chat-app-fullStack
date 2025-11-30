import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { CircleX, Image } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState();
  const [imagePreview, setImagePreview] = useState();
  const textRef = useRef();
  const fileInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("text in the send msg", text);
    if (!text && !imagePreview) return;
    console.log("this is running");
    try {
      await sendMessage({
        text: text,
        image: imagePreview,
      });

      //clean form
      setText("");
      setImagePreview(null);
      console.log(fileInputRef.current);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (textRef.current) textRef.current.value = "";
      return;
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) return;
    console.log("image is running .");
    if (!file) return;
    console.log("image is running .,,,,");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("file", file);
    reader.onload = () => {
      console.log("file after onload result", reader.result);
      setImagePreview(reader.result);
      console.log(imagePreview);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <>
      {imagePreview && (
        <div className="relative w-fit">
          <CircleX
            className="absolute right-0 top-0 size-8"
            onClick={removeImage}
          />
          <img src={imagePreview} className="size-54" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="p-4 bg-base-100 border-t border-base-300 flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full rounded-xl"
            ref={textRef}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button" onClick={() => fileInputRef.current.click()}>
            <Image />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          /> 

          <button className="btn btn-primary rounded-xl" type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
