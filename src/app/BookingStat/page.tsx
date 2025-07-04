import { Suspense } from "react";
import StatsClient from "@/components/StatsClient";

export default function BookingStatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StatsClient />
        </Suspense>
    );
}