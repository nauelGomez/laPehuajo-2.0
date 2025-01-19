export function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  } catch (error) {
    return false;
  }
}