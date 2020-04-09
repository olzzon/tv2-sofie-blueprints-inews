import { DeviceType, ExpectedPlayoutItemContentVizMSE } from 'timeline-state-resolver-types'
import { IBlueprintAdLibPiece, IBlueprintPiece } from 'tv-automation-sofie-blueprints-integration'

// TMP!!!!!!!!!!!!!!!!!!!!
// This is to be moved into IBlueprintPieceGeneric
export interface IBlueprintPieceEPI extends IBlueprintPiece {
	expectedPlayoutItems?: ExpectedPlayoutItemGeneric[]
}

export interface IBlueprintAdLibPieceEPI extends IBlueprintAdLibPiece {
	expectedPlayoutItems?: ExpectedPlayoutItemGeneric[]
}

export interface ExpectedPlayoutItemGeneric {
	// TMP! This is to be moved into the blueprint definitions!

	/** What type of playout device this item should be handled by */
	deviceSubType: DeviceType // subset of PeripheralDeviceAPI.DeviceSubType
	/** Which playout device this item should be handled by */
	// deviceId: string // Todo: implement deviceId support (later)

	content: ExpectedPlayoutItemContent
}
export type ExpectedPlayoutItemContent = ExpectedPlayoutItemContentVizMSE