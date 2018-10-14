export function newSection(){
	return {
		type: 'NEW_SECTION'
	};
}

export function duplicateSection(sectionKey){
	return {
		type: 'DUPLICATE_SECTION',
		sectionKey
	};
}

export function deleteSection(sectionKey){
	return {
		type: 'DELETE_SECTION',
		sectionKey
	};
}

export function moveSection(sectionKey, newPosition){
	return {
		type: 'MOVE_SECTION',
		sectionKey,
		newPosition
	};
}