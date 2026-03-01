// All 15 cover letter contacts matched with emails from azba_cohort_roster.xlsx

export interface Contact {
    id: string;
    name: string;
    title: string;
    company: string;
    email: string;
    salutation: string;
    coverLetter: string;
    status: "pending" | "sent" | "confirmed";
}

export const DEBRA_SIGNATURE = `Debra L. Friednash
Founder & Executive Assistant to the Chief Executive Officer
Integro Bank
Office: (602) 805-5088
Mobile: (480) 717-0553
Email: denvertrad@aol.com`;

export const DEBRA_EMAIL = "denvertrad@aol.com";
export const FROM_EMAIL = "ricomiller@icloud.com";
export const BCC_EMAIL = "ricomiller@icloud.com";
export const RESUME_FILENAME = "Debra_Friednash_Resume.pdf";

export function buildSubjectLine(contact: Contact): string {
    return `CONFIDENTIAL | Executive Assistant Application – ${contact.company} | Debra L. Friednash`;
}

export function buildEmailBody(contact: Contact): string {
    const firstName = contact.name.split(" ")[0];
    return `Dear ${firstName},

Please find attached my cover letter and resume for your consideration. I have a strong interest in contributing to ${contact.company} in an executive support capacity and believe my 20+ years in banking leadership support — including my current role at Integro Bank — translates directly to the needs of your team.

I would welcome the opportunity to connect at your convenience.

Best regards,

${DEBRA_SIGNATURE}`;
}

