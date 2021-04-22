import { ISourceLayer, SourceLayerType } from '@sofie-automation/blueprints-integration'
import { GetDSKSourceLayerDefaults, literal } from 'tv2-common'
import { SharedSourceLayers } from 'tv2-constants'
import { ATEMModel } from '../../types/atem'
import { OfftubeSourceLayer } from '../layers'

// OVERLAY group
const OVERLAY: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.PgmGraphicsIdent,
		_rank: 10,
		name: 'Ident',
		abbreviation: 'G',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsIdentPersistent,
		_rank: 10,
		name: 'Ident Persistent',
		abbreviation: 'G',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsTop,
		_rank: 20,
		name: 'Top',
		abbreviation: 'G',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: true,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsLower,
		_rank: 30,
		name: 'Bund',
		abbreviation: 'G',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: true,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsHeadline,
		_rank: 40,
		name: 'Headline',
		abbreviation: 'G',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: true,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsOverlay,
		_rank: 50,
		name: 'Overlay',
		abbreviation: 'O',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsTLF,
		_rank: 60,
		name: 'Telefon',
		abbreviation: 'TLF',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmGraphicsTema,
		_rank: 70,
		name: 'Tema',
		abbreviation: 'T',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.WallGraphics,
		_rank: 80,
		name: 'Wall',
		abbreviation: 'Wall',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: SharedSourceLayers.PgmPilotOverlay,
		_rank: 60,
		name: 'Overlay',
		abbreviation: 'O',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: ',q',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: true,
		onPresenterScreen: false
	}
]

// JINGLE group
const JINGLE: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.PgmJingle,
		_rank: 10,
		name: 'Jingle',
		abbreviation: '',
		type: SourceLayerType.TRANSITION,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: ',',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	}
]

// PGM group
const PGM: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.PgmCam,
		_rank: 0,
		name: 'Kam',
		abbreviation: 'K',
		type: SourceLayerType.CAMERA,
		exclusiveGroup: 'me2',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'f1,shift+ctrl+f1',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmLive,
		_rank: 0,
		name: 'Live',
		abbreviation: 'L',
		type: SourceLayerType.REMOTE,
		exclusiveGroup: 'me2',
		isRemoteInput: true,
		isGuestInput: false,
		activateKeyboardHotkeys: 'ctrl+shift+alt+b,1,2,3',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		stickyOriginalOnly: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmDVE,
		_rank: 0,
		name: 'DVE',
		abbreviation: 'D',
		type: SourceLayerType.SPLITS,
		exclusiveGroup: 'me2',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		stickyOriginalOnly: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmDVEAdLib,
		_rank: 0,
		name: 'DVE',
		abbreviation: 'D',
		type: SourceLayerType.SPLITS,
		exclusiveGroup: 'me1',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'f10,m,comma,.,n,c,b,v',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmServer,
		_rank: 0,
		name: 'Server',
		abbreviation: 'S',
		type: SourceLayerType.VT,
		exclusiveGroup: 'me2',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmVoiceOver,
		_rank: 0,
		name: 'Voice Over',
		abbreviation: 'VO',
		type: SourceLayerType.LIVE_SPEAK,
		exclusiveGroup: 'me2',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: ',',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmPilot,
		_rank: 0,
		name: 'Full',
		abbreviation: 'Full',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: 'me2',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmDVEBackground,
		_rank: 50,
		name: 'DVE Background',
		abbreviation: '',
		type: SourceLayerType.METADATA,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmContinuity,
		_rank: 50,
		name: 'CONTINUITY',
		abbreviation: 'CONTINUITY',
		type: SourceLayerType.METADATA,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.PgmDVEBox1,
		_rank: 0,
		name: 'DVE INP1',
		abbreviation: 'DB1',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'shift+f1,shift+1,shift+2,shift+3,shift+t',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmDVEBox2,
		_rank: 0,
		name: 'DVE INP2',
		abbreviation: 'DB2',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'ctrl+f1,ctrl+1,ctrl+2,ctrl+3,ctrl+alt+shift+g',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmDVEBox3,
		_rank: 0,
		name: 'DVE INP3',
		abbreviation: 'DB3',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: 'alt+shift+f1,alt+shift+1,alt+shift+2,alt+shift+3',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmDVEBox4,
		_rank: 0,
		name: 'DVE INP4',
		abbreviation: 'DB4',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	},
	...GetDSKSourceLayerDefaults(ATEMModel.PRODUCTION_STUDIO_4K_2ME)
]

