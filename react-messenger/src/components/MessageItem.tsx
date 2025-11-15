import { memo } from "react";

type MessageItemProps = {
  id: number;
  user: "me" | "other";
  text: string;
  date?: string;
  time?: string;
  name?: string;
  url?: string;
};

function MessageItem({ user, text, date, time, name, url }: MessageItemProps) {
  const mine = user === "me";

  return (
    <div>
      {date && (
        <div className="mb-6 grid place-items-center">
          <div className="inline-flex items-center justify-center
          px-3 py-1 rounded-full bg-black w-[80px] h-[24px]">
          <span className=" text-white text-[12px] leading-[16px]">
            {date}
          </span>
          </div>
        </div>
      )}

      {/* 각 메시지 블럭 */}
      <div className={`${mine ? "justify-end" : "justify-start"}`}>
        {/* 상대 메시지*/}
        {!mine ? (
          <div className="mb-1 py-2 flex items-start gap-2">
            <img
              src={url || "/icons/defaultProfile.svg"}
              alt={name || "user"}
              className="w-[24px] h-[24px] bg-gray-500 rounded-full "
            />
            <div className="flex flex-col">
              <span className="text-[14px] max-w-[70px] truncate">{name || "user"}</span>
              <div className="flex flex-row items-end gap-1">
                <span className="mt-2 inline-block px-3 py-2 text-[16px] leading-[22px]
                max-w-[230px] break-words whitespace-pre-wrap
                [border-radius:0px_12px_12px_12px] bg-gray-100 text-gray-500">{text}</span>
                {time && <time className="text-[10px] text-gray-400 select-none">{time}</time>}
              </div>
            </div>
          </div>
        ) : (
          //내 메시지
          <div className="flex flex-row-reverse items-end gap-1">
            <span className="inline-block px-3 py-2 text-[16px] leading-[22px]
                max-w-[230px] break-words whitespace-pre-wrap
                [border-radius:12px_0px_12px_12px] bg-white border border-gray-200 text-gray-800">{text}</span>
            {time && <time className="text-[10px] text-gray-400 select-none">{time}</time>}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MessageItem);
