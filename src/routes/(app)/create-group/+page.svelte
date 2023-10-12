<script lang="ts">
	//import { goto } from '$app/navigation';

	import GroupForm from '@components/GroupForm.svelte';

	function onSubmit() {
		alert('TODO: create group');
		// goto('/')
	}
</script>

<GroupForm {onSubmit} />
