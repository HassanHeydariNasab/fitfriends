<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';

	import { i18n } from '$lib/i18n';
	import GroupForm from '@components/GroupForm.svelte';
	import Header from '@components/Header.svelte';

	function onSubmit() {
		alert('TODO: edit group');
	}
</script>

<Header title={$i18n.t('edit_group')} />

<main class="flex flex-col p-4">
	<GroupForm {onSubmit} group={data?.group} submitButtonLabel="edit_group" />
</main>
