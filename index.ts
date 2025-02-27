import { pack, record } from 'rrweb';
import type { Plugin, ResolvedConfig } from '@falcontracker/sdk';

const eventsMatrix: any[][] = [[]];
function getScreenRecords(): string {
    const length = eventsMatrix.length;
    let events: any[];
    if (length <= 1) {
      events = length === 0 ? [] : eventsMatrix[0];
    } else {
      events = eventsMatrix[length - 2].concat(eventsMatrix[length - 1]);
    }
    return JSON.stringify(events);
}

export function createRrwebPlugin(): Plugin {
    let resolved: ResolvedConfig;
    return {
        name: 'rrweb-plugin',
        configResolved(config) {
            resolved = config;
            if (config.extra && config.extra['screenRecord']) {
                record({
                    packFn: pack,
                    emit(event, checkout) {
                        if (checkout) {
                            eventsMatrix.push([]);
                        }
                        let length = eventsMatrix.length;
                        if (length > 2) {
                            eventsMatrix.splice(0, eventsMatrix.length - 2);
                            length = 2;
                        }
                        const lastEvents: any[] = eventsMatrix[length - 1]!;
                        lastEvents.push(event);
                    },
                    checkoutEveryNth: 200,
                });
            }
        },
        load(data) {
            if(data.category === "error") {
                if (data.type === "error" || data.type === "unhandledrejection") {
                    if (resolved.extra && resolved.extra['screenRecord']) {
                        return {
                            ...data,
                            screenRecords: getScreenRecords()
                        }
                    }
                }
            }
        }
    }
}