<script setup></script>

<template>
	<div id="main-text">우리 같이 얘기 나누어요.</div>
	<input class="border input" type="email" placeholder="Email" /><br />
	<input class="border input" type="password" placeholder="Password" /><br />
	<div id="buts">
		<div class="main-but login-but">로그인</div>
		<router-link :to="{ name: 'user-signup' }">회원가입</router-link>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

.login-but {
	margin-bottom: 1.5rem;
}
</style>
