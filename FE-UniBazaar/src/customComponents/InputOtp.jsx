import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOtpHandler } from "../hooks/useOtpHandler";

export default function InputOtp({ email }) {
  const {
    otp,
    message,
    isSubmitting,
    handleChange,
    handleSubmit,
    timeLeft,
    resetTimer,
  } = useOtpHandler(email);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center w-full sm:w-[400px] md:w-[500px] lg:w-[550px] xl:w-[600px] h-[500px] loginDiv justify-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4">Enter OTP</h2>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={handleChange}>
          <div className="flex justify-center space-x-2">
            <InputOTPGroup>
              {[...Array(3)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-16 h-16 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[...Array(3)].map((_, index) => (
                <InputOTPSlot
                  key={index + 3}
                  index={index + 3}
                  className="w-16 h-16 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </InputOTPGroup>
          </div>
        </InputOTP>
      </div>
      
      {/* Submit OTP Button */}
      <div className="flex justify-center w-full mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || timeLeft <= 0}
          className="w-2/3 hover:border-[#F58B00] border-2 p-3 bg-[#F58B00] hover:bg-[#FFC67D] text-black font-bold py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Submit OTP"}
        </button>
      </div>

      {/* Resend OTP Button */}
      <div className="flex justify-center w-full mt-4">
        <button
          onClick={resetTimer}
          disabled={timeLeft > 0}
          className={`w-2/3 border-2 py-2 px-4 font-bold rounded-md transition
            ${
              timeLeft > 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white border-[#F58B00] text-[#F58B00] hover:bg-[#FFF2E0]"
            }`}
        >
          {timeLeft > 0
            ? `Resend OTP in ${minutes}:${seconds}`
            : "Resend OTP"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className="text-sm font-medium text-center mt-2">{message}</p>
      )}
    </div>
  );
}
