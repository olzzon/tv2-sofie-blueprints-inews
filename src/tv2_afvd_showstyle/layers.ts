import { SharedSourceLayers } from 'tv2-constants'

export enum AFVDSourceLayer {
	// Pgm
	PgmDVE = 'studio0_dve',
	PgmServer = 'studio0_clip',
	PgmVoiceOver = 'studio0_voiceover',
	PgmLocal = 'studio0_local',
	PgmContinuity = 'studio0_continuity',

	VizFullIn1 = 'studio0_aux_viz_full1',
	AuxStudioScreen = 'studio0_aux_studio_screen',
	PgmDVEBackground = 'studio0_dve_back',
	PgmFullBackground = 'studio0_full_back',
	PgmDesign = 'studio0_design',
	PgmAdlibVizCmd = 'studio0_adlib_viz_cmd', // shortcuts
	PgmSisyfosAdlibs = 'studio0_sisyfos_adlibs', // shortcuts
	PgmJingle = 'studio0_jingle',
	PgmScript = 'studio0_script',
	// PgmSlutord = 'studio0_slutord',
	PgmAudioBed = 'studio0_audio_bed',

	// Wall
	WallGraphics = 'studio0_wall_graphics'
}

// tslint:disable-next-line: variable-name
export const SourceLayer = {
	...AFVDSourceLayer,
	...SharedSourceLayers
}
export type SourceLayer = AFVDSourceLayer | SharedSourceLayers
