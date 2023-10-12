<script lang="ts">
	export let data: PageData;

	import GroupForm from '@components/GroupForm.svelte';
	import type { PageData } from './$types';

	function onSubmit() {
		alert('TODO: edit group');
	}
</script>

<GroupForm {onSubmit} group={data?.group} submitButtonLabel="edit_group" />
