<script setup></script>

<template>
	<div id="main-text">이야기를 시작해볼까요?</div>
	<input
		class="border input"
		type="text"
		placeholder="채팅 이름을 적어주세요."
	/><br />
	<textarea
		class="border input"
		type="text"
		placeholder="간단한 채팅 설명을 적어주세요."
	></textarea
	><br />
	<input
		class="border input"
		type="number"
		min="1"
		placeholder="최대 수용 인원을 적어주세요."
	/><br />
	<div id="buts">
		<div class="main-but">생성하기</div>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

textarea {
	resize: none;
	height: 5rem;
}
</style>