export const CONTACTS: Contact[] = [
    {
        id: "bell-bank",
        name: "Adam Christensen",
        title: "SVP, Commercial Banking Director",
        company: "Bell Bank",
        email: "achristensen@bell.bank",
        salutation: "Mr. Christensen",
        status: "pending",
        coverLetter: `March 1, 2026

Adam Christensen
SVP, Commercial Banking Director
Bell Bank

Dear Mr. Christensen,

I am writing to express my strong interest in supporting Bell Bank's continued expansion across the Phoenix metro market. Having followed Bell Bank's remarkable growth — from its 2019 Chandler opening to its rapidly expanding Arizona footprint — I am drawn to the bank's distinctive culture of "Happy Employees! Happy Customers!" and its commitment to providing relationship-driven banking services.

With over 20 years of experience as a Senior Executive Assistant and Corporate Secretary in the banking sector, I offer the executive support infrastructure that enables commercial banking leaders to focus on what matters most: growing client relationships and market share. At Integro Bank, I currently serve as Executive Assistant to the CEO, Secretary of the Board, and President of the Integro Bank Foundation — three concurrent roles that have sharpened my ability to manage complexity, coordinate across functions, and represent an institution with professionalism.

My experience includes orchestrating schedules for the CEO and five C-suite executives, managing 100+ weekly appointments and regulatory stakeholder relationships, and preparing comprehensive daily briefing materials. I also bring deep familiarity with banking regulatory environments, governance documentation, and shareholder communications — all of which translate directly into value for a high-growth commercial banking operation like yours.

I would welcome the opportunity to discuss how my background might support your team's objectives. Thank you for your time and consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "ks-state-bank",
        name: "Bernadette Hirsch",
        title: "SVP, Commercial Lending",
        company: "KS State Bank",
        email: "bhirsch@ksstate.bank",
        salutation: "Ms. Hirsch",
        status: "pending",
        coverLetter: `March 1, 2026

Bernadette Hirsch
SVP, Commercial Lending
KS State Bank

Dear Ms. Hirsch,

I am reaching out to express my interest in supporting the executive leadership at KS State Bank as it grows its commercial lending presence. As a seasoned Senior Executive Assistant and Corporate Secretary with over 20 years of experience in banking environments, I have developed the operational precision and relationship acumen that senior lending executives rely on.

In my current role at Integro Bank, I support the CEO and five senior executives while concurrently serving as Secretary of the Board and President of the Integro Bank Foundation. This breadth of responsibility has given me an intimate understanding of the rhythms and demands of a commercial banking operation, from managing competing regulatory obligations to stewarding stakeholder relationships with care and discretion.

My strengths align closely with what a senior commercial lender needs in executive support: proactive calendar management, strategic meeting prioritization, detailed briefing preparation, and seamless coordination across deal teams and external partners. I also bring governance documentation expertise and regulatory compliance experience — skills that are especially valuable in a lending-focused environment.

I would be glad to learn more about your team's needs and explore how I might contribute. Thank you for considering my background.

Sincerely,

Debra Friednash`,
    },
    {
        id: "jpmorgan-chase",
        name: "John Fetherston",
        title: "VP, State & Local Government Relations",
        company: "JPMorgan Chase",
        email: "john.fetherston@jpmchase.com",
        salutation: "Mr. Fetherston",
        status: "pending",
        coverLetter: `March 1, 2026

John Fetherston
VP, State & Local Government Relations
JPMorgan Chase

Dear Mr. Fetherston,

I am writing to express my interest in providing executive support to JPMorgan Chase's State & Local Government Relations function in Arizona. Having served as the primary liaison between Integro Bank's CEO and banking regulators, elected officials, and community stakeholders, I understand the unique demands of government relations work — and the critical importance of responsive, professional coordination at every touchpoint.

Over the course of my 20+ year career, I have become skilled at navigating relationships with regulators and government partners, managing communications with sensitivity, and supporting executives who must balance policy engagement with organizational strategy. At Integro Bank, I maintained 95%+ satisfaction ratings among regulators and stakeholders by ensuring communications were timely, accurate, and appropriately escalated. I also handled shareholder governance and regulatory compliance documentation, giving me a working fluency in the regulatory dimensions of banking.

My background also includes board governance, daily briefing preparation, and event coordination for high-profile community and civic engagements — all competencies relevant to a government relations office operating in a dynamic regulatory environment. JPMorgan Chase's deep civic presence in Arizona, including its substantial investments in workforce development and small business access to capital, resonates strongly with the community development work I lead through the Integro Bank Foundation.

I would welcome the opportunity to discuss how my experience might serve your team. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "bank-of-america",
        name: "Mary Noor",
        title: "Phoenix Market Executive",
        company: "Bank of America",
        email: "mary.noor@bofa.com",
        salutation: "Ms. Noor",
        status: "pending",
        coverLetter: `March 1, 2026

Mary Noor
Phoenix Market Executive
Bank of America

Dear Ms. Noor,

I am reaching out to express my strong interest in supporting the executive operations of Bank of America's Phoenix market. As a Senior Executive Assistant with over 20 years of experience in the banking sector, including concurrent roles as Corporate Secretary and nonprofit Foundation President, I bring a rare combination of executive support expertise and community leadership that I believe would be a genuine asset to your team.

As Phoenix Market Executive, you operate at the intersection of enterprise banking and local community engagement — an environment where executive support must be both operationally excellent and strategically attuned. In my current role at Integro Bank, I manage complex schedules for the CEO and five C-suite executives, support board governance and regulatory compliance, and lead the Integro Bank Foundation's philanthropic initiatives focused on small business growth and underrepresented entrepreneurs in the Phoenix community.

My ability to manage sensitive relationships — including regulators, shareholders, civic organizations, and board members — with discretion and professionalism has been a consistent strength throughout my career. I am also a Licensed Notary, hold former FINRA Series 7 and 63 licenses, and have a deep familiarity with SEC and banking compliance environments from my earlier work at Scottsdale Capital Advisors.

I would be honored to explore how I might contribute to your market's continued success. Thank you for your time.

Sincerely,

Debra Friednash`,
    },
    {
        id: "first-fidelity-bank",
        name: "Michael Theile",
        title: "EVP, AZ Commercial Lending",
        company: "First Fidelity Bank",
        email: "mtheile@ffb.com",
        salutation: "Mr. Theile",
        status: "pending",
        coverLetter: `March 1, 2026

Michael Theile
EVP, AZ Commercial Lending
First Fidelity Bank

Dear Mr. Theile,

I am writing to express my interest in providing executive-level support to First Fidelity Bank's Arizona Commercial Lending division. With more than 20 years of experience supporting senior executives in regulated banking environments, I have developed a comprehensive skill set ideally suited to the fast-moving, relationship-intensive demands of commercial lending leadership.

In my current position at Integro Bank, I serve simultaneously as Executive Assistant to the CEO, Secretary of the Board, and President of the Integro Bank Foundation. Across these roles, I manage high-volume executive scheduling, prepare daily strategic briefing materials, coordinate board meetings and governance documentation, and maintain the bank's stakeholder and regulatory relationships. I have developed a deep familiarity with the credit, risk, and compliance dimensions of banking — making me an effective partner for senior lending executives.

I take particular pride in my ability to anticipate executive needs before they arise — building sustainable systems that create capacity rather than dependency. My zero-deficiency compliance audit track record and 98% scheduling efficiency reflect the operational standards I maintain.

I would welcome the opportunity to discuss how my background might support your division's goals. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "national-bank-of-arizona",
        name: "Brent Cannon",
        title: "President",
        company: "National Bank of Arizona",
        email: "Brent.Cannon@nbarizona.com",
        salutation: "Mr. Cannon",
        status: "pending",
        coverLetter: `March 1, 2026

Brent Cannon
President
National Bank of Arizona

Dear Mr. Cannon,

I am writing to express my strong interest in providing executive support to the leadership of National Bank of Arizona. As a community-rooted Arizona institution, NBAz reflects the relationship-driven banking values I have dedicated my career to supporting — and I believe my background offers a strong fit with your organization's culture and operational needs.

In my current role at Integro Bank, I serve as Senior Executive Assistant to the CEO, Secretary of the Board, and President of the Integro Bank Foundation. These concurrent responsibilities have given me a comprehensive view of what it takes to support a community bank at the executive level: from Board governance and regulatory compliance to philanthropic leadership and daily strategic operations.

I bring a disciplined, proactive approach to executive support — one built on anticipating needs, creating operational systems that scale, and representing institutional leadership with professionalism in every interaction. My track record includes zero regulatory deficiencies in Board documentation, 95%+ stakeholder satisfaction ratings, and consistent delivery of the coordinated support that banking executives rely on.

I would welcome the opportunity to explore how I might contribute to your team. Thank you for your time.

Sincerely,

Debra Friednash`,
    },
    {
        id: "foothills-bank",
        name: "Daniel Del Monaco",
        title: "Chief Banking Officer",
        company: "Foothills Bank",
        email: "Dan.DelMonaco@foothillsbank.com",
        salutation: "Mr. Del Monaco",
        status: "pending",
        coverLetter: `March 1, 2026

Daniel Del Monaco
Chief Banking Officer
Foothills Bank

Dear Mr. Del Monaco,

I am reaching out to express my interest in supporting Foothills Bank's executive leadership. As a Chief Banking Officer, you operate at the intersection of lending strategy, team leadership, and client relationship management — an environment where high-caliber executive support can meaningfully amplify your impact. I believe my background is well suited to meet those demands.

With over 20 years of experience as a Senior Executive Assistant and Corporate Secretary in regulated banking environments, I currently serve at Integro Bank as Executive Assistant to the CEO, Secretary of the Board, and President of the Integro Bank Foundation. These roles have given me deep experience in commercial banking operations support, from executive calendar management and stakeholder coordination to regulatory liaison work and governance documentation.

I am known for operating with rigor, discretion, and a proactive mindset. I take pride in building the infrastructure that allows banking leaders to focus on their highest-value work, and I thrive in the fast-paced, relationship-driven environment that defines community banking.

I would welcome the opportunity to connect and learn more about your team's needs. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "wells-fargo",
        name: "Harlan Levy",
        title: "SVP, Government Relations",
        company: "Wells Fargo",
        email: "harlan.levy@wellsfargo.com",
        salutation: "Mr. Levy",
        status: "pending",
        coverLetter: `March 1, 2026

Harlan Levy
SVP, Government Relations
Wells Fargo

Dear Mr. Levy,

I am writing to express my interest in providing executive support to Wells Fargo's Government Relations function in Arizona. With a career spanning 20+ years in banking executive support and a track record of managing complex regulatory and stakeholder relationships, I offer the professional foundation that government relations leadership demands.

At Integro Bank, I serve as Executive Assistant to the CEO and primary liaison to banking regulators, state officials, and community partners. I have maintained 95%+ satisfaction ratings with regulatory stakeholders through consistent, accurate, and timely communication — a standard of excellence that aligns well with the high-stakes environment of a major bank's government relations operation.

I also bring demonstrated experience in board governance, shareholder communications, and high-profile event coordination, as well as a deep understanding of the regulatory compliance dimensions of banking. My earlier work at Scottsdale Capital Advisors — where I supported senior leadership through SEC examinations and managed FINRA compliance responsibilities — adds further regulatory fluency to my background.

I would welcome the opportunity to discuss how my experience might support your Arizona government relations priorities. Thank you for your time.

Sincerely,

Debra Friednash`,
    },
    {
        id: "firstbank",
        name: "Humphrey Shin",
        title: "Market President",
        company: "FirstBank",
        email: "Humphrey.Shin@efirstbank.com",
        salutation: "Mr. Shin",
        status: "pending",
        coverLetter: `March 1, 2026

Humphrey Shin
Market President
FirstBank

Dear Mr. Shin,

I am reaching out to express my strong interest in supporting FirstBank's Arizona market leadership. FirstBank's reputation for community-focused banking and its distinctive employee-owned culture make it an institution I deeply respect — and I believe my executive support background is well aligned with your team's needs.

As Market President, you carry responsibility for the full scope of FirstBank's Arizona presence — from community relationships to commercial banking growth. In my current role at Integro Bank, I provide exactly the kind of comprehensive executive support that enables market leaders to succeed: managing complex multi-executive schedules, coordinating board governance, maintaining stakeholder relationships, and leading philanthropic initiatives through the Integro Bank Foundation.

I bring a proactive, deeply organized approach to executive support — one that emphasizes anticipation over reaction, systems over improvisation, and professionalism in every touchpoint. My 20+ years in banking environments have given me the institutional fluency to operate seamlessly alongside market-level banking leadership.

I would welcome the opportunity to learn more about your team's needs. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "clearinghouse-cdfi",
        name: "Andy Gordon",
        title: "AZ Market President",
        company: "Clearinghouse CDFI",
        email: "andyg@ccdfi.com",
        salutation: "Mr. Gordon",
        status: "pending",
        coverLetter: `March 1, 2026

Andy Gordon
AZ Market President
Clearinghouse CDFI

Dear Mr. Gordon,

I am writing to express my strong interest in supporting Clearinghouse CDFI's Arizona market operations. As a mission-driven lender committed to transforming underserved communities, Clearinghouse CDFI reflects values that resonate personally with my work as President of the Integro Bank Foundation — where I have directed philanthropic initiatives focused on small business access to capital and underrepresented entrepreneurs in the Phoenix community.

Beyond my community development work, I bring 20+ years of executive support experience in regulated financial institutions. At Integro Bank, I serve concurrently as Executive Assistant to the CEO, Secretary of the Board, and Foundation President. This breadth of responsibility has developed my ability to support senior leadership with operational precision while maintaining the community-centered perspective that mission-driven organizations require.

I am skilled at managing complex stakeholder relationships, coordinating regulatory and compliance obligations, and ensuring that executive operations run with the rigor and responsiveness that a growing CDFI market presence demands. I would bring both professional excellence and genuine commitment to your organization's mission.

I would welcome the opportunity to discuss how I might contribute to Clearinghouse CDFI's Arizona work. Thank you for your time.

Sincerely,

Debra Friednash`,
    },
    {
        id: "enterprise-bank",
        name: "Brian Crisp",
        title: "President, AZ Region",
        company: "Enterprise Bank & Trust",
        email: "bcrisp@enterprisebank.com",
        salutation: "Mr. Crisp",
        status: "pending",
        coverLetter: `March 1, 2026

Brian Crisp
President, AZ Region
Enterprise Bank & Trust

Dear Mr. Crisp,

I am writing to express my interest in supporting Enterprise Bank & Trust's Arizona regional operations. Enterprise's commitment to entrepreneurial businesses and private equity-backed companies aligns well with my background in supporting banking leadership at a growth-oriented institution — and I believe my executive support expertise could add meaningful value to your team.

At Integro Bank, I currently serve as Executive Assistant to the CEO, Secretary of the Board, and President of the Integro Bank Foundation. These concurrent responsibilities have given me deep experience in executive calendar management, board governance, regulatory compliance coordination, and stakeholder relationship management in a commercial banking environment.

My approach to executive support is grounded in proactive thinking, operational precision, and an unwavering commitment to discretion. I excel at managing complex, competing priorities — systematically triaging meeting requests, preparing strategic briefing materials, and ensuring executives are fully prepared for every engagement. I also bring a background in shareholder communications and investor relations, which complements the private equity and business banking focus that distinguishes Enterprise Bank & Trust.

I would welcome the opportunity to discuss how I might support your Arizona team's continued growth. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "goldwater-bank",
        name: "Chris Wheeler",
        title: "SVP, Commercial Banking",
        company: "Goldwater Bank",
        email: "cwheeler@goldwaterbank.com",
        salutation: "Mr. Wheeler",
        status: "pending",
        coverLetter: `March 1, 2026

Chris Wheeler
SVP, Commercial Banking
Goldwater Bank

Dear Mr. Wheeler,

I am reaching out to express my interest in supporting Goldwater Bank's commercial banking leadership. As a locally focused institution serving Arizona's business community, Goldwater Bank reflects the kind of relationship-driven banking culture I have supported throughout my career — and I believe my background as a Senior Executive Assistant and Corporate Secretary in a regulated bank environment would be a strong fit.

In my current role at Integro Bank, I manage executive operations for the CEO and five C-suite leaders while simultaneously serving as Secretary of the Board and President of the Integro Bank Foundation. Across these roles, I have developed deep expertise in commercial banking operations support — from regulatory liaison management and governance documentation to strategic meeting coordination and daily briefing book preparation.

I bring a proactive, results-oriented approach to executive support that helps senior banking leaders maximize their time and impact. I am skilled at building the operational systems that keep a high-performing commercial banking team running smoothly: prioritizing competing demands, anticipating logistical needs, and ensuring that every stakeholder interaction reflects the institution's professional standards.

I would welcome the opportunity to learn more about your team's needs and explore how I might contribute to Goldwater Bank's continued success. Thank you for your time.

Sincerely,

Debra Friednash`,
    },
    {
        id: "western-alliance-bank",
        name: "David Bernard",
        title: "Sr. Managing Director",
        company: "Western Alliance Bank",
        email: "dbernard@westernalliancebank.com",
        salutation: "Mr. Bernard",
        status: "pending",
        coverLetter: `March 1, 2026

David Bernard
Sr. Managing Director
Western Alliance Bank

Dear Mr. Bernard,

I am writing to introduce myself to Western Alliance Bank's Arizona leadership. As one of the most prominent commercial banks headquartered in Phoenix, Western Alliance's growth trajectory and commitment to business banking excellence have long made it an institution I admire — and I am reaching out to express my interest in contributing to your executive team.

With over 20 years of executive support experience in the banking sector, I currently serve as Senior Executive Assistant to the CEO of Integro Bank, Secretary of the Board, and President of the Integro Bank Foundation. These roles have given me extensive experience supporting senior managing directors and banking executives with complex schedules, high-stakes stakeholder relationships, regulatory compliance coordination, and board governance operations.

The profile of a Western Alliance managing director — managing significant client portfolios, coordinating across deal teams, and representing the institution at a high level externally — requires executive support that is proactive, deeply professional, and operationally precise. This is what I have delivered throughout my career: 98% scheduling efficiency, zero regulatory deficiencies in board documentation, and consistently high satisfaction ratings from regulators and business partners.

I would welcome the opportunity to discuss how my experience might support your team's goals. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
    {
        id: "southwest-heritage-bank",
        name: "Pete Tees",
        title: "EVP & Chief Credit Officer",
        company: "Southwest Heritage Bank",
        email: "ptees@swhb.com",
        salutation: "Mr. Tees",
        status: "pending",
        coverLetter: `March 1, 2026

Pete Tees
EVP & Chief Credit Officer
Southwest Heritage Bank

Dear Mr. Tees,

I am writing to express my interest in supporting Southwest Heritage Bank's executive leadership team. As a recently merged institution combining the legacy of Bank 34 and Commerce Bank of Arizona into one of Arizona's largest community banks, Southwest Heritage Bank is at an exciting inflection point — and I believe strong executive support infrastructure is critical to executing that growth effectively.

As Senior Executive Assistant and Secretary of the Board at Integro Bank, I have direct experience supporting credit-focused banking leadership in a regulated environment. I understand the operational demands of a Chief Credit Officer — managing portfolio reviews, regulatory examinations, cross-functional coordination with lending and risk teams, and external stakeholder communications — and I know how to provide the organized, discreet, and anticipatory support that enables credit leadership to function at its best.

My experience includes maintaining zero regulatory deficiencies in governance documentation, coordinating 100+ weekly executive appointments, preparing comprehensive daily briefing materials, and serving as primary liaison to banking regulators. I also bring a genuine commitment to community banking values, which I have expressed through my leadership of the Integro Bank Foundation and my civic board service in Phoenix.

I would welcome the opportunity to connect and learn more about Southwest Heritage Bank's team. Thank you for your time.

Sincerely,

Debra Friednash`,
    },
    {
        id: "bok-financial",
        name: "Sergio Cardenas",
        title: "SVP, Market Manager",
        company: "BOK Financial",
        email: "sergio.cardenas@bokf.com",
        salutation: "Mr. Cardenas",
        status: "pending",
        coverLetter: `March 1, 2026

Sergio Cardenas
SVP, Market Manager
BOK Financial

Dear Mr. Cardenas,

I am writing to express my interest in supporting BOK Financial's Arizona market operations. BOK Financial's commitment to providing comprehensive banking solutions across the Southwest, paired with its strong emphasis on relationship banking, creates an environment where exceptional executive support can make a meaningful difference — and I believe my background is well suited to your team's needs.

As Senior Executive Assistant to the CEO of Integro Bank, I manage the daily operations and stakeholder relationships of a six-person C-suite executive team in a regulated banking environment. Concurrently, I serve as Secretary of the Board and President of the Integro Bank Foundation, providing me with a broad operational view of community banking that spans governance, compliance, philanthropy, and executive strategy.

I excel at supporting market-facing banking leaders: building the scheduling infrastructure that maximizes client-facing time, preparing executives with the briefing materials and context they need to enter every meeting with confidence, and managing the regulatory and compliance dimensions of banking operations with rigor. My former FINRA Series 7 and 63 licenses and zero-deficiency compliance audit track record reflect the professional standards I maintain.

I would welcome the opportunity to discuss how I might support BOK Financial's Arizona market leadership. Thank you for your consideration.

Sincerely,

Debra Friednash`,
    },
];
