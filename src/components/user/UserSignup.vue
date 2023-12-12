<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/user";

const router = useRouter();

const notEqual = ref(false);
const notAvailableEmail = ref(false);
const emailErrorMsg = ref("");
const notAvailablePassword = ref(false);
const passwordErrorMsg = ref("");
const notAvailableNickname = ref(false);
const nicknameErrorMsg = ref("");
const confirmPassword = ref("");

const user = ref({
	email: "",
	password: "",
	nickname: "",
});

const userSignup = () => {
	// validation 초기화
	notEqual.value = false;
	notAvailableEmail.value = false;
	notAvailablePassword.value = false;
	notAvailableNickname.value = false;

	if (user.value.password !== confirmPassword.value) {
		notEqual.value = true;
		return;
	} else {
		signup(
			user.value,
			() => {
				alert(`회원가입을 축하해요!\n다시 로그인해주시고, 같이 대화를 나눠요.`);
				router.replace({
					name: "user-login",
				});
			},
			(error) => {
				console.log(error);
				const errorMsg = error.response.data;
				if (errorMsg.email) {
					notAvailableEmail.value = true;
					emailErrorMsg.value = errorMsg.email[0];
				}

				if (errorMsg.password) {
					notAvailablePassword.value = true;
					passwordErrorMsg.value = errorMsg.password[0];
				}

				if (errorMsg.nickname) {
					notAvailableNickname.value = true;
					nicknameErrorMsg.value = errorMsg.nickname[0];
				}
			}
		);
	}
};
</script>

<template>
	<div id="main-text">{{ `클클 카페의\n 회원이 되어주세요.` }}</div>
	<input
		class="border input"
		:class="{ 'error-line': notAvailableEmail }"
		type="email"
		placeholder="Email"
		v-model="user.email"
	/><br />
	<div v-show="notAvailableEmail" class="error-text">
		{{ emailErrorMsg }}
	</div>
	<input
		class="border input"
		:class="{ 'error-line': notAvailablePassword || notEqual }"
		type="password"
		placeholder="Password"
		v-model="user.password"
	/><br />
	<input
		class="border input"
		:class="{ 'error-line': notAvailablePassword || notEqual }"
		type="password"
		placeholder="Confirm Password"
		v-model="confirmPassword"
	/><br />
	<div v-show="notAvailablePassword" class="error-text">
		{{ passwordErrorMsg }}
	</div>
	<div v-show="notEqual" class="error-text">비밀번호가 일치하지 않아요.</div>
	<input
		class="border input"
		:class="{ 'error-line': notAvailableNickname }"
		type="text"
		placeholder="Nickname"
		v-model="user.nickname"
	/><br />
	<div v-show="notAvailableNickname" class="error-text">
		{{ nicknameErrorMsg }}
	</div>
	<div id="buts">
		<div class="main-but" @click="userSignup">회원가입</div>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";
</style>
