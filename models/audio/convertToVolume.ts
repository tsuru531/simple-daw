export const convertToVolume = (analyserNode, uint8Array) => {
  analyserNode.getByteTimeDomainData(uint8Array);
  const max = uint8Array.reduce((a, b) => {
    return Math.max(a, b);
  });
  const min = uint8Array.reduce((a, b) => {
    return Math.min(a, b);
  });
  const result = Math.max(Math.abs(128 - max), Math.abs(128 - min));
  return result;
};
