import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useBaseStore from "@/stores/baseStore";

const BannerDialog = () => {
  const bannerDialogContent = useBaseStore(
    (state) => state.bannerDialogContent
  );
  const isOpenBannerDialog = useBaseStore((state) => state.isOpenBannerDialog);
  const setIsOpenBannerDialog = useBaseStore(
    (state) => state.setIsOpenBannerDialog
  );

  const targetGroup = useBaseStore((state) => state.targetGroup);
  const memberList = useBaseStore((state) => state.memberList);

  if (!targetGroup || !memberList) return null;

  return (
    <Dialog open={isOpenBannerDialog} onOpenChange={setIsOpenBannerDialog}>
      <DialogContent className="w-11/12 rounded-xl bg-mainBg">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {bannerDialogContent}
      </DialogContent>
    </Dialog>
  );
};

export default BannerDialog;