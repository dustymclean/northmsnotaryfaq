
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Phone, 
  MessageSquare, 
  Mail, 
  Search, 
  ChevronDown, 
  FileText, 
  Scale, 
  AlertCircle,
  HelpCircle,
  Award,
  UserCheck,
  Briefcase,
  Layers,
  Zap,
  Printer,
  History
} from 'lucide-react';

// --- Constants & Data ---

const BIZ_INFO = {
  name: "The North MS Notary Bureau",
  phone: "601-327-8333",
  email: "dispatch@northmsnotary.com",
  generalEmail: "notary@northmsnotary.com",
  siteUrl: "https://northmsnotary.com"
};

const CATEGORIES = [
  "All Nodes",
  "Our Services",
  "Service Area & Availability",
  "Appointments & Process",
  "Unit Status",
  "Geographical Information",
  "General Inquiries"
];

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQ[] = [
  // --- OUR SERVICES ---
  {
    id: 'srv-01',
    category: 'Our Services',
    question: 'What is a Loan Signing Agent (LSA) and how do they differ from a standard Notary?',
    answer: 'While all LSAs are Notaries, they possess specialized training to facilitate complex mortgage closings (FHA, VA, Conventional, HELOC). An LSA ensures all lender-required signatures are captured, dates are precise, and the package is ready for immediate funding, preventing costly delays for the borrower.'
  },
  {
    id: 'srv-02',
    category: 'Our Services',
    question: 'What constitutes a "Clinical Notary Unit"?',
    answer: 'This is a tactical deployment specifically for medical environments (hospitals, nursing homes, hospice). Our units are trained in the sensitivities of patient care, verifying the mental capacity and willingness of signers for Powers of Attorney or Advance Directives while adhering to strict facility protocols at nodes like Baptist Memorial-North MS.'
  },
  {
    id: 'srv-03',
    category: 'Our Services',
    question: 'Can you assist with international documents or Apostilles?',
    answer: 'Yes. We provide "Global Support" which involves the precision notarization required by the Mississippi Secretary of State for international authentication. We ensure documents meet the high standards needed for an Apostille to be issued for use in foreign jurisdictions.'
  },
  {
    id: 'srv-04',
    category: 'Our Services',
    question: 'Can the Bureau verify Form I-9 for remote employees?',
    answer: 'Affirmative. We act as an Authorized Representative for remote employee onboarding. We physically verify the identity artifacts of the employee and complete Section 2 of the USCIS Form I-9, ensuring compliance for companies with a distributed workforce in North MS.'
  },
  {
    id: 'srv-05',
    category: 'Our Services',
    question: 'Do you specialize in Estate & Trust document witnessing?',
    answer: 'Yes. We provide high-integrity witnessing for multi-document estate binders, including Irrevocable Trusts, Quitclaim Deeds, and Guardian Appointments. We maintain consistent communication with legal counsel to ensure a seamless execution of legacy artifacts.'
  },
  {
    id: 'srv-06',
    category: 'Our Services',
    question: 'What is the difference between an Acknowledgment and a Jurat?',
    answer: 'An Acknowledgment verifies that the signer appeared and declared their signature to be voluntary. A Jurat requires the signer to take an oath or affirmation in the Notary\'s presence, swearing to the truthfulness of the document contents. Both are common "Service Nodes" in our general practice.'
  },
  {
    id: 'srv-07',
    category: 'Our Services',
    question: 'Does the Bureau provide "Signature Guarantee" services (Medallion)?',
    answer: 'Negative. Medallion Signature Guarantees are distinct from notarizations and are typically provided by financial institutions participating in a recognized Medallion program (like STAMP). We specialize in high-integrity notarial acts, not securities transfer guarantees.'
  },
  {
    id: 'srv-08',
    category: 'Our Services',
    question: 'What is the protocol for "Foreign Language Artifacts"?',
    answer: 'The Bureau can notarize documents in foreign languages provided the notarial certificate itself is in English and the Agent can effectively communicate with the signer to verify identity and willingness. We do not translate artifacts, but we ensure the legal act of notarization is performed with absolute precision.'
  },
  {
    id: 'srv-09',
    category: 'Our Services',
    question: 'Can the Bureau facilitate "Remote Online Notarization" (RON)?',
    answer: 'Affirmative. We maintain secure digital nodes for RON missions. This allows for the notarization of electronic documents via multi-factor authentication and credential analysis, enabling signers to execute artifacts from any location with a secure internet uplink.'
  },
  {
    id: 'srv-10',
    category: 'Our Services',
    question: 'What constitutes a "High-Value Asset" closing?',
    answer: 'These are specialized missions involving commercial real estate, high-limit equity lines, or complex corporate acquisitions. Our Agents are vetted for the high level of scrutiny required for these transactions, ensuring zero-defect execution for lenders and title companies.'
  },
  {
    id: 'srv-11',
    category: 'Our Services',
    question: 'Do you support "Adoption & Parental Consent" documentation?',
    answer: 'Yes. We provide sensitive, high-priority support for family law nodes, including adoption petitions, parental consent for travel, and custody agreements. We understand the emotional weight of these artifacts and provide a professional, calm presence during execution.'
  },
  {
    id: 'srv-12',
    category: 'Our Services',
    question: 'What is a "Power of Attorney" notarization?',
    answer: 'Verifying the signature of a principal granting authority to an agent for legal or financial matters. We ensure the principal is acting of their own free will and understands the scope of the authority being granted.'
  },
  {
    id: 'srv-13',
    category: 'Our Services',
    question: 'Can you notarize "Wills" in Mississippi?',
    answer: 'Yes. While Mississippi does not strictly require a Will to be notarized to be valid, we provide "Self-Proving Affidavits" which involve notarizing the signatures of the testator and witnesses, greatly simplifying the probate process later.'
  },
  {
    id: 'srv-14',
    category: 'Our Services',
    question: 'What is "Copy Certification"?',
    answer: 'Verifying that a copy of a document is a true and accurate reproduction of the original. Note: In MS, we cannot certify copies of public records (birth certificates, court orders) as those must come from the issuing agency.'
  },
  {
    id: 'srv-15',
    category: 'Our Services',
    question: 'Do you assist with "Vehicle Title" transfers?',
    answer: 'Yes. We verify the signatures of buyers and sellers for MS Department of Revenue compliance, ensuring the title transfer is legally binding and ready for processing at the Tax Collector\'s office.'
  },
  {
    id: 'srv-16',
    category: 'Our Services',
    question: 'What is "Oath Administration"?',
    answer: 'Formally swearing in an individual for an affidavit, deposition, or public office. We ensure the individual understands they are under oath and the legal consequences of providing false information.'
  },
  
  // --- SERVICE AREA & AVAILABILITY ---
  {
    id: 'area-01',
    category: 'Service Area & Availability',
    question: 'Which counties are within the Bureau\'s active jurisdiction?',
    answer: 'We maintain a 24/7 presence across Lafayette, Grenada, Tallahatchie, Panola, Yalobusha, and Calhoun counties. This includes strategic hubs like Oxford, Tillatoba, Batesville, Grenada, and Charleston.'
  },
  {
    id: 'area-02',
    category: 'Service Area & Availability',
    question: 'Are mobile units available on weekends or holidays?',
    answer: 'Yes. The Bureau operates on an "Active Mission" status 365 days a year. We understand that legal emergencies and loan closings often occur outside of standard 9-to-5 banking hours.'
  },
  {
    id: 'area-03',
    category: 'Service Area & Availability',
    question: 'Can you perform notarizations at the University of Mississippi (Ole Miss) campus?',
    answer: 'Absolutely. We maintain a high-frequency node for the University 38677 district. We meet students, faculty, and administrators at the Student Union, library, or administrative offices.'
  },
  {
    id: 'area-04',
    category: 'Service Area & Availability',
    question: 'What is "Dispatch Latency" and how quickly can a unit arrive?',
    answer: 'Our average dispatch latency for the Oxford and Grenada hubs is approximately 45 minutes. For rural districts, deployment time varies based on unit proximity and road conditions.'
  },
  {
    id: 'area-05',
    category: 'Service Area & Availability',
    question: 'Does the Bureau deploy to "Correctional Facility Nodes" (Jails/Prisons)?',
    answer: 'Yes. We coordinate with facility administrators at Lafayette County Detention or Grenada County Jail for inmate notarizations. These missions require pre-cleared security protocols.'
  },
  {
    id: 'area-06',
    category: 'Service Area & Availability',
    question: 'What is the "After-Hours Surcharge" for midnight deployments?',
    answer: 'Missions initiated between 23:00 and 06:00 incur a "Tactical Night Deployment" fee. This covers the specialized logistics and safety protocols required for late-night mobile operations.'
  },
  {
    id: 'area-07',
    category: 'Service Area & Availability',
    question: 'Can a unit be dispatched to "Roadside or Transit Nodes"?',
    answer: 'Affirmative. We can meet clients at gas stations, rest stops, or transit hubs for emergency travel documents or vehicle title transfers. We prioritize safety and secure locations.'
  },
  {
    id: 'area-08',
    category: 'Service Area & Availability',
    question: 'How does "Severe Weather Status" affect deployment?',
    answer: 'During extreme weather events (tornado warnings, ice storms), non-essential missions may be delayed. However, our "Clinical Notary Units" maintain readiness for emergency medical directives.'
  },
  {
    id: 'area-09',
    category: 'Service Area & Availability',
    question: 'Is the Bureau active in the "Delta District" (Tallahatchie/Panola)?',
    answer: 'Affirmative. We maintain full operational coverage in the Delta regions, including Charleston, Tutwiler, and Batesville. Our logistics units are familiar with the unique rural routes of these districts.'
  },
  {
    id: 'area-10',
    category: 'Service Area & Availability',
    question: 'Does the Bureau service "Tillatoba"?',
    answer: 'Yes. Tillatoba is a key hub in our Yalobusha sector, allowing us to bridge the gap between our Oxford and Grenada operational centers.'
  },
  {
    id: 'area-11',
    category: 'Service Area & Availability',
    question: 'What is the "Oxford-Grenada" corridor?',
    answer: 'The primary transit route (Hwy 7 / I-55) for our units moving between the two major hubs. This corridor allows for rapid redeployment of units to meet fluctuating demand.'
  },
  {
    id: 'area-12',
    category: 'Service Area & Availability',
    question: 'Can I schedule a "Future Deployment"?',
    answer: 'Yes. We accept bookings up to 30 days in advance. This is recommended for complex loan signings or estate executions involving multiple parties.'
  },
  {
    id: 'area-13',
    category: 'Service Area & Availability',
    question: 'What is "Emergency Dispatch"?',
    answer: 'A mission requiring deployment within 15 minutes of the request. These are prioritized for medical emergencies (Clinical Units) or immediate legal deadlines.'
  },
  {
    id: 'area-14',
    category: 'Service Area & Availability',
    question: 'Is there a "Rural Surcharge"?',
    answer: 'A modest fee is applied for missions exceeding 30 miles from a strategic hub (Oxford or Grenada) to cover the increased transit logistics and fuel costs.'
  },

  // --- APPOINTMENTS & PROCESS ---
  {
    id: 'proc-01',
    category: 'Appointments & Process',
    question: 'What identity artifacts are required at the time of signing?',
    answer: 'All signers must present a current, government-issued photo ID. Acceptable artifacts include a valid State Driver\'s License, State ID Card, or U.S. Passport.'
  },
  {
    id: 'proc-02',
    category: 'Appointments & Process',
    question: 'How long does a typical mobile deployment take?',
    answer: 'A standard general notarization usually takes 15-20 minutes. Loan signings typically require 45-60 minutes depending on the size of the document package.'
  },
  {
    id: 'proc-03',
    category: 'Appointments & Process',
    question: 'Can I choose a public location like a library or cafe for the signing?',
    answer: 'Yes. While we often deploy to residences and offices, we can also meet at public locations for your comfort and convenience. We frequently utilize libraries and cafes.'
  },
  {
    id: 'proc-04',
    category: 'Appointments & Process',
    question: 'Does the Bureau provide witnesses if my document requires them?',
    answer: 'While the signer is primarily responsible for providing their own witnesses, we can often deploy a multi-agent unit to serve as both Notary and Witness for an additional fee.'
  },
  {
    id: 'proc-05',
    category: 'Appointments & Process',
    question: 'What happens if a signer\'s ID artifact is expired?',
    answer: 'Under MS SOS guidelines, we cannot accept expired IDs. However, "Credible Witnesses" who personally know the signer and possess their own valid ID can sometimes be used.'
  },
  {
    id: 'proc-06',
    category: 'Appointments & Process',
    question: 'What is the "Pre-Mission Checklist" for a successful signing?',
    answer: 'To ensure a zero-defect mission: 1) Ensure all signers have valid ID artifacts. 2) Complete all document fields EXCEPT signatures/dates. 3) Ensure all required witnesses are present.'
  },
  {
    id: 'proc-07',
    category: 'Appointments & Process',
    question: 'How does the Bureau handle "Signer Incapacity" alerts?',
    answer: 'If an Agent determines a signer lacks the mental capacity to understand the artifact or is being coerced, the mission is immediately aborted to protect the integrity of the act.'
  },
  {
    id: 'proc-08',
    category: 'Appointments & Process',
    question: 'Can I request a "Stealth Deployment" for sensitive business matters?',
    answer: 'Yes. For high-profile or sensitive corporate missions, we can deploy Agents in unmarked vehicles and professional attire to maintain discretion. Request "Discreet Protocol".'
  },
  {
    id: 'proc-09',
    category: 'Appointments & Process',
    question: 'What is the protocol for "Multi-Signer Synchronized Missions"?',
    answer: 'For documents requiring multiple signatures from different parties, we can coordinate a single synchronized node or multiple sequential deployments across our districts.'
  },
  {
    id: 'proc-10',
    category: 'Appointments & Process',
    question: 'How are "Digital Scan-Backs" secured during transmission?',
    answer: 'Our mobile units utilize AES-256 encrypted uplinks to transmit scanned artifacts directly to lenders or legal counsel. We do not store sensitive data locally after transmission.'
  },
  {
    id: 'proc-11',
    category: 'Appointments & Process',
    question: 'What if the "Document is Already Signed"?',
    answer: 'We cannot notarize it. The signature must be performed or acknowledged in the Agent\'s presence. We may require the signer to sign again or initial the existing signature.'
  },
  {
    id: 'proc-12',
    category: 'Appointments & Process',
    question: 'Can a "Minor" sign a document?',
    answer: 'Yes, if they have valid ID and understand the artifact. However, parental consent or a court-appointed guardian is often required for the underlying transaction.'
  },
  {
    id: 'proc-13',
    category: 'Appointments & Process',
    question: 'What is a "Credible Witness"?',
    answer: 'An individual who personally knows the signer, has no interest in the document, and can vouch for the signer\'s identity under oath when the signer lacks valid ID.'
  },
  {
    id: 'proc-14',
    category: 'Appointments & Process',
    question: 'How do I "Reschedule" a mission?',
    answer: 'Contact dispatch at least 1 hour before the scheduled deployment. Rescheduling within the 1-hour window may incur a modest logistics adjustment fee.'
  },
  {
    id: 'proc-15',
    category: 'Appointments & Process',
    question: 'What is the "Signing Environment" requirement?',
    answer: 'A flat surface and adequate lighting are required for document integrity and clear journal entries. Our Agents can provide a portable signing surface if needed.'
  },

  // --- UNIT STATUS ---
  {
    id: 'unit-01',
    category: 'Unit Status',
    question: 'What does "LOGISTICS UNIT 01: ACTIVE" mean?',
    answer: 'This refers to a mobile notary unit currently on duty and available for dispatch within the Oxford District. It indicates the unit is fully equipped and ready for mission assignment.'
  },
  {
    id: 'unit-02',
    category: 'Unit Status',
    question: 'How is the operational status updated?',
    answer: 'Status is updated via our real-time dispatch relay, reflecting GPS positioning, mission availability, and hardware readiness of all field agents across the North MS network.'
  },
  {
    id: 'unit-03',
    category: 'Unit Status',
    question: 'What does "DEPLOYED" status indicate?',
    answer: 'The unit is currently at a signing location or in transit to a confirmed mission node. Deployed units are temporarily unavailable for new immediate dispatch.'
  },
  {
    id: 'unit-04',
    category: 'Unit Status',
    question: 'What is "STANDBY" mode?',
    answer: 'The unit is in a high-readiness state, awaiting mission parameters at a strategic hub. Standby units can typically be dispatched within 5-10 minutes.'
  },
  {
    id: 'unit-05',
    category: 'Unit Status',
    question: 'How are "LOGISTICS UNITS" numbered?',
    answer: 'Units are assigned tactical identifiers based on their primary district and equipment configuration (e.g., Unit 01 is Oxford-primary with dual-tray capability).'
  },
  {
    id: 'unit-06',
    category: 'Unit Status',
    question: 'What is "ELITE DISPATCH PROTOCOL"?',
    answer: 'A prioritized response system for medical emergencies and time-sensitive legal closings, ensuring the nearest available unit is rerouted to the high-priority node.'
  },
  {
    id: 'unit-07',
    category: 'Unit Status',
    question: 'What does "SYSTEM STATUS: OPERATIONAL" signify?',
    answer: 'All communication relays, mobile hardware, and dispatch systems are functioning at 100% capacity across our 25 strategic hubs.'
  },
  {
    id: 'unit-08',
    category: 'Unit Status',
    question: 'What is "MAINTENANCE" status for a unit?',
    answer: 'The unit is undergoing hardware calibration (printers/scanners) or vehicle servicing and is temporarily offline to ensure zero-defect performance upon return.'
  },
  {
    id: 'unit-09',
    category: 'Unit Status',
    question: 'How often is the ticker status refreshed?',
    answer: 'The public ticker refreshes every 5 minutes. Internal dispatch status is refreshed in real-time (sub-second latency) for our operational coordination.'
  },
  {
    id: 'unit-10',
    category: 'Unit Status',
    question: 'What is "PRIORITY ALPHA" dispatch?',
    answer: 'The highest level of deployment urgency, typically reserved for life-critical medical directives or court-ordered immediate executions.'
  },
  {
    id: 'unit-11',
    category: 'Unit Status',
    question: 'Can I track my assigned unit in real-time?',
    answer: 'Clients receive SMS updates on unit proximity and estimated arrival time (ETA) once the unit is within 5 miles of the mission node.'
  },
  {
    id: 'unit-12',
    category: 'Unit Status',
    question: 'What is a "MOBILE BUREAU" node?',
    answer: 'A fully equipped vehicle capable of on-site printing, scanning, and secure data transmission, effectively acting as a mobile office for the Agent.'
  },
  {
    id: 'unit-13',
    category: 'Unit Status',
    question: 'What does "SECURED DUAL-TRAY PRINTING BUREAU ONLINE" mean?',
    answer: 'Our high-capacity printing systems are active and ready to process legal and letter-sized document packages for immediate on-site execution.'
  },
  {
    id: 'unit-14',
    category: 'Unit Status',
    question: 'What is "DISPATCH LATENCY"?',
    answer: 'The time elapsed between a service request and the deployment of a logistics unit. We strive for a sub-15 minute latency for all urban requests.'
  },
  {
    id: 'unit-15',
    category: 'Unit Status',
    question: 'How are "STRATEGIC HUBS" defined?',
    answer: 'Fixed locations across North MS where units refuel, restock supplies, and await dispatch to minimize travel time to common service districts.'
  },

  // --- GEOGRAPHICAL INFORMATION ---
  {
    id: 'geo-01',
    category: 'Geographical Information',
    question: 'What are the "OXFORD DISTRICT" and "THE NORTH MS N" referring to?',
    answer: '"Oxford District" covers the city of Oxford and Lafayette County; "THE NORTH MS N" is shorthand for our North Mississippi Network of service nodes.'
  },
  {
    id: 'geo-02',
    category: 'Geographical Information',
    question: 'What is the "GRENADA MEDICAL HUB"?',
    answer: 'A specialized service node focusing on hospitals and clinics within the Grenada city limits, including UMMC Grenada and surrounding hospice facilities.'
  },
  {
    id: 'geo-03',
    category: 'Geographical Information',
    question: 'Does the Bureau cover the "38677" district?',
    answer: 'Yes, this is the primary zip code for the University of Mississippi and surrounding Oxford areas, where we maintain a high-frequency presence.'
  },
  {
    id: 'geo-04',
    category: 'Geographical Information',
    question: 'What is the "DELTA SECTOR"?',
    answer: 'Our operational zone covering the flatlands of Tallahatchie and Panola counties, requiring specialized rural navigation protocols.'
  },
  {
    id: 'geo-05',
    category: 'Geographical Information',
    question: 'How are "REGIONAL HUBS" distributed?',
    answer: 'Hubs are strategically placed to ensure a 45-minute average response time across our 6-county jurisdiction, covering both urban and rural nodes.'
  },
  {
    id: 'geo-06',
    category: 'Geographical Information',
    question: 'What is the "BATESVILLE CORRIDOR"?',
    answer: 'The high-traffic service area along I-55 in Panola County, serving as a critical link between our northern and southern districts.'
  },
  {
    id: 'geo-07',
    category: 'Geographical Information',
    question: 'Does the Bureau service "HARMONTOWN"?',
    answer: 'Yes, we provide rural deployment to the Harmontown community. These missions are scheduled with additional travel buffers to ensure on-time arrival.'
  },
  {
    id: 'geo-08',
    category: 'Geographical Information',
    question: 'What is the "CHARLESTON NODE"?',
    answer: 'Our primary presence in Tallahatchie County, serving the city and surrounding rural routes with dedicated mobile units.'
  },
  {
    id: 'geo-09',
    category: 'Geographical Information',
    question: 'How is "RURAL DEPLOYMENT" handled?',
    answer: 'Units are equipped with long-range communication and offline-capable hardware for deep rural missions where cellular signal may be intermittent.'
  },
  {
    id: 'geo-10',
    category: 'Geographical Information',
    question: 'What is the "YALOBUSHA SECTOR"?',
    answer: 'Coverage area including Water Valley, Coffeeville, and the Tillatoba hub, managed by our central logistics coordination.'
  },
  {
    id: 'geo-11',
    category: 'Geographical Information',
    question: 'Does the Bureau cross state lines?',
    answer: 'No. Our commission is strictly for the Sovereign State of Mississippi. We cannot perform notarial acts outside of the state boundaries.'
  },
  {
    id: 'geo-12',
    category: 'Geographical Information',
    question: 'What is the "CALHOUN DISTRICT"?',
    answer: 'Service area covering Bruce, Pittsboro, and Vardaman, typically served by units dispatched from our Grenada hub.'
  },
  {
    id: 'geo-13',
    category: 'Geographical Information',
    question: 'How are "JURISDICTIONAL BOUNDARIES" enforced?',
    answer: 'Our GPS-fenced dispatch system ensures agents only operate within their commissioned territory, preventing any legal invalidity of the notarial act.'
  },
  {
    id: 'geo-14',
    category: 'Geographical Information',
    question: 'What is the "UNIVERSITY NODE"?',
    answer: 'A high-frequency service point at the Ole Miss campus, including the Student Union and administrative buildings.'
  },
  {
    id: 'geo-15',
    category: 'Geographical Information',
    question: 'Are there "OFF-GRID" service locations?',
    answer: 'We can deploy to any accessible location, including parks, job sites, and private residences, provided the signing environment is safe.'
  },

  // --- GENERAL INQUIRIES ---
  {
    id: 'gen-01',
    category: 'General Inquiries',
    question: 'Does the Bureau provide legal advice or prepare documents?',
    answer: 'No. Per Mississippi State Law, Notaries are prohibited from practicing law or giving legal advice. We are impartial witnesses to the signing of documents.'
  },
  {
    id: 'gen-02',
    category: 'General Inquiries',
    question: 'Is the Bureau GLBA compliant for sensitive financial data?',
    answer: 'Yes. We strictly adhere to Gramm-Leach-Bliley Act protocols. All client data and physical documents are handled with the highest level of security.'
  },
  {
    id: 'gen-03',
    category: 'General Inquiries',
    question: 'Are Bureau units equipped for dual-tray printing and mobile scanning?',
    answer: 'Affirmative. Our mobile units are equipped with high-capacity dual-tray laser printers and secure mobile scanning hardware.'
  },
  {
    id: 'gen-04',
    category: 'General Inquiries',
    question: 'Are you bonded and insured?',
    answer: 'The Bureau maintains active bonding and high-limit Errors and Omissions (E&O) insurance for professional protection.'
  },
  {
    id: 'gen-05',
    category: 'General Inquiries',
    question: 'How are the Bureau\'s logistics fees calculated?',
    answer: 'Fees are based on the MS statutory notary fee plus a "Mobile Logistics Fee" calculated by distance, time, and deployment type.'
  },
  {
    id: 'gen-06',
    category: 'General Inquiries',
    question: 'What is the Bureau\'s "Journal Retention" protocol?',
    answer: 'We maintain permanent, secure archives of all notarial journals as required by law, providing a verifiable audit trail.'
  },
  {
    id: 'gen-07',
    category: 'General Inquiries',
    question: 'How is "Signer Willingness" assessed by the Agent?',
    answer: 'Agents perform a verbal "Willingness Check" to ensure every signer is acting of their own free will and understands the artifact.'
  },
  {
    id: 'gen-08',
    category: 'General Inquiries',
    question: 'Can I verify the "Active Commission" of a dispatched Agent?',
    answer: 'Absolutely. All Bureau Agents carry official credentials and can be verified via the MS Secretary of State\'s online portal.'
  },
  {
    id: 'gen-09',
    category: 'General Inquiries',
    question: 'Does the Bureau offer "Veteran Priority" status?',
    answer: 'Affirmative. We prioritize dispatch for active-duty military and veterans for their service-related documentation needs.'
  },
  {
    id: 'gen-10',
    category: 'General Inquiries',
    question: 'What is the "Conflict of Interest" policy for Bureau Agents?',
    answer: 'Agents are strictly prohibited from notarizing documents in which they have a financial interest or where a close family member is a party.'
  },
  {
    id: 'gen-11',
    category: 'General Inquiries',
    question: 'How do I initiate a "DISPATCH REQUEST"?',
    answer: 'Call our central dispatch line at 601-327-8333 or use our online portal for non-emergency scheduling.'
  },
  {
    id: 'gen-12',
    category: 'General Inquiries',
    question: 'What are the "BUREAU OPERATING HOURS"?',
    answer: 'We maintain 24/7/365 active mission status. Our dispatch is always online to handle emergency notarial needs.'
  },
  {
    id: 'gen-13',
    category: 'General Inquiries',
    question: 'Is there a "CANCELLATION PROTOCOL"?',
    answer: 'Missions cancelled within 30 minutes of deployment may incur a logistics fee to cover the unit\'s transit costs.'
  },
  {
    id: 'gen-14',
    category: 'General Inquiries',
    question: 'How are "LOGISTICS FEES" invoiced?',
    answer: 'Fees are calculated based on mileage, time of day, and document complexity, and are presented before deployment.'
  },
  {
    id: 'gen-15',
    category: 'General Inquiries',
    question: 'Does the Bureau accept "DIGITAL PAYMENTS"?',
    answer: 'Yes, we accept all major credit cards, Apple Pay, and secure bank transfers via our mobile point-of-sale terminals.'
  },
  {
    id: 'gen-16',
    category: 'General Inquiries',
    question: 'What is "E&O INSURANCE"?',
    answer: 'Errors and Omissions insurance protects the Bureau and the client against unintentional clerical errors during the notarial act.'
  },
  {
    id: 'gen-17',
    category: 'General Inquiries',
    question: 'Are "NOTARY JOURNALS" public record?',
    answer: 'Journals are private but can be subpoenaed or inspected by authorized state officials to verify a specific act.'
  },
  {
    id: 'gen-18',
    category: 'General Inquiries',
    question: 'How do I request a "CERTIFIED COPY" of a journal entry?',
    answer: 'Contact our records department with the mission date and signer name; fees apply for research and certification.'
  },
  {
    id: 'gen-19',
    category: 'General Inquiries',
    question: 'What is "GLBA COMPLIANCE"?',
    answer: 'Adherence to the Gramm-Leach-Bliley Act for the protection of non-public personal information during financial transactions.'
  },
  {
    id: 'gen-20',
    category: 'General Inquiries',
    question: 'Can I request a "SPECIFIC AGENT"?',
    answer: 'While we prioritize the nearest unit, we can accommodate specific agent requests for recurring estate or trust work.'
  },
  {
    id: 'gen-21',
    category: 'General Inquiries',
    question: 'What is "NNA VERIFICATION"?',
    answer: 'Certification from the National Notary Association, ensuring the Agent is trained in the latest industry standards.'
  },
  {
    id: 'gen-22',
    category: 'General Inquiries',
    question: 'Does the Bureau offer "VOLUME DISCOUNTS"?',
    answer: 'Yes, for high-frequency partners like law firms and title companies with recurring weekly mission needs.'
  },
  {
    id: 'gen-23',
    category: 'General Inquiries',
    question: 'What is a "MOBILE SCAN-BACK"?',
    answer: 'The immediate digital transmission of signed documents to the client or lender via secure mobile scanning hardware.'
  },
  {
    id: 'gen-24',
    category: 'General Inquiries',
    question: 'How do I provide "FEEDBACK" on a mission?',
    answer: 'A survey link is sent via SMS after every successful deployment to ensure our zero-defect standards are met.'
  },
  {
    id: 'gen-25',
    category: 'General Inquiries',
    question: 'What is the "BUREAU\'S MISSION STATEMENT"?',
    answer: 'To provide high-integrity, zero-defect notarial logistics across North Mississippi with absolute precision and professionalism.'
  },
  // --- UNIT 01 SPECIALIZED ---
  {
    id: 'unit-16',
    category: 'Unit Status',
    question: 'What is the current mission profile for Logistics Unit 01?',
    answer: 'Unit 01 is currently assigned to the Oxford District, specializing in high-frequency clinical deployments and complex loan signings within the 38677 and 38655 sectors. It maintains a "Priority Alpha" readiness status for the University node.'
  },
  {
    id: 'unit-17',
    category: 'Unit Status',
    question: 'How does Unit 01 coordinate with the North MS Network?',
    answer: 'Unit 01 serves as a primary relay hub, coordinating with the Grenada and Batesville sectors to ensure seamless coverage across the I-55 corridor and rural Lafayette County. It acts as the lead unit for the Oxford District logistics operations.'
  },
  {
    id: 'unit-18',
    category: 'Unit Status',
    question: 'Can I request a direct uplink with Unit 01 during a mission?',
    answer: 'Direct communication with Unit 01 is managed through Central Dispatch. Once a mission is active, clients receive a secure SMS link for real-time ETA tracking and direct agent messaging via our encrypted mobile interface.'
  },
  {
    id: 'unit-19',
    category: 'Unit Status',
    question: 'What specialized hardware is unique to Unit 01?',
    answer: 'Unit 01 is equipped with the "Elite Mobile Bureau" package, featuring high-speed dual-tray laser printing, secure satellite uplink for rural areas, and advanced biometric verification hardware for high-value asset closings.'
  },
  // --- OXFORD DISTRICT GENERAL ---
  {
    id: 'gen-26',
    category: 'General Inquiries',
    question: 'What are the standard operating hours for the Oxford District?',
    answer: 'The Oxford District operates on a 24/7/365 "Active Mission" status. While standard administrative hours are 08:00 to 18:00, emergency dispatch is available at all times for medical or legal exigencies.'
  },
  {
    id: 'gen-27',
    category: 'General Inquiries',
    question: 'How do I contact the Oxford Logistics Dispatch directly?',
    answer: 'The primary dispatch line for the Oxford District is 601-327-8333. For non-urgent logistics inquiries or document pre-clearance, email dispatch@northmsnotary.com or notary@northmsnotary.com.'
  },
  {
    id: 'gen-28',
    category: 'General Inquiries',
    question: 'What is the primary service radius for the Oxford hub?',
    answer: 'The Oxford hub maintains a primary rapid-response radius of 25 miles, covering all of Lafayette County and extending into northern Yalobusha and eastern Panola counties. Missions beyond this radius are classified as "Extended Deployment".'
  },
  {
    id: 'gen-29',
    category: 'General Inquiries',
    question: 'Are there specific protocols for Ole Miss campus deployments?',
    answer: 'Yes. Campus missions utilize designated "Safe Nodes" such as the Student Union or J.D. Williams Library. Agents are familiar with campus parking and security protocols to ensure timely arrival at all university departments.'
  },
  {
    id: 'gen-30',
    category: 'General Inquiries',
    question: 'How are logistics fees calculated for the 38677 zip code?',
    answer: 'Fees for the 38677 district are standardized based on the "Urban Oxford" rate, which minimizes travel surcharges due to the high density of units in this sector. This ensures cost-effective service for the university community.'
  },
  {
    id: 'gen-31',
    category: 'General Inquiries',
    question: 'What is the best point of contact for questions not in the vault?',
    answer: 'For complex inquiries or specific mission requirements not covered in this repository, please contact our Oxford District logistics operations directly at 601-327-8333 or via email at notary@northmsnotary.com. This is the definitive point of contact for all non-standard requests.'
  }
];

