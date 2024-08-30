import { TideData } from './types';
export function formatTideData(data: TideData): string {
  return data.data.map(item => `
${item.type.toUpperCase()} TIDE: ${new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
Height: ${item.height.toFixed(2)}m`).join('\n');
}

