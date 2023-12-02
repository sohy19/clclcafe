<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/user";

const router = useRouter();

const notEqual = ref(false);
const notAvailableEmail = ref(false);
const notAvailablePassword = ref(false);
const notAvailableNickname = ref(false);
const confirmPassword = ref("1004a**");

const user = ref({
	email: "eomso19@naver.com",
	password: "1004a**",
	nickname: "소현",
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
		아이디는 6자 이상 13자 이하로 작성하고, 특수 문자는 _와 -만 사용 가능해요.
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
		영문, 숫자, 특수문자 조합해 6자 이상, 13자 이하 입력해주세요.
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
		닉네임이 이미 존재해요! 다른 걸로 부탁해요.
	</div>
	<div id="buts">
		<div class="main-but" @click="userSignup">회원가입</div>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

.error-text {
	color: red;
	font-size: 0.8rem;
	margin-top: 0.2rem;
}

.error-line {
	border: 1px solid red;
}
</style>
