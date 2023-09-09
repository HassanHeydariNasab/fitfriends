<script lang="ts">
	//import { goto } from '$app/navigation';

	//import Logo from '@components/icons/logo.svelte';
	import Loading from '@components/Loading.svelte';
	import { i18n } from '$lib/i18n';

	let phoneNumber = '';
	let isLoading = false;

	$: isDisabled = phoneNumber.match(/^\+?\d{2,}$/) === null || isLoading;

	function onSubmit() {
		// if user doesn't exist:
		// goto('/registration')
		// else:
		// goto('/verify-otp?phoneNumber=' + phoneNumber)
	}
</script>

<div class="flex-1" />

<form
	class="m-4 grid max-w-full items-center justify-center justify-items-center gap-6 self-center rounded-3xl bg-white p-4 pt-8 text-center drop-shadow-md transition-[filter] duration-500 focus-within:drop-shadow-2xl"
	on:submit={onSubmit}
>
	<!--
	<div
		class="w-full text-gray-800 transition-[rotate]"
		style:rotate={phoneNumber.length * 35 + 'deg'}
	>
		<Logo />
	</div>
  -->
	<!-- <h1 class="text-5xl font-bold">{$_('request_otp_title')}</h1> -->
	<label>
		<div class="mb-1 text-sm opacity-60">{$i18n.t('phone_number')}</div>
		<input bind:value={phoneNumber} type="tel" disabled={isLoading} />
	</label>
	<button disabled={isDisabled}>
		{$i18n.t('login')}
		{#if isLoading}
			<Loading />
		{/if}</button
	>
</form>

<div class="flex-1" />
