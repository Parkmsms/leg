export interface NoticeDetail {
  id: number; // 공지사항 ID
  title: string; // 공지사항 제목
  createdDate: string; // 생성일자
  content: string; // 공지사항 내용
  banner: string; // 배너
  pub: boolean;
}

export const initialNoticeDetail: NoticeDetail = {
  id: 0,
  title: '',
  createdDate: '',
  content: '',
  banner: '',
  pub: false,
};
