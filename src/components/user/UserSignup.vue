<script setup>
import { ref } from "vue";

const isError = ref(false);
</script>

<template>
	<div id="main-text">{{ `클클 카페의\n 회원이 되어주세요.` }}</div>
	<input
		class="border input"
		:class="{ 'error-line': isError }"
		type="email"
		placeholder="Email"
	/><br />
	<div v-show="isError" class="error-text">
		아이디는 6자 이상 13자 이하로 작성하고, 특수 문자는 _와 -만 사용 가능해요.
	</div>
	<input
		class="border input"
		:class="{ 'error-line': isError }"
		type="password"
		placeholder="Password"
	/><br />
	<div v-show="isError" class="error-text">
		영문, 숫자, 특수문자 조합해 6자 이상, 13자 이하 입력해주세요.
	</div>
	<input
		class="border input"
		:class="{ 'error-line': isError }"
		type="text"
		placeholder="Nickname"
	/><br />
	<div v-show="isError" class="error-text">
		닉네임이 이미 존재해요! 다른 걸로 부탁해요.
	</div>
	<div id="buts">
		<div class="main-but">회원가입</div>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

.error-text {
	color: red;
	font-size: 0.8rem;
	margin-top: 0.2rem;
}

.error-line {
	border: 1px solid red;
}
</style>
