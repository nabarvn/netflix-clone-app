import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import { goToBillingPortal } from "../lib/stripe";
import Loader from "./Loader";

const Membership = () => {
  const { user } = useAuth();
  const subscription = useSubscription(user);
  const [isBillingLoading, setBillingLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const membershipCancelled = subscription?.cancel_at_period_end;

  useEffect(() => {
    setTimeout(() => {
      setShowText(true);
    }, 1000);
  }, []);

  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true);
      goToBillingPortal();
    }
  };

  return (
    <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0'>
      <div className='space-y-2 py-4'>
        <h4 className='text-lg text-[gray]'>Membership & Billing</h4>
        {showText && (
          <button
            disabled={isBillingLoading || !subscription}
            className='h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 disabled:cursor-default disabled:hover:bg-gray-300 md:w-4/5'
            onClick={manageSubscription}
          >
            {isBillingLoading ? (
              <Loader color='fill-[#e50914]' />
            ) : membershipCancelled ? (
              "Restart Membership"
            ) : (
              "Cancel Membership"
            )}
          </button>
        )}
      </div>

      <div className='col-span-3'>
        <div className='flex flex-col justify-between border-b border-white/10 py-4 md:flex-row'>
          <div>
            <p className='font-medium'>{user?.email}</p>
            <p className='text-[gray]'>Password: ***...***</p>
          </div>

          <div className='md:text-right'>
            <p className='membershipLink'>Change Email</p>
            <p className='membershipLink'>Change Password</p>
          </div>
        </div>

        <div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'>
          <div>
            {showText && (
              <p>
                {membershipCancelled
                  ? "Your membership will end on "
                  : "Your next billing date is "}
                {subscription?.current_period_end}
              </p>
            )}
          </div>

          <div className='md:text-right'>
            <p className='membershipLink'>Manage Payment Info</p>
            <p className='membershipLink'>Add Backup Payment Method</p>
            <p className='membershipLink'>Billing Details</p>
            <p className='membershipLink'>Change Billing Day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
