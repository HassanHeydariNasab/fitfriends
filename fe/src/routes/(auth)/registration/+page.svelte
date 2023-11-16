<script lang="ts">
	//import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { i18n } from '$lib/i18n';

	const phoneNumber = $page.url.searchParams.get('phoneNumber') || '';
	let name = '';
	let code = '';
	let agreedToTermsAndConditions = false;
	let isLoading = false;

	$: isDisabled =
		!phoneNumber.length || !name.length || !code.length || !agreedToTermsAndConditions || isLoading;

	function onSubmit() {
		alert('TODO: register user');
		// goto('/')
	}
</script>

<form
	class="m-4 grid max-w-full items-center justify-items-center gap-6 rounded-3xl bg-white p-4 pt-8 text-center drop-shadow-md transition-[filter] duration-500 focus-within:drop-shadow-2xl"
	on:submit={onSubmit}
>
	<!-- <h1 class="text-5xl font-bold">{$i18n.t('request_otp_title')}</h1> -->
	<label>
		<div class="mb-1 text-sm opacity-60">{$i18n.t('name')}</div>
		<input dir="auto" bind:value={name} />
	</label>
	<label>
		<div class="mb-1 text-sm opacity-60">{$i18n.t('code')}</div>
		<input bind:value={code} />
	</label>
	<label dir="auto" class="cursor-pointer transition-opacity hover:opacity-80">
		<input bind:checked={agreedToTermsAndConditions} type="checkbox" />
		<span class="text-sm opacity-60">{$i18n.t('terms_and_conditions')}</span>
	</label>
	<button disabled={isDisabled}>{$i18n.t('registration')}</button>
</form>
