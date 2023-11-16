<script lang="ts">
	//import { goto } from '$app/navigation';

	import { i18n } from '$lib/i18n';
	import GroupForm from '@components/GroupForm.svelte';
	import Header from '@components/Header.svelte';

	function onSubmit() {
		alert('TODO: create group');
		// goto('/')
	}
</script>

<Header title={$i18n.t('create_group')} />

<main class="flex flex-col p-4">
	<GroupForm {onSubmit} />
</main>
