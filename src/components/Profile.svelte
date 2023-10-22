<script lang="ts">
	import type { User } from '@type/user';
	import { i18n } from '$lib/i18n';
	import Pencil from '@icons/pencil.svelte';
	import Camera from '@icons/camera.svelte';

	export let user: User;
	export let isMyUser: boolean = false;
</script>

<div
	class="relative mt-16 flex flex-col items-center space-y-4 rounded-3xl bg-white p-4 pt-16 shadow-sm"
	dir="auto"
>
	<div class="absolute top-[-4rem]">
		<img
			src={user.avatarUrl}
			alt={user.name}
			class="h-32 w-32 rounded-full border-primary-400 bg-white object-cover drop-shadow-xl"
		/>
		{#if isMyUser}
			<button
				class="reset absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-all hover:opacity-100 hover:backdrop-blur focus:opacity-100 focus:backdrop-blur"
				title={$i18n.t('change_profile_picture')}
			>
				<Camera />
			</button>
		{/if}
	</div>
	<span class="text-center text-sm">
		{user.name}
		{#if isMyUser}
			<button
				class="text !inline !px-1 !py-1 transition-opacity hover:opacity-70"
				title={$i18n.t('edit_profile_name')}
			>
				<Pencil class="inline h-4 w-4" />
			</button>
		{/if}
	</span>
	<p class="first-letter:text-3xl">{user.bio}</p>
	<div class="flex flex-wrap justify-center gap-2">
		{#each user.tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>
</div>
