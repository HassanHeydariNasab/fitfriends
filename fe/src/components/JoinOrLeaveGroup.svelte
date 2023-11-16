<script lang="ts">
	export let groupId: string;

	import { i18n } from '$lib/i18n';

	const joinedGroupsIds = ['1'];

	const onClickJoin = () => {
		alert('TODO: join group');
	};

	const onClickLeave = () => {
		alert('TODO: leave group');
	};
</script>

{#if joinedGroupsIds.includes(groupId)}
	<button class="outlined" on:click={onClickLeave}>{$i18n.t('leave_group')}</button>
{:else}
	<button on:click={onClickJoin}>{$i18n.t('join_group')}</button>
{/if}
