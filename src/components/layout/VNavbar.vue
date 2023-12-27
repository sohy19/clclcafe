<script setup>
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);
const { userLogout } = memberStore;

const logout = async () => {
	userLogout();
};
</script>

<template>
	<div class="wrap">
		<!-- <div > -->
		<span v-if="isLogin">
			어서와요, {{ userInfo.nickname }}씨
			<span @click="logout" class="btn">로그아웃</span>
		</span>
		<!-- </div> -->
		<router-link v-else :to="{ name: 'user-login' }" class="btn"
			>로그인</router-link
		>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

.wrap {
	width: 58rem;
	margin: 0 auto;
}

div {
	padding: 1.5rem 0;
	text-align: right;
	padding-right: 2rem;
}

.btn {
	background-color: #afbdca;
	padding: 0.3rem 1rem;
	border-radius: 1rem;
	font-size: 0.9rem;
}

a,
span:hover {
	cursor: pointer;
	opacity: 90%;
}
</style>
