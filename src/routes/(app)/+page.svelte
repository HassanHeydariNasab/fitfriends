<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL, PUBLIC_MAPBOX_TOKEN, PUBLIC_MAPBOX_STYLE } from '$env/static/public';

	import { Map, Marker, controls } from '@beyonk/svelte-mapbox/components';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;
	import MapboxLanguage from '@mapbox/mapbox-gl-language';

	import CusotmMarker from '@components/Marker.svelte';
	import BottomSheet from '@components/BottomSheet.svelte';
	import BusinessShortInfo from '@components/BusinessShortInfo.svelte';
	import type { Business } from '@type/business';
	import { mockedBusinesses } from '@data/businesses.mock';

	let mapComponent: Map;
	let { lat, lng, zoom } = { lat: 35.8, lng: 51.44, zoom: 16 };

	let businesses: Business[] = mockedBusinesses;
	let selectedBusinessId: string | undefined = undefined;
	let selectedBusiness: Business | undefined = undefined;

	$: selectedBusiness = businesses?.find((business) => business.id === selectedBusinessId);

	onMount(() => {
		fetchBusinesses();
	});

	function onReady() {
		mapComponent?.setCenter([lng, lat], zoom);
		const language = new MapboxLanguage();
		mapComponent?.getMap().addControl(language);
		mapComponent
			?.getMapbox()
			.setRTLTextPlugin(
				'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
			);

		//mapComponent?.flyTo({ center: [lng, lat] }); // documentation (https://docs.mapbox.com/mapbox-gl-js/example/flyto)
	}

	function onRecenter(event: any) {
		console.log(event.detail.center.lat, event.detail.center.lng);
	}

	function onGeolocate(event: any) {
		lat = event.detail.coords.latitude;
		lng = event.detail.coords.longitude;
		fetchBusinesses();
	}

	function showBusiness(id: string) {
		console.log({ id });
		selectedBusinessId = id;
	}

	function hideBusiness() {
		console.log('XXX');
		selectedBusinessId = undefined;
	}

	function fetchBusinesses() {
		fetch(`${PUBLIC_API_URL}/v1/GeoSearch/${lng},${lat},2`)
			.then((response) => response.json())
			.then((j: { total: number; list: Business[] }) => {
				if (j.total) {
					businesses = j.list;
				}
				console.log({ j });
			});
	}
</script>

<Map
	accessToken={PUBLIC_MAPBOX_TOKEN}
	bind:this={mapComponent}
	on:ready={onReady}
	on:recentre={onRecenter}
	bind:zoom
	options={{ scrollZoom: true }}
	style={PUBLIC_MAPBOX_STYLE}
	customStylesheetUrl={true}
>
	{#each businesses as business}
		<Marker
			lat={business.location[1]}
			lng={business.location[0]}
			popup={false}
			markerOffset={[0, -32]}
		>
			<CusotmMarker
				name={business.name || 'سالن زیبایی'}
				on:click={() => {
					showBusiness(business.id);
				}}
			/>
		</Marker>
	{/each}

	<NavigationControl />
	<GeolocateControl
		options={{
			positionOptions: { enableHighAccuracy: true },
			showUserHeading: true,
			showAccuracyCircle: false
		}}
		on:geolocate={onGeolocate}
	/>
	<ScaleControl />
</Map>
{#if selectedBusiness}
	<BottomSheet on:close={hideBusiness}
		><BusinessShortInfo business={selectedBusiness} /></BottomSheet
	>
{/if}
