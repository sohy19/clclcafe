<script setup>
import VNavbar from "@/components/layout/VNavbar.vue";
import CloudIcon from "./assets/icons/CloudIcon.vue";
</script>

<template>
	<div id="wrap">
		<v-navbar />
		<router-link :to="{ name: 'chat' }">
			<cloud-icon />
		</router-link>
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
	margin: -0.5rem 15rem;
	text-align: center;
	min-height: 90vh;
	padding-bottom: 10rem;
}
</style>
