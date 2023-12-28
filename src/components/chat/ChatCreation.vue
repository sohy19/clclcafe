<script setup>
import { ref } from "vue";
import { createChat } from "@/api/chat";
import { useRouter } from "vue-router";

const router = useRouter();

const newChat = ref({
	name: "",
	description: "",
	maxCapacity: 0,
});

const createNewChat = () => {
	createChat(
		newChat.value,
		({ data }) => {
			alert("채팅방이 생성됐어요! 채팅방으로 이동할게요.");
			router.push({ name: "chat-detail", params: { chatId: data.chatId } });
		},
		(error) => {
			console.log(error);
			alert("입력값이 적절하지 않은 것이 있어요! 다시 한번 확인해주세요.");
		}
	);
};
</script>

<template>
	<div id="main-text">이야기를 시작해볼까요?</div>
	<input
		class="border input"
		type="text"
		placeholder="채팅 이름을 적어주세요."
		v-model="newChat.name"
	/><br />
	<textarea
		class="border input"
		type="text"
		placeholder="간단한 채팅 설명을 적어주세요."
		v-model="newChat.description"
	></textarea
	><br />
	<input
		class="border input"
		type="number"
		min="1"
		value="1"
		placeholder="최대 수용 인원을 적어주세요."
		v-model="newChat.maxCapacity"
	/><br />
	<div id="buts">
		<div class="main-but" @click="createNewChat">생성하기</div>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

textarea {
	resize: none;
	height: 5rem;
}
</style>
