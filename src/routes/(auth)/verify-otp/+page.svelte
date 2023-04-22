<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { _ } from 'svelte-i18n';

	import Logo from '@components/icons/logo.svelte';
	import Loading from '@src/components/Loading.svelte';

	const phoneNumber = $page.url.searchParams.get('phoneNumber');
	let code = '';
	let isDisabled = true;
	let isLoading = false;

	$: isDisabled = !code.length || !phoneNumber?.length || isLoading;

	function onSubmit() {
		isLoading = true;
		fetch(`${PUBLIC_API_URL}/v1/Signin/verify`, {
			method: 'POST',
			body: JSON.stringify({ phoneNumber, code }),
			headers: { Authorization: 'Basic YWRtaW46UG9za3MyMUAh', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				if (response.status === 400) {
					goto('/registration');
				} else if (response.status === 200) {
					goto('/verify-otp');
				}
			})
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<div class="flex-1" />

<form class="grid items-center gap-8 self-center text-center" on:submit={onSubmit}>
	<div class="text-gray-800 transition-[rotate]" style:rotate={code.length * 90 + 'deg'}>
		<Logo />
	</div>
	<!-- <h1 class="text-5xl font-bold">{$_('request_otp_title')}</h1> -->
	<label>
		<div class="mb-1 opacity-60">{$_('code')}</div>
		<input bind:value={code} type="tel" autofocus disabled={isLoading} />
	</label>
	<button disabled={isDisabled}>
		{$_('confirm')}
		{#if isLoading}
			<Loading />
		{/if}</button
	>
</form>

<div class="flex-1" />
