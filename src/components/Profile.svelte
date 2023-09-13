<script lang="ts">
	import type { User } from '@type/user';

	export let user: User;
</script>

<div
	class="relative mt-16 flex flex-col items-center space-y-4 rounded-3xl bg-white p-4 pt-16 shadow-sm"
	dir="auto"
>
	<img
		src={user.avatarUrl}
		alt={user.name}
		class="absolute top-[-4rem] h-32 w-32 rounded-full border-primary-400 bg-white object-cover drop-shadow-xl"
	/>
	<span class="text-center text-sm">{user.name}</span>
	<p class="first-letter:text-3xl">{user.bio}</p>
	<div class="flex flex-wrap justify-center gap-2">
		{#each user.tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>
</div>
