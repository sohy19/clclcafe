<script setup>
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const { userLogin } = memberStore;

const isError = ref(false);

const user = ref({
	email: "",
	password: "",
});

const login = async () => {
	isError.value = false;
	await userLogin(user.value, callbackFunc);
	console.log(isLogin.value);
};

const callbackFunc = async () => {
	if (isLogin.value) {
		alert("로그인되었습니다.");
		router.replace("/");
	} else {
		isError.value = true;
	}
};
</script>

<template>
	<div id="main-text">우리 같이 얘기 나누어요.</div>
	<input
		class="border input"
		:class="{ 'error-line': isError }"
		v-model="user.email"
		type="email"
		placeholder="Email"
	/><br />
	<input
		class="border input"
		:class="{ 'error-line': isError }"
		v-model="user.password"
		type="password"
		placeholder="Password"
	/><br />
	<div v-show="isError" class="error-text">
		아이디 혹은 비밀번호를 확인해주세요!
	</div>
	<div id="buts">
		<div class="main-but login-but" @click="login">로그인</div>
		<router-link :to="{ name: 'user-signup' }">회원가입</router-link>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

.login-but {
	margin-bottom: 1.5rem;
}
</style>
