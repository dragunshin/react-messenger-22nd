import { NavLink } from "react-router-dom";

const items = [
  { to: "/home", label: "홈", icon: "/icons/Home.svg", iconActive: "/icons/activeHome.svg" },
  {
    to: "/timetable",
    label: "시간표",
    icon: "/icons/TimeTable.svg",
    iconActive: "/icons/activeTimeTable.svg",
  },
  {
    to: "/board",
    label: "게시판",
    icon: "/icons/navBoard.svg",
    iconActive: "/icons/activeBoard.svg",
  },
  { to: "/chat", label: "채팅", icon: "/icons/Chat.svg", iconActive: "/icons/activeChat.svg" },
  {
    to: "/benefit",
    label: "혜택",
    icon: "/icons/Benefit.svg",
    iconActive: "/icons/activeBenefit.svg",
  },
];

export default function NavBar() {
  return (
    <nav className="h-16 flex justify-around items-center">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} className="flex flex-col items-center text-xs">
          {({ isActive }) => (
            <>
              <img
                src={isActive ? it.iconActive : it.icon}
                alt={it.label}
                className="w-full h-full"
              />
              <span className={isActive ? "text-black" : "text-gray-400"}>{/* {it.label} */}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
