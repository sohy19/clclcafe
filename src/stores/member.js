import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { login } from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore(
	"memberStore",
	() => {
		const router = useRouter();
		const isLogin = ref(false);
		const userInfo = ref({
			email: "",
			nickname: "",
		});
		const isValidToken = ref(false);

		const userLogin = async (user) => {
			await login(
				user,
				(response) => {
					if (response.status === httpStatusCode.OK) {
						let { data } = response;
						console.log(data);
						sessionStorage.setItem("accessToken", data.accessToken);
						// sessionStorage.setItem("refreshToken", data.refreshToken);
						userInfo.value.nickname = data.member.nickname;
						userInfo.value.email = data.member.email;
						isLogin.value = true;
						isValidToken.value = true;
					} else {
						isLogin.value = false;
						isValidToken.value = false;
					}
				},
				(error) => {
					console.error(error);
				}
			);
		};

		// const tokenRegenerate = async (callbackFunc) => {
		// 	await tokenRegeneration(
		// 		{
		// 			accessToken: sessionStorage.getItem("accessToken"),
		// 			refreshToken: sessionStorage.getItem("refreshToken"),
		// 		},
		// 		(response) => {
		// 			console.log(response);
		// 			console.log(response.status);
		// 			if (response.status === httpStatusCode.CREATE) {
		// 				let accessToken = response.data.accessToken;
		// 				console.log(accessToken);
		// 				sessionStorage.setItem("accessToken", accessToken);
		// 				console.log("access 저장 !!!!");
		// 				isValidToken.value = true;
		// 			}
		// 		},
		// 		async (error) => {
		// 			// HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
		// 			if (error.response.status === httpStatusCode.UNAUTHORIZED) {
		// 				// 다시 로그인 전 DB에 저장된 RefreshToken 제거.
		// 				await logout(
		// 					(response) => {
		// 						if (response.status === httpStatusCode.OK) {
		// 							console.log("리프레시 토큰 제거 성공");
		// 						} else {
		// 							console.log("리프레시 토큰 제거 실패");
		// 						}
		// 						alert("다시 로그인해 주세요.");
		// 						isLogin.value = false;
		// 						userInfo.value.id = 0;
		// 						userInfo.value.name = "";
		// 						userInfo.value.profileImage = "";
		// 						isValidToken.value = false;
		// 						router.push({ name: "user-login" });
		// 					},
		// 					(error) => {
		// 						console.error(error);
		// 						isLogin.value = false;
		// 					}
		// 				);
		// 			}
		// 		}
		// 	);
		// 	callbackFunc();
		// };

		// const userLogout = async () => {
		// 	await logout(
		// 		(response) => {
		// 			if (response.status === httpStatusCode.OK) {
		// 				isLogin.value = false;
		// 				userInfo.value = null;
		// 				isValidToken.value = false;
		// 			} else {
		// 				console.error("유저 정보 없음!!!!");
		// 			}
		// 		},
		// 		(error) => {
		// 			console.log(error);
		// 		}
		// 	);
		// };

		return {
			isLogin,
			// tokenRegenerate,
			userInfo,
			isValidToken,
			userLogin,
			// userLogout,
		};
	},
	{ persist: { storage: sessionStorage } }
);
