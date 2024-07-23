import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../supabase/client";
import useAuth from "../hooks/useAuth";

const MainPage: React.FC = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    navigate("/group", { replace: true });
  }

  const from = location.state?.from?.pathname || "/group";
  const redirectUrl = `${import.meta.env.VITE_BASE_URL}${from}`;
  const imageUrl = `${
    import.meta.env.VITE_SUPA_PROJECT_URL
  }/storage/v1/object/public/prayu-staging/prayCard.png`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <img src={imageUrl} />

        <div className="text-lg font-bold">
          우리만의 기도제목 기록공간 PrayU
        </div>
        <div className="text-sm text-gray-500">
          PrayU 에서 매일 반응하며 함께 기도해요
        </div>
      </div>

      <Auth
        redirectTo={redirectUrl}
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: { background: "#FFE237", color: "black" },
            container: { width: "80%", margin: "0 auto" },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              social_provider_text: "카카오 로그인",
            },
            sign_up: {
              social_provider_text: "카카오 로그인",
            },
          },
        }}
        onlyThirdPartyProviders={true}
        providers={["kakao"]}
      />
    </div>
  );
};

export default MainPage;