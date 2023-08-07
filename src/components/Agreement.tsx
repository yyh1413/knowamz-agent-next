import React, { useState } from "react";
import styles from '../styles/pages.module.css';
import clsx from "clsx";
import { Modal } from 'antd';

interface IProps {
  value?: string
}
const text = {
  'Privacy Agreement': `
  Effective Date: [Date]
  
  Welcome to our platform. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully before using our platform.
  
  1. Acceptance of Terms
  By accessing or using our platform, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree to these terms, please do not use our platform.
  
  2. User Eligibility
  You must be at least 18 years old to use our platform. If you are under 18, you may only use our platform with the consent and supervision of a parent or legal guardian.
  
  3. Account Registration
  To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and agree to accept responsibility for all activities that occur under your account.
  
  4. Content Ownership
  You retain ownership of the content you submit or post on our platform. By submitting or posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display the content for any purpose.
  
  5. Prohibited Activities
  You agree not to engage in any activities that violate any applicable laws, regulations, or our policies. Prohibited activities include, but are not limited to, unauthorized access, data scraping, spamming, or transmitting harmful content.
  
  6. Intellectual Property
  All trademarks, logos, and content on our platform are the property of their respective owners. You may not use, copy, or reproduce any of our intellectual property without our prior written consent.
  
  7. Disclaimer of Warranties
  Our platform is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of our platform.
  
  8. Limitation of Liability
  We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our platform.
  
  9. Indemnification
  You agree to indemnify and hold us harmless from any claims, losses, or damages arising from your use of our platform or violation of these terms.
  
  10. Governing Law
  These terms shall be governed by and construed in accordance with the laws of [Your Country/Region].
  
  11. Modification of Terms
  We reserve the right to modify or update these terms at any time without prior notice. Please check this page regularly for any changes.
  
  By using our platform, you agree to be bound by these terms and conditions. If you do not agree with any of these terms, please discontinue using our platform.
  
  If you have any questions or concerns regarding these terms, please contact us at [Contact Email].`,
  'User Agreement': `
  Effective Date: [Date]
  
  Welcome to our platform. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully before using our platform.
  
  1. Acceptance of Terms
  By accessing or using our platform, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree to these terms, please do not use our platform.
  
  2. User Eligibility
  You must be at least 18 years old to use our platform. If you are under 18, you may only use our platform with the consent and supervision of a parent or legal guardian.
  
  3. Account Registration
  To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and agree to accept responsibility for all activities that occur under your account.
  
  4. Content Ownership
  You retain ownership of the content you submit or post on our platform. By submitting or posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display the content for any purpose.
  
  5. Prohibited Activities
  You agree not to engage in any activities that violate any applicable laws, regulations, or our policies. Prohibited activities include, but are not limited to, unauthorized access, data scraping, spamming, or transmitting harmful content.
  
  6. Intellectual Property
  All trademarks, logos, and content on our platform are the property of their respective owners. You may not use, copy, or reproduce any of our intellectual property without our prior written consent.
  
  7. Disclaimer of Warranties
  Our platform is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of our platform.
  
  8. Limitation of Liability
  We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our platform.
  
  9. Indemnification
  You agree to indemnify and hold us harmless from any claims, losses, or damages arising from your use of our platform or violation of these terms.
  
  10. Governing Law
  These terms shall be governed by and construed in accordance with the laws of [Your Country/Region].
  
  11. Modification of Terms
  We reserve the right to modify or update these terms at any time without prior notice. Please check this page regularly for any changes.
  
  By using our platform, you agree to be bound by these terms and conditions. If you do not agree with any of these terms, please discontinue using our platform.
  
  If you have any questions or concerns regarding these terms, please contact us at [Contact Email].`,
}
const Agreement = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const showModal = (flag) => {
    setTitle(flag === 0 ? 'Privacy Agreement' : 'User Agreement')
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={clsx(styles.f_c_f_r, styles.registration, 'mt-10')}>
      <span onClick={() => showModal(0)}>Privacy Agreement</span>
      <span className='mr-4' onClick={() => showModal(1)}>User Agreement</span>
      <Modal title={<div style={{ textAlign: 'center' }}>{title}</div>} open={isModalOpen}
        onCancel={handleCancel} destroyOnClose footer={null}
        width='70%'>
        <p className={styles.article}>{text[title]}</p>

      </Modal>
    </div>
  )
};

export default Agreement;
