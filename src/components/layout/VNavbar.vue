<script setup></script>

<template>
	<div>
		<router-link :to="{ name: 'user-login' }">로그인</router-link>
	</div>
</template>

<style scoped>
div {
	padding: 1.5rem 0;
	text-align: right;
	padding-right: 3rem;
}

a {
	background-color: #afbdca;
	color: #14191f;
	padding: 0.3rem 1.5rem;
	border-radius: 1rem;
	text-decoration: none;
	font-size: 0.9rem;
}

a:hover {
	opacity: 90%;
}
</style>