// MUSIK group
const MUSIK: ISourceLayer[] = [
	{
		_id: SharedSourceLayers.PgmAudioBed,
		_rank: 30,
		name: 'Audio bed',
		abbreviation: 'VO',
		type: SourceLayerType.AUDIO,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: ',minus',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	}
]

// MANUS group
const MANUS: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.PgmScript,
		_rank: 20,
		name: 'Manus',
		abbreviation: '',
		type: SourceLayerType.SCRIPT,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	}
]

// SEC group
const SEC: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.PgmAdlibGraphicCmd,
		_rank: 10,
		name: 'Graphic Adlibs',
		abbreviation: '',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'q',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmDesign,
		_rank: 30,
		name: 'GFX Design',
		abbreviation: '',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'shift+a',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmSisyfosAdlibs,
		_rank: 50,
		name: 'Sisyfos Adlibs',
		abbreviation: '',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'ctrl+shift+alt+e,ctrl+shift+alt+d',
		clearKeyboardHotkey: ',',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.PgmAdlibJingle,
		_rank: 10,
		name: 'Jingle AdLibs',
		abbreviation: '',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: 'NumpadDivide,NumpadSubtract,NumpadAdd',
		clearKeyboardHotkey: ',',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	}
]

// SELECTED_ADLIB group
const SELECTED_ADLIB: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.SelectedAdLibDVE,
		_rank: 0,
		name: 'DVE',
		abbreviation: 'D',
		type: SourceLayerType.SPLITS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: true,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.SelectedServer,
		_rank: 0,
		name: 'Server',
		abbreviation: 'S',
		type: SourceLayerType.VT,
		exclusiveGroup: 'server',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: true,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.SelectedVoiceOver,
		_rank: 0,
		name: 'Voice Over',
		abbreviation: 'VO',
		type: SourceLayerType.LIVE_SPEAK,
		exclusiveGroup: 'server',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: true,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.SelectedAdlibGraphicsFull,
		_rank: 0,
		name: 'GFX Full',
		abbreviation: 'GFX Full',
		type: SourceLayerType.GRAPHICS,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: true,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: true
	},
	{
		_id: OfftubeSourceLayer.SelectedAdlibJingle,
		_rank: 0,
		name: 'Jingle',
		abbreviation: 'Jingle',
		type: SourceLayerType.TRANSITION,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: false,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: true,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: true
	}
]

// AUX group
const AUX: ISourceLayer[] = [
	{
		_id: OfftubeSourceLayer.AuxStudioScreen,
		_rank: 20,
		name: 'Studio',
		abbreviation: '',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys:
			'shift+ctrl+1,shift+ctrl+2,shift+ctrl+3,shift+ctrl+4,shift+ctrl+5,shift+ctrl+6,shift+ctrl+7,shift+ctrl+8,shift+ctrl+9,shift+ctrl+0,shift+ctrl+e',
		clearKeyboardHotkey: ',',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: false,
		allowDisable: false,
		onPresenterScreen: false
	},
	{
		_id: OfftubeSourceLayer.AuxPgmClean,
		_rank: 21,
		name: 'Pgm Clean',
		abbreviation: '',
		type: SourceLayerType.UNKNOWN,
		exclusiveGroup: '',
		isRemoteInput: false,
		isGuestInput: false,
		activateKeyboardHotkeys: '',
		clearKeyboardHotkey: '',
		assignHotkeysToGlobalAdlibs: true,
		isSticky: false,
		activateStickyKeyboardHotkey: '',
		isQueueable: false,
		isHidden: true,
		allowDisable: false,
		onPresenterScreen: false
	}
]

export default literal<ISourceLayer[]>([
	...OVERLAY,
	...JINGLE,
	...PGM,
	...MUSIK,
	...MANUS,
	...SEC,
	...SELECTED_ADLIB,
	...AUX
])
