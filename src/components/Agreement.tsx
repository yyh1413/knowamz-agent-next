import React, { useState } from "react";
import styles from '../styles/pages.module.css';
import clsx from "clsx";
import { Modal } from 'antd';

interface IProps {
  value?: string
}
const text:any = {
  'User Agreement': `
  
If you check "I agree to the User Agreement" and use or accept any Knowamz through a registration program or any other means, it is deemed that you have read and agreed to this agreement, voluntarily accepting all the contents of this agreement, and the following terms and conditions constitute the agreement between you and Knowamz regarding the use license of Knowamz products ("this agreement"). Before registering or using the service, please read carefully to ensure that you fully understand the content of this agreement. If you have any questions about this agreement, you can consult Kua.ai's customer service.



During the process of reading this agreement, if you do not agree to accept all or part of the terms of this agreement, you should immediately stop Kua.ai's user registration program. When you register as a Knowamz user, it means that you have fully read and understood all the contents of this agreement, and have reached an agreement with Knowamz to accept the relevant service agreements of Knowamz, including but not limited to: (1) this agreement; (2) Knowamz's service terms, usage terms, privacy policies, and other rules, regulations, and standards; (3) Knowamz may revise the aforementioned agreements, terms, rules, regulations, standards, etc. from time to time (collectively referred to as the "Service Rules").



Knowamz has the right to change the service rules including this agreement at any time and notify you in the manner specified in this agreement. The revised and updated service rules will automatically take effect on the date announced by Kua.ai. If you do not agree to the relevant changes, you must stop using Kua.ai before the effective date of the revised and updated service rules. Once you continue to use Kua.ai, it means that you have accepted and voluntarily comply with the revised and updated service rules.



In this agreement, the parties registered as Kua.ai users are referred to as "users" or "you". Please note that this agreement exempts or limits Kua.ai's related responsibilities and limits your related rights. Regarding liability exemption, limitation clauses, as well as legal application and dispute resolution clauses (these clauses are marked in bold and underlined for applicability), please read them carefully to ensure a full understanding of these clauses.



Article 1 Intellectual Property Declaration

（1） All products, services, technologies, and intellectual property rights of all applications or their components/functions/names owned by Knowamz belong to Knowamz or its rights holders.



（2） Knowamz licenses you to use Knowamz based on the provisions of this agreement, without selling or transferring ownership or any intellectual property rights of Knowamz to you; Unless otherwise confirmed in writing by Knowamz, all intellectual property rights (including but not limited to copyright, trademark, patent, trade secrets, etc.) and related rights of all products, technologies, software, programs, data, and other information (including but not limited to text, images, photos, audio, video, charts, colors, layout design, electronic documents) included in the services under this agreement belong to Knowamz and/or its affiliates.



（3） Without the prior written consent of Kua.ai, you shall not engage in the following actions:



Conduct activities on Knowamz, including but not limited to renting, lending, selling, distributing, copying, modifying, reprinting, assembling, publishing, publishing, reengineering, reverse assembling, reverse compiling, or otherwise discovering the source code;

Develop or provide similar products, services, technologies, etc. based on the principles, operating procedures, interface styles, and other characteristics of Knowamz;

Display Knowamz to third parties interested in developing similar products, services, technologies, etc;

Cracking or attacking Kua.ai or its servers.

（4） Knowamz's logo, Knowamz and Knowamz's logo, "Knowamz", "Cross Sea" and other words, graphics, and combinations thereof, as well as Knowamz's other logos, emblems, and Knowamz's name are registered trademarks of Knowamz and/or its affiliates in China and other countries. Without the written consent of Kua.ai, you are not allowed to display, use or do other processing in any way (including but not limited to copying, disseminating, displaying, mirroring, uploading, downloading), nor are you allowed to show, use or do other processing to others.



（5） Any products, technologies, software, programs, data, and other information provided by Kua.ai to you shall be limited to your own use within the territory of the People's Republic of China; Without the written permission of Knowamz, you may not provide, disclose, or sell any products, technologies, software, programs, data, or other information provided by Knowamz in any form to third parties both domestically and internationally, or use it to provide products or services to overseas entities.



（6） The Knowamz account is only for users registered on the Knowamz website and is prohibited from giving, borrowing, renting, transferring, or selling. If Knowamz discovers or has reason to suspect that the user is not the initial registrant of the account, Knowamz reserves the right to refuse to provide corresponding services, freeze or revoke the registered account, or terminate this agreement, and may demand compensation from you for the losses suffered by Knowamz, including but not limited to user communication interruption, user data and information clearance, and other losses arising from this, shall be borne by you.



Article 2 Registration and Use of Kua.ai Account

（1） You confirm that when you complete the registration process or use Knowamz in any other way permitted by Knowamz, you should be a natural person, legal person, or other organization with full civil capacity and appropriate capacity for civil conduct.



（2） The Knowamz usage license is only provided to natural persons, legal persons, or other organizations that can enter into legally binding agreements in accordance with relevant laws. Therefore, you should confirm that you have full capacity for civil rights and appropriate capacity for civil conduct. If you do not have the aforementioned subject qualifications, please do not use Kua.ai. Otherwise, you and your guardian shall bear all consequences arising from this, and Kua.ai has the right to cancel (permanently freeze) your account and claim compensation from you and your guardian. If you represent a company, organization, or other legal entity to register or actually use Knowamz in a manner permitted by Knowamz, you represent and warrant that you have been fully authorized and authorized to register and use Knowamz on behalf of that company, organization, or legal entity, and are bound by this agreement.



（3） You can register as an account ("Account") using the methods allowed by Kua.ai. When registering, you should submit true, accurate, complete and reflective identity and other relevant information. You promise that the registered and set account names and other information shall not contain illegal or harmful information, shall not impersonate others, shall not register accounts for others without permission, shall not register accounts in a way that may cause other users to misunderstand, and shall not use user names that may infringe on the rights and interests of others (including but not limited to suspected trademark rights, reputation rights infringement, etc.). Otherwise, Kua.ai has the right to refuse to register or stop services and withdraw the account, Any losses incurred as a result will be borne by you.



（4） You understand and agree that the ownership of Knowamz's registered account belongs to Knowamz. After registration is completed, you only receive the right to use the account.



（5） You must log in to the Kua.ai account with both your username and password. Kua.ai will not be responsible for any consequences caused by logging in or using other means.



（6） You explicitly state that any actions taken through your username and password (including but not limited to publishing uploaded information, clicking to agree or submitting various rules and agreements online, purchasing Knowamz, etc.) shall be considered as your own behavior, and you shall bear the legal consequences. You should keep your username and password properly and take responsibility for their use and loss.



(7) If you cancel your Knowamz account or stop using Knowamz for any reason, Knowamz has the right to handle the relevant content and information of the account on its own, including but not limited to deletion, and does not assume any responsibility to you in this regard.



Article 3 Service Content

（1） You can choose to use one or more Knowamz services according to your own needs and comply with their service rules. The specific service content, service level, technical specifications, operation documents, billing standards, and other service rules of Knowamz shall be based on the content displayed on the official website or relevant pages of Knowamz; If the content displayed on the Knowamz official website or Knowamz related pages is inconsistent, the content of the recently released document should prevail.



（2） Knowamz, as a neutral technical service provider, licenses you to use the corresponding Knowamz for non transferable and non-exclusive purposes in accordance with this agreement and other applicable service rules. All other rights not expressly authorized in this agreement are still reserved by Knowamz, and you must obtain written permission from Knowamz when exercising these rights. If Kua.ai fails to exercise any of the aforementioned rights, it does not constitute a waiver of that right.



（3） Knowamz has the right to make changes, upgrades, modifications, and transfers to Knowamz or any part of Knowamz and its related functions and application software at its own discretion, and to publish notices on the Knowamz official website or Knowamz related pages. The service content and technical functions contained in Knowamz may be optimized or modified due to changes in user needs, updates to product versions, or unilateral judgments by Knowamz, or may be temporarily suspended due to regular or irregular maintenance.



Article 4 Service Opening

（1） You can choose the relevant Knowamz online according to your own needs. Before purchasing, you need to carefully read the service rules corresponding to the Knowamz you purchased and decide whether to purchase or use it based on your own needs.



（2） You need to complete the payment promptly after Kua.ai's purchase order is submitted. Some services may have time restrictions, inventory restrictions, or activity quantity restrictions. If you fail to make timely payments, or if there are insufficient or limited quantities during the payment period after the purchase order is submitted, you may not be able to use the relevant services.



（3） Knowamz may offer "limited time free", "limited time discounts", "limited quantity discounts", "recharge discounts", and complimentary services during specific periods due to various reasons such as marketing activities and service promotions ("preferential measures"). You understand and agree that these preferential measures may be temporary, phased, or limited in quantity, or may only be applicable to customers who meet specific conditions, You need to purchase and use the corresponding services according to the corresponding rules. Unless otherwise explicitly stated in writing, preferential measures cannot be applied simultaneously.



Article 5 Service Fees

（1） Knowamz's settlement methods may be divided into prepaid and other types announced by Knowamz. To ensure timely activation or continuous provision of services, you should comply with this agreement and applicable service rules and pay fees in a timely manner. After opening a service with Knowamz usage rights for a specific period of time, even if you have not added any new service items or resources, and have not carried out any new operations, fees will continue to be deducted due to the continuous use of resources by this part of the service.



（2） You can make online payments or recharge and renew through their account, Fees can also be paid through other methods allowed by Kua.ai To ensure the continuity of the service, if you choose to pay fees online without an account, you should allow reasonable time for Knowamz to verify the receipt and complete the recharge of your account. Knowamz can collect the fees that you should pay based on actual operations, financial settlement, and other needs by Knowamz itself and/or designated third-party partners. To avoid doubt, if the payee of the fees you pay is not Knowamz, it does not mean that the payee has joined this agreement In any case, Knowamz shall be responsible for providing you with Knowamz and assume the responsibilities and obligations under this agreement; These payees are not required to provide you with any services or assume any responsibilities or obligations under this agreement in order to collect the fees you have paid.



（3） The service fee standards and settlement method for the Knowamz you have selected will be based on the Knowamz official website or corresponding Knowamz pages. Knowamz has the right to unilaterally adjust the service fee standards and settlement methods 7 days in advance, and notify you through one or more methods such as website announcements, email notifications, SMS notifications, system messages, and on-site messages, without obtaining your prior consent; If you do not agree to the aforementioned adjustment, you should immediately stop using Kua.ai. Otherwise, continuing to use it will be deemed that you have agreed to the aforementioned adjustment and will pay the fees according to the adjusted standards.



（4） You shall bear the expenses incurred by using Kua.ai on your own, including but not limited to internet traffic fees, communication service fees, etc.



Article 6 Service Use

（1） You fully understand and agree that Knowamz only provides you with Knowamz, and you shall be responsible for all actions and results engaged in using the service on your own. The Knowamz and the data, information, and other service results provided to you by Knowamz under this agreement are only used as a reference and not a basis for your relevant activities and decisions, and shall not be used for any judicial or administrative procedures or activities. Correspondingly, you should understand that: (1) the use of Knowamz and the data, information, and other service results it contains may pose a risk of illegal or improper behavior (or information) from others. You should make your own judgment and action, and bear the corresponding risks; (2) You should make your own judgment on the content you come into contact with when using this service, and bear all risks arising from the use of the content, including those arising from reliance on the correctness, completeness, or practicality of the content; (3) You must be responsible for all actions under your registered account, including any content you publish and any consequences arising from it. Kua.ai cannot and will not be liable for any loss or damage caused by the aforementioned risks to you.



（2） You should ensure that the relevant behaviors you engage in through Kua.ai comply with relevant national, local, and industry regulations and standards. During the process of collecting, storing, using, and analyzing relevant data through Kua.ai, you will not infringe on the legitimate rights and interests of other third parties in any way (including but not limited to intellectual property, portrait rights, privacy rights, etc.). In accordance with relevant laws, regulations, and requirements, you will lawfully collect or use data and strictly keep the obtained data confidential. All legal liabilities and losses arising from your breach of the aforementioned obligations shall be resolved and borne by you. If you cause losses to Knowamz as a result, you shall be liable for compensation.



（3） When using Knowamz, you must comply with relevant laws, regulations, and service rules, and ensure that you have the business qualifications and capabilities required by laws and regulations. You must not engage in any activities, including but not limited to, uploading, transmitting, or sharing information containing one of the following contents, nor provide convenience for any violations of laws and regulations:



Opposing the basic principles stipulated in the Constitution;

Those who endanger national security, leak national secrets, subvert national power, and undermine national unity;

Harming national honor and interests;

Inciting ethnic hatred, discrimination, and undermining ethnic unity;

Disrupting national religious policies, promoting cults and feudal superstitions;

Spread rumors, disturb
  `,
  'Privacy Agreement': `
 
Welcome to Knowamz! At Knowamz, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines the types of personal data we collect, how we use it, and how we safeguard your information.

**Information We Collect**

We may collect various types of personal information when you visit our website or use our services. This includes your name, email address, contact information, and any other details you voluntarily provide. We also gather information about your interactions with our website and services, such as your browsing behavior and preferences.

**How We Use Your Information**

We use the information we collect to provide you with a personalized and enhanced experience on our website and services. This includes:

- Improving our services based on your feedback and interactions.
- Sending you relevant information, updates, and marketing communications.
- Customizing content and recommendations based on your preferences.
- Analyzing user behavior to optimize our website and services.

**Data Security**

We take data security seriously and have implemented various measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our systems are regularly monitored and updated to ensure the highest level of security.

**Data Sharing**

We may share your personal information with trusted third parties for the purpose of providing services to you. These third parties are bound by confidentiality agreements and are only authorized to use your information for the specified purposes.

**Cookies and Tracking Technologies**

Our website uses cookies and tracking technologies to enhance your browsing experience and gather information about how you use our site. Cookies are small text files that are stored on your device and help us recognize you when you visit our website again.

**Your Choices**

You have the right to access, update, or delete your personal information at any time. You can also opt-out of receiving marketing communications from us. To exercise these rights, please contact us at [contact email].

**Children's Privacy**

Our services are not intended for children under the age of [age]. We do not knowingly collect or store personal information from children. If you believe that a child has provided us with their personal information, please contact us and we will promptly remove the information.

**Changes to this Privacy Policy**

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we are protecting your information.

**Contact Us**

If you have any questions or concerns about our Privacy Policy, please contact us at [contact email]. Your privacy matters to us, and we are here to address any inquiries you may have.

Thank you for trusting Knowamz with your personal information. We are committed to ensuring the privacy and security of your data.
`,
}
const Agreement = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const showModal = (flag:any) => {
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
