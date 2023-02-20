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

export interface UserSimpleInfo {
  nickname: string;
  profile: string,
  point: number,
  town: string
}

export const initialUserSimpleInfo: UserSimpleInfo = {
  nickname: '',
  profile: '',
  point: 0,
  town: ''
};
