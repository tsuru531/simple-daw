export const judgeGrabCursor = (
  isHover: boolean,
  isActive: boolean
): 'grab' | 'grabbing' | 'auto' => {
  if (isActive) return 'grabbing';
  if (isHover) return 'grab';
  return 'auto';
};
