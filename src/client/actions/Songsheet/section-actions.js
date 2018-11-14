export const newSection = () => ({
  type: 'NEW_SECTION'
});

export const duplicateSection = sectionKey => ({
  type: 'DUPLICATE_SECTION',
  sectionKey
});

export const deleteSection = sectionKey => ({
  type: 'DELETE_SECTION',
  sectionKey
});

export const moveSection = (sectionKey, newPosition) => ({
  type: 'MOVE_SECTION',
  sectionKey,
  newPosition
});
