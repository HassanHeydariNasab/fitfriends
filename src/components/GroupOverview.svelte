<script lang="ts">
	import type { Group } from '@type/group';

	export let group: Group;
</script>

<a
	href="/groups/{group.id}"
	class="reset relative w-64 snap-center overflow-hidden rounded-3xl shadow-md outline-offset-2"
>
	<img
		src={group.avatarUrl}
		alt="Group Banner"
		class="aspect-square max-h-[50vh] w-full object-cover shadow-md"
	/>
	<h2
		class="text-md absolute bottom-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-t from-white px-4 pb-4 pt-8 text-center font-semibold"
		dir="auto"
	>
		{group.title}
	</h2>
</a>
