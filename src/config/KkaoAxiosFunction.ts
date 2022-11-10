import axios from "axios";
import Config from "react-native-config";

const key = Config.KAKAO_APP_KEY;

export const gpsToAdress = async (x: string, y: string) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`,
      {
        headers: {
          Authorization: 'KakaoAK ' + key,
        },
      },
    )
    return result;
  } catch (err) {
    throw err;
  }
}

export const keywordToAdress = async (address: string) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`,
      {
        headers: {
          Authorization: 'KakaoAK ' + key,
        },
      },
    )
    return result;
  } catch (err) {
    throw err;
  }
} 