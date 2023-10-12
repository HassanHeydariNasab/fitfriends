<script lang="ts">
	import { onMount } from 'svelte';
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

	function onRecenter(event: Map['$on:recentre']) {
		console.log(event.detail.center.lat, event.detail.center.lng);
	}

	function onGeolocate(event: Map['$on:geolocate']) {
		lat = event.detail.coords.latitude;
		lng = event.detail.coords.longitude;
		// fetch sessions
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
	bind:zoom
	options={{ scrollZoom: true }}
	style={PUBLIC_MAPBOX_STYLE}
	customStylesheetUrl={true}
>
	{#each sessions as session}
		<Marker lat={session.latitude} lng={session.longitude} popup={false} markerOffset={[0, -32]}>
			<CusotmMarker
				name={session.group.title}
				on:click={() => {
					showSession(session.id);
				}}
			/>
		</Marker>
	{/each}

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
