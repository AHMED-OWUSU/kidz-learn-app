
import React, { useState } from 'react';
import { ChevronLeft, Star, Trophy, Edit3, Save, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';
import { useForm } from 'react-hook-form';

interface ProfilePageProps {
  onBack: () => void;
}

interface ProfileForm {
  childName: string;
  childImage: string;
  parentName: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in a real app this would come from a database
  const [profileData, setProfileData] = useState({
    childName: "Emma",
    childImage: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=200&h=200&fit=crop&crop=face",
    parentName: "Sarah Johnson"
  });

  const userStats = {
    level: 5,
    totalPoints: 1250,
    gamesPlayed: 23,
    perfectScores: 8,
    favoriteGame: "ABC Quiz",
    joinDate: "January 2024"
  };

  const form = useForm<ProfileForm>({
    defaultValues: profileData
  });

  const achievements = [
    { name: "First Steps", description: "Completed your first game!", emoji: "👶", earned: true },
    { name: "ABC Master", description: "Got perfect score in ABC Quiz!", emoji: "🔤", earned: true },
    { name: "Number Ninja", description: "Mastered all number games!", emoji: "🔢", earned: false },
    { name: "Memory Champion", description: "Perfect memory game streak!", emoji: "🧠", earned: true },
    { name: "Shape Sorter", description: "Sorted 100 shapes correctly!", emoji: "🔷", earned: false },
    { name: "Word Builder", description: "Built 50 words successfully!", emoji: "🏗️", earned: false }
  ];

  const handleSave = (data: ProfileForm) => {
    setProfileData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-24">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-24 right-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        {isEditing ? <X size={24} /> : <Edit3 size={24} />}
      </button>

      {/* Profile Header */}
      <div className="text-center mb-8">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
              {/* Child Avatar */}
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={form.watch('childImage')} alt="Child" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-2xl">
                    {form.watch('childName')?.charAt(0) || '👶'}
                  </AvatarFallback>
                </Avatar>
                
                <FormField
                  control={form.control}
                  name="childImage"
                  render={({ field }) => (
                    <FormItem className="w-64">
                      <FormLabel className="text-white">Child Photo URL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter image URL"
                          className="bg-white bg-opacity-90"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Child Name */}
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel className="text-white">Child's Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter child's name"
                        className="bg-white bg-opacity-90 text-center text-xl font-bold"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Parent Name */}
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel className="text-white">Parent's Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter parent's name"
                        className="bg-white bg-opacity-90 text-center"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Save Button */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg font-semibold flex items-center space-x-2 mx-auto"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </form>
          </Form>
        ) : (
          <>
            <Avatar className="w-24 h-24 mb-4 mx-auto">
              <AvatarImage src={profileData.childImage} alt="Child" />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-2xl">
                {profileData.childName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">{profileData.childName}</h1>
            <p className="text-lg text-yellow-200 mb-2">Parent: {profileData.parentName}</p>
            <div className="flex items-center justify-center space-x-2 text-yellow-200">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-semibold">Level {userStats.level}</span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
            <div className="bg-white bg-opacity-90 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-lg font-bold text-purple-600 mb-1">Total Points</h3>
              <p className="text-2xl font-bold text-purple-800">{userStats.totalPoints}</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="text-lg font-bold text-purple-600 mb-1">Games Played</h3>
              <p className="text-2xl font-bold text-purple-800">{userStats.gamesPlayed}</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-2">💯</div>
              <h3 className="text-lg font-bold text-purple-600 mb-1">Perfect Scores</h3>
              <p className="text-2xl font-bold text-purple-800">{userStats.perfectScores}</p>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
              🏆 Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl shadow-lg transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                      : 'bg-white bg-opacity-50 text-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.emoji}</div>
                    <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                    <p className="text-sm opacity-90">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="mt-2">
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Earned
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-purple-600 text-center mb-4">Profile Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-semibold">Favorite Game:</span>
                <span className="text-purple-800">{userStats.favoriteGame}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-semibold">Member Since:</span>
                <span className="text-purple-800">{userStats.joinDate}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
