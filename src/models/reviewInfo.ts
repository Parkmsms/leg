export interface ReviewInfo {
  orderId: number,
  star: number,
  comment: string,
  pictureUrl: {
    name: string;
    type: string;
    uri: string;
    height: number;
    fileSize: number;
  }

}

export const initialReviewInfo: ReviewInfo = {
  orderId: 0,
  star: 0,
  comment: '',
  pictureUrl: {
    name: '',
    type: '',
    uri: '',
    height: 0,
    fileSize: 0,
  }
}

export interface Review {
  id: number,
  userProfile: string,
  userNickname: string,
  reviewStar: number[],
  reviewComment: string,
  reviewImages: string[],
  reviewCreatedDate: string,
  reply: any,
  replyCreatedDate: any
}
