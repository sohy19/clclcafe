<script setup>
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
defineProps({ msg: Object });
</script>

<template>
	<div v-if="msg.message == 'memberEnter'">
		<div class="enter">{{ msg.userNickname }} 님이 들어오셨어요.</div>
	</div>
	<div v-else-if="msg.message == 'memberLeave'">
		<div class="enter">{{ msg.userNickname }} 님이 나가셨어요.</div>
	</div>
	<div v-else-if="msg.userId == userInfo.id" class="chat-item">
		<div class="chat-inner right">
			<div class="time">{{ msg.chatTime }}</div>
			<div class="message send">{{ msg.message }}</div>
		</div>
	</div>

	<div v-else class="chat-item">
		<div class="name">{{ msg.userNickname }}</div>
		<div class="chat-inner">
			<div class="message get">
				{{ msg.message }}
			</div>
			<div class="time">{{ msg.chatTime }}</div>
		</div>
	</div>
</template>

<style scoped>
.chat-item {
	margin: 0.5rem 0;
	display: flex;
	flex-direction: column;
	background-color: white;
}

.chat-inner {
	/* border: 1px solid red; */
	display: flex;
	background-color: white;
}

.right {
	margin-left: auto;
}

.name {
	text-align: left;
	font-family: "SOYOMapleBoldTTF";
	background-color: white;
	margin-bottom: 0.3rem;
}

.time {
	font-size: 0.8rem;
	background-color: white;
	display: flex;
	align-items: end;
}

.message {
	max-width: 18rem;
	padding: 0.5rem;
	border-radius: 1rem;
	text-align: left;

	/* border: 1px solid blue; */
}

.send {
	background-color: #7996b4;
	margin-left: 0.3rem;
}

.get {
	background-color: #e9deca;
	margin-right: 0.3rem;
}

.enter {
	background-color: white;
	padding: 0.5rem;
	/* width: 15rem; */
	margin: 0 auto;
	font-size: 0.85rem;
	color: gray;
}
</style>
