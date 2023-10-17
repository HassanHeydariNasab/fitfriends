<script lang="ts">
	export let data: PageData;
	//import { goto } from '$app/navigation';

	import type { FormEventHandler } from 'svelte/elements';

	import { i18n } from '$lib/i18n';
	import Header from '@components/Header.svelte';
	import SessionForm from '@components/SessionForm.svelte';

	import type { PageData } from './$types';

	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const keys = formData.keys();
		const data: Record<string, File | string | (File | string)[]> = {};
		for (let key of keys) {
			const value = formData.getAll(key);
			data[key] = value.length === 1 ? value[0] : value;
		}
		console.log(data);
		alert('TODO: create session');
		// goto('/')
	};
</script>

<Header title={$i18n.t('create_session')} />

<main class="flex flex-col p-4">
	<SessionForm {onSubmit} group={data.group} />
</main>
