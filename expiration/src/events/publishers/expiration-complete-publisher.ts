import { Subjects, Publisher, ExpirationCompleteEvent } from '@kcticket/common';


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}