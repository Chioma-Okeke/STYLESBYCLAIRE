import "server-only";
import { SquareClient, SquareEnvironment } from "square";

export const square = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment:
        process.env.SQUARE_ENV === "production"
            ? SquareEnvironment.Production
            : SquareEnvironment.Sandbox,
});

export const LOCATION_ID = process.env.SQUARE_LOCATION_ID;
