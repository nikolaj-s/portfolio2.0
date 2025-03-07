"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./Inbox.module.css";
import InboxSkeleton from "../Loading/InboxSkeleton/InboxSkeleton";
import { EmailListNav } from "./EmailListNav/EmailListNav";
import { EmailCard } from "./EmailCard/EmailCard";
import { EmailDetails } from "./EmailDetails/EmailDetails";
import ConfirmAction from "./ConfirmAction/ConfirmAction";
import InBoxActionLoading from "./InboxActionLoading/InBoxActionLoading";
import SentNotification from "./SentNotification/SentNotification";
import ErrorOverlay from "./ErrorOverlay/ErrorOverlay";

const Inbox = ({provider}) => {
  const [emails, setEmails] = useState([]); // Store emails

  const [selectedEmail, setSelectedEmail] = useState(null);

  const [replyMessage, setReplyMessage] = useState("");

  const [error, setError] = useState(null);

  const [loading, toggleLoading] = useState(true);

  const [altLoading, toggleAltLoading] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1); // Pagination state

  const [hasMoreEmails, setHasMoreEmails] = useState(true); // Track if more emails are available

  const [emailToDelete, setEmailToDelete] = useState(null);

  const [sent, toggleSent] = useState(false);

  const [files, setFiles] = useState([]);

  const limit = 10; // Number of emails to load per request

  // Fetch emails with pagination
  const fetchEmails = useCallback(
    async (page = 1) => {
      if (!hasMoreEmails) return; // Prevent fetching if no more emails are available

      toggleLoading(true);

      setLoadingMore(page !== 1); // Show loading more indicator when not the first page
      try {
        const response = await fetch(
          `/api/emails/fetch?page=${page}&limit=${limit}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();

        if (data.emails.length === 0) {
          setHasMoreEmails(false); // No more emails to load
        }

        setEmails((prevEmails) =>
          page === 1 ? data.emails : [...prevEmails, ...data.emails]
        ); // Append new emails on subsequent pages
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        toggleLoading(false);
        setLoadingMore(false);
      }
    },
    [hasMoreEmails]
  );

  // Handle scroll to load more emails
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loadingMore) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        //   fetchEmails(newPage); // Fetch the next page of emails
        return newPage;
      });
    }
  };

  // Select an email to view its details
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setReplyMessage(""); // Reset reply input
  };

  // Handle reply submission
  const handleReply = async () => {
    if (!replyMessage.trim()) return;

    toggleAltLoading(true);

    const formData = new FormData();

    const replyData = {
      name: selectedEmail.name,
      email: selectedEmail.from === provider ? selectedEmail.cc : selectedEmail.from,
      subject: selectedEmail.subject,
      message: selectedEmail.message,
      reply: replyMessage,
    };

    for (let key in replyData) {
      if (replyData.hasOwnProperty(key)) {
        formData.append(key, replyData[key]);
      }
    }

    files.forEach((file) => formData.append('file', file.file));
    console.log(files)
    const response = await fetch('/api/emails/reply', {
      method: "POST",
      body: formData,
      cache: 'no-store'
    })

    setReplyMessage(""); // Clear input

    setFiles([]);

    toggleAltLoading(false);

    if (!response.ok) {
      setError('Fatal Error Sending Email');
    } else {
      toggleSent(true);
    }


  };

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Refresh emails when the button is clicked
  const handleRefresh = () => {
    console.log('refreshing emails')
    setPage(1);
    setHasMoreEmails(true); // Reset the hasMoreEmails flag
    fetchEmails(1); // Re-fetch emails from the first page
  };

  const handleConfirmDelete = (key) => {
    setEmailToDelete(key);
  };

  const handleCloseDetails = () => {
    setSelectedEmail(null);
  };

  const handleDeleteEmail = async (emailKey) => {
    try {
      setEmailToDelete(null);

      if (!emailKey) return;

      if (emailKey === selectedEmail?.key) setSelectedEmail(null);

      toggleAltLoading(true);

      const response = await fetch("/api/emails/delete", {
        method: "DELETE",
        cache: "no-cache",
        body: JSON.stringify({ key: emailKey }),
      });

      const result = await response.json();

      console.log(result);

      toggleAltLoading(false);

      if (response.ok) {
        const updatedEmailList = emails;

        setEmails(updatedEmailList.filter((email) => email.key !== emailKey));
      } else {
        setError("Fatal Error Deleting Email");
      }
    } catch (error) {
      console.log(error);
      setError("Fatal Error Deleting Email");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div
          key={"email-list"}
          className={styles.emailList}
          onScroll={handleScroll} // Attach scroll handler
        >
          <EmailListNav key={"email-list-nav"} onRefresh={handleRefresh} />
          
          {loading ? (
            [...Array(limit)].map((_, index) => (
              <div key={index} className={styles["skeleton-loader"]}></div>
            ))
          ) : emails.length === 0 ? (
            <p>No emails available.</p>
          ) : (
            emails.map((email) => (
              <EmailCard
                handleDeleteEmail={handleConfirmDelete}
                key={email.key}
                handleEmailClick={handleEmailClick}
                email={email}
                selectedEmail={selectedEmail}
                provider={provider}
              />
            ))
          )}
          {loadingMore && (
            <p className={styles.emailListIndicator}>Loading more emails...</p>
          )}{" "}
          {/* Show loading more indicator */}
          {!hasMoreEmails && (
            <p className={styles.emailListIndicator}>No more emails to load.</p>
          )}{" "}
          {/* No more emails available */}
        </div>
        <EmailDetails
          handleDelete={handleConfirmDelete}
          handleClose={handleCloseDetails}
          replyMessage={replyMessage}
          selectedEmail={selectedEmail}
          handleReply={handleReply}
          setReplyMessage={setReplyMessage}
          files={files}
          setFiles={setFiles}
        />
        {emailToDelete ? (
          <ConfirmAction
            onConfirm={() => {
              handleDeleteEmail(emailToDelete);
            }}
            onCancel={() => {
              setEmailToDelete(null);
            }}
            message={"Are you sure you want to delete this email?"}
          />
        ) : null}

        {altLoading ? <InBoxActionLoading /> : null}
        <ErrorOverlay error={error} onClose={() => {setError(null)}} />
      </div>
      <SentNotification show={sent} onClose={() => {toggleSent(false)}} />
    </>
  );
};

export default Inbox;
