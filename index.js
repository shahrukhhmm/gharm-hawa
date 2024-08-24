import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

// Import routes
import userRoutes from "./routes/user.routes.js";
import reviewsRoutes from "./routes/reviews.route.js";
import ordersRoutes from "./routes/orders.route.js";
import deliveriesRoutes from "./routes/deliveries.route.js";
import menuRoutes from "./routes/menu.route.js";
import paymentsRoutes from "./routes/payments.route.js";
import dealsRoutes from "./routes/deal.route.js";
import "./db/dbconnect.db.js";

// PayPal SDK
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// Load environment variables
dotenv.config();

// Create PayPal client
const environment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

const client = () => new checkoutNodeJssdk.core.PayPalHttpClient(environment());

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static('public'));

// Routes
app.use("/deals", dealsRoutes);
app.use("/review", reviewsRoutes);
app.use("/orders", ordersRoutes);
app.use("/payments", paymentsRoutes);
app.use("/menu", menuRoutes);
app.use("/delivery", deliveriesRoutes);
app.use("/user", userRoutes);

// Create payment endpoint for PayPal
app.post('/createpayment', async (req, res) => {
    const { amount, method } = req.body;
    try {
        if (method === 'paypal') {
            const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
            request.prefer("return=representation");
            request.requestBody({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: amount,
                    }
                }]
            });

            const order = await client().execute(request);
            res.status(200).send({ id: order.result.id });
        } else {
            throw new Error('Invalid payment method');
        }
    } catch (error) {
        console.error('Error creating payment:', error.message);
        res.status(500).send({ error: error.message });
    }
});

// Create endpoint to capture payment
app.post('/capturepayment', async (req, res) => {
    const { orderId } = req.body;
    try {
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});
        const capture = await client().execute(request);
        res.status(200).send({ capture: capture.result });
    } catch (error) {
        console.error('Error capturing payment:', error.message);
        res.status(500).send({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
