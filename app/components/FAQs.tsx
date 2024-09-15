"use client"
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

function FAQs() {

  const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

  const [role] = useState<string>(getItem4())
  return (


    <div  className="flex justify-center items-center mt-3">

      <div>

          
        <h1 className="font-bold bg-white text-blue-950 underline p-3">Extenuating Circumstances</h1>
        <hr className="bg-blue-950 h-1"/>
        <h2 className="font-bold bg-white text-blue-950 underline p-3">What counts as an EC?</h2>
        <div className="bg-white text-blue-950 w-[1200px] p-3">
          <p>If you believe that your ability to attend or submit a particular item of assessment has been negatively impacted by circumstances outside of your control and so as to cast doubt on the likely validity of the assessment as a measure of your achievement, you may wish to submit a claim for extenuating circumstances. Extenuating circumstances include illness, death of a close relative, etc. Extenuating circumstances do not include computer problems, misreading your exam timetable, employer commitments, planned holidays or local transport delays. The College provides further guidance here: <a href="http://www.arcs.qmul.ac.uk/examinations/extenuating_circumstances/index.html">http://www.arcs.qmul.ac.uk/examinations/extenuating_circumstances/index.html</a></p>
          <br />
          <p>Where any form of assessment is concerned (e.g. a deadline for an assessed essay, or performance in an examination), a formal procedure must be followed if you wish the extenuating circumstances to be taken into account, and these are outlined below. However, you must recognise that the School and College have limited powers to make allowances for the effects of extenuating circumstances. The School Board of Examiners is required by the College regulations to measure achievement, not potential: what a student has done, not what s/he might have been able to do if there had been no problems. Therefore the only claims for extenuating circumstances which we are allowed to consider are those that cast doubt upon the validity of an assessment as a measure of achievement, and are also outside the student’s control. This excludes circumstances which have had no bearing upon the assessment: e.g., absence from part of the teaching due to illness. You may not have reached your full potential, but this has not affected the validity of the assessment, which has demonstrated your level of achievement. Whilst we may be able to consider such circumstances in relation to progression – e.g. whether you might be allowed to first-take or re-sit the module – we may not be permitted to take them into account when considering your overall performance.
          </p>
          <h1 className="font-semibold underline my-3">Absence from classes</h1>
          <p>Noting what is said under Attendance in § 2.2 THE LEARNING EXPERIENCE, as a matter of courtesy you should explain your absence to the module teacher, keep your Adviser informed, and provide a medical certificate or similar document as necessary. However, if you are prevented from attending a significant number of classes you may need to consider whether you will be able to recover lost ground, and you should discuss your situation with your Adviser and/ or the Student Experience Manager. You may wish to consider formally Interrupting your studies if you need to be absent for a significant period during one year, and restarting your studies in September or January of the next year, after your situation has ‘normalised’.
          </p>
          <h1 className="font-semibold underline my-3">Extensions to assessed coursework deadlines</h1>
          <p>If you are unable to meet an assessed coursework deadline owing to extenuating circumstances you may submit a claim for extenuating circumstances to apply for an extension. This should be at least ONE WEEK IN ADVANCE of the deadline. This applies even if a deadline falls at the very beginning of a semester. The same applies if your assessment is an in-class test during Semester One or Two, which is treated as coursework by the College systems. For in-class tests, an ‘extension’, if your claim is accepted, would normally take the form of a new opportunity to sit the test.</p>
          <p>If you have missed a deadline or in-class test owing to extenuating circumstances on the day of the deadline, you should submit your claim as soon as you can.  In such cases, it is acceptable to seek an extension after the event.  However, this should normally be within three working days of the deadline.
          </p>

         
        </div>
      </div>
    </div>
  );
}

export default FAQs;