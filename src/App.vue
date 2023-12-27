<script setup>
import VNavbar from "@/components/layout/VNavbar.vue";
import { useRouter } from "vue-router";
import CloudIcon from "./assets/icons/CloudIcon.vue";

const router = useRouter();

const goMain = () => {
	router.push({ name: "chat" });
	// 새로고침
};
</script>

<template>
	<div id="wrap">
		<v-navbar />
		<cloud-icon @click="goMain" />
		<router-view />
	</div>
</template>

<style>
* {
	background-color: #f6efe7;
	font-family: "SOYOMapleRegularTTF";
}
</style>

<style scoped>
#wrap {
	margin: -0.5rem 0;
	text-align: center;
	min-height: 90vh;
	padding-bottom: 10rem;
}
</style>
