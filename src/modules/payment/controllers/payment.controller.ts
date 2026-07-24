import { Request, Response } from "express";

import PaymentService from "../services/payment.service";

import {
  createOrderSchema,
  verifyPaymentSchema,
  refundPaymentSchema,
  paymentHistorySchema,
} from "../validations/payment.validation";

class PaymentController {
  /**
   * Create Payment Order
   */
  async createOrder(req: Request, res: Response) {
    const body = createOrderSchema.parse(req.body);

    const payment = await PaymentService.createOrder(
      req.user!.id,
      body
    );

    return res.status(201).json({
      success: true,
      message: "Payment order created successfully.",
      data: payment,
    });
  }

  /**
   * Verify Payment
   */
  async verifyPayment(req: Request, res: Response) {
    const body = verifyPaymentSchema.parse(req.body);

    const result = await PaymentService.verifyPayment(
      req.user!.id,
      body
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }

  /**
   * Get Payment Details
   */
  async getPayment(req: Request, res: Response) {
    const payment =
      await PaymentService.paymentDetails(
        req.params.bookingId,
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      data: payment,
    });
  }

  /**
   * Payment History
   */
  async paymentHistory(
    req: Request,
    res: Response
  ) {
    const query = paymentHistorySchema.parse(
      req.query
    );

    const history =
      await PaymentService.paymentHistory(
        req.user!.id,
        query
      );

    return res.status(200).json({
      success: true,
      data: history,
    });
  }

  /**
   * Refund Payment
   */
  async refundPayment(
    req: Request,
    res: Response
  ) {
    const body = refundPaymentSchema.parse(
      req.body
    );

    const result =
      await PaymentService.refundPayment(
        req.user!.id,
        body
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }

  /**
   * Generate Invoice
   */
  async invoice(
    req: Request,
    res: Response
  ) {
    const invoice =
      await PaymentService.generateInvoice(
        req.params.bookingId,
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  }

  /**
   * Razorpay Webhook
   *
   * NOTE:
   * Webhook business logic will be implemented later.
   */
  async webhook(
    req: Request,
    res: Response
  ) {
    return res.status(200).json({
      success: true,
      message: "Webhook received.",
    });
  }

  /**
   * Health Check
   */
  async health(
    _: Request,
    res: Response
  ) {
    return res.status(200).json({
      success: true,
      module: "Payment",
      status: "Working",
    });
  }
}

export default new PaymentController();