import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/m09D0cq.gif')" }}
      ></div>

      {/* Profile Card */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-xl p-4 max-w-4xl w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold text-primary-content mb-6">
          Your Profile Information
        </h2>

        {/* Flex Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-base-content"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-base-content">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Full Name Section */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="w-full p-3 rounded-lg bg-base-100 text-base-content">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email Section */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="w-full p-3 rounded-lg bg-base-100 text-base-content">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 bg-base-100 bg-opacity-20 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-primary-content mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-sm text-base-content">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser.createdAt
                    ? new Date(authUser.createdAt).toLocaleDateString("en-GB")
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
