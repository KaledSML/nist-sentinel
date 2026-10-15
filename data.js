const nistData = [
{
    id: 'gv', 
    title: 'Govern (GV)', 
    color: 'zinc',
    desc: 'The organization’s cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored',
    categories: [
        { 
            id: 'GV.OC', 
            name: 'Organizational Context', 
            items: [
                { code: 'GV.OC-01', text: 'The organizational mission is understood and informs cybersecurity risk management' },
                { code: 'GV.OC-02', text: 'Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered' },
                { code: 'GV.OC-03', text: 'Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed' },
                { code: 'GV.OC-04', text: 'Critical objectives, capabilities, and services that external stakeholders depend on or expect from the organization are understood and communicated' },
                { code: 'GV.OC-05', text: 'Outcomes, capabilities, and services that the organization depends on are understood and communicated' }
            ]
        },
        { 
            id: 'GV.RM', 
            name: 'Risk Management Strategy', 
            items: [
                { code: 'GV.RM-01', text: 'Risk management objectives are established and agreed to by organizational stakeholders' },
                { code: 'GV.RM-02', text: 'Risk appetite and risk tolerance statements are established, communicated, and maintained' },
                { code: 'GV.RM-03', text: 'Cybersecurity risk management activities and outcomes are included in enterprise risk management processes' },
                { code: 'GV.RM-04', text: 'Strategic direction that describes appropriate risk response options is established and communicated' },
                { code: 'GV.RM-05', text: 'Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties' },
                { code: 'GV.RM-06', text: 'A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated' },
                { code: 'GV.RM-07', text: 'Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions' }
            ]
        },
        { 
            id: 'GV.RR', 
            name: 'Roles, Responsibilities, and Authorities', 
            items: [
                { code: 'GV.RR-01', text: 'Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving' },
                { code: 'GV.RR-02', text: 'Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced' },
                { code: 'GV.RR-03', text: 'Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies' },
                { code: 'GV.RR-04', text: 'Cybersecurity is included in human resources practices' }
            ]
        },
        { 
            id: 'GV.PO', 
            name: 'Policy', 
            items: [
                { code: 'GV.PO-01', text: 'Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced' },
                { code: 'GV.PO-02', text: 'Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission' }
            ]
        },
        { 
            id: 'GV.OV', 
            name: 'Oversight', 
            items: [
                { code: 'GV.OV-01', text: 'Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction' },
                { code: 'GV.OV-02', text: 'The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks' },
                { code: 'GV.OV-03', text: 'Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed' }
            ]
        },
        { 
            id: 'GV.SC', 
            name: 'Cybersecurity Supply Chain Risk Management', 
            items: [
                { code: 'GV.SC-01', text: 'A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders' },
                { code: 'GV.SC-02', text: 'Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally' },
                { code: 'GV.SC-03', text: 'Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes' },
                { code: 'GV.SC-04', text: 'Suppliers are known and prioritized by criticality' },
                { code: 'GV.SC-05', text: 'Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties' },
                { code: 'GV.SC-06', text: 'Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships' },
                { code: 'GV.SC-07', text: 'The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship' },
                { code: 'GV.SC-08', text: 'Relevant suppliers and other third parties are included in incident planning, response, and recovery activities' },
                { code: 'GV.SC-09', text: 'Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle' },
                { code: 'GV.SC-10', text: 'Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement' }
            ]
        }
    ]
},


{
    id: 'id', 
    title: 'Identify (ID)', 
    color: 'blue',
    desc: 'The organization’s current cybersecurity risks are understood',
    categories: [
        { 
            id: 'ID.AM', 
            name: 'Asset Management', 
            items: [
                { code: 'ID.AM-01', text: 'Inventories of hardware managed by the organization are maintained' },
                { code: 'ID.AM-02', text: 'Inventories of software, services, and systems managed by the organization are maintained' },
                { code: 'ID.AM-03', text: 'Representations of the organization’s authorized network communication and internal and external network data flows are maintained' },
                { code: 'ID.AM-04', text: 'Inventories of services provided by suppliers are maintained' },
                { code: 'ID.AM-05', text: 'Assets are prioritized based on classification, criticality, resources, and impact on the mission' },
                { code: 'ID.AM-07', text: 'Inventories of data and corresponding metadata for designated data types are maintained' },
                { code: 'ID.AM-08', text: 'Systems, hardware, software, services, and data are managed throughout their life cycles' }
            ]
        },
        { 
            id: 'ID.RA', 
            name: 'Risk Assessment', 
            items: [
                { code: 'ID.RA-01', text: 'Vulnerabilities in assets are identified, validated, and recorded' },
                { code: 'ID.RA-02', text: 'Cyber threat intelligence is received from information sharing forums and sources' },
                { code: 'ID.RA-03', text: 'Internal and external threats to the organization are identified and recorded' },
                { code: 'ID.RA-04', text: 'Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded' },
                { code: 'ID.RA-05', text: 'Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization' },
                { code: 'ID.RA-06', text: 'Risk responses are chosen, prioritized, planned, tracked, and communicated' },
                { code: 'ID.RA-07', text: 'Changes and exceptions are managed, assessed for risk impact, recorded, and tracked' },
                { code: 'ID.RA-08', text: 'Processes for receiving, analyzing, and responding to vulnerability disclosures are established' },
                { code: 'ID.RA-09', text: 'The authenticity and integrity of hardware and software are assessed prior to acquisition and use' },
                { code: 'ID.RA-10', text: 'Critical suppliers are assessed prior to acquisition' }
            ]
        },
        { 
            id: 'ID.IM', 
            name: 'Improvement', 
            items: [
                { code: 'ID.IM-01', text: 'Improvements are identified from evaluations' },
                { code: 'ID.IM-02', text: 'Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties' },
                { code: 'ID.IM-03', text: 'Improvements are identified from execution of operational processes, procedures, and activities' },
                { code: 'ID.IM-04', text: 'Incident response plans and other cybersecurity plans that affect operations are established, communicated, maintained, and improved' }
            ]
        }
    ]
},

{
    id: 'pr', 
    title: 'Protect (PR)', 
    color: 'green',
    desc: 'Safeguards to manage the organization’s cybersecurity risks are used',
    categories: [
        { 
            id: 'PR.AA', 
            name: 'Identity Management, Authentication, and Access Control', 
            items: [
                { code: 'PR.AA-01', text: 'Identities and credentials for authorized users, services, and hardware are managed by the organization' },
                { code: 'PR.AA-02', text: 'Identities are proofed and bound to credentials based on the context of interactions' },
                { code: 'PR.AA-03', text: 'Users, services, and hardware are authenticated' },
                { code: 'PR.AA-04', text: 'Identity assertions are protected, conveyed, and verified' },
                { code: 'PR.AA-05', text: 'Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties' },
                { code: 'PR.AA-06', text: 'Physical access to assets is managed, monitored, and enforced commensurate with risk' }
            ]
        },
        { 
            id: 'PR.AT', 
            name: 'Awareness and Training', 
            items: [
                { code: 'PR.AT-01', text: 'Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind' },
                { code: 'PR.AT-02', text: 'Individuals in specialized roles are provided with awareness and training so that they possess the knowledge and skills to perform relevant tasks with cybersecurity risks in mind' }
            ]
        },
        { 
            id: 'PR.DS', 
            name: 'Data Security', 
            items: [
                { code: 'PR.DS-01', text: 'The confidentiality, integrity, and availability of data-at-rest are protected' },
                { code: 'PR.DS-02', text: 'The confidentiality, integrity, and availability of data-in-transit are protected' },
                { code: 'PR.DS-10', text: 'The confidentiality, integrity, and availability of data-in-use are protected' },
                { code: 'PR.DS-11', text: 'Backups of data are created, protected, maintained, and tested' }
            ]
        },
        { 
            id: 'PR.PS', 
            name: 'Platform Security', 
            items: [
                { code: 'PR.PS-01', text: 'Configuration management practices are established and applied' },
                { code: 'PR.PS-02', text: 'Software is maintained, replaced, and removed commensurate with risk' },
                { code: 'PR.PS-03', text: 'Hardware is maintained, replaced, and removed commensurate with risk' },
                { code: 'PR.PS-04', text: 'Log records are generated and made available for continuous monitoring' },
                { code: 'PR.PS-05', text: 'Installation and execution of unauthorized software are prevented' },
                { code: 'PR.PS-06', text: 'Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle' }
            ]
        },
        { 
            id: 'PR.IR', 
            name: 'Technology Infrastructure Resilience', 
            items: [
                { code: 'PR.IR-01', text: 'Networks and environments are protected from unauthorized logical access and usage' },
                { code: 'PR.IR-02', text: 'The organization’s technology assets are protected from environmental threats' },
                { code: 'PR.IR-03', text: 'Mechanisms are implemented to achieve resilience requirements in normal and adverse situations' },
                { code: 'PR.IR-04', text: 'Adequate resource capacity to ensure availability is maintained' }
            ]
        }
    ]
},

{
    id: 'de', 
    title: 'Detect (DE)', 
    color: 'yellow',
    desc: 'Possible cybersecurity attacks and compromises are found and analyzed',
    categories: [
        { 
            id: 'DE.CM', 
            name: 'Continuous Monitoring', 
            items: [
                { code: 'DE.CM-01', text: 'Networks and network services are monitored to find potentially adverse events' },
                { code: 'DE.CM-02', text: 'The physical environment is monitored to find potentially adverse events' },
                { code: 'DE.CM-03', text: 'Personnel activity and technology usage are monitored to find potentially adverse events' },
                { code: 'DE.CM-06', text: 'External service provider activities and services are monitored to find potentially adverse events' },
                { code: 'DE.CM-09', text: 'Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events' }
            ]
        },
        { 
            id: 'DE.AE', 
            name: 'Adverse Event Analysis', 
            items: [
                { code: 'DE.AE-02', text: 'Potentially adverse events are analyzed to better understand associated activities' },
                { code: 'DE.AE-03', text: 'Information is correlated from multiple sources' },
                { code: 'DE.AE-04', text: 'The estimated impact and scope of adverse events are understood' },
                { code: 'DE.AE-06', text: 'Information on adverse events is provided to authorized staff and tools' },
                { code: 'DE.AE-07', text: 'Cyber threat intelligence and other contextual information are integrated into the analysis' },
                { code: 'DE.AE-08', text: 'Incidents are declared when adverse events meet the defined incident criteria' }
            ]
        }
    ]
},

{
    id: 'rs', 
    title: 'Respond (RS)', 
    color: 'red',
    desc: 'Actions regarding a detected cybersecurity incident are taken',
    categories: [
        { 
            id: 'RS.MA', 
            name: 'Incident Management', 
            items: [
                { code: 'RS.MA-01', text: 'The incident response plan is executed in coordination with relevant third parties once an incident is declared' },
                { code: 'RS.MA-02', text: 'Incident reports are triaged and validated' },
                { code: 'RS.MA-03', text: 'Incidents are categorized and prioritized' },
                { code: 'RS.MA-04', text: 'Incidents are escalated or elevated as needed' },
                { code: 'RS.MA-05', text: 'The criteria for initiating incident recovery are applied' }
            ]
        },
        { 
            id: 'RS.AN', 
            name: 'Incident Analysis', 
            items: [
                { code: 'RS.AN-03', text: 'Analysis is performed to establish what has taken place during an incident and the root cause of the incident' },
                { code: 'RS.AN-06', text: 'Actions performed during an investigation are recorded, and the records’ integrity and provenance are preserved' },
                { code: 'RS.AN-07', text: 'Incident data and metadata are collected, and their integrity and provenance are preserved' },
                { code: 'RS.AN-08', text: 'An incident’s magnitude is estimated and validated' }
            ]
        },
        { 
            id: 'RS.CO', 
            name: 'Incident Response Reporting and Communication', 
            items: [
                { code: 'RS.CO-02', text: 'Internal and external stakeholders are notified of incidents' },
                { code: 'RS.CO-03', text: 'Information is shared with designated internal and external stakeholders' }
            ]
        },
        { 
            id: 'RS.MI', 
            name: 'Incident Mitigation', 
            items: [
                { code: 'RS.MI-01', text: 'Incidents are contained' },
                { code: 'RS.MI-02', text: 'Incidents are eradicated' }
            ]
        }
    ]
},

{
    id: 'rc', 
    title: 'Recover (RC)', 
    color: 'purple',
    desc: 'Assets and operations affected by a cybersecurity incident are restored',
    categories: [
        { 
            id: 'RC.RP', 
            name: 'Incident Recovery Plan Execution', 
            items: [
                { code: 'RC.RP-01', text: 'The recovery portion of the incident response plan is executed once initiated from the incident response process' },
                { code: 'RC.RP-02', text: 'Recovery actions are selected, scoped, prioritized, and performed' },
                { code: 'RC.RP-03', text: 'The integrity of backups and other restoration assets is verified before using them for restoration' },
                { code: 'RC.RP-04', text: 'Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms' },
                { code: 'RC.RP-05', text: 'The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed' },
                { code: 'RC.RP-06', text: 'The end of incident recovery is declared based on criteria, and incident-related documentation is completed' }
            ]
        },
        { 
            id: 'RC.CO', 
            name: 'Incident Recovery Communication', 
            items: [
                { code: 'RC.CO-03', text: 'Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders' },
                { code: 'RC.CO-04', text: 'Public updates on incident recovery are shared using approved methods and messaging' }
            ]
        }
    ]
}

];
