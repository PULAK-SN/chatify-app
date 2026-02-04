import { useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import {
  LoaderCircle,
  LogOutIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-4 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              {isUpdatingProfile ? (
                <LoaderCircle className="absolute inset-0 m-auto animate-spin" />
              ) : (
                <img
                  src={
                    authUser.profilePic ? authUser.profilePic : "/avatar.png"
                  }
                  alt="profile picture"
                  className="size-full object-cover"
                />
              )}
              {!isUpdatingProfile && (
                <div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
              flex items-center justify-center transition-opacity"
                >
                  <span className="text-white text-xs">Change</span>
                </div>
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* USER NAME AND ONLINE DIV */}
          <div>
            <h3 className="text-slate-200 font-medium text-base maz-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* BOGOUT-BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // PLAY CLICK SOUND BEFORE TOGGLING
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((err) => console.log("Audio faild to play:", err));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
