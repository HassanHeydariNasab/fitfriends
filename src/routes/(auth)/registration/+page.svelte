<script lang="ts">
	import { _ } from 'svelte-i18n';

	import Logo from '@src/components/icons/logo.svelte';

	let firstName = '';
	let lastName = '';
	let code = '';
	let agreedToTermsAndConditions = false;
	let isLoading = false;

	let isDisabled = true;
	$: isDisabled =
		!firstName.length ||
		!lastName.length ||
		!code.length ||
		!agreedToTermsAndConditions ||
		isLoading;
</script>

<div class="flex-1" />

<form class="grid items-center gap-8 self-center text-center">
	<Logo class="text-gray-800" />
	<!-- <h1 class="text-5xl font-bold">{$_('request_otp_title')}</h1> -->
	<label>
		<div class="mb-1 opacity-60">{$_('first_name')}</div>
		<input bind:value={firstName} autofocus />
	</label>
	<label>
		<div class="mb-1 opacity-60">{$_('last_name')}</div>
		<input bind:value={lastName} />
	</label>
	<label>
		<div class="mb-1 opacity-60">{$_('code')}</div>
		<input bind:value={code} />
	</label>
	<label>
		<span dir="auto" class="text-sm">{$_('terms_and_conditions')}</span>
		<input bind:checked={agreedToTermsAndConditions} type="checkbox" />
	</label>
	<button disabled={isDisabled}>{$_('registration')}</button>
</form>

<div class="flex-1" />
