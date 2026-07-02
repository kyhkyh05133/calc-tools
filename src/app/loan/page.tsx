import LoanCalculator from "@/components/LoanCalculator";
import { getTranslation } from "@/lib/translations";
import { cookies } from "next/headers";

export default function LoanPage() {
  return (
    <div>
      <LoanCalculator />
    </div>
  );
}
