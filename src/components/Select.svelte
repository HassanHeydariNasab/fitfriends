<script lang="ts">
	type Value = string | number;
	export let options: { value: Value; label: string }[] = [];
	export let value: Value;
	export let buttonClass: string = '';
	export let containerClass: string = '';

	import { createEventDispatcher } from 'svelte';
	import { createListbox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	import Selector from '@icons/selector.svelte';
	import Check from '@icons/check.svelte';

	const listbox = createListbox({ label: 'Actions', selected: value });

	const dispatch = createEventDispatcher();

	function onSelect(event: Event) {
		// we don't forward the event, so we have better control over the event and typing.
		dispatch('select', (event as CustomEvent).detail);
	}
</script>

<div class="relative {containerClass}">
	<button
		use:listbox.button
		on:select={onSelect}
		class="relative w-fit rounded-lg bg-white !pr-3 sm:text-sm {buttonClass}"
	>
		<span class="block truncate">
			{options.find((option) => $listbox.selected === option.value)?.label}
		</span>
		<Selector class="ml-2 h-5 w-5" />
	</button>

	<Transition
		show={$listbox.expanded}
		leave="transition ease-in duration-100"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		<ul
			use:listbox.items
			class="absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			{#each options as option}
				{@const active = $listbox.active === option.value}
				{@const selected = $listbox.selected === option.value}
				<li
					class="relative cursor-pointer select-none py-2 pl-10 pr-4 {active
						? 'bg-amber-100 text-amber-900'
						: 'text-gray-900'}"
					use:listbox.item={{ value: option.value }}
				>
					<span class="block truncate {selected ? 'font-medium' : 'font-normal'}">
						{option.label}
					</span>
					{#if selected}
						<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
							<Check class="h-5 w-5" />
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</Transition>
</div>
