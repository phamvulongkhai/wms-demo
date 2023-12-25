import { InboundDocument } from 'src/modules/inbounds/schemas/inbound.schema';
import { OutboundDocument } from 'src/modules/outbounds/schemas/outbound.schema';
import { ItemQuantity } from './../common/item.quantity';

export function calculateInventory(
  inputs: [InboundDocument[], OutboundDocument[], InboundDocument[]],
  id: string,
): number {
  const [a, b, c] = inputs.map((input) => {
    const results = input.flatMap((i) => {
      return i.items;
    });
    return calculateItemQuantity(results, id);
  });
  return a - b + c;
}

export function isGteZero(n: number): boolean {
  return n >= 0 ? true : false;
}

function calculateItemQuantity(items: ItemQuantity[], id: string): number {
  return items.reduce((n, item) => {
    if (item.id === id) {
      return n + item.quantity;
    }
    return n;
  }, 0);
}
