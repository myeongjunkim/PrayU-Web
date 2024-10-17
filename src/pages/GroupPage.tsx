import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBaseStore from "@/stores/baseStore";
import ShareDrawer from "@/components/share/ShareDrawer";
import EventDialog from "@/components/notice/EventDialog";
import ReportAlert from "@/components/alert/ReportAlert";
import { useNavigate } from "react-router-dom";
import { getISOTodayDate } from "@/lib/utils";
import MyMember from "@/components/member/MyMember";
import OtherMemberList from "@/components/member/OtherMemberList";
import TodayPrayCardListDrawer from "@/components/todayPray/TodayPrayCardListDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import GroupSettingsDialog from "@/components/group/GroupSettingsDialog";
import PrayListDrawer from "@/components/pray/PrayListDrawer";
import OtherMemberDrawer from "@/components/member/OtherMemberDrawer";
import TodayPrayStartCard from "@/components/todayPray/TodayPrayStartCard";
import BannerDialog from "@/components/notice/BannerDialog";
import GroupHeader from "@/components/group/GroupHeader";

const GroupPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user!.id;
  const navigate = useNavigate();

  const { groupId } = useParams();
  const groupList = useBaseStore((state) => state.groupList);
  const targetGroup = useBaseStore((state) => state.targetGroup);
  const targetGroupLoading = useBaseStore((state) => state.targetGroupLoading);
  const getGroup = useBaseStore((state) => state.getGroup);
  const memberList = useBaseStore((state) => state.memberList);
  const getMember = useBaseStore((state) => state.getMember);
  const setIsGroupLeader = useBaseStore((state) => state.setIsGroupLeader);
  const myMember = useBaseStore((state) => state.myMember);
  const memberLoading = useBaseStore((state) => state.memberLoading);
  const fetchMemberListByGroupId = useBaseStore(
    (state) => state.fetchMemberListByGroupId
  );
  const fetchGroupListByUserId = useBaseStore(
    (state) => state.fetchGroupListByUserId
  );
  const fetchTodayUserPrayByGroupId = useBaseStore(
    (state) => state.fetchTodayUserPrayByGroupId
  );
  const userPlan = useBaseStore((state) => state.userPlan);
  const isPrayToday = useBaseStore((state) => state.isPrayToday);
  const maxGroupCount = Number(import.meta.env.VITE_MAX_GROUP_COUNT);

  useEffect(() => {
    fetchGroupListByUserId(currentUserId);
    if (groupId) getMember(currentUserId, groupId);
    if (groupId) getGroup(groupId);
    if (groupId) fetchMemberListByGroupId(groupId);
    if (groupId) fetchTodayUserPrayByGroupId(currentUserId, groupId);
  }, [
    fetchGroupListByUserId,
    fetchMemberListByGroupId,
    getMember,
    fetchTodayUserPrayByGroupId,
    currentUserId,
    groupId,
    getGroup,
  ]);

  useEffect(() => {
    if (
      !memberLoading &&
      (myMember == null || myMember.updated_at < getISOTodayDate(-6))
    ) {
      navigate(`/group/${groupId}/praycard/new`, { replace: true });
      return;
    }
    if (
      groupList &&
      groupList.length >= maxGroupCount &&
      !groupList.some((group) => group.id === groupId) &&
      userPlan != "Premium"
    ) {
      navigate("/group/limit", { replace: true });
      return;
    }
    if (targetGroupLoading == false && targetGroup == null) {
      navigate("/group/not-found");
      return;
    }
  }, [
    navigate,
    memberLoading,
    myMember,
    groupId,
    groupList,
    targetGroup,
    targetGroupLoading,
    maxGroupCount,
    userPlan,
  ]);

  useEffect(() => {
    if (targetGroup && targetGroup.user_id === currentUserId) {
      setIsGroupLeader(true);
    }
  }, [targetGroup, currentUserId, setIsGroupLeader]);

  if (
    !targetGroup ||
    !memberList ||
    !groupList ||
    !myMember ||
    isPrayToday == null
  ) {
    return (
      <div className="flex flex-col h-full gap-4 pt-[48px]">
        <Skeleton className="w-full h-[150px] flex items-center gap-4 p-4 bg-gray-200 rounded-xl" />
        <Skeleton className="w-full flex-grow flex items-center gap-4 p-4 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  const otherMemberList = memberList.filter(
    (member) =>
      member.user_id &&
      member.user_id !== currentUserId &&
      !myMember.profiles.blocking_users.includes(member.user_id)
  );
  const isExpiredAllMember =
    otherMemberList.length == 0
      ? false
      : otherMemberList.every(
          (member) => member.updated_at < getISOTodayDate(-6)
        );

  const isTodayPrayStart = !isPrayToday && !isExpiredAllMember;

  return (
    <div className="flex flex-col h-full gap-5">
      <GroupHeader
        groupList={groupList}
        targetGroup={targetGroup}
        otherMemberList={otherMemberList}
      />
      <div className="flex flex-col flex-grow gap-4">
        <MyMember myMember={myMember} />
        {isTodayPrayStart ? (
          <TodayPrayStartCard />
        ) : (
          <OtherMemberList otherMemberList={otherMemberList} />
        )}
      </div>

      <TodayPrayCardListDrawer />
      <OtherMemberDrawer />
      <PrayListDrawer />
      <ShareDrawer />
      <EventDialog />
      <BannerDialog />
      <GroupSettingsDialog targetGroup={targetGroup} />
      <ReportAlert />
    </div>
  );
};

export default GroupPage;
