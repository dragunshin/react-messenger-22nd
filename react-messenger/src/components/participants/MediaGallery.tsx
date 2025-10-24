import { useParticipantsStore } from "../../stores/participantsStore";

export default function MediaGallery() {
  const { media } = useParticipantsStore();

  return (
    <div className="px-4 py-4 border-b border-gray-100">
      <h2 className="text-[16px] font-normal text-gray-500 mb-3">
        사진, 동영상 <span className="text-[12px] text-gray-400">{media.length}</span>
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {media.map((item) => (
          <div
            key={item.id}
            className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
          >
            <img
              src={item.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
