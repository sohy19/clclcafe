<script setup></script>

<template>
	<div>
		<router-link :to="{ name: 'user-login' }">로그인</router-link>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

div {
	padding: 1.5rem 0;
	text-align: right;
	padding-right: 3rem;
}

a {
	background-color: #afbdca;
	padding: 0.3rem 1.5rem;
	border-radius: 1rem;
	font-size: 0.9rem;
}

a:hover {
	opacity: 90%;
}
</style>
