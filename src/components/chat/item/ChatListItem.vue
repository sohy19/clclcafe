<script setup>
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ chat: Object });
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const router = useRouter();
const isMax = ref(false);

// ************ 참여자 max인지 확인 ************
function isMaxFunc() {
	if (props.chat.headcount == props.chat.maxCapacity) {
		isMax.value = true;
	}
}

// ************ 제목, 내용 글자 ... 대체 ************
const truncateText = (text, maxLength) => {
	if (text && text.length > maxLength) {
		return text.slice(0, maxLength) + "...";
	}
	return text;
};

const joinChat = () => {
	if (isLogin.value) {
		router.push({ name: "chat-detail", params: { chatId: props.chat.id } });
	} else {
		alert("대화를 나누려면 로그인이 필요해요.");
		router.push({ name: "user-login" });
	}
};

onMounted(() => {
	isMaxFunc();
});
</script>

<template>
	<div id="wrap">
		<div id="title">
			{{ truncateText(chat.name, 15) }}
		</div>
		<div id="description">
			{{ truncateText(chat.description, 46) }}
		</div>
		<div id="bottom">
			<div>
				<div class="count" :class="isMax && 'max-count'">
					인원 : {{ chat.headcount }}/{{ chat.maxCapacity }}
				</div>
				<div id="host">방장 : {{ chat.madeBy }}</div>
			</div>
			<div id="but" v-show="!isMax" @click="joinChat">참여하기</div>
		</div>
	</div>
</template>

<style scoped>
div {
	background-color: white;
}

#wrap {
	border-radius: 1rem;
	width: 15rem;
	height: 8rem;
	margin: 0.5rem;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	text-align: left;
}

#title {
	font-size: 1.1rem;
	font-family: "SOYOMapleBoldTTF";
}

#description {
	font-size: 0.8rem;
	margin-top: 0.5rem;
	height: 3rem;
	color: #14191f;
}

#bottom {
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.count {
	font-size: 0.8rem;
	color: #0074ff;
}

.max-count {
	color: #ff0000;
}

#host {
	font-size: 0.8rem;
}

#but {
	background-color: #afbdca;
	color: #14191f;
	padding: 0.5rem 0;
	width: 5rem;
	border-radius: 0.5rem;
	font-size: 0.8rem;
	text-align: center;
}

#but:hover {
	cursor: pointer;
	opacity: 90%;
}
</style>
