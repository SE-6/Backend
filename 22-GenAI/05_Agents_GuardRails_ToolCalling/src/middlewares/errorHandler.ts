import { InputGuardrailTripwireTriggered } from '@openai/agents';
import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // if (err instanceof InputGuardrailTripwireTriggered) {
  //   res.status(400).json({
  //     message: 'Sorry, i can only help with pillow questions.',
  //   });
  // }

  const status = (err.cause as { status?: number })?.status ?? 500;

  res.status(status).json({ message: err.message || 'Internal Server error' });
};

export default errorHandler;
