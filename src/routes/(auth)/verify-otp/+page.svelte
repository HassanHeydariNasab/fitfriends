<script lang="ts">
	//import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { i18n } from '$lib/i18n';
	import Loading from '@components/Loading.svelte';

	const phoneNumber = $page.url.searchParams.get('phoneNumber') || '';
	let code = '';
	let isLoading = false;

	let isDisabled = false;

	$: isDisabled = !code.length || !phoneNumber.length || isLoading;

	function onSubmit() {
		alert('TODO: verify OTP');
		// goto('/')
	}
</script>

<div class="flex-1" />

<form
	class="m-4 grid max-w-full items-center justify-items-center gap-6 self-center rounded-3xl bg-white p-4 pt-8 text-center drop-shadow-md transition-[filter] duration-500 focus-within:drop-shadow-2xl"
	on:submit={onSubmit}
>
	<!-- <h1 class="text-5xl font-bold">{$i18n.t('request_otp_title')}</h1> -->
	<label>
		<div class="mb-1 text-sm opacity-60">{$i18n.t('code')}</div>
		<input bind:value={code} type="tel" disabled={isLoading} />
	</label>
	<button disabled={isDisabled}>
		{$i18n.t('confirm')}
		{#if isLoading}
			<Loading />
		{/if}</button
	>
</form>

<div class="flex-1" />
