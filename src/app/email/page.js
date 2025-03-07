"use client";

import React from "react";

import styles from "./page.module.css";
import Inbox from "@/components/Inbox/Inbox";
import InboxSkeleton from "@/components/Loading/InboxSkeleton/InboxSkeleton";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const [loading, toggleLoading] = React.useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <div className={styles.page}>
      {status === "loading" || loading ? (
        <InboxSkeleton />
      ) : status === "authenticated" ? (
        <Inbox provider={'contact@norxwestdesigns.ca'} />
      ) : null}
    </div>
  );
  
};

export default page;
