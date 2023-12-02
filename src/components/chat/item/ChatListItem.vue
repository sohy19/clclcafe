<script setup>
defineProps({ chat: Object });

const truncateText = (text, maxLength) => {
	if (text && text.length > maxLength) {
		return text.slice(0, maxLength) + "...";
	}
	return text;
};
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
				<div
					class="count"
					:class="chat.headcount === chat.maxCapacity && 'max-count'"
				>
					인원 : {{ chat.headcount }}/{{ chat.maxCapacity }}
				</div>
				<div id="host">방장 : {{ chat.madeBy }}</div>
			</div>
			<div id="but">참여하기</div>
		</div>
	</div>
</template>

<style scoped>
div {
	background-color: white;
}

#wrap {
	border-radius: 1rem;
	width: 15.5rem;
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
