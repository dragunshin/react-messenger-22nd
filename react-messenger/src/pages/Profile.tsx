import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<"실명" | "게시판">("실명");

  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto scrollbar-hide">
      {/* 헤더 */}
      <header className="px-1.5 py-3 flex items-center gap-3 ">
        <button
          onClick={() => nav(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
          aria-label="back"
        >
          <img src="/icons/leftDir.svg" alt="" className="w-5 h-5" />
        </button>
        <h1 className="text-[20px] font-normal">내 프로필</h1>
      </header>

      {/* 탭 */}
      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={() => setActiveTab("실명")}
          className={`px-3 py-2 rounded-full text-[14px] h-[26px] font-medium transition-colors flex items-center gap-1 ${
            activeTab === "실명"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <img src="/icons/name.svg" alt="실명" className="" />
          실명
        </button>
        <button
          onClick={() => setActiveTab("게시판")}
          className={`px-3 py-2 rounded-full text-[14px] h-[26px] font-medium transition-colors flex items-center gap-1 ${
            activeTab === "게시판"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <img src="/icons/board.svg" alt="게시판" className="" />
          게시판
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 px-4 pb-6 ">
        {activeTab === "실명" ? (
          <div className="space-y-6">
            {/* 프로필 카드 */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="">
                <img src="/icons/profile.svg" alt="profile" className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[18px] font-semibold text-black">정은선</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-400 text-[10px] rounded">재학생</span>
                </div>
                <p className="text-[12px] text-gray-400">홍익대 서울캠</p>
                <p className="text-[12px] text-gray-400">디자인학부 산업디자인전공</p>
                <p className="text-[12px] text-gray-400">21학번</p>
              </div>
              <button className="p-2" aria-label="edit">
                <img src="/icons/arrow-right.svg" alt="수정" className="w-5 h-5" />
              </button>
            </div>

            {/* 프로필 완성하기 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-normal">프로필 완성하기</h2>
                <span className="text-[14px] text-red-500 font-medium">3/6</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: "50%" }}></div>
              </div>
            </div>

            {/* 계정 섹션 */}
            <section className="space-y-3 border-b border-gray-300 pb-6">
              <h2 className="text-[16px] font-normal">계정</h2>
              <div className="space-y-2 ">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[14px] text-gray-500">아이디</span>
                  <span className="text-[14px] text-gray-300">Sunny0930</span>
                </div>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  비밀번호 변경
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  이메일 변경
                </button>
              </div>
            </section>

            {/* 커뮤니티 섹션 */}
            <section className="space-y-3 border-b border-gray-300 pb-6">
              <h2 className="text-[16px] font-normal">커뮤니티</h2>
              <div className="space-y-2">
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  이용 제한 내역
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  관심 키워드 설정
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  커뮤니티 이용 규칙
                </button>
              </div>
            </section>

            {/* 앱 설정 섹션 */}
            <section className="space-y-3 border-b border-gray-300 pb-6">
              <h2 className="text-[16px] font-normal">앱 설정</h2>
              <div className="space-y-2">
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  다크 모드
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  비밀번호 변경
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  이메일 변경
                </button>
              </div>
            </section>

            {/* 이용 안내 섹션 */}
            <section className="space-y-3 border-b border-gray-300 pb-6">
              <h2 className="text-[16px] font-normal">이용 안내</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[14px] text-gray-500">앱 버전</span>
                  <span className="text-[14px] text-gray-300">8.1.39</span>
                </div>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  문의하기
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  공지사항
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  서비스 이용약관
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  개인정보 처리방침
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  청소년 보호정책
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  오픈소스 라이선스
                </button>
              </div>
            </section>

            {/* 기타 섹션 */}
            <section className="space-y-3 pb-8">
              <h2 className="text-[16px] font-normal">기타</h2>
              <div className="space-y-2">
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  정보 동의 설정
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  회원 탈퇴
                </button>
                <button className="w-full text-left py-2 text-[14px] text-gray-500">
                  로그아웃
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-3 w-[303px] h-[118px]">
              <div className="">
                <img src="/icons/profile.svg" alt="profile" className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[18px] font-semibold text-black">미대생감자</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-400 text-[10px] rounded">재학생</span>
                </div>
              </div>
              <button className="p-2" aria-label="edit">
                <img src="/icons/arrow-right.svg" alt="수정" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
