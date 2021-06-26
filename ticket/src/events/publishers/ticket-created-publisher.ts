import { Publisher, Subjects, TicketCreatedEvent } from '@kcticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

