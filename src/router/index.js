import { createRouter, createWebHistory } from "vue-router";
import ChatView from "../views/ChatView.vue";
import UserView from "../views/UserView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "chat",
			component: ChatView,
			redirect: { name: "chat-list" },
			children: [
				{
					path: "/",
					name: "chat-list",
					component: () => import("@/components/chat/ChatList.vue"),
				},
				{
					path: "/creation",
					name: "chat-creation",
					component: () => import("@/components/chat/ChatCreation.vue"),
				},
				{
					path: "/detail",
					name: "chat-detail",
					component: () => import("@/components/chat/ChatDetail.vue"),
				},
			],
		},
		{
			path: "/",
			name: "user",
			component: UserView,
			redirect: { name: "user-login" },
			children: [
				{
					path: "/login",
					name: "user-login",
					component: () => import("@/components/user/UserLogin.vue"),
				},
				{
					path: "/signup",
					name: "user-signup",
					component: () => import("@/components/user/UserSignup.vue"),
				},
			],
		},
	],
});

export default router;
