<script lang="ts">
	export let isInDynamicMarkerMode: boolean = false;
	export let dynamicMarkerLat: number = 35.8;
	export let dynamicMarkerLng: number = 51.44;
	export let dynamicMarkerName: string = '';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	import { PUBLIC_MAPBOX_TOKEN, PUBLIC_MAPBOX_STYLE } from '$env/static/public';

	import { Map, Marker, controls } from '@beyonk/svelte-mapbox/components';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;
	import MapboxLanguage from '@mapbox/mapbox-gl-language';

	import { i18n } from '$lib/i18n';
	import CusotmMarker from '@components/Marker.svelte';
	import BottomSheet from '@components/BottomSheet.svelte';
	import SessionOverview from '@components/SessionOverview.svelte';
	import { mockedSessions } from '@data/sessions.mock';
	import type { Session } from '@src/type/session';

	let mapComponent: Map;
	let { lat, lng, zoom } = { lat: 35.8, lng: 51.44, zoom: 16 };

	let sessions: Session[] = mockedSessions;
	let selectedSessionId: string | undefined = undefined;
	let selectedSession: Session | undefined = undefined;

	$: selectedSession = sessions?.find((session) => session.id === selectedSessionId);

	onMount(() => {
		// TODO: fetch sessions
	});

	function onReady() {
		mapComponent?.setCenter([lng, lat], zoom);
		const language = new MapboxLanguage();
		mapComponent?.getMap().addControl(language);
		if (mapComponent?.getMapbox().getRTLTextPluginStatus() !== 'loaded') {
			mapComponent
				?.getMapbox()
				.setRTLTextPlugin(
					'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
				);
		}

		//mapComponent?.flyTo({ center: [lng, lat] }); // documentation (https://docs.mapbox.com/mapbox-gl-js/example/flyto)
	}

	export function setCenter(lat: number, lng: number) {
		mapComponent?.setCenter([lng, lat], zoom);
	}

	function onRecenter(event: Map['$on:recentre']) {
		const { lat: newLat, lng: newLng } = event.detail.center;
		if (newLat && newLng) {
			lat = newLat;
			lng = newLng;
		}
		dispatch('recentre', { lat, lng });
	}

	function onGeolocate(event: Map['$on:geolocate']) {
		lat = event.detail.coords.latitude;
		lng = event.detail.coords.longitude;
		// fetch sessions
	}

	function onClick(event: Map['$on:click']) {
		dispatch('click', event.detail);
	}

	function showSession(id: string) {
		selectedSessionId = id;
	}

	function hideSession() {
		selectedSessionId = undefined;
	}
</script>

<svelte:head><title>{$i18n.t('app_name')} | {$i18n.t('explore')}</title></svelte:head>

<Map
	accessToken={PUBLIC_MAPBOX_TOKEN}
	bind:this={mapComponent}
	on:ready={onReady}
	on:recentre={onRecenter}
	on:click={onClick}
	bind:zoom
	options={{ scrollZoom: true }}
	style={PUBLIC_MAPBOX_STYLE}
	customStylesheetUrl={true}
>
	{#each sessions as session}
		<Marker lat={session.latitude} lng={session.longitude} popup={false} markerOffset={[0, -32]}>
			<CusotmMarker
				name={session.group.title}
				onClick={isInDynamicMarkerMode
					? undefined
					: () => {
							showSession(session.id);
					  }}
			/>
		</Marker>
	{/each}

	{#if isInDynamicMarkerMode}
		<Marker lat={dynamicMarkerLat} lng={dynamicMarkerLng} popup={false} markerOffset={[0, -32]}>
			<CusotmMarker name={dynamicMarkerName} isAlternative />
		</Marker>
	{/if}

	<NavigationControl />
	<GeolocateControl
		options={{
			positionOptions: { enableHighAccuracy: true },
			showUserLocation: true,
			showUserHeading: true,
			showAccuracyCircle: true,
			trackUserLocation: true
		}}
		on:geolocate={onGeolocate}
	/>
	<ScaleControl />
</Map>
{#if selectedSession}
	<BottomSheet on:close={hideSession}><SessionOverview session={selectedSession} /></BottomSheet>
{/if}
