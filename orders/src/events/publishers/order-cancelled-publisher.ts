import { Subjects, Publisher, OrderCancelledEvent  } from "@kcticket/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

