<script setup>
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
defineProps({ msg: Object });
</script>

<template>
	<div v-if="msg.userId == userInfo.id" class="chat-item">
		<div class="chat-inner">
			<div class="time">{{ msg.chatTime }}</div>
			<div>{{ msg.message }}</div>
		</div>
	</div>

	<div v-else class="chat-item">
		<div>{{ msg.userNickname }}</div>
		<div>
			{{ msg.message }}
		</div>
		<div class="time">{{ msg.chatTime }}</div>
	</div>
</template>

<style scoped>
.chat-item {
	background-color: red;
	margin: 0.5rem 0;
}
</style>
