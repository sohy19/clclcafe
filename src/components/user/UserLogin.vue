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
	email: ref(""),
	password: "",
});

const login = async () => {
	await userLogin(user.value);

	// if (isLogin) {
	// 	alert("로그인되었습니다.");
	// 	router.replace("/");
	// } else {
	// 	isError.value = true;
	// }
};
</script>

<template>
	<div id="main-text">우리 같이 얘기 나누어요.</div>
	<input
		class="border input"
		v-model="user.email"
		type="email"
		placeholder="Email"
	/><br />
	<input
		class="border input"
		v-model="user.password"
		type="password"
		placeholder="Password"
	/><br />
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
