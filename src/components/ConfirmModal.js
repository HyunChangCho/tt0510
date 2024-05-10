import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSession } from "next-auth/react"; // useSession import

import styles from "@/styles/ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const [userName, setUserName] = useState("");
  const { data: sessionData, status } = useSession(); // useSession 훅 사용

  // useEffect를 사용하여 세션 데이터가 로드될 때마다 사용자 이름 설정
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(sessionData.user.name);
    }
  }, [status, sessionData]);

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleConfirm = () => {
    // 입력된 사용자 이름이 빈 문자열인 경우 경고 메시지 표시
    if (userName.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    // 입력된 사용자 이름이 세션에서 받아온 사용자 이름과 일치하는지 확인
    if (userName === sessionData.user.name) {
      onConfirm(userName);
      setUserName("");
      onClose();
    } else {
      alert("Please enter the correct name.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Confirm Your Name</h2>
      <input
        type="text"
        value={userName}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      <button onClick={handleConfirm}>Confirm</button>
      {/* <button onClick={onClose}>Cancel</button> */}
    </Modal>
  );
};

export default ConfirmModal;
