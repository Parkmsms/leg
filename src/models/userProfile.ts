export interface UserProfileData {
  id: number;
  nickname: string;
  profile: string;
  phone: string;
  email: string;
}

export const initialUserProfile: UserProfileData = {
  id: 0,
  nickname: '',
  profile: '',
  phone: '',
  email: '',
};
