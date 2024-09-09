import axios from 'axios'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청을 보내기 전에 인터셉트해서, Authorization 헤더에 Access Token 자동추가
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답에서 402: Access Token을 재발급받고 원래 요청을 다시 시도
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem('refreshToken')

    // 402: Access Token 재발급 로직 실행
    if (error.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true
      console.log('AccessToken 재발급 로직 실행')
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        )

        const { accessToken, refreshToken: newRefreshToken } = response.data.data

        alert('AccessToken 재발급로직 성공!!')
        // 새로운 Access Token과 Refresh Token을 저장
        sessionStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        // Authorization 헤더에 새로운 Access Token을 추가하고 원래 요청을 재시도
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return apiClient(originalRequest)
      } catch (tokenRefreshError) {
        // 리프레시 토큰이 유효하지 않거나 다른 문제가 발생하면 로그아웃 처리
        alert('리프레시토큰 만료됨!! 다시 로그인!')
        console.error('리프레시 토큰 만료. 다시 로그인 필요', tokenRefreshError)
        window.location.href = '/signin' // 로그인 페이지로 리다이렉트
        return Promise.reject(tokenRefreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient

// // src/axiosConfig.js
// import axios from "axios";

// // Axios 인스턴스 생성
// const apiClient = axios.create({
//   baseURL: process.env.REACT_APP_API_URL, // 필요한 기본 URL
// });

// // Access Token과 Refresh Token을 저장 위치에서 가져오는 함수
// const getAccessToken = () => sessionStorage.getItem("accessToken");
// const getRefreshToken = () => localStorage.getItem("refreshToken");

// // 1. 요청 인터셉터: 각 요청에 Access Token을 자동으로 추가
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 2. 응답 인터셉터: 401 Unauthorized 처리 및 Refresh Token을 통한 Access Token 재발급
// apiClient.interceptors.response.use(
//   (response) => response, // 성공적인 응답은 그대로 반환
//   async (error) => {
//     const originalRequest = error.config;

//     // Access Token이 만료된 경우
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = getRefreshToken();
//       if (refreshToken) {
//         try {
//           // Refresh Token을 사용해 새로운 Access Token 요청
//           const tokenResponse = await axios.post(
//             `${process.env.REACT_APP_API_URL}/auth/refresh`,
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${refreshToken}`,
//               },
//             }
//           );

//           // 새로 받은 Access Token과 Refresh Token을 세션과 로컬 스토리지에 저장
//           const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//             tokenResponse.data.data;

//           sessionStorage.setItem("accessToken", newAccessToken);
//           localStorage.setItem("refreshToken", newRefreshToken);

//           // 실패했던 원래 요청에 새로 받은 Access Token 추가
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           // 원래 요청 재시도
//           return apiClient(originalRequest);
//         } catch (refreshError) {
//           console.error("Refresh Token으로 토큰 재발급 실패", refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;