const TICKER_MESSAGES = [
  "LOGISTICS UNIT 01: ACTIVE • OXFORD DISTRICT",
  "LOGISTICS UNIT 02: DEPLOYED • GRENADA MEDICAL HUB",
  "ELITE DISPATCH PROTOCOL: 45m AVG LATENCY",
  "SYSTEM STATUS: ALL 25 STRATEGIC HUBS OPERATIONAL",
  "SECURED DUAL-TRAY PRINTING BUREAU ONLINE"
];

// --- Components ---

// --- Sub-components for performance ---

const FaqItem = React.memo(({ faq, isOpen, onToggle }: { faq: FAQ, isOpen: boolean, onToggle: (id: string) => void }) => {
  return (
    <div 
      className={`glass-card rounded-2xl transition-all duration-500 overflow-hidden ${
        isOpen 
        ? 'border-[#C39B54]/40 ring-1 ring-[#C39B54]/20 luxury-shadow' 
        : 'hover:border-black/10'
      }`}
    >
      <button 
        onClick={() => onToggle(faq.id)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-[#C39B54] uppercase tracking-[0.5em] font-black">{faq.category}</span>
          <h4 className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#1C1B1A]' : 'text-gray-800'}`}>{faq.question}</h4>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#C39B54]' : ''}`} 
        />
      </button>
      <div className={`transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-6 pb-8 pt-2 text-[#4A3525] leading-relaxed text-[15px] font-light border-t border-black/5 mt-2">
          {faq.answer}
          <div className="mt-6 flex items-center gap-3">
             <div className="w-8 h-[1px] bg-[#C39B54]/30"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Verification Artifact: System Nominal</span>
          </div>
        </div>
      </div>
    </div>
  );
});

FaqItem.displayName = 'FaqItem';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Nodes");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(tickerInterval);
    };
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const catMatch = activeCategory === "All Nodes" || item.category === activeCategory;
      const searchMatch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = React.useCallback((id: string) => {
    setOpenId(prev => prev === id ? null : id);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-dispatch');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bureau-bg selection:bg-[#C39B54]/30">
      
      {/* Top Ticker */}
      <div className="fixed top-0 left-0 w-full bg-[#C39B54] text-[#FDFCF9] py-1.5 overflow-hidden z-[70] shadow-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#FDFCF9] rounded-full animate-ping shrink-0"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] font-cinzel whitespace-nowrap">
              {TICKER_MESSAGES[tickerIndex]}
            </span>
          </div>
          <span className="hidden lg:block text-[8px] font-black uppercase tracking-[0.4em] opacity-80 shrink-0">
            North Mississippi Division • Authorized Dispatch: 601-327-8333
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-700 ${scrolled ? 'translate-y-7' : 'translate-y-10'} px-4`}>
        <div className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-700 ${scrolled ? 'bg-white/90 backdrop-blur-2xl py-3 shadow-xl border-[#C39B54]/20' : 'bg-transparent py-5 border-transparent'}`}>
          <div className="px-6 flex justify-between items-center">
            <a href="https://northmsnotary.com" className="flex flex-col group transition-all duration-500">
              <span className="font-cinzel font-black text-xl tracking-tighter text-[#C39B54] leading-none uppercase group-hover:text-[#1C1B1A]">THE NORTH MS NOTARY</span>
              <span className="text-[8px] uppercase tracking-[0.5em] text-gray-400 font-bold mt-1 group-hover:text-[#C39B54]">BUREAU KNOWLEDGE VAULT</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="tel:6013278333" className="hidden sm:flex items-center gap-2 bg-[#C39B54] text-[#FDFCF9] px-5 py-2 rounded-full font-black text-[10px] tracking-widest uppercase hover:scale-105 transition shadow-lg">
                <Phone size={12} /> Direct Call
              </a>
              <button 
                onClick={scrollToContact}
                className="lg:hidden p-2 text-[#C39B54] hover:scale-110 transition-transform"
                title="Quick Help"
              >
                <HelpCircle size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-48 pb-24 px-6 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C39B54] rounded-full blur-[140px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[140px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C39B54]/5 border border-[#C39B54]/30 rounded-full mb-8">
            <ShieldCheck size={14} className="text-[#C39B54]" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#C39B54] uppercase font-bold">Secure Intelligence Node</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-cinzel font-black text-[#1C1B1A] mb-8 uppercase italic tracking-tighter leading-[0.9]">
            Operational <span className="text-[#C39B54] gold-glow">Intelligence</span>
          </h1>
          <p className="text-[#4A3525] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light italic">
            "The definitive North Mississippi repository for mobile notarial protocols, high-stakes witnessing standards, and jurisdictional coverage."
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar / Category Atlas */}
          <aside className="lg:col-span-1 space-y-10">
            <section>
              <h3 className="text-[10px] font-mono text-[#C39B54] uppercase tracking-[0.3em] mb-6 flex items-center gap-2 font-black">
                <Layers size={14} /> Knowledge Nodes
              </h3>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.5em] transition-all duration-300 border ${
                      activeCategory === cat 
                      ? 'bg-[#C39B54]/10 border-[#C39B54]/50 text-[#C39B54] shadow-sm' 
                      : 'bg-transparent border-transparent text-gray-500 hover:text-[#1C1B1A] hover:bg-black/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </section>

            <section className="glass-card p-6 rounded-2xl border-black/5">
              <h3 className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                <Zap size={12} className="text-[#C39B54]" /> High-Level Assets
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Printer size={16} className="text-[#C39B54] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#1C1B1A] font-black uppercase tracking-widest">Mobile Bureau</p>
                    <p className="text-[9px] text-gray-500 font-medium">Dual-Tray & High-Speed Scanning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <History size={16} className="text-[#C39B54] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#1C1B1A] font-black uppercase tracking-widest">Active Ops</p>
                    <p className="text-[9px] text-gray-500 font-medium">24/7/365 Emergency Dispatch</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck size={16} className="text-[#C39B54] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#1C1B1A] font-black uppercase tracking-widest">Elite Status</p>
                    <p className="text-[9px] text-gray-500 font-medium">NNA & LSS Verified Agents</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          {/* FAQ Engine Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Search Module */}
            <div className="space-y-4">
              <div className="relative group">
                <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchQuery ? 'text-[#C39B54]' : 'text-gray-400 group-focus-within:text-[#C39B54]'}`} size={20} />
                <input 
                  type="text" 
                  placeholder="Query Bureau protocols, use cases, or regional hubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-2xl py-5 pl-14 pr-12 focus:outline-none focus:ring-2 focus:ring-[#C39B54]/10 focus:border-[#C39B54]/40 transition-all text-[#1C1B1A] placeholder:text-gray-400 font-light text-lg"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C39B54] transition-colors"
                  >
                    <Zap size={16} className="rotate-45" />
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    Active Results: <span className="text-[#C39B54] font-black">{filteredFaqs.length}</span>
                  </span>
                  {searchQuery && (
                    <span className="text-[10px] font-mono text-[#C39B54]/60 uppercase tracking-widest italic">
                      • Filtering by keyword
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {['Oxford', 'Clinical', 'LSA', 'Status'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="text-[9px] font-black uppercase tracking-[0.5em] px-3 py-1 bg-black/5 border border-black/5 rounded-md text-gray-500 hover:border-[#C39B54]/30 hover:text-[#C39B54] transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Accordion Vault */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <FaqItem 
                    key={faq.id} 
                    faq={faq} 
                    isOpen={openId === faq.id} 
                    onToggle={toggleAccordion} 
                  />
                ))
              ) : (
                <div className="py-24 text-center space-y-6 bg-black/5 border border-dashed border-black/10 rounded-2xl">
                  <AlertCircle size={48} className="mx-auto text-gray-300" />
                  <div className="space-y-1">
                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Zero artifacts retrieved.</p>
                    <p className="text-gray-500 text-[10px] italic">Try adjusting your query or selecting a different Knowledge Node.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Dispatch Section */}
            <section id="contact-dispatch" className="mt-24 pt-24 border-t border-black/5 bg-[#F5F3EB]/30 -mx-6 px-6 rounded-[3rem]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-cinzel font-black text-[#1C1B1A] mb-8 uppercase italic tracking-tighter leading-[0.9]">
                    Contact <span className="text-[#C39B54]">Dispatch</span>
                  </h2>
                  <p className="text-[#4A3525] text-lg mb-4 leading-relaxed italic">
                    "For mission-critical inquiries not addressed in the Knowledge Vault, establish a direct link with logistics operation specialist. This is the best point of contact for specialized questions."
                  </p>
                  <p className="text-gray-500 text-sm mb-10 leading-relaxed italic">
                    Headquartered in Tillatoba. Servicing Oxford heavily multiple days per week.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-black/5 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-[#C39B54]/10 flex items-center justify-center text-[#C39B54]">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Direct Line</p>
                        <p className="text-[#1C1B1A] font-mono font-bold">601-327-8333</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-black/5 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-[#C39B54]/10 flex items-center justify-center text-[#C39B54]">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">General Inquiries</p>
                        <p className="text-[#1C1B1A] font-mono font-bold">notary@northmsnotary.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border-[#C39B54]/20 relative overflow-hidden luxury-shadow">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare size={120} className="text-[#C39B54]" />
                  </div>
                  
                  <form action="https://formspree.io/f/mqelgeag" method="POST" className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-[#C39B54] font-bold">Your Email Artifact</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email"
                        required
                        placeholder="agent@domain.com"
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1C1B1A] focus:outline-none focus:border-[#C39B54] transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-[#C39B54] font-bold">Mission Parameters / Inquiry</label>
                      <textarea 
                        name="message" 
                        id="message"
                        required
                        rows={4}
                        placeholder="Describe your inquiry or mission requirements..."
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1C1B1A] focus:outline-none focus:border-[#C39B54] transition-all font-mono resize-none"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-[#C39B54] text-[#FDFCF9] py-4 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Zap size={16} /> Transmit Message
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* Strategic Disclosure */}
            <div className="mt-24 p-12 glass-card rounded-[2.5rem] border-[#C39B54]/20 relative overflow-hidden group luxury-shadow">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Scale size={160} className="text-[#C39B54]" />
               </div>
               <div className="relative z-10 text-center">
                 <Scale size={48} className="mx-auto text-[#C39B54] mb-8" />
                 <h4 className="text-3xl font-cinzel font-black uppercase text-[#1C1B1A] mb-6 tracking-tighter leading-[0.9]">Official Bureau Disclaimer</h4>
                 <p className="text-sm text-[#4A3525] max-w-3xl mx-auto leading-relaxed italic font-light">
                    The North Mississippi Notary Bureau provides this knowledge vault for informational benefit. We are not attorneys and do not provide legal advice. All document interpretations should be reviewed by licensed legal counsel. We serve strictly as impartial commissioned witnesses for the Sovereign State of Mississippi.
                 </p>
                 <div className="mt-10 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-[#C39B54]/60">
                    <span className="flex items-center gap-2"><Award size={14} /> Licensed MS SOS</span>
                    <span className="flex items-center gap-2"><ShieldCheck size={14} /> Bonded & Insured</span>
                    <span className="flex items-center gap-2"><UserCheck size={14} /> Verified LSA</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* Strategic Footer */}
      <footer className="w-full bg-[#FDFCF9] py-32 border-t border-black/5 relative mt-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C39B54]/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-cinzel text-2xl font-black text-[#1C1B1A] mb-6 uppercase tracking-tighter leading-[0.9]">
              THE NORTH <span className="text-[#C39B54]">MISSISSIPPI</span> NOTARY
            </h4>
            <p className="max-w-md mb-10 text-[#4A3525] leading-relaxed text-sm font-light">
              Mississippi's premier mobile logistics bureau. Specialized in high-stakes document witnessing, estate execution, and clinical power of attorney deployments across North Mississippi.
            </p>
            <div className="flex gap-4">
              <a href={BIZ_INFO.siteUrl} className="px-6 py-3 rounded-xl border border-black/10 text-[#1C1B1A] font-black uppercase tracking-[0.2em] text-[9px] hover:border-[#C39B54] hover:text-[#C39B54] transition-all bg-black/5 shadow-sm">
                Bureau Home
              </a>
              <a href="#top" className="px-6 py-3 rounded-xl border border-black/10 text-[#1C1B1A] font-black uppercase tracking-[0.2em] text-[9px] hover:border-[#C39B54] hover:text-[#C39B54] transition-all bg-black/5 shadow-sm">
                Top of Vault
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[#1C1B1A] font-black uppercase tracking-[0.3em] text-[10px] mb-8">Service Jurisdictions</h5>
            <ul className="space-y-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
              <li className="hover:text-[#C39B54] transition-colors">Lafayette / Oxford</li>
              <li className="hover:text-[#C39B54] transition-colors">Grenada / Holcomb</li>
              <li className="hover:text-[#C39B54] transition-colors">Panola / Batesville</li>
              <li className="hover:text-[#C39B54] transition-colors">Yalobusha / Tillatoba</li>
              <li className="hover:text-[#C39B54] transition-colors">Tallahatchie / Charleston</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#1C1B1A] font-black uppercase tracking-[0.3em] text-[10px] mb-8">Bureau Protocols</h5>
            <ul className="space-y-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
              <li className="hover:text-[#C39B54] transition-colors flex items-center gap-2">
                <ShieldCheck size={12} /> GLBA Compliance
              </li>
              <li className="hover:text-[#C39B54] transition-colors flex items-center gap-2">
                <FileText size={12} /> E&O Insured
              </li>
              <li className="hover:text-[#C39B54] transition-colors flex items-center gap-2">
                <Clock size={12} /> Active 24/7/365
              </li>
              <li className="hover:text-[#C39B54] transition-colors flex items-center gap-2">
                <Briefcase size={12} /> LSS Certified Agent
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] font-black text-gray-400">
          <span>© 2026 The North MS Notary Bureau</span>
          <span className="mt-4 md:mt-0 italic">Technologist Owned • Zero-Defect Philosophy</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
