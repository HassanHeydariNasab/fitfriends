<script lang="ts">
	export let session: Session;
	export let shouldShowGroupOverview: boolean = true;

	import { goto } from '$app/navigation';
	import { i18n } from '$lib/i18n';

	// import { formattedDistance } from '$lib/format';
	import type { Session } from '@type/session';
	import { currentUser } from '@stores/auth';
	import CalendarOutline from '@icons/calendar-outline.svelte';
	import LocationOutline from '@icons/location-outline.svelte';

	$: startAtDate = new Date(session.startAt);
	$: endAtDate = new Date(session.endAt);
	$: isJoined = session.users.findIndex((user) => user.id === $currentUser?.id) !== -1;

	function onClickShowGroupDetails() {
		goto(`/groups/${session.group.id}`);
	}
	function onClickJoinSession() {
		alert('TODO: join session');
	}
	function onClickLeaveSession() {
		alert('TODO: leave session');
	}
</script>

<article
	class="relative grid grid-flow-row gap-x-4 gap-y-4 rounded-3xl bg-white p-4 shadow-sm"
	dir="auto"
>
	{#if shouldShowGroupOverview}
		<div
			aria-label={$i18n.t('group_information')}
			class="grid justify-items-center gap-2 border-b-[1px] py-4"
		>
			<h2
				class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-bold"
				dir="auto"
			>
				{session.group.title}
			</h2>
			<!--<Stars value={3.5} />-->

			<!-- <div>{formattedDistance(+(session?.dist || 0))}<Location class="inline text-primary-500" /></div> -->
			<!-- <address>{session.phone}</address> -->
			<!--
		<img
			src="/running.jpg"
			alt=""
			class="aspect-square h-32 self-center rounded-3xl object-cover"
		/>
    -->
			<p dir="auto" class="relative max-h-[140px] overflow-hidden indent-4">
				{session.group.description}
				<span class="absolute inset-0 h-full w-full bg-gradient-to-t from-white outline-black" />
			</p>
			<button on:click={onClickShowGroupDetails} class="text"
				>{$i18n.t('show_group_details')}</button
			>
		</div>
	{/if}
	<div
		aria-label={$i18n.t('session_information')}
		class="h-full w-full space-y-4 px-2 py-4 text-sm"
		dir="auto"
	>
		<p>
			<CalendarOutline class="me-2 inline text-gray-500" />
			<time datetime={startAtDate.toISOString()}
				>{startAtDate.toLocaleString($i18n.language, {
					dateStyle: 'full',
					timeStyle: 'short'
				})}
			</time>
			{$i18n.t('to')}
			<time datetime={endAtDate.toISOString()}>
				{endAtDate.toLocaleString($i18n.language, {
					timeStyle: 'short'
				})}
			</time>
		</p>
		<address>
			<LocationOutline class="me-2 inline text-gray-500" />
			{session.address}
		</address>

		<button on:click={isJoined ? onClickLeaveSession : onClickJoinSession} class:outlined={isJoined}
			>{isJoined ? $i18n.t('leave_session') : $i18n.t('join_session')}</button
		>
	</div>
</article>
