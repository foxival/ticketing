
import mongoose from 'mongoose';
import { Order } from '../../../models/order';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent, OrderStatus } from '@kcticket/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';

import { exportSpecifier } from '@babel/types';


const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 10,
        userId: 'sdllsjd',
        version: 0
    })

    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: 'dfkdfk'
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, order, data, msg };
};


it('updates the status of the order', async() => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('ack the message', async() => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})
