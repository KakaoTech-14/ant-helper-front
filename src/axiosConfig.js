import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청을 보내기 전에 인터셉트해서, Authorization 헤더에 Access Token 자동추가
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답에서 402: Access Token을 재발급받고 원래 요청을 다시 시도
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    // 402: Access Token 재발급 로직 실행
    if (error.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('AccessToken 재발급 로직 실행');

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        // 새로운 Access Token과 Refresh Token을 저장
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Authorization 헤더에 새로운 Access Token을 추가하고 원래 요청을 재시도
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (tokenRefreshError) {
        // 리프레시 토큰이 유효하지 않거나 다른 문제가 발생하면 로그아웃 처리
        alert('인증이 만료되었습니다. 다시 로그인해 주세요.');
        console.error('리프레시 토큰 만료. 다시 로그인 필요', tokenRefreshError);
        window.location.href = '/signin'; // 로그인 페이지로 리다이렉트
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
