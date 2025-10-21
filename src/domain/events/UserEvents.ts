// src/domain/events/UserEvents.ts
// ==============================================
// Domain Events for User Aggregate
// Used to notify other parts of the system when domain actions occur
// ==============================================

export abstract class DomainEvent {
  public readonly occurredAt: Date;

  constructor(public readonly eventName: string) {
    this.occurredAt = new Date();
  }
}

// User registered event
export class UserRegisteredEvent extends DomainEvent {
  constructor(public readonly userId: string, public readonly email: string) {
    super('UserRegistered');
  }
}

// User verified email event
export class UserEmailVerifiedEvent extends DomainEvent {
  constructor(public readonly userId: string) {
    super('UserEmailVerified');
  }
}

// User disabled event
export class UserDisabledEvent extends DomainEvent {
  constructor(public readonly userId: string) {
    super('UserDisabled');
  }
}
