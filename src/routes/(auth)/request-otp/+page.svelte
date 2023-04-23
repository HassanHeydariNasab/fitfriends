<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { PUBLIC_API_URL } from '$env/static/public';

	import Logo from '@components/icons/logo.svelte';
	import Loading from '@src/components/Loading.svelte';
	import { goto } from '$app/navigation';

	let phoneNumber = '';
	let isDisabled = true;
	let isLoading = false;

	$: isDisabled = phoneNumber.match(/^\+?\d{2,}$/) === null || isLoading;

	function onSubmit() {
		isLoading = true;
		fetch(`${PUBLIC_API_URL}/v1/Signin`, {
			method: 'POST',
			body: JSON.stringify({ phoneNumber }),
			headers: { Authorization: 'Basic YWRtaW46UG9za3MyMUAh', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				if (response.status === 400) {
					goto('/registration');
				} else if (response.status === 200) {
					goto(`/verify-otp?phoneNumber=${phoneNumber}`);
				}
			})
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<div class="flex-1" />

<form
	class="m-4 grid items-center justify-items-center gap-6 self-center rounded-3xl bg-white p-4 text-center drop-shadow-md"
	on:submit={onSubmit}
>
	<div
		class="w-full text-gray-800 transition-[rotate]"
		style:rotate={phoneNumber.length * 35 + 'deg'}
	>
		<Logo />
	</div>
	<!-- <h1 class="text-5xl font-bold">{$_('request_otp_title')}</h1> -->
	<label>
		<div class="mb-1 text-sm opacity-60">{$_('phone_number')}</div>
		<input bind:value={phoneNumber} type="tel" autofocus disabled={isLoading} />
	</label>
	<button disabled={isDisabled}>
		{$_('login')}
		{#if isLoading}
			<Loading />
		{/if}</button
	>
</form>

<div class="flex-1" />
