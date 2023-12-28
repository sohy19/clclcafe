import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { login, logout, tokenRegeneration } from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore(
	"memberStore",
	() => {
		const router = useRouter();
		const isLogin = ref(false);
		const isValidToken = ref(false);
		const userInfo = ref({
			id: 0,
			email: "",
			nickname: "",
		});

		const userLogin = async (user, callbackFunc) => {
			await login(
				user,
				(response) => {
					if (response.status === httpStatusCode.OK) {
						let { data } = response;
						// console.log(data);
						sessionStorage.setItem("accessToken", data.accessToken);
						sessionStorage.setItem("refreshToken", data.refreshToken);
						userInfo.value.id = data.member.id;
						userInfo.value.email = data.member.email;
						userInfo.value.nickname = data.member.nickname;
						isLogin.value = true;
						isValidToken.value = true;
					} else {
						isLogin.value = false;
						isValidToken.value = false;
					}
					callbackFunc();
				},
				(error) => {
					console.error(error);
					callbackFunc();
				}
			);
		};

		const tokenRegenerate = async () => {
			await tokenRegeneration(
				{
					refreshToken: sessionStorage.getItem("refreshToken"),
				},
				(response) => {
					if (response.status === httpStatusCode.CREATE) {
						let { data } = response;
						sessionStorage.setItem("accessToken", data.accessToken);
						sessionStorage.setItem("refreshToken", data.refreshToken);
						isValidToken.value = true;
					}
				},
				async (error) => {
					// HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
					await logout(
						() => {},
						(error) => {
							console.error(error);
						}
					);
					isLogin.value = false;
					userInfo.value.email = "";
					userInfo.value.id = 0;
					userInfo.value.nickname = "";
					isValidToken.value = false;
					sessionStorage.clear();
					alert("세션이 만료되었어요. 다시 로그아웃 해주세요!");
					window.location.href = "/";
				}
			);
		};

		const userLogout = async () => {
			await logout(
				{
					userId: userInfo.value.id,
				},
				() => {
					// if (response.status === httpStatusCode.OK) {
					// } else {
					// 	console.error("유저 정보 없음!!!!");
					// }
				},
				(error) => {
					console.log(error);
				}
			);
			isLogin.value = false;
			userInfo.value.email = "";
			userInfo.value.id = 0;
			userInfo.value.nickname = "";
			isValidToken.value = false;
			sessionStorage.clear();
			alert("로그아웃 되었어요.");
			router.replace({
				name: "chat",
			});
		};

		return {
			isLogin,
			tokenRegenerate,
			userInfo,
			isValidToken,
			userLogin,
			userLogout,
		};
	},
	{ persist: { storage: sessionStorage } }
);
