export interface DomainEvent {
  eventId: string;        // Unique identifier for this event
  eventName: string;      // Name of the event (e.g. "UserRegistered")
  occurredOn: Date;       // Timestamp of when it happened
}
