<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	import { i18n } from '$lib/i18n';
	import { currentUser } from '@stores/auth';

	const onChangeLanguage: ChangeEventHandler<HTMLSelectElement> = (event) => {
		const language = event.currentTarget.value;
		$i18n.changeLanguage(language);
	};
</script>

<h2 dir="auto">{$i18n.t('hello')} {$currentUser?.name}</h2>
<select on:change={onChangeLanguage} value={$i18n.language}>
	<option value="en-US">English</option>
	<option value="fa-IR">فارسی</option>
</select>
