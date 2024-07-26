import { Button } from "../ui/button";

const LimitGroupBtn: React.FC = () => {
  return (
    <Button
      className="className= 
        flex flex-col justify-center w-40 h-12
        bg-blue-950 text-white
        rounded cursor-pointer"
      asChild
    >
      <a href={`${import.meta.env.VITE_PRAY_KAKAO_CHANNEL_CHAT_URL}`}>
        문의하기
      </a>
    </Button>
  );
};

export const LimitGroupCard = () => {
  const maxGroupCount = Number(import.meta.env.VITE_MAX_GROUP_COUNT);
  return (
    <div className="flex flex-col  gap-2 border p-4 rounded-lg shadow-md bg-white justify-center items-center h-60vh">
      <div className="text-center">
        <h1 className="font-bold text-xl mb-5">그룹 개수 문의</h1>
        <h1>{maxGroupCount}개 이상의 그룹에</h1>
        <h1>참여하기 위해서는</h1>
        <h1 className="mb-5">문의하기를 통해 진행해주세요</h1>
      </div>
      <LimitGroupBtn />
    </div>
  );
};

export default LimitGroupCard;
