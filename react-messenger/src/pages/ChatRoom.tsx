// src/pages/ChatRoom.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

type User = {
  id: number;
  name: string;
  profileUrl: string;
  isMe: boolean;
};

type MessageData = {
  id: number;
  userId: number;
  text: string;
  date?: string;
  time?: string;
};

type Msg = {
  id: number;
  user: "me" | "other";
  text: string;
  date?: string;
  time?: string;
  name?: string;
  url?: string;
};

export default function ChatRoom() {
  const nav = useNavigate();
  const { roomId = "default" } = useParams();

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // 유저 데이터 로드
  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  // 메시지 데이터 로드 (JSON에서 초기 로드, localStorage는 변경사항 저장용)
  useEffect(() => {
    if (users.length === 0) return; // 유저 데이터 로드 전까지 대기

    // JSON에서 초기 데이터 로드
    fetch("/data/messages.json")
      .then((res) => res.json())
      .then((data) => {
        const roomMessages: MessageData[] = data.messages[roomId] || [];
        const transformedMessages = roomMessages.map((msg) => {
          const user = users.find((u) => u.id === msg.userId);
          return {
            id: msg.id,
            user: user?.isMe ? ("me" as const) : ("other" as const),
            text: msg.text,
            date: msg.date,
            time: msg.time,
            name: user?.name,
            url: user?.profileUrl,
          };
        });

        // localStorage에 저장된 추가 메시지가 있는지 확인
        try {
          const saved = localStorage.getItem(`messages:${roomId}`);
          if (saved) {
            const savedMessages = JSON.parse(saved);
            // JSON 초기 데이터 이후에 추가된 메시지만 합침
            const initialIds = transformedMessages.map(m => m.id);
            const additionalMessages = savedMessages.filter((m: Msg) => !initialIds.includes(m.id));
            setMessages([...transformedMessages, ...additionalMessages]);
          } else {
            setMessages(transformedMessages);
          }
        } catch (e) {
          console.warn("Failed to parse messages from localStorage:", e);
          setMessages(transformedMessages);
        }
      })
      .catch((err) => console.error("Failed to load messages:", err));
  }, [roomId, users]);

  // 변경될 때마다
  useEffect(() => {
    try {
      localStorage.setItem(`messages:${roomId}`, JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to save messages to localStorage:", e);
    }
  }, [messages, roomId]);

  const send = () => {
    const v = input.trim();
    if (!v) return;
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const ampm = hour < 12 ? "오전" : "오후";
    const ampmHour = String(((hour + 11) % 12) + 1);
    const minPadding = String(min).padStart(2, "0"); //2로 하면 오후 3: 38 이런식 왜지?
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: "me", text: v, time: `${ampm} ${ampmHour}:${minPadding}` },
    ]);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "44px";
    }
  };
  // 텍스트 크기 제한
  const onChangeInput = (v: string) => {
    setInput(v);
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    const baseH = 40;
    const maxH = 120;
    const finalH = Math.max(baseH,Math.min(inputRef.current.scrollHeight, maxH))
    inputRef.current.style.height = finalH + "px";
  };

  // 새 메시지 들어오면 스크롤 하단
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 상단 바 */}
      <header className="px-3 py-2 flex items-center gap-2 border-gray-200">
        <button
          onClick={() => nav(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
          aria-label="back"
        >
          <img src="/icons/leftDir.svg" alt="" className="w-5 h-5" />
        </button>
        <div className="text-[18px] font-semibold">3D 디자인 (1) <span className="px-1 text-[16px] text-gray-400 font-light">24</span></div>

        <div className="ml-auto">
          <button
            className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
            onClick={() => nav(`/chat/${roomId}/participants`)}
            aria-label="menu"
          >
            <img
              src="/icons/hamburger.svg"
              alt=""
              className="w-4 h-4 opacity-60"
            />
          </button>
        </div>
      </header>

      {/* 안내문 */}
      <div className="py-2 bg-gray-0">
        <p className="mx-auto max-w-[309px] max-h-[42px]  text-center font-normal text-[12px] leading-[120%] text-gray-300">
          누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 준수해주세요.
        커뮤니티 이용규칙을 위반할 경우 서비스 이용이 제한될 수 있습니다.{" "}
        <a href="#" className="underline text-gray-300 hover:bg-gray-100 active:bg-gray-200" onClick={() => {}}>
          커뮤니티 이용규칙 전체 보기
        </a>
        </p>
      </div>
      {/* 메시지 리스트 */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {messages.map((m) => {
          const mine = m.user === "me";
          return (
            <div key={m.id}>
              {m.date && (
                <div className="mb-6 grid place-items-center">
                  <div className="inline-flex items-center justify-center 
                  px-3 py-1 rounded-full bg-black w-[80px] h-[24px]">
                  <span className=" text-white text-[12px] leading-[16px]">
                    {m.date}
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
                      src={m.url || "/icons/defaultProfile.svg"}
                      alt={m.name || "user"}
                      className="w-[24px] h-[24px] bg-gray-500 rounded-full "
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px] max-w-[70px] truncate">{m.name || "user"}</span>
                      <div className="flex flex-row items-end gap-1">
                        <span className="mt-2 inline-block px-3 py-2 text-[16px] leading-[22px] 
                        max-w-[230px] break-words whitespace-pre-wrap
                        [border-radius:0px_12px_12px_12px] bg-gray-100 text-gray-500">{m.text}</span>
                        {m.time && <time className="text-[10px] text-gray-400 select-none">{m.time}</time>}
                      </div>    
                    </div>
                  </div>
                ) : (
                  //내 메시지
                  <div className="flex flex-row-reverse items-end gap-1">
                    <span className="inline-block px-3 py-2 text-[16px] leading-[22px] 
                        max-w-[230px] break-words whitespace-pre-wrap
                        [border-radius:12px_0px_12px_12px] bg-white border border-gray-200 text-gray-800">{m.text}</span>
                        {m.time && <time className="text-[10px] text-gray-400 select-none">{m.time}</time>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 입력창 + 전송 */}
      <div className="px-1 pb-1 pt-2 ">
        <div className="rounded-3xl bg-gray-100 flex items-end px-1 py-1">
          {/* 플러스 버튼 */}
          <button
            className="px-1 py-3 rounded-full hover:bg-gray-100 active:bg-gray-200 self-end"
            aria-label="추가"
            onClick={() => {
              /* 파일/이모지 등 */
            }}
          >
            <img src="/icons/plus.svg" alt="" className="w-5 h-5 opacity-80" />
          </button>
          <textarea
            ref={inputRef}
            className="flex-1 min-w-0 resize-none outline-none text-[16px] leading-6 min-h-[40px] max-h-[140px]
                       px-1 py-2 overflow-hidden text-gray-300"
            placeholder="다른 수강생과 대화해보세요"
            value={input}
            rows={1}
            onChange={(e) => onChangeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            style={{ height: "40px" }}
          />

          <button onClick={send} aria-label="보내기" className="p-1 active:bg-gray-200 self-end shrink-0">
            <img src="/icons/send.svg" alt="send" className="w-8 h-8 " />
          </button>
        </div>
      </div>
    </div>
  );
}
