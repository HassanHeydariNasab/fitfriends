<script lang="ts">
	//import Logo from '@components/icons/logo.svelte';
	import { i18n } from '$lib/i18n';

	let name = '';
	let code = '';
	let agreedToTermsAndConditions = false;
	let isLoading = false;

	let isDisabled = true;
	$: isDisabled = !name.length || !code.length || !agreedToTermsAndConditions || isLoading;
</script>

<div class="flex-1" />

<form
	class="m-4 grid items-center justify-items-center gap-6 self-center rounded-3xl bg-white p-4 text-center drop-shadow-md"
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
	<label dir="auto">
		<input bind:checked={agreedToTermsAndConditions} type="checkbox" />
		<span class="text-sm">{$i18n.t('terms_and_conditions')}</span>
	</label>
	<button disabled={isDisabled}>{$i18n.t('registration')}</button>
</form>

<div class="flex-1" />
