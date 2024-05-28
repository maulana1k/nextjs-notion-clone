"use client";

import { useEffect } from "react";
import { Footer } from "./_component/footer";
import { Heading } from "./_component/heading";
import { Heroes } from "./_component/heroes";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const MarketingPage = () => {
  const addUser = useMutation(api.documents.addUserData);
  useEffect(() => {
    const sendGeolocation = async (latitude: number, longitude: number) => {
      const data = JSON.stringify({ latitude, longitude });
      await addUser({ data });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendGeolocation(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [addUser]);
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-6">
        <Heading />
        <Heroes />
        <Footer />
      </div>
    </div>
  );
};

export default MarketingPage;
