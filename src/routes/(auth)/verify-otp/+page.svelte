<script lang="ts">
	//import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Logo from '@components/icons/logo.svelte';
	import Loading from '@components/Loading.svelte';
	import { i18n } from '$lib/i18n';

	const phoneNumber = $page.params.phoneNumber;
	let code = '';
	let isDisabled = true;
	let isLoading = false;

	$: isDisabled = !code.length || !phoneNumber?.length || isLoading;

	function onSubmit() {
		alert('TODO: verify OTP');
	}
</script>

<div class="flex-1" />

<form
	class="m-4 grid items-center justify-items-center gap-6 self-center rounded-3xl bg-white p-4 text-center drop-shadow-md"
	on:submit={onSubmit}
>
	<div class="w-full text-gray-800 transition-[rotate]" style:rotate={code.length * 90 + 'deg'}>
		<Logo />
	</div>
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
