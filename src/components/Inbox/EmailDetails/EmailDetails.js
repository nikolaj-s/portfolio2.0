import React from "react";

import styles from "./EmailDetails.module.css";
import { TextButton } from "../TextButton/TextButton";
import DateDisplay from "../DateDisplay/DateDisplay";
import FileAttachment from "../FileAttachment/FileAttachment";

export const EmailDetails = ({
  replyLoading,
  selectedEmail,
  handleReply,
  setReplyMessage,
  replyMessage,
  handleClose,
  handleDelete,
  files,
  setFiles
}) => {
  return (
    <>
      {selectedEmail?.key ? (
        <div className={styles.emailDetails}>
          <div className={styles.wrapper}>
            {selectedEmail && (
              <>
                <div className={styles.nav}>
                  <TextButton name={"Close"} onClick={handleClose} />
                  <TextButton
                    name={"Delete"}
                    onClick={() => {
                      handleDelete(selectedEmail.key);
                    }}
                  />
                </div>
                <h2>{selectedEmail.subject}</h2>
               
                <p>
                  <strong>From:</strong> ({selectedEmail.from})
                </p>
                <DateDisplay dateString={selectedEmail.date} />
                <div className={styles.emailContent} dangerouslySetInnerHTML={{ __html: selectedEmail.html }} />
                <textarea
                  className={styles.replyBox}
                  placeholder="Write your reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <FileAttachment files={files} setFiles={setFiles} />
                <TextButton name={"Reply"} onClick={handleReply} />
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
