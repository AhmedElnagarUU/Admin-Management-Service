// src/domain/events/EventDispatcher.ts
// ==============================================
// Domain Event Dispatcher (in-domain)
// Collects and dispatches domain events within the domain layer
// Does NOT depend on infrastructure directly
// ==============================================

import { DomainEvent } from './UserEvents';

export type DomainEventHandler<T extends DomainEvent> = (event: T) => void;

export class EventDispatcher {
  private handlers: Map<string, DomainEventHandler<any>[]> = new Map();

  // Register a handler for a specific event
  public register<T extends DomainEvent>(eventName: string, handler: DomainEventHandler<T>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  // Dispatch a single event
  public dispatch<T extends DomainEvent>(event: T): void {
    const eventHandlers = this.handlers.get(event.eventName) || [];
    for (const handler of eventHandlers) {
      handler(event);
    }
  }

  // Dispatch multiple events
  public dispatchAll(events: DomainEvent[]): void {
    for (const event of events) {
      this.dispatch(event);
    }
  }
}
