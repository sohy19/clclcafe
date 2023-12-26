<script setup>
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
defineProps({ msg: Object });
</script>

<template>
	<div v-if="msg.userId == userInfo.id" class="chat-wrap me">
		<div class="time">{{ msg.chatTime }}</div>
		<div class="chat-item">
			<div class="content send">{{ msg.message }}</div>
		</div>
	</div>

	<div v-else class="chat-wrap someone">
		<div class="chat-item">
			<div class="name">{{ msg.userNickname }}</div>
			<div class="msg-block">
				<div class="content get">
					{{ msg.message }}
				</div>
				<div class="time">{{ msg.chatTime }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.chat-wrap {
	/* background-color: white; */
	margin-bottom: 1.5rem;
}

.time {
	/* background-color: white; */
	/* display: inline-block; */
	font-size: 0.8rem;
}

.chat-item {
	/* display: inline-block; */
	background-color: white;
	text-align: left;
}

.me {
	text-align: right;
}

.content {
	max-width: 18rem;
	padding: 0.5rem;
	border-radius: 1rem;
}

.send {
	background-color: #7996b4;
	margin-left: 0.3rem;
}

.someone {
	text-align: left;
}

.name {
	font-family: "SOYOMapleBoldTTF";
	background-color: white;
}

.get {
	background-color: #e9deca;
	margin-right: 0.3rem;
}

.msg-block {
	background-color: white;
	display: flex;
}
</style>
