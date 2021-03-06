import {
	BlueprintSyncIngestNewData,
	BlueprintSyncIngestPartInstance,
	SyncIngestUpdateToPartInstanceContext
} from '@sofie-automation/blueprints-integration'
import { SharedSourceLayers } from 'tv2-constants'
import * as _ from 'underscore'
import { stopOrReplaceEditablePieces, updateAdLibInstances } from './index'
import { updatePartProperties } from './partProperties'

export function syncIngestUpdateToPartInstanceBase(
	context: SyncIngestUpdateToPartInstanceContext,
	existingPartInstance: BlueprintSyncIngestPartInstance,
	newPart: BlueprintSyncIngestNewData,
	playoutStatus: 'current' | 'next',
	/** Layers that can be have pieces added / removed / updated at any time */
	freelyEditableLayers: string[],
	preSteps?: () => void,
	postSteps?: () => void
): void {
	if (preSteps) {
		preSteps()
	}

	const editableLayers =
		playoutStatus === 'current'
			? new Set([
					...freelyEditableLayers,
					SharedSourceLayers.PgmGraphicsHeadline,
					SharedSourceLayers.PgmGraphicsIdent,
					SharedSourceLayers.PgmGraphicsIdentPersistent,
					SharedSourceLayers.PgmGraphicsLower,
					SharedSourceLayers.PgmGraphicsOverlay,
					SharedSourceLayers.PgmGraphicsTLF,
					SharedSourceLayers.PgmGraphicsTema,
					SharedSourceLayers.PgmGraphicsTop,
					SharedSourceLayers.PgmPilot,
					SharedSourceLayers.PgmPilotOverlay
			  ])
			: undefined

	stopOrReplaceEditablePieces(context, existingPartInstance, newPart, editableLayers)
	updateAdLibInstances(context, existingPartInstance, newPart)
	updatePartProperties(context, existingPartInstance, newPart)

	if (postSteps) {
		postSteps()
	}
}
