<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL, PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	import { Map, Marker, controls } from '@beyonk/svelte-mapbox/components';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;

	import CusotmMarker from '@components/marker.svelte';
	import type { Business } from '@type/business';

	let mapComponent: Map;
	let { lat, lng, zoom } = { lat: 35.8, lng: 51.44, zoom: 16 };

	let businesses: Business[] = [];

	onMount(() => {
		fetchBusinesses();
	});

	function onReady() {
		mapComponent?.setCenter([lng, lat], zoom);
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

	function showBusiness(id: string | null) {
		console.log({ id });
	}

	function fetchBusinesses() {
		fetch(`${PUBLIC_API_URL}/v1/GeoSearch/${lng},${lat}`)
			.then((response) => response.json())
			.then((j) => {
				businesses = j.list;
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
	style="mapbox://styles/mapbox/outdoors-v11"
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
		options={{ positionOptions: { enableHighAccuracy: true }, showUserHeading: true }}
		on:geolocate={onGeolocate}
	/>
	<ScaleControl />
</Map>
