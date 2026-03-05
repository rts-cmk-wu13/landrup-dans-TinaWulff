'use client';
import { useActionState } from 'react';
import { AddUserToActivity } from "./addActivity-action";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddActivityButton({ userId, activityId, alreadyJoined }) {
  const initialState = { success: false, message: "" };
  const [state, formAction, isPending] = useActionState(AddUserToActivity, initialState);

  const [showButton, setShowButton] = useState(true); // State til at styre visningen af tilmeld-/afmeldknappen
  const [showConfirm, setShowConfirm] = useState(false); // State til at styre visningen af bekræftelsesflowet for afmelding

  /////////// Skjul knappen hvis brugeren ikke er logget ind ///// sammen med showbotton usestate og useeffect, så vi ikke har server/client mismatch. ///////////
  useEffect(() => {
    if (!document.cookie.includes('accessToken=')) {
      setShowButton(false);
    }
  }, []);
  ///////////////////////////////////////

  ///////// Opdatering af data efter tilmelding/afmelding - så knappen opdaterer ////////
  const router = useRouter();
  
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.refresh(); //opdaterer servekomponentens data ikke browserens, så vores tilmeldingsbesked vises indtil clienten refresher siden.
      }, 1500); // 1.5 sekunder
      
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);
  //////////////////////////////////

  ///////// Bekræftelsesflow for afmelding: ////////
  function handleAfmeldClick(e) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function handleCancel() {
    setShowConfirm(false);
  }
  ///////////////////////////////////

  return (
    <div className="absolute z-10">
      <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="activityId" value={activityId} />
        <input type="hidden" name="action" value={alreadyJoined ? "afmeld" : "tilmeld"} />
        {showButton && (
          alreadyJoined ? (
            showConfirm ? (
              <div className="flex flex-col items-center gap-4 bg-gray-300 rounded-xl w-full p-4 shadow-xl relative right-5 bottom-5">
                <p className='mr-2 text-black font-bold'>Er du sikker på, at du vil afmelde dig holdet?</p>
                <button
                  className="bg-red-400 text-black font-medium p-3 rounded-lg w-[200px] text-m shadow-lg"
                  type="submit"
                  disabled={isPending}
                >Bekræft afmelding</button>
                <button type="button" className="bg-gray-100 font-medium text-black p-2 rounded-lg w-[200px] text-m mb-2 shadow-lg" onClick={handleCancel}>Annuller</button>
              </div>
            ) : (
              <button
                className="bg-[#003147] text-white p-3 rounded-lg w-[200px] text-m m-8"
                type="button"
                onClick={handleAfmeldClick}
                disabled={isPending}
              >Afmeld</button>
            )
          ) : (
            <button
              className="bg-[#003147] text-white p-3 rounded-lg w-[200px] text-m m-8"
              type="submit"
              disabled={isPending}
            >Tilmeld</button>
          )
        )}
        {state.message &&  <p className='text-blue-600 mt-[-10px] mb-[10px] ml-[30px]' dangerouslySetInnerHTML={{ __html: state.message }} />}
      </form>
    </div>
  );
}